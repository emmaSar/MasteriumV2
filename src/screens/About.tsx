import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch, useSelector, } from 'react-redux';
import { loginSelector } from '../store/selector/loginSelector'
import { isOpenSelector } from '../store/selector/mainSelector';
import AboutUs from './about/AboutUs';

//import {useNavigation} from '@react-navigation/native';

const Stack = createStackNavigator();


//let isopen:boolean;
const About: React.FC= () => {
  const dispatch = useDispatch();
  const user = useSelector(loginSelector)
  const open=useSelector(isOpenSelector)
  
  return (

    <Stack.Navigator initialRouteName={"StepOne"} 
   
   // headerMode="screen"
    >
      <Stack.Screen
        name="AboutUs"
        component={AboutUs}
        options={{ headerShown: false }}
      />
   

 
    </Stack.Navigator>
  )
};

export default About;
