
import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  PanResponder,
  Dimensions,
  LayoutAnimation,
  TouchableOpacity,
  Animated
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { calcHeight } from "../utils/demensios";

// import SwipeIcon from "./components/SwipeIcon";
// import images from "./assets/images";

const MARGIN_TOP = Platform.OS === "ios" ? 20 : 0;
const DEVICE_HEIGHT = Dimensions.get("window").height - MARGIN_TOP;

export default class SwipeUpDown extends Component {
  static defautProps = {
    disablePressToShow: false
  };
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      show: false
    };
    this.disablePressToShow = props.disablePressToShow;
    this.SWIPE_HEIGHT = props.swipeHeight || 60;
    this.up = props.up;
    this.down = props.down
    this._panResponder = null;
    this.top = this.props.top;
    this.height = this.SWIPE_HEIGHT;
    this.customStyle = {
      style: {
        bottom: 0,
        inspect: false
        //  top: this.top,
        //  height: 100
      }
    };
    this.checkCollapsed = true;
    this.showMini = this.showMini.bind(this);
    this.showFull = this.showFull.bind(this);
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (event, gestureState) => {
        return !(Math.abs(gestureState.dx) < 5 && Math.abs(gestureState.dy) < 5);
      },
      onPanResponderMove: this._onPanResponderMove.bind(this),
      onPanResponderRelease: this._onPanResponderRelease.bind(this)
    });
  }

  componentDidMount() {
    this.props.hasRef && this.props.hasRef(this);
  }

  updateNativeProps() {
    switch (this.props.animation) {
      case "linear":
        LayoutAnimation.linear();
        break;
      case "spring":
        LayoutAnimation.spring();
        break;
      case "easeInEaseOut":
        LayoutAnimation.easeInEaseOut();
        break;
      case "none":
      default:
        break;
    }
    this.viewRef.setNativeProps(this.customStyle);
  }

  _onPanResponderMove(event, gestureState) {
    if (gestureState.dy > 0 && gestureState.dy < this.down && this.state.inspect) {
      // SWIPE DOWN
      this.customStyle.style.top = this.top + gestureState.dy;
      this.height = DEVICE_HEIGHT;
      !this.state.collapsed && this.setState({ collapsed: true });
      this.updateNativeProps();
    } else if (gestureState.dy < 0 && gestureState.dy > this.up && !this.state.inspect) {
      // SWIPE UP
      this.top = 0;
      this.customStyle.style.top = this.props.top + gestureState.dy;
      this.customStyle.style.height = this.SWIPE_HEIGHT - gestureState.dy;
      this.updateNativeProps();
      this.state.collapsed && this.setState({ collapsed: false });
    }
  }

  _onPanResponderRelease(event, gestureState) {
    if (gestureState.dy < -50 || gestureState.dy < 50) {
      this.props.handleTouch(false)
      this.setState({ inspect: true })
      this.showFull();
    } else {
      this.setState({ inspect: false })

      this.showMini();
    }
  }

  showFull() {
    this.setState({inspect:true})

    const { onShowFull } = this.props;
    this.customStyle.style.top = 0;
    this.customStyle.style.height = DEVICE_HEIGHT;
    // this.swipeIconRef &&
    //   this.swipeIconRef.setState({ icon: images.arrow_down, showIcon: true });
    this.updateNativeProps();
    this.state.collapsed && this.setState({ collapsed: false });
    this.checkCollapsed = false;
    onShowFull && onShowFull();
  }

  showMini() {
    this.setState({inspect:false})
    const { onShowMini, itemMini } = this.props;
    this.SWIPE_HEIGHT = this.props.swipeHeight; //Avoid hiding when swiping down.
    this.customStyle.style.top = itemMini
      ? this.props.top
      : DEVICE_HEIGHT;
    this.customStyle.style.height = itemMini ? this.SWIPE_HEIGHT : 0;
    this.swipeIconRef && this.swipeIconRef.setState({ showIcon: false });
    this.updateNativeProps();
    !this.state.collapsed && this.setState({ collapsed: true });
    this.checkCollapsed = true;
    onShowMini && onShowMini();
  }

  render() {
    const { itemMini, itemFull, style } = this.props;
    const { collapsed } = this.state;
    return (
      <Animated.View
        ref={ref => (this.viewRef = ref)}

        style={[
          styles.wrapSwipe,
          {
            height: this.SWIPE_HEIGHT,
            marginTop: MARGIN_TOP,
          },
          !itemMini && collapsed && { marginBottom: -200 },
          style
        ]}
      >

        <Animated.View
          {...this._panResponder.panHandlers}
          onTouchStart={() => { this.state.inspect ? this.showMini():this.showFull()}}
          // onTouchEnd={() => {
          //   collapsed && itemMini && this.state.inspect ?
          //     this.props.handleTouch(true)
          //     : this.props.handleTouch(false)
          // }}
          onLayout={() => { }}
          style={{
            position: "absolute", width: "50%", height: calcHeight(150), zIndex: 10,
            marginLeft: '25%',
           // backgroundColor: "red"
          }}>
        </Animated.View>
        {collapsed ? (
          itemMini ? (
            <TouchableWithoutFeedback
              activeOpacity={this.disablePressToShow ? 1 : 0.6}
              style={{ height: this.height }}
          //  onPress={() =>  this.showFull()}
            >
              {itemMini}
            </TouchableWithoutFeedback>
          ) : null
        ) : (
          <TouchableWithoutFeedback
        
      //  onPress={() =>  {this.showMini();this.props.handleTouch(false) }}
        >
            {itemFull}
            </TouchableWithoutFeedback>
          )}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  wrapSwipe: {
    padding: 0,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  }
});