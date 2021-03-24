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
import NextButton from "../assets/icons/buttonNext.svg"
import { TouchableOpacity } from 'react-native-gesture-handler';
//import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
    heading: string,
    text:string

}

const styles = StyleSheet.create({
    heading:{color:"#1A1726",fontSize:26,fontWeight:"bold",fontStyle:"normal"},
    text:{color:"#1A1726",fontSize:16,fontWeight:"normal",fontStyle:"normal",width:calcWidth(343),lineHeight:24}
});

const Content: React.FunctionComponent<Props> = (props) => {
    const navigation = useNavigation()
    const { t } = useTranslation();
  
    return (
        <View style={{alignItems:"center",marginTop:calcHeight(90) }}>
            <Text style={styles.heading}>{props.heading}</Text>
            <Text style={styles.text}>{props.text}</Text>
        </View>
    );
};

export default Content;
