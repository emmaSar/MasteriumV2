import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView, Image, Alert, SafeAreaView, } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { useTranslation } from 'react-i18next';

import { useNavigation } from '@react-navigation/native';
import { calcHeight, calcWidth } from '../utils/demensios';
//@ts-ignore
import Circle from "../assets/icons/smallCircle.svg"
//@ts-ignore
import Rectangular from "../assets/icons/rectangular.svg"
//@ts-ignore
import Logo from "../assets/icons/logo.svg"
//@ts-ignore
import Back from "../assets/icons/back.svg"
import { TouchableOpacity } from 'react-native-gesture-handler';
//import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
    back:boolean,
    text:string,
    heading:string

}

const styles = StyleSheet.create({
    heading:{color:"#1A1726",fontSize:26,fontWeight:"bold",fontStyle:"normal"},
    text:{color:"#1A1726",fontSize:16,fontWeight:"normal",fontStyle:"normal",marginTop:calcHeight(10),textAlign:"center",lineHeight:24}
});

const HeaderLogin: React.FunctionComponent<Props> = (props) => {
    const navigation = useNavigation()
    const { t } = useTranslation();
  
    return (
        <View style={{paddingHorizontal:calcWidth(16),marginTop:calcHeight(40)}}>
            {props.back?
            <View style={{position:"absolute",left:20}}>
                <Back />
                </View>   
                :null 
        }
          
            <View style={{alignItems:"center",width:"100%"}}>
            <Logo />
            <Text style={styles.heading}>{props.heading}</Text>
            <Text style={styles.text}>{props.text}</Text>
            </View>
        </View>
    );
};

export default HeaderLogin;
