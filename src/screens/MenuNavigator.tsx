import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch, useSelector, } from 'react-redux';
import {View, Text, StyleSheet, TouchableOpacity,Image} from 'react-native';
import SignupScreen from './sign-in/SignupScreen';
import { DefaultTheme, NavigationContainer, } from '@react-navigation/native';
import { loginSelector } from '../store/selector/loginSelector'

import { Platform,  } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Verification from './bottoms/Verification';
import Contract from './sign-in/Contract';
import AboutUS from './about/AboutUs';
import Welcome from './sign-in/Welcome';
import HomeNavigator from './HomeNavigator';
import Info from './sign-in/Info';
import Place from './sign-in/Place';
import { isOpenSelector } from '../store/selector/mainSelector';
import InfoTwo from './sign-in/InfoTwo';
import HomeScreen from './bottoms/HomeScreen';
import Create from './bottoms/Create';
import DateAndTime from './bottoms/DateAndTime';
import TimePicker from './bottoms/TimePicker';
import LocationWorks from './drawers/LocationWork';
import AddStreet from './drawers/AddStreet';
import Allorders from './bottoms/Allorders';
import SuccessCreateOrder from './bottoms/SuccessCreateOrder';
import Orders from './bottoms/Orders';
import OrderItemList from './bottoms/OrderItemList';
import OrderItem from './bottoms/OrderItem';
import RatingScreen from './bottoms/Rating';
import UserPage from './bottoms/UserPage';
import Request from './bottoms/Request';
import Messages from './drawers/Messages';
import MyMasters from './drawers/MyMasters';
import OrdersList from './bottoms/OrderList';
import BasketOrders from './bottoms/BasketOrders';
import AddBasket from './bottoms/AddBasket';
import MenuScreen from './bottoms/MenuScreen';
import OrderScreen from './bottoms/Order';
import Help from './drawers/Help';
import Cart from './drawers/Cart';
import CartInfo from './drawers/CartInfo';
import ConditionUse from './drawers/ConditionUse';
import Notifications from './drawers/Notifications';
import Language from './drawers/Language';
import Invited from './drawers/Invited';
import Chat from './drawers/Chat';
import Confirmation from './drawers/Confirmation';
import Success from './drawers/Success';
import HistoryOfInvitations from './drawers/HistoryOfInvitations';
import Disputes from './drawers/Disputes';
import DisputesOrder from './drawers/DisputesOrder';
import TransactionHistory from './drawers/TransactionHistory';
import SettingsScreen from './drawers/Settings';
import NewTelephone from './bottoms/NewTelephone';

//import {useNavigation} from '@react-navigation/native';

const Stack = createStackNavigator();
const os = Platform.OS


//let isopen:boolean;
const MenuNavigator: React.FunctionComponent = (pops) => {
  const dispatch = useDispatch();
  const user = useSelector(loginSelector)
  const open=useSelector(isOpenSelector)
  
  return (

    <Stack.Navigator 
   
   // headerMode="screen"
    >
      <Stack.Screen
        name="MenuScreen"
        component={MenuScreen}
        options={{ headerShown: false }}
        
      />
       <Stack.Screen
        name="OrderScreen"
        component={OrderScreen}
        options={{ headerShown: false }}
        
      />
         <Stack.Screen
        name="Help"
        component={Help}
        options={{ headerShown: false }}
        
      />
       <Stack.Screen
        name="Cart"
        component={Cart}
        options={{ headerShown: false }}
        
      />
        <Stack.Screen
        name="CartInfo"
        component={CartInfo}
        options={{ headerShown: false }}
        
      />
      <Stack.Screen
        name="MyMasters"
        component={MyMasters}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ConditionUse"
        component={ConditionUse}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{ headerShown: false }}
      />
        <Stack.Screen
        name="Language"
        component={Language}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="Invited"
        component={Invited}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="Chat"
        component={Chat}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="Confirmation"
        component={Confirmation}
        options={{ headerShown: false }}
      />
        <Stack.Screen
        name="Success"
        component={Success}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="Messages"
        component={Messages}
        options={{ headerShown: false }}
      />
        
       <Stack.Screen
        name="HistoryOfInvitations"
        component={HistoryOfInvitations}
        options={{ headerShown: false }}
      />
         <Stack.Screen
        name="LocationWorks"
        component={LocationWorks}
        options={{ headerShown: false }}
      />
        <Stack.Screen
        name="AddStreet"
        component={AddStreet}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="Disputes"
        component={Disputes}
        options={{ headerShown: false }}
      />
        <Stack.Screen
        name="DisputesOrder"
        component={DisputesOrder}
        options={{ headerShown: false }}
      />
         <Stack.Screen
        name="TransactionHistory"
        component={TransactionHistory}
        options={{ headerShown: false }}
      />
         <Stack.Screen
        name="OrderItemList"
        component={OrderItemList}
        options={{ headerShown: false }}
      />
        <Stack.Screen
        name="Orders"
        component={Orders}
        options={{ headerShown: false }}
      />
     <Stack.Screen 
        name="OrderItem"
        component={OrderItem}
        options={{ headerShown: false }}
      />
         <Stack.Screen 
        name="RatingScreen"
        component={RatingScreen}
        options={{ headerShown: false }}
      />
        <Stack.Screen 
        name="UserPage"
        component={UserPage}
        options={{ headerShown: false }}
      />
       <Stack.Screen 
        name="Request"
        component={Request}
        options={{ headerShown: false }}
      />
        <Stack.Screen 
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="NewTelephone"
        component={NewTelephone}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Verification"
        component={Verification}
        options={{ headerShown: false }}
      />
 
    </Stack.Navigator>
  )
};

export default MenuNavigator;
