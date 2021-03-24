import React, { createRef, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView, Image, TouchableOpacity, Animated, Dimensions, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector, } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import { calcFontSize, calcHeight, calcWidth } from "../../utils/demensios"
import HeaderPage from '../../components/HeaderPage';
//@ts-ignore

import Circles from "../../assets/icons/circles.svg"
import LinearGradient from 'react-native-linear-gradient';
//@ts-ignore
import Network from "../../assets/icons/network.svg"
//@ts-ignore

import Search1 from "../../assets/icons/searchI.svg"
import { categoryListSelector, LoadingSelector, subCategoryListSelector } from '../../store/selector/categorySelector';
import SwipeUpDown from '../../components/Swiper';
import Swiper from 'react-native-swiper';
import { setIndex } from '../../store/actions/mainActions';
import FullItem from '../../components/FullItem';
import { setResults } from '../../store/actions/categoryActions';
import Content from '../../components/Content';
import Carousel, { Pagination } from 'react-native-snap-carousel';

interface Props {
    navigation: NavigationScreenProp<any, any>;
}

const styles = StyleSheet.create({
    screen: { backgroundColor: 'rgba(255, 255, 255, 0.6)', flex: 1 },
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    subView: {
        position: "absolute",
        width: "100%",
    },
    subView1: {
        position: "absolute",
        bottom: 0,
        height: "80%",
        backgroundColor: 'blue',
        width: "100%",
    },
    textinput: { borderBottomColor: "#4B4B4B", borderBottomWidth: 1, marginLeft: calcWidth(16), width: calcWidth(150) },

});

