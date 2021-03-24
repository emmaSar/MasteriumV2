import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView, Image, Alert, SafeAreaView } from 'react-native';
import { useDispatch, useSelector, } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import { calcFontSize, calcHeight, calcWidth } from "../../utils/demensios"
import Header from '../../components/Header'
import Footer from '../../components/Footer';
import { loginSelector } from '../../store/selector/loginSelector';
import { spareSelector } from '../../store/selector/spareselector';
import {addSpare} from "../../store/actions/spareActions"
//@ts-ignore
import TextInputMask from 'react-native-text-input-mask';
//@ts-ignore
import SimpleButton from '../../components/SimpleButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import HeaderPage from '../../components/HeaderPage';
import { useTranslation } from 'react-i18next';

//import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
    navigation: NavigationScreenProp<any, any>;
}

const styles = StyleSheet.create({
    screen: { backgroundColor:'rgba(255, 255, 255, 0.6)',flex:1 },
    middle: { marginLeft: calcWidth(17), marginRight: calcWidth(36), marginTop: calcHeight(26) },
    back:{ marginTop: calcHeight(23), marginLeft: calcWidth(24) },
    plus:{marginTop:calcHeight(57),marginBottom:calcHeight(8)},
    text:{color:'#7C7C7C',fontSize:14,fontWeight:'bold',lineHeight:19},
    footer:{alignItems:'center',marginBottom:calcHeight(69),justifyContent:"flex-end",marginTop:calcHeight(416)},
    heading1: { color: '#7C7C7C', fontSize: 14, fontWeight: 'bold', lineHeight: 19 ,marginTop: calcHeight(7),},
    item:{backgroundColor:"#EEF4F6",
    borderRadius:50,height:calcHeight(80),
    width:calcWidth(375),
   flexDirection:"row",alignItems:"center",
    marginBottom:calcHeight(16),},
    key:{color:"#7C7C7C",fontSize:calcFontSize(14),fontWeight:'bold',marginLeft:calcWidth(24)}

});

const Production: React.FunctionComponent<Props> = ({ navigation }) => {

    const back = require('../../assets/icons/back.png')
    const plus = require('../../assets/icons/plus.png')
    const spare=useSelector(spareSelector)
    const [value,setValue]=useState("7204 **** **** 3845")
    const [error,setError]=useState(false)
    const [visible,setVisible]=useState(false)
    const list =[
        {
            key:"Всего заработано:",
            value:"53 000 р",
        },
        {
            key:"Задолженность к компании:",
            value:"10 000 р",
        },
        {
            key:"Премии и поощрения:",
            value:"560 р",
        },
        {
            key:"Штрафы:",
            value:"250 р",
        },
        
    ]
  
    const { t } = useTranslation();

    return ( 
        <View style={styles.screen}>
            <HeaderPage back={false} text={t('production')} />
            <ScrollView style={{marginTop:calcHeight(38)}}>
            {
                list.map((el,i)=>{
                    return  <View
                    key={i}
                    style={styles.item}>
                        <Text style={styles.key}>{el.key}</Text>
                        <Text  style={{color:i==0 ||i==2? "#24A322":i==1?"#FFAD40":"#FF5252",fontSize:calcFontSize(13),fontWeight:'bold',}} >  {el.value}</Text>

                    </View> 
                })
            }
              </ScrollView>
        </View>
    );
};

export default Production;
