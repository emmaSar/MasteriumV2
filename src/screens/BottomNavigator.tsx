import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Text, Image, Dimensions, Keyboard } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useDispatch, useSelector } from 'react-redux';
//@ts-ignore
import Menu from "../assets/icons/menu1.svg"
//@ts-ignore
import Bag from "../assets/icons/bag.svg"
//@ts-ignore
import Home from "../assets/icons/home.svg"
//@ts-ignore
import Basket from "../assets/icons/basket.svg"
//@ts-ignore
import Plus from "../assets/icons/pluss.svg"
import AnimatedTabBar, { TabsConfigsType } from 'curved-bottom-navigation-bar'
import FirstNavigator from './FirstNatigator';
import BasketNavigator from './BasketNavigator';
import Navigator from './Navigator';
import MenuNavigator from './MenuNavigator';
import { View } from 'native-base';
import { calcFontSize, calcHeight, calcWidth } from '../utils/demensios';
import MainNavigator from './MainNavigator';
import { orderListSelector } from '../store/selector/orderSelector';
import Count from '../components/Count';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { getUnseenMessageCount, setIndex } from '../store/actions/mainActions';


interface Props { }

const Tab = createBottomTabNavigator();

const tabs: TabsConfigsType = {
  MainNavigator: {
    icon: ({ progress }) => <Home fill="#D3D3D3" />
  },
  MenuNavigator: {
    icon: ({ progress }) => <Menu fill="#D3D3D3" />
  },
  FirstNavigator: {
    icon: ({ progress }) => <Plus fill="#D3D3D3" />

  },
  Navigator: {
    icon: ({ progress }) =>
      < >
        <Basket fill={"#D3D3D3"} />
         <Count />
          
         
      </>
  },
  BasketNavigator: {
    icon: ({ progress }) => <Bag fill="#D3D3D3" />
  },

}

const BottomNavigator: React.FunctionComponent<Props> = () => {
  const [inspect, setInspect] = useState(false)
 const dispatch=useDispatch()
  function show() {
    setInspect(true)
  }
  function hide() {
    setInspect(false)
  }
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', show)
    Keyboard.addListener('keyboardDidHide', hide)
  }, [])
  const [count,setCount]=useState(0)
 useEffect(() => {

        setTimeout(()=>{
          setCount(count+1)
            dispatch(getUnseenMessageCount())
          },10000)
    
    
    
      },[count]);
  return (
    <Tab.Navigator
      tabBar={(props: any) =>
        <View style={{ position: "absolute", bottom:!inspect? 0:-100  }}>
          
          <AnimatedTabBar barColor={'white'} tabs={tabs} barHeight={75} {...props}   />

        </View>
        //  <BottomTabBar {...props}   />
      }

      tabBarOptions={{
        keyboardHidesTabBar: true,
        tabStyle: { backgroundColor: "red" }
      }}
    >
      <Tab.Screen name="MainNavigator" component={MainNavigator}  />
      <Tab.Screen name="MenuNavigator" component={MenuNavigator} />
      <Tab.Screen name="FirstNavigator" component={FirstNavigator} />
      <Tab.Screen name="Navigator" component={Navigator} />
      <Tab.Screen name="BasketNavigator" component={BasketNavigator} />

      {/*
       <Tab.Screen name="AdoptedOrders" component={AdoptedOrders} />
      <Tab.Screen name="SpareBoard" component={SpareBoard} />
      <Tab.Screen name="Calendar" component={HomeScreen} />

      <Tab.Screen name="Production" component={Production} />
      <Tab.Screen name="CalendarScreen" component={CalendarScreen} />
      <Tab.Screen name="TimelineCalendarScreen" component={TimelineCalendarScreen} />
      <Tab.Screen name="Stocks" component={Stocks} />
      <Tab.Screen name="SuccessRequest" component={SuccessRequest} />
 */}

    </Tab.Navigator>
  );
};

export default BottomNavigator;