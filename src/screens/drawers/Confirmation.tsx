import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView, Image, Alert, SafeAreaView, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector, } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import { calcFontSize, calcHeight, calcWidth } from "../../utils/demensios"
import { loginSelector, userInfoSelector } from '../../store/selector/loginSelector';
//@ts-ignore
import SimpleButton from '../../components/SimpleButton';
import HeaderPage from '../../components/HeaderPage';
import { useTranslation } from 'react-i18next';
import { cartSelector, errorSelector, loadingSelector } from '../../store/selector/mainSelector';
//@ts-ignore
import Georgia from "../../assets/icons/georgia.svg"
import OtpInputs from 'react-native-otp-inputs';
import { checkCode, setLoading } from '../../store/actions/mainActions';
import Modal from 'react-native-modal';
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
    inputMask:{paddingVertical:0, paddingTop: calcHeight(10), fontSize: 12, color: '#242424',  },
    text:{ color: '#FFAD40', fontSize: 11, fontWeight: '300', textDecorationLine: 'underline', paddingTop: calcHeight(10), paddingLeft: calcWidth(16) },
    list:{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center',  },
    input:{ marginBottom: calcHeight(-11), fontSize: 15, textAlign: 'center',paddingTop:0 },
    error:{ color: 'red', fontSize: 11, fontStyle: 'normal', fontWeight: 'bold',marginBottom:calcHeight(25),marginTop:calcHeight(16),width:calcWidth(186),textAlign:"center",lineHeight:15 },
    footer:{ marginTop:calcHeight(270)},
    buttontext: { color: "#E36958", fontSize: calcFontSize(9), fontWeight: 'bold', textDecorationLine: 'underline', position: 'absolute', right: 0 },
    cellRoot: {
        width: calcWidth(27),
        height: calcHeight(30),
        borderBottomWidth: 1,
        marginHorizontal: calcWidth(5),
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 0,

        paddingLeft: 8
    },
});

const Confirmation: React.FunctionComponent<Props> = ({ navigation }) => {

    const { t } = useTranslation();
    const loading=useSelector(loadingSelector)
    const errorMessage=useSelector(errorSelector)
    const [error, setError] = useState('')
    const [value, setValue] = useState('');
    const info=useSelector(userInfoSelector)
    const verificationmessage=t("verificationmessage")
    const dispatch = useDispatch()
    const [check,setCheck]=useState(false)
    const verificationerror = t("verificationerror")

    const handleChange = (code: string) => {
        setValue(code)
    };
    useEffect(()=>{
        if(check && !loading && !errorMessage){
            navigation.navigate('Success')
        }
        else if(errorMessage){
            setError(verificationerror)
        }
    }
    ,[loading,check,errorMessage])

    return (
        <View style={styles.screen}>
                <Modal
                isVisible={loading}
                backdropColor="rgba(153, 153, 153,0.5)"
                style={{ height: 50, width: 50, position: "absolute", top: "40%", left: "40%" }}
            >
                <ActivityIndicator size="large" color="#FFAD40" />
            </Modal>
               <ScrollView keyboardShouldPersistTaps='handled'

>
            <HeaderPage back={true} text={t("confirmation")} />
    <Text style={{textAlign:"center",color:" rgba(33, 33, 33, 0.5)",fontSize:calcFontSize(11),marginTop:calcHeight(7)}}>{t('confText')}</Text>

    <View style={styles.middle}>
                <View style={styles.cont}>
                    <View style={styles.phone}>
                        <Georgia />
                        <Text style={styles.callphone}> +995</Text>

                    </View>
                    <View style={styles.number}>
                        <Text     style={styles.inputMask}> 
                        {info.phone_number.slice(4, 7)} - {info.phone_number.slice(7, 10)} - {info.phone_number.slice(10, 13)}</Text>

                        <Text style={styles.text}>{verificationmessage}</Text>
                    </View>
                </View>
                <OtpInputs
                        // autoFocus={true}
                        //clearTextOnFocus
                        // value={value}
                        autofillFromClipboard
                        handleChange={handleChange}
                        keyboardType="phone-pad"
                        numberOfInputs={4}
                        //ts-ignore
                        //  ref={() => { otpRef }}
                        style={{ flexDirection: "row", width: 200, alignItems: "center", justifyContent: "center" }}
                        // selectTextOnFocus={true}
                        //@ts-ignore
                        inputStyles={[styles.cellRoot, { borderBottomColor: error.length == 0 ? '#FFAD40' : "red", }]}
                    />
                           {error.length !== 0 ? <Text style={styles.error}>{error}</Text> : null}

                <View style={styles.footer}>
                <SimpleButton
                    text={t('done')}
                    big={true}
                    onPress={() => {
                        if(value.length==4){
                            dispatch(checkCode({code:value}))
                            dispatch(setLoading(true))
                            setCheck(true)
                        }
                        else{
                            setError(verificationerror)
                        }
                       
                      //  navigation.navigate('Success')
                    }}
                />
            </View>
           
            </View>
            </ScrollView>
        </View>
    );
};

export default Confirmation;
