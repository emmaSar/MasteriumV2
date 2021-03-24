import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch, useSelector, } from 'react-redux';
import {View, Text, StyleSheet, TouchableOpacity,Image} from 'react-native';
import SignupScreen from './sign-in/SignupScreen';
import { DefaultTheme, NavigationContainer, } from '@react-navigation/native';
import { loginSelector } from '../store/selector/loginSelector'

import { Platform,  } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Verification from './sign-in/Verification';
import Contract from './sign-in/Contract';
import AboutUS from './about/AboutUs';
import Welcome from './sign-in/Welcome';
import HomeNavigator from './HomeNavigator';
import Info from './sign-in/Info';
import Place from './sign-in/Place';
import { isOpenSelector } from '../store/selector/mainSelector';
import InfoTwo from './sign-in/InfoTwo';

//import {useNavigation} from '@react-navigation/native';

const Stack = createStackNavigator();
const os = Platform.OS


//let isopen:boolean;
const SignIn: React.FunctionComponent = (pops) => {
  const dispatch = useDispatch();
  const user = useSelector(loginSelector)
  const open=useSelector(isOpenSelector)
  
  return (

    <Stack.Navigator initialRouteName={"SignupScreen"} 
   
    headerMode="screen"
    >
      <Stack.Screen
        name="SignupScreen"
        component={SignupScreen}
        options={{ headerShown: false }}
      />

   <Stack.Screen
        name="Verification"
        component={Verification}
        options={{ headerShown: false }}
      />
      {/*      <Stack.Screen
        name="Info"
        component={Info}
        options={{ headerShown: false }}
      />
           <Stack.Screen
        name="InfoTwo"
        component={InfoTwo}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="Place"
        component={Place}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="Contract"
        component={Contract}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      /> */}
 
    </Stack.Navigator>
  )
};

export default SignIn;
