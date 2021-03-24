import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView, Image, Alert, SafeAreaView } from 'react-native';
import { useDispatch, useSelector, } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import { calcFontSize, calcHeight, calcWidth } from "../../utils/demensios"
import Header from '../../components/Header'
import Footer from '../../components/Footer';
import { loginSelector } from '../../store/selector/loginSelector';
import { spareSelector } from '../../store/selector/spareselector';
import { addSpare } from "../../store/actions/spareActions"
//@ts-ignore
import TextInputMask from 'react-native-text-input-mask';
//@ts-ignore
import SimpleButton from '../../components/SimpleButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import HeaderPage from '../../components/HeaderPage';
import { useTranslation } from 'react-i18next';
import { cartSelector } from '../../store/selector/mainSelector';
//@ts-ignore
import Check from "../../assets/icons/check1.svg"




//import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
    navigation: NavigationScreenProp<any, any>;
}

const styles = StyleSheet.create({
    screen: { backgroundColor: 'rgba(255, 255, 255, 0.6)', flex: 1 },
    middle: {  marginTop:calcHeight(70),alignItems:"center" },
    back: { marginTop: calcHeight(23), marginLeft: calcWidth(24) },
    plus: { marginTop: calcHeight(57), marginBottom: calcHeight(8) },
    heading1: { color: '#7C7C7C', fontSize: 14, fontWeight: 'bold', lineHeight: 19, marginTop: calcHeight(7), },
    itemBlock: {
        backgroundColor: "#EEF4F6",
        flexDirection: "row",
        borderRadius: 50, height: calcHeight(38),
        width: calcWidth(355),
        marginHorizontal: calcWidth(10), alignItems: "center",
        marginTop: calcHeight(38),
    },
    block: { marginHorizontal: calcWidth(30), flexDirection: "row", alignItems: 'center' },
    textinput: { color: "rgba(33, 33, 33, 0.5)", fontSize: calcFontSize(14), fontWeight: 'bold' },
    cont:{ flexDirection: 'row', marginBottom: "5.7%"},
    phone:{ width: calcWidth(52), borderBottomColor: '#FFAD40', borderBottomWidth: 1, flexDirection: 'row', height:calcHeight(45),alignItems:"center",paddingTop:calcHeight(10) },
    callphone:{ color: '#242424', fontSize: 12, },
    number:{ borderBottomColor: '#FFAD40', borderBottomWidth: 1, marginLeft: calcWidth(15), height: calcHeight(45),  flexDirection: 'row',justifyContent:"space-between",alignItems:"center" },
    inputMask:{paddingVertical:0, paddingTop: calcHeight(10), fontSize: 12, color: '#242424', height: calcHeight(45), },
    text:{ color: '#FFAD40', fontSize: 11, fontWeight: '300', textDecorationLine: 'underline', paddingTop: calcHeight(10), paddingLeft: calcWidth(16) },
    list:{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center',  },
    input:{ marginBottom: calcHeight(-11), fontSize: 15, textAlign: 'center',paddingTop:0 },
    error:{ color: 'red', fontSize: 11, fontStyle: 'normal', fontWeight: 'bold',marginBottom:calcHeight(25),marginTop:calcHeight(16),width:calcWidth(186),textAlign:"center",lineHeight:15 },
    footer:{ marginTop:calcHeight(270)},
    buttontext: { color: "#E36958", fontSize: calcFontSize(9), fontWeight: 'bold', textDecorationLine: 'underline', position: 'absolute', right: 0 }
});

const Success: React.FunctionComponent<Props> = ({ navigation }) => {

    const plus = require('../../assets/icons/plus.png')
    const carts = useSelector(cartSelector)
    const [value, setValue] = useState("7204 **** **** 3845")
    const [visible, setVisible] = useState(false)
    const { t } = useTranslation();
    const line = require('../../assets/icons/line.png')
    const back = require('../../assets/icons/back.png')
    const georgia = require('../../assets/icons/georgia.png')

    const list = [1, 2, 3, 4]
    const [error, setError] = useState('')
    const [listValues, setValues] = useState(['', '', '', ''])
    const [callingCode, setcallingCode] = useState()
    const [cca2, setcca2] = useState()
    const login = useSelector(loginSelector)
    const heading=t("verificationHeading");
    const continuee=t("continue")
    const verificationmessage=t("verificationmessage")
    const verificationerror=t("verificationerror")
    const dispatch = useDispatch()
    const inputRefs = [
        React.createRef(),
        React.createRef(),
        React.createRef(),
        React.createRef(),
        React.createRef(),
        React.createRef(),
    ]
    function _goNextAfterEdit(index: number) {
        //@ts-ignore
        inputRefs[index + 1].focus()

    }
  
    function onChangeText(text: string, index: number) {
        let a = [...listValues];
        a[index] = text;
        setValues(a)
    }
    useEffect(() => {

    });

  

    let cart = React.createRef();

    return (
        <View style={styles.screen}>
            <HeaderPage back={true}  />
            <View style={{alignItems:"center",marginTop:calcHeight(95.6)}}>
               
        <Check />
        <Text style={{color:"#212121",fontSize:calcFontSize(18),fontWeight:"bold",marginTop:calcHeight(37)}}>Ваша карта привязана!</Text>
        <Text 
        onPress={()=>{navigation.navigate("Cart",{add:true})}}
        style={{color:"#FFAD40",fontSize:calcFontSize(18),fontWeight:"bold",marginTop:calcHeight(27),textDecorationLine:'underline'}} 
        >на главную</Text>

        </View>
        </View>
    );
};

export default Success;
