import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Button, Keyboard } from 'react-native';
import { useDispatch, useSelector, } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import { calcFontSize, calcHeight, calcWidth } from "../../utils/demensios"

import { loginSelector, userInfoSelector } from '../../store/selector/loginSelector';
import { spareSelector } from '../../store/selector/spareselector'
import { useTranslation } from 'react-i18next';
import { getPopularSubCategory, setOpen } from '../../store/actions/mainActions';
import AsyncStorage from '@react-native-community/async-storage';

//import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
    navigation: NavigationScreenProp<any, any>;
}

const styles = StyleSheet.create({
    screen: { flex: 1,justifyContent:'space-between',backgroundColor:'white' },
    middle: { marginLeft: calcWidth(17), marginRight: calcWidth(36), marginTop: calcHeight(26) },
    back:{ marginTop: calcHeight(24), marginLeft: calcWidth(24) },
    plus:{marginTop:calcHeight(57),marginBottom:calcHeight(8)},
    text:{color:'#7C7C7C',fontSize:14,fontWeight:'bold',lineHeight:19},
    footer:{alignItems:'center',marginBottom:calcHeight(69)},
    heading1: { color: '#7C7C7C', fontSize: 14, fontWeight: 'bold', lineHeight: 19 ,marginTop: calcHeight(7),},
    name: { fontSize: 18, fontWeight: 'bold', color: '#24A322', marginTop: calcHeight(5), marginLeft: calcWidth(9), },
    count: { fontSize: 24,
        marginLeft:calcWidth(18),
        paddingVertical:-calcHeight(15),
         fontWeight: 'bold',
          color: '#212121',
    borderBottomColor: 'rgba(33, 33, 33, 0.5)',
    //backgroundColor:'red',
    borderBottomWidth:0.5
     //textDecorationLine: 'underline', textDecorationColor: 'rgba(33, 33, 33, 0.5)'
     },
     headingView: { marginHorizontal: calcWidth(15), marginTop: calcHeight(51.4), marginBottom: calcHeight(10),flexDirection:'row',justifyContent:'space-between' },
     heading: { color: '#7C7C7C', fontSize: 14, fontWeight: 'bold', lineHeight: 19 },
     cont: {
        marginHorizontal: calcWidth(10), height: calcHeight(135), backgroundColor: '#EFF0F8', borderRadius: 10, justifyContent: 'flex-start', alignItems: 'flex-start',
       
        //textAlignVertical: "top" 
    },
text1: { fontSize: 12, color: '#212121', marginLeft: calcWidth(20), marginBottom: calcHeight(13), width: '90.7%', },



});

const Welcome: React.FunctionComponent<Props> = ({ navigation }) => {

    const {first_name}=useSelector(userInfoSelector)  
    useEffect(() => {
        setTimeout(() => {
            AsyncStorage.setItem('isopen', JSON.stringify(2))
            dispatch(setOpen(2))
		}, 2000)

      },[]);

    const dispatch = useDispatch()
    const { t } = useTranslation();
      const welcome=t('welcome')
    return (
        <ScrollView contentContainerStyle={styles.screen}>
           
        </ScrollView>
    );
};

export default Welcome;
