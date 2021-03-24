import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch, useSelector, } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import SignupScreen from './sign-in/SignupScreen';
import { DefaultTheme, NavigationContainer, } from '@react-navigation/native';
import { loginSelector } from '../store/selector/loginSelector'

import { Platform, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BottomNavigator from './BottomNavigator';
import LocationWorks from './drawers/LocationWork';
import { orderListSelector } from '../store/selector/orderSelector';


//import {useNavigation} from '@react-navigation/native';

const Stack = createStackNavigator();
const os = Platform.OS


//let isopen:boolean;
const HomeNavigator: React.FunctionComponent = (pops) => {

const order=useSelector(orderListSelector)
    return (

        <Stack.Navigator initialRouteName={"BottomNavigator"}

            //headerMode="screen"
        >
            <Stack.Screen
                name="BottomNavigator"
                component={BottomNavigator}
                options={{ headerShown: false }}
            />
             <Stack.Screen
                name="LocationWorks"
                component={LocationWorks}
                options={{ headerShown: false }}
            />
            {/* <Stack.Screen
                name="AdoptedOrders"
                component={AdoptedOrders}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="UpcomingOrders"
                component={UpcomingOrders}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="HistoryOrders"
                component={HistoryOrders}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SpareBoard"
                component={SpareBoard}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Calendar"
                component={Calendar}
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
                name="Success"
                component={Success}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="MyMasters"
                component={MyMasters}
                options={{ headerShown: false }}
            />
            {/* <Stack.Screen
                name="MyMasters"
                component={MyMasters}
                options={{ headerShown: false }}
            /> */}
            {/* <Stack.Screen
                name="LocationWorks"
                component={LocationWorks}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="AddStreet"
                component={AddStreet}
                options={{ headerShown: false }}
            /> */} 
            {/* <Stack.Screen
                name="Notifications"
                component={Notifications}
                options={{ headerShown: false }}
            /> */}
            {/* <Stack.Screen
                name="Notifications"
                component={Notifications}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ConditionUse"
                component={ConditionUse}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Language"
                component={Language}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Chat"
                component={Chat}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Messages"
                component={Messages}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Production"
                component={Production}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="CalendarScreen"
                component={CalendarScreen}
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
            /> */}
            {/* <Stack.Screen
                name="TimelineCalendarScreen"
                component={TimelineCalendarScreen}
                options={{ headerShown: false }}
            /> */}
            {/* <Stack.Screen
                name="TimelineCalendarScreen"
                component={TimelineCalendarScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Help"
                component={Help}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="OrderScreen"
                component={OrderScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="DateAndTime"
                component={DateAndTime}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="TimePicker"
                component={TimePicker}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SuccessCreateOrder"
                component={SuccessCreateOrder}
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
                name="Stocks"
                component={Stocks}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Invited"
                component={Invited}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="AddBasket"
                component={AddBasket}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Request"
                component={Request}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SuccessRequest"
                component={SuccessRequest}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SettingsScreen"
                component={SettingsScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Allorders"
                component={Allorders}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="HistoryOfInvitations"
                component={HistoryOfInvitations}
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
                name="NewTelephone"
                component={NewTelephone}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Verification"
                component={Verification}
                options={{ headerShown: false }}
            /> */}


        </Stack.Navigator>
    )
};

export default HomeNavigator;
