import React, { useEffect, useMemo, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch, useSelector, } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity, Image, NativeModules } from 'react-native';
import SignupScreen from './sign-in/SignupScreen';
import { DefaultTheme, NavigationContainer, } from '@react-navigation/native';
import { loginSelector } from '../store/selector/loginSelector'

import AsyncStorage from '@react-native-community/async-storage';
// import { getData } from "../store/sagas/loginSaga"
import { Platform, } from 'react-native';

import HomeNavigator from './HomeNavigator';
import { isOpenSelector } from '../store/selector/mainSelector';
import SignIn from './SignIn';
import About from './About';
import { getMe, getUnseenMessageCount, getUnseenNotificationCount, setLanguage, setOpen } from '../store/actions/mainActions';
import Loading from './Loading';
import { setMasteriumApiAuthorizationHeader } from '../services/api/authInstance';
import { setOrderList } from '../store/actions/orderAction';
import i18n from '../locale/i18n';

//import {useNavigation} from '@react-navigation/native';


//let isopen:boolean;
const ScreensNavigator: React.FunctionComponent = (pops) => {
  const dispatch = useDispatch();
  const user = useSelector(loginSelector)
  const open = useSelector(isOpenSelector)
  const [visable,setVisable]=useState(false)
  const getLanguage = AsyncStorage.getItem('language').then((getLanguage) => {
      
    if (getLanguage) {
      
      i18n.changeLanguage(JSON.parse(getLanguage))
      if(JSON.parse(getLanguage)=="ru"){
        dispatch(setLanguage(0))
        

      }
      else if(JSON.parse(getLanguage)=="en"){

        dispatch(setLanguage(1))

      }
      else{

        dispatch(setLanguage(2))

      }
    }
    else {
    
   
      const deviceLanguage = NativeModules.I18nManager.localeIdentifier
      
      if (deviceLanguage == 'ru_RU') {
        dispatch(setLanguage(0))
        i18n.changeLanguage('ru')
  
      }
      else if(deviceLanguage == 'ge_GE'){
        dispatch(setLanguage(2))

        i18n.changeLanguage('ge')
  
      }
      else {
        dispatch(setLanguage(1))

        i18n.changeLanguage('en')
  
      }
    }
  });

  useEffect(() => {

    const getIsOpen = AsyncStorage.getItem('isopen').then((a) => {
      
      
        //@ts-ignore
    dispatch(setOpen(a!==null?a:0))
    
     //@ts-ignore
    if(a==2){
      const token = AsyncStorage.getItem('token').then((t) => {
       //@ts-ignore
       setMasteriumApiAuthorizationHeader(JSON.parse(t))
       dispatch(getMe())
       setVisable(true)
      });
    }else{
      setVisable(true)
    }
      
   
    });
    const getOrders = AsyncStorage.getItem('orders').then((orders) => {
     if(orders!==null){
       
        dispatch(setOrderList(JSON.parse(orders)))
     }
    });
  },[]);

  // const navigation=useMemo(()=>{

  //   return  (<Stack.Navigator initialRouteName={!open? "SignIn":"SignIn"}
  //   headerMode="screen"
  // >
  //   <Stack.Screen
  //     name="SignIn"
  //     component={SignIn}
  //     options={{ headerShown: false }}
  //   />
  //   <Stack.Screen
  //     name="About"
  //     component={About}
  //     options={{ headerShown: false }}
  //   />
  //   <Stack.Screen
  //     name="HomeNavigator"
  //     component={HomeNavigator}
  //     options={{ headerShown: false }}
  //   />
  // </Stack.Navigator>)
  // },[open])


   return !visable?<Loading />:( open==0?<About />:(open==1? <SignIn />:null))
   //!visable?<Loading />:( open==0?<About />:(open==1? <SignIn />:<HomeNavigator  />))
};

export default ScreensNavigator;
