import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView, Image, Alert, SafeAreaView, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector, } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import { calcFontSize, calcHeight, calcWidth } from "../../utils/demensios"
//@ts-ignore
import SimpleButton from '../../components/SimpleButton';
import HeaderPage from '../../components/HeaderPage';
import { useTranslation } from 'react-i18next';
//@ts-ignore
import CartBackground from "../../assets/icons/cartBackground.svg"
//@ts-ignore
import Mir from "../../assets/icons/mir.svg"
//@ts-ignore
import Visa from "../../assets/icons/visa.svg"
//@ts-ignore
import Payment from "../../assets/icons/payment.svg"
import { addCreditCard, setLoading } from '../../store/actions/mainActions';
import { userInfoSelector } from '../../store/selector/loginSelector';
import Modal from 'react-native-modal';
import { loadingSelector } from '../../store/selector/mainSelector';


interface Props {
    navigation: NavigationScreenProp<any, any>;
}

const styles = StyleSheet.create({
    screen: { backgroundColor: 'rgba(255, 255, 255, 0.6)', flex: 1 },
    middle: { marginLeft: calcWidth(17), marginRight: calcWidth(36), marginTop: calcHeight(26) },
    back: { marginTop: calcHeight(23), marginLeft: calcWidth(24) },
    plus: { marginTop: calcHeight(57), marginBottom: calcHeight(8) },
    footer: { alignItems: 'center', marginBottom: calcHeight(69), justifyContent: "flex-end", marginTop: calcHeight(190) },
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
    text: { color: "rgba(33, 33, 33, 0.5)", fontSize: calcFontSize(14), fontWeight: 'bold' },
    textinput: { color: "rgba(33, 33, 33, 0.5)", fontSize: calcFontSize(14), fontWeight: 'bold' },
    buttontext: { color: "#E36958", fontSize: calcFontSize(9), fontWeight: 'bold', textDecorationLine: 'underline', position: 'absolute', right: 0 }
});

const CartInfo: React.FunctionComponent<Props> = ({ navigation }) => {
    const loading=useSelector(loadingSelector)
    const info=useSelector(userInfoSelector)
    const [error, setError] = useState(false)
    const [check, setCheck] = useState(false)
    const [cardNumber, setCardNumber] = useState('')
    const [month, setMonth] = useState('')
    const [year, setYear] = useState('')
    const [cvc, setCvc] = useState('')
    const dispatch=useDispatch()
    const { t } = useTranslation();
    function checkMonth(){
        
        const months=['01','02','03','04','05','06','07','08','09','10','11','12',]
        for(let i=0;i<months.length;i++){
            if(months[i]==month){    
                return true
            }
        }
        return false
    }
    useEffect(()=>{
        if(check&& !loading){
            navigation.navigate('Confirmation')
        }
    }
    ,[loading,check])
    function _Check(){
        
        if(cardNumber.length==16 && month.length==2 && year.length==2 && cvc.length==3 && checkMonth()){            
            dispatch(setLoading(true))
            dispatch(addCreditCard({user:info.user,number:cardNumber,month:parseInt(month),year:parseInt(year),cvc:cvc}))
            setCheck(true)
            setError(false)
        }
        else{
            setError(true)
        }
    }
    return (
        <View style={styles.screen}>
              <Modal
                isVisible={loading}
                backdropColor="rgba(153, 153, 153,0.5)"
                style={{ height: 50, width: 50, position: "absolute", top: "40%", left: "40%" }}
            >
                <ActivityIndicator size="large" color="#FFAD40" />
            </Modal>
            <HeaderPage back={true} text={t("entercard")} />
            <ScrollView>
            <View style={{ alignItems: "center", height: calcHeight(220), marginTop: calcHeight(51) }}>
                <CartBackground />
                <View style={{ position: "absolute", top: calcHeight(40), right: calcWidth(170) }}>
                    <Mir />
                </View>
                <View style={{ position: "absolute", top: calcHeight(40), right: calcWidth(109) }}>
                    <Visa />
                </View>
                <View style={{ position: "absolute", top: calcHeight(23), right: calcWidth(40) }}>
                    <Payment />
                </View>
                <View style={{ position: "absolute", top: calcHeight(88), right: calcWidth(40) }}>
                    <TextInput
                    value={cardNumber}
                    onChangeText={(text)=>{setCardNumber(text)}}
                        keyboardType={"numeric"}
                        maxLength={16}
                        style={{ height: calcHeight(40), width: calcWidth(287), backgroundColor: "white", borderRadius: 5,paddingVertical:0 }}
                        placeholder={"Номер карты"}
                        placeholderTextColor={"#808285"}
                    />
                </View>
                <View style={{ position: "absolute", top: calcHeight(151), left: calcWidth(47) }}>
                    <TextInput
                        keyboardType={"numeric"}
                        value={month}
                    onChangeText={(text)=>{setMonth(text)}}
                        maxLength={2}
                        style={{ height: calcHeight(40), width: calcWidth(74), backgroundColor: "white", borderRadius: 5, paddingHorizontal: calcWidth(14),paddingVertical:0 }}
                        placeholder={"Месяц"}
                        placeholderTextColor={"#808285"}
                    />
                </View>
                <View style={{ position: "absolute", top: calcHeight(158), left: calcWidth(130) }}>
                    <Text style={{ color: "white", fontSize: calcFontSize(15) }}>/</Text>
                </View>
                <View style={{ position: "absolute", top: calcHeight(151), left: calcWidth(148) }}>
                    <TextInput
                        keyboardType={"numeric"}
                        value={year}
                    onChangeText={(text)=>{setYear(text)}}
                        style={{ height: calcHeight(40), width: calcWidth(72), backgroundColor: "white", borderRadius: 5, paddingHorizontal: calcWidth(19),paddingVertical:0 }}
                        placeholder={"Год"}
                        maxLength={2}
                        placeholderTextColor={"#808285"}
                    />
                </View>
                <View style={{ position: "absolute", top: calcHeight(151), right: calcWidth(40) }}>
                    <TextInput
                    value={cvc}
                    onChangeText={(text)=>{setCvc(text)}}
                        keyboardType={"numeric"}
                        style={{ height: calcHeight(40), width: calcWidth(72), backgroundColor: "white", borderRadius: 5, paddingHorizontal: calcWidth(19) }}
                        placeholder={"CVC"}
                        maxLength={3}
                        placeholderTextColor={"#808285"}
                    />
                </View>
            </View>
            {error ?<Text style={{color:"red",textAlign:"center",fontSize:calcFontSize(18)}}>заполненные неверные данные</Text>:null}
            <View style={styles.footer}>
                <SimpleButton
                    text={t('tether')}
                    big={true}
                    onPress={() => {
                        _Check()
                    }}
                />
            </View>
            </ScrollView>
        </View>
    );
};

export default CartInfo;