const MenuScreen: React.FunctionComponent<Props> = ({ navigation }) => {
    const [visible1, setVisible1] = useState(false)
    const [visible2, setVisible2] = useState(false)
    const [ind, setI] = useState(0)
    const [y, setY] = useState(0)
    const [check, setCheck] = useState(false)
    const list = useSelector(categoryListSelector)
    let [bounceValues, setBounceValues] = useState([])
    let [swipeUpDownRefs, setSwipeUpDownRefs] = useState([])
    const [search, setSearch] = useState('')
    function createBouncevalues() {

        var l: Array<any>
        var s: Array<any>
        l = []
        s = []
        list.map((el, i) => {
            l.push(new Animated.Value(0))
            //s.push(null)
        })
        //@ts-ignore
        setBounceValues(l)
        //@ts-ignore

    }
    const [status, SetStatus] = useState(true)
    const loading = useSelector(LoadingSelector)
    const sublist = useSelector(subCategoryListSelector)
    const dispatch = useDispatch()
    const n = 3
    const x = require('../../assets/icons/x.png')
    let swiper: any = null
    const [activeIndex, setActiveIndex] = useState(0)

    //@ts-ignore

    let [results, setResult] = useState([])
    const [elem, setElem] = useState(null)
    //@ts-ignore

    function hexToRGB(hex: string, alpha: number) {
        var r = parseInt(hex.slice(1, 3), 16),
            g = parseInt(hex.slice(3, 5), 16),
            b = parseInt(hex.slice(5, 7), 16);

        if (alpha) {
            return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
        } else {
            return "rgb(" + r + ", " + g + ", " + b + ")";
        }
    }
    function createResults() {
        let array = []

        for (let i = 0; i < list.length; i++) {
            let s = [...sublist[i]]
            //@ts-ignore

            let result = s.length > 0 ? new Array(Math.ceil(s.length / n)).fill().map(_ => s.splice(0, n)) : []
            array.push(result)
        }
        //@ts-ignore
        setResult(array)
    }
    useEffect(() => {
        createBouncevalues()
        createResults()
    }, []);
    //@ts-ignore
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            dispatch(setIndex(undefined))
        });

        return unsubscribe;
    }, [navigation]);
    const [scroll, setScroll] = useState(true)


    function _changeSearchData(text: string, index: number) {
        setSearch(text)
        // this.setState({ searchvalue: text }); changetext
        let data = [...sublist[index]]
        let l = data.filter((i: any) => i.title.toLowerCase().includes(text.toLowerCase()))

        //@ts-ignore
        let res = l.length > 0 ? new Array(Math.ceil(l.length / n)).fill().map(_ => l.splice(0, n)) : []

        let a = [...results]
        //@ts-ignore
        a[index] = res
        setResult(a)

        // setTimeout(() => {
        //     setResult([...a])
        // }, 3000);
        // this.props.onchangeSearchData(data.filter((i:any)=>i.pa.toLowerCase().includes(text.toLowerCase())))

    }
    const renderFullScreen = () => {

        //@ts-ignore
        if (elem == null || ind == undefined) { return }

        return <View
            style={{ width: "100%", height: "100%", borderTopLeftRadius: 50, borderTopRightRadius: 50, alignItems: "center", }}
        >

            <LinearGradient
                //@ts-ignore
                colors={[elem?.color_one, elem.color_two]}
                useAngle={true}
                angle={186.33}
                style={{ backgroundColor: "#FFAD40", width: "100%", height: "100%", borderTopLeftRadius: 50, borderTopRightRadius: 50, alignItems: "center" }}
            >
                <View style={{ backgroundColor: "#D2D2D2", height: 4, width: 108, borderRadius: 30, marginTop: 15 }}>
                </View>
                <View style={{ position: "absolute", left: 0, top: 0 }}>
                    <Network />
                </View>
                <View style={{ position: "absolute", top: 27, left: 17 }}>
                    <Image
                        //@ts-ignore

                        source={{ uri: elem.image }} style={{ height: calcHeight(150), width: calcWidth(150), resizeMode: "cover" }} />
                </View>
                <View style={{ position: "absolute", top: calcHeight(55), right: 10 }}>

                    <Text style={{ color: "white", fontSize: 18, fontWeight: "bold", width: calcWidth(97) }}>{
                        //@ts-ignore

                        elem.title}</Text>
                    <Text style={{ color: "white", fontSize: 12, fontWeight: 'bold', marginLeft: calcWidth(8), width: calcWidth(150) }}>{
                        //@ts-ignore

                        elem.description}</Text>

                </View>
                <View style={{ marginTop: calcHeight(120), alignItems: "flex-end", width: "90%", height: calcHeight(30) }}>

                    {!visible2 ?
                        // <TouchableOpacity style={{ height: 50, width: 50 }} onPress={() => { setVisible2(true) }}>
                        <TouchableOpacity
                            onPress={() => { setVisible2(true) }}
                            style={{
                                //@ts-ignore

                                height: calcHeight(25), width: calcWidth(24), borderRadius: 14, backgroundColor: hexToRGB(elem.color_one, 0.8), alignItems: "center", justifyContent: "center"
                            }}>
                            <Search1 />
                        </TouchableOpacity>
                        // </TouchableOpacity>
                        : null}
                    {visible2 ? <View style={{ flexDirection: "row", width: calcWidth(200) }}>
                        <View style={[styles.textinput, { height: calcHeight(30) }]}>
                            <TextInput
                                value={search}
                                onChangeText={(text) => {
                                    //@ts-ignore

                                    _changeSearchData(text, ind)

                                    //@ts-ignore
                                    // ind==i&&filter(ind,text)

                                }}
                                style={{ paddingVertical: 0 }}
                            />
                            {/* <SearchInput
                                onChangeText={(text) => {
                                    setSearch(text)

                                    //@ts-ignore
                                    // ind==i&&filter(ind,text)

                                }}
                                style={{ paddingVertical: 0 }}
                            /> */}
                        </View>
                        <TouchableOpacity
                            onPress={() => { setVisible2(false) }}
                            style={{ marginLeft: calcWidth(10), height: 50, width: 50 }}>
                            <Image source={x} />
                        </TouchableOpacity>
                    </View> : null}
                </View>
                <View style={{ marginTop: calcHeight(140) }}>
                    <Carousel
                        // ref={(c) => { this._carousel = c; }}
                        onSnapToItem={(index) => setActiveIndex(index)}
                        layout="default"
                        //@ts-ignore
                        data={results[ind]}
                        //@ts-ignore
                        renderItem={_renderItem}
                        sliderWidth={400}
                        itemWidth={400}
                        inactiveSlideScale={1}
                        inactiveSlideOpacity={1}
                        inactiveSlideShift={0.7}

                    //    loopClonesPerSide={80}
                    />
                </View>
                {pagination()}
                {/* <Content list={results[ind]} /> */}
            </LinearGradient>
        </View>
    }
    function renderMiniScreen(elem: any) {
        return <TouchableWithoutFeedback
            onPress={() => { setScroll(true) }}
            style={{ flex: 1, borderTopLeftRadius: 50, borderTopRightRadius: 50, alignItems: "center", backgroundColor: "blue" }}
        >
            <LinearGradient colors={[elem.color_one, elem.color_two]}
                useAngle={true}
                angle={186.33}
                style={{ backgroundColor: "#FFAD40", width: "100%", height: "100%", borderTopLeftRadius: 50, borderTopRightRadius: 50, alignItems: "center" }}
            >
                <View style={{ backgroundColor: "#D2D2D2", height: 4, width: 108, borderRadius: 30, marginTop: 15 }}>
                </View>
                <View style={{ position: "absolute", left: 0, top: 0 }}>
                    <Network />
                </View>
                <View style={{ position: "absolute", top: 27, left: 17 }}>
                    <Image source={{ uri: elem.image }} style={{ height: calcHeight(150), width: calcWidth(150), resizeMode: "cover" }} />
                </View>
                <View style={{ position: "absolute", top: calcHeight(55), right: 10 }}>

                    <Text style={{ color: "white", fontSize: 18, fontWeight: "bold", width: calcWidth(97) }}>{elem.title}</Text>
                    <Text style={{ color: "white", fontSize: 12, fontWeight: 'bold', marginLeft: calcWidth(8), width: calcWidth(150) }}>{elem.description}</Text>
                    <View style={{ marginTop: calcHeight(30), alignItems: "flex-end", width: "80%" }}>
                        <TouchableOpacity style={{ height: calcHeight(25), width: calcWidth(24), borderRadius: 14, backgroundColor: hexToRGB(elem.color_one, 0.8), alignItems: "center", justifyContent: "center" }}>
                            <Search1 />
                        </TouchableOpacity>

                    </View>
                </View>

            </LinearGradient>
        </TouchableWithoutFeedback>
    }


    function _toggleSubview(status: boolean) {

        let toValue = status ? Dimensions.get("window").height : 0
        for (let j = 0; j < list.length - 1; j++) {
            Animated.timing(bounceValues[j], {
                toValue: toValue,
                duration: 2000,
                useNativeDriver: true
            }).start();
        }
    };
    let height = list.length * 260 + 80
    let [scrollView, setScrollView] = useState(null);
    function handleScroll(event: Object) {
        //@ts-ignore
        setY(Math.round(event.nativeEvent.contentOffset.y))
    }
    let a: Array<any> = [null]
    function createRefs(i: number, ref: any) {
        let k: Array<any> = [...a, ref]
        a = k
    }
    useEffect(() => {
        //@ts-ignore

        a.length === list.length ? setSwipeUpDownRefs(a) : null
        if (swipeUpDownRefs !== null && swipeUpDownRefs.length > 0 && !check) {
            setCheck(true)
            for (let i = 1; i < swipeUpDownRefs.length; i++) {
                //@ts-ignore
                swipeUpDownRefs[i].showMini()
            }
        }
    }, [a])
    const pagination = () => {

        // const { entries, activeSlide } = this.state;
        return (
            <View style={{ position: "absolute", top: Dimensions.get("window").height - calcHeight(210) }}>
                <Pagination
                    //@ts-ignore
                    dotsLength={results[ind].length}
                    activeDotIndex={activeIndex}
                    containerStyle={{ backgroundColor: 'breen' }}
                    dotStyle={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        //marginHorizontal: 2,
                        backgroundColor: '#B96819'
                    }}
                    inactiveDotStyle={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        // marginHorizontal: 2,
                        backgroundColor: '#FFFFFF'
                        // Define styles for inactive dots here
                    }}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                />
            </View>
        );
    }
    //@ts-ignore
    function _renderItem({ item, index }) {
        return (
            <View
                style={{ alignItems: "center" }}
                key={index + 'deep_level_1' + Math.random()}

            >
                {
                    //@ts-ignore
                    item.length > 0 && item.map((elem, index_level_2) => {
                        return <TouchableOpacity
                            key={index_level_2 + 'deep_level_2' + Math.random()}

                            onPress={() => { navigation.navigate("OrderScreen", { stock: false, id: elem.id, image: elem.image }) }}
                            style={{ width: calcWidth(300), marginHorizontal: calcWidth(37), height: calcHeight(65), backgroundColor: "white", marginBottom: calcHeight(35), borderRadius: 50 }}>
                            <View style={{ flexDirection: "row", marginLeft: calcWidth(36), marginRight: calcWidth(28), alignItems: "center", justifyContent: "space-between", height: "100%" }}>
                                <Image source={{ uri: elem.image }} style={{ height: calcHeight(49), width: calcWidth(47), }} />
                                <Text style={{ color: "#212121", fontSize: 12, width: calcWidth(170) }} numberOfLines={1}>{elem.title}</Text>
                            </View>
                        </TouchableOpacity>
                    })}
            </View>
        )
    }

    return (
        <View
            style={styles.screen}>
            <HeaderPage back={false} />

            { list.length > 0 && bounceValues.length > 0 ? <>
                <ScrollView
                    ref={(ref) => {
                        //@ts-ignore
                        setScrollView(ref)
                    }}
                    onScroll={handleScroll}
                    style={{ marginTop: calcHeight(25), }}
                    contentOffset={{ x: 0, y: 0 }}
                    contentContainerStyle={{ height: calcHeight(height) }} scrollEnabled={scroll}>
                    <View style={{}}>

                        <View
                            style={{ alignItems: "center", }} >
                            <LinearGradient colors={[list[0].color_one, list[0].color_two,]}
                                useAngle={true}
                                angle={250.49}
                                style={{ width: "100%", height: calcHeight(800), borderTopLeftRadius: 50, borderTopRightRadius: 50, alignItems: "center" }}
                            >
                                <TouchableOpacity style={{ zIndex: 10, height: 50, }} onPress={() => {
                                    setScroll(!status)
                                    SetStatus(!status), bounceValues.length > 0 && _toggleSubview(status), setVisible1(false)
                                    if (status) {
                                        //@ts-ignore

                                        setI(0)
                                    }
                                    else {
                                        _changeSearchData("", 0)
                                        setSearch("")
                                        
                                    }


                                }}>
                                    <View style={{ backgroundColor: "#D2D2D2", height: 4, width: 108, borderRadius: 30, marginTop: 15 }}>
                                    </View>
                                </TouchableOpacity>
                                <View style={{ position: "absolute", left: 0, top: 0 }}>
                                    <Circles />
                                </View>
                                <View style={{ position: "absolute", top: 50, left: 30 }}>
                                    <Image source={{ uri: list[0].image }} style={{ height: calcHeight(200), width: calcWidth(200), resizeMode: "contain" }} />
                                </View>
                                <View style={{ position: "absolute", top: calcHeight(55), right: 10 }}>
                                    <Text style={{ color: "white", fontSize: 18, fontWeight: "bold", width: calcWidth(97) }}>{list[0].title}</Text>
                                    <Text style={{ color: "white", fontSize: 12, fontWeight: 'bold', marginLeft: calcWidth(8), width: calcWidth(150) }}>{list[0].description}</Text>

                                </View>
                                <View style={{ marginTop: calcHeight(80), alignItems: "flex-end", justifyContent: "space-between", width: "80%", height: calcHeight(40) }}>

                                    {!visible1 ?
                                        <TouchableOpacity
                                            onPress={() => { !status ? setVisible1(true) : null }}
                                            style={{ height: calcHeight(25), width: calcWidth(24), borderRadius: 14, backgroundColor: hexToRGB(list[0].color_one, 0.8), alignItems: "center", justifyContent: "center" }}>
                                            <Search1 />
                                        </TouchableOpacity>
                                        : null}
                                    {visible1 ? <View style={{ flexDirection: "row" }}>
                                        <View style={styles.textinput}>
                                            <TextInput
                                                value={search}
                                                onChangeText={(text) => {
                                                    _changeSearchData(text, 0)

                                                    //@ts-ignore
                                                    // ind==i&&filter(ind,text)

                                                }}
                                                style={{ paddingVertical: 0 }}
                                            />
                                            {/* <SearchInput
                                            onChangeText={(text)=>{setSearch(text)}}
                                            style={{ paddingVertical: 0 }} /> */}
                                        </View>
                                        <TouchableOpacity
                                            onPress={() => { setVisible1(false) }}
                                            style={{ marginLeft: calcWidth(10), }}>
                                            <Image source={x} />
                                        </TouchableOpacity>
                                    </View> : null}
                                </View>
                                <View style={{ marginTop: calcHeight(140) }}>
                                    <Carousel
                                        // ref={(c) => { this._carousel = c; }}
                                        onSnapToItem={(index) => setActiveIndex(index)}
                                        layout="default"
                                        data={results[0]}
                                        //@ts-ignore
                                        renderItem={_renderItem}
                                        sliderWidth={400}
                                        itemWidth={400}
                                        inactiveSlideScale={1}
                                        inactiveSlideOpacity={1}
                                        inactiveSlideShift={0.7}

                                    //    loopClonesPerSide={80}
                                    />
                                </View>
                                {pagination()}
                                {/* <View style={{ height: calcHeight(320), marginTop: calcHeight(140) }}>
                                    <Swiper
                                    index={0}
                                            ref={(ref) => {swiper = ref}}
                                            onIndexChanged={()=>{console.log("*********************");
                                            swiper!==null &&swiper.scrollTo(1,true)

                                            }}
                                        dotColor="white"
                                        activeDotColor="#B96819"
                                        style={{ paddingBottom: 0, alignItems: "center", justifyContent: "center" }}
                                    >
                                        {//@ts-ignore
                                        
                                        //@ts-ignore

                                            results[0].map((e,index) => {
                                                //@ts-ignore
                                                return (
                                                <View
                                                key = {index+'deep_level_1'+Math.random()}

                                                >
                                          {      e.length>0&& e.map((elem,index_level_2) => {
                                                    return <TouchableOpacity
                                                    key = {index_level_2+'deep_level_2'+Math.random()}

                                                        onPress={() => { navigation.navigate("OrderScreen", { stock: false, id: elem.id, image: elem.image }) }}
                                                        style={{ width: calcWidth(300), marginHorizontal: calcWidth(37), height: calcHeight(65), backgroundColor: "white", marginBottom: calcHeight(35), borderRadius: 50 }}>
                                                        <View style={{ flexDirection: "row", marginLeft: calcWidth(36), marginRight: calcWidth(28), alignItems: "center", justifyContent: "space-between", height: "100%" }}>
                                                            <Image source={{ uri: elem.image }} style={{ height: calcHeight(49), width: calcWidth(47), }} />
                                                            <Text style={{ color: "#212121", fontSize: 12, width: calcWidth(170) }} numberOfLines={1}>{elem.title}</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                })}
                                                </View>)
                                            })
                                        }
                                    </Swiper>
                                </View> */}
                            </LinearGradient>
                        </View>

                        {

                            list.map((elem, i) => {

                                return i !== 0 && bounceValues.length > 0 &&
                                    <SwipeUpDown
                                        style={{ transform: [{ translateY: bounceValues[i] }] }}
                                        swipeHeight={calcHeight(330)}
                                        top={calcHeight(260 * i)}
                                        //@ts-ignore
                                        hasRef={(ref: any) => { ref !== null && createRefs(i, ref) }}
                                        itemMini={renderMiniScreen(elem)}
                                        scroll={scroll}
                                        up={calcHeight(-260 * i)}
                                        down={calcHeight(260 * i)}
                                        itemFull={
                                            // <FullItem
                                            // index={i}
                                            // elem={elem}
                                            // visible2={visible2}
                                            // setVisible2={(bool:boolean)=>{setVisible2(bool)}}
                                            // setSearch={(text:string)=>{setSearch(text)}}
                                            // results={results[i]}
                                            // setResult={(text:string,index:number)=>{
                                            //     let data=[...sublist[index]]
                                            //     let l= data.filter((i:any)=>i.title.toLowerCase().includes(text.toLowerCase()))

                                            //     //@ts-ignore
                                            //     let res = l.length > 0 ? new Array(Math.ceil(l.length / n)).fill().map(_ => l.splice(0, n)) : []
                                            //     console.log(res,"resssssssssssssssssssssssssss");

                                            //     let a=[...results]
                                            //     //@ts-ignore
                                            //     a[index]=res
                                            //     console.log(a,"aaaaaaaaaaaaaaaaaa");

                                            //     setResult(a)
                                            // }}
                                            // />
                                            renderFullScreen()
                                        }
                                        onShowMini={() => {
                                            setVisible2(false)
                                            setScroll(true)
                                            setSearch("")
                                            createResults()
                                            for (let el = 1; el < list.length; el++) {
                                                el !== i && Animated.timing(bounceValues[el], {
                                                    toValue: 0,
                                                    duration: 800,
                                                    useNativeDriver: true
                                                }).start()
                                            }
                                        }
                                        }
                                        onShowFull={() => {

                                            setElem(elem)
                                            //@ts-ignore
                                            setI(i)
                                            //    dispatch(setResults(results[i]))
                                            // filter(i)
                                            for (let el = i + 1; el < list.length; el++) {
                                                el !== i && Animated.timing(bounceValues[el], {
                                                    toValue: Dimensions.get("window").height,
                                                    duration: 800,
                                                    useNativeDriver: true
                                                }).start()
                                            }
                                            if (scrollView != null) {
                                                //@ts-ignore
                                                scrollView.scrollTo({ x: 0, y: 0, animated: true });
                                                setScroll(false)
                                            }

                                            setScroll(false)
                                        }}
                                        disablePressToShow={false}
                                        animation={'linear'}
                                        handleTouch={(e: boolean) => {

                                            // setScroll(e)
                                        }}
                                    />
                            })
                        }
                        {/* <SwipeUpDown
                            style={{ transform: [{ translateY: bounceValues[0] }] }}
                            swipeHeight={calcHeight(320)}
                            top={calcHeight(260 + y)}
                            hasRef={(ref: any) => (swipeUpDownRef = ref)}
                            itemMini={renderMiniScreen()}
                            up={calcHeight(-260)}
                            down={calcHeight(260)}
                            itemFull={renderFullScreen()}
                            onShowMini={() => {
                                Animated.timing(bounceValue1, {
                                    toValue: 0,
                                    duration: 800,
                                    useNativeDriver: true
                                }).start()
                                Animated.timing(bounceValue2, {
                                    toValue: 0,
                                    duration: 800,
                                    useNativeDriver: true
                                }).start()
                            }
                            }
                            onShowFull={() => {
                                //@ts-ignore
                                if (scrollView != null) {
                                    //@ts-ignore
                                    scrollView.scrollTo(0);
                                }


                                Animated.timing(bounceValue1, {
                                    toValue: Dimensions.get("window").height,
                                    duration: 1000,
                                    useNativeDriver: true
                                }).start()
                                Animated.timing(bounceValue2, {
                                    toValue: Dimensions.get("window").height,
                                    duration: 1000,
                                    useNativeDriver: true
                                }).start()
                                setScroll(false)
                            }}
                            disablePressToShow={false}
                            animation={'linear'}
                            handleTouch={(e: boolean) => {
                                setScroll(e)
                            }}
                        />
                        <SwipeUpDown
                            swipeHeight={calcHeight(320)}
                            top={calcHeight(520 + y)}
                            hasRef={(ref: any) => (swipeUpDownRef = ref)}
                            itemMini={rednderSecondMini()}
                            up={calcHeight(-520)}
                            down={calcHeight(520)}
                            itemFull={rednderSecondFull()}
                            disablePressToShow={true}
                            style={{ transform: [{ translateY: bounceValue1 }] }}
                            onShowMini={() => {
                                Animated.timing(bounceValue2, {
                                    toValue: 0,
                                    duration: 800,
                                    useNativeDriver: true
                                }).start()

                            }}
                            onShowFull={() => {
                                setScroll(false)
                                //@ts-ignore
                                if (scrollView != null) {
                                    //@ts-ignore
                                    scrollView.scrollTo(0);
                                }
                                Animated.timing(bounceValue2, {
                                    toValue: Dimensions.get("window").height,
                                    duration: 1000,
                                    useNativeDriver: true
                                }).start()
                            }}

                            animation={'linear'}
                            handleTouch={(e: boolean) => {
                                setScroll(e)
                            }}
                        />
                        <SwipeUpDown
                            swipeHeight={calcHeight(320)}
                            top={calcHeight(780 + y)}
                            style={{ transform: [{ translateY: bounceValue2 }] }}
                            hasRef={(ref: any) => (swipeUpDownRef2 = ref)}
                            itemMini={renderMiniScreen()}
                            up={calcHeight(-780)}
                            down={calcHeight(780)}
                            itemFull={renderFullScreen()}
                            disablePressToShow={false}
                            animation={'linear'}
                            onShowFull={() => {
                                //@ts-ignore
                                if (scrollView != null) {
                                    //@ts-ignore
                                    scrollView.scrollTo(0);
                                }
                                setScroll(false)

                            }}
                            handleTouch={(e: boolean) => {
                                setScroll(e)
                            }}
                        />
                        <SwipeUpDown
                            swipeHeight={calcHeight(320)}
                            top={calcHeight(1040 + y)}
                            style={{ transform: [{ translateY: bounceValue3 }] }}
                            hasRef={(ref: any) => (swipeUpDownRef3 = ref)}
                            itemMini={rednderSecondMini()}
                            up={calcHeight(-1040)}
                            down={calcHeight(1040)}
                            itemFull={rednderSecondFull()}
                            disablePressToShow={false}
                            animation={'linear'}
                            onShowFull={() => {
                                //@ts-ignore
                                if (scrollView != null) {
                                    //@ts-ignore
                                    scrollView.scrollTo(0);
                                }
                                setScroll(false)

                            }}
                            handleTouch={(e: boolean) => {
                                setScroll(e)
                            }}
                        /> */}


                    </View>
                </ScrollView>
            </> : <ActivityIndicator size="large" color="#FFAD40" />

            }
        </View>
    );
};

export default MenuScreen;
