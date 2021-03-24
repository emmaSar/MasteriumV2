import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView, Image, Alert, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import { useDispatch, useSelector, } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import { calcFontSize, calcHeight, calcWidth } from "../../utils/demensios"

import { infoSelector, loginSelector, userInfoSelector } from '../../store/selector/loginSelector';
//@ts-ignore
import SimpleButton from '../../components/simpleButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';
//@ts-ignore
import Georgia from "../../assets/icons/georgia.svg"
//@ts-ignore
import Back from "../../assets/icons/back.svg"
import { loginAction, verification } from '../../store/actions/loginActions';
import OtpInputs from 'react-native-otp-inputs';
import { getPopularSubCategory, setOpen } from '../../store/actions/mainActions';
import AsyncStorage from '@react-native-community/async-storage';
import ProcesModal from '../../components/ProcesModal';
import Modal from "react-native-modal"
import HeaderLogin from '../../components/headerLogin';
import { color } from 'react-native-reanimated';

interface Props {
    navigation: NavigationScreenProp<any, any>;
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: "white" },
    middle: { alignItems: 'center' },
    back: { marginTop: '3%', marginLeft: calcWidth(24) },
    cont: { flexDirection: 'row', marginTop: '8.48%', marginBottom: "5.7%" },
    phone: { width: calcWidth(52), borderBottomColor: '#FFAD40', borderBottomWidth: 1, flexDirection: 'row', height: calcHeight(45), alignItems: "center", paddingTop: calcHeight(10) },
    callphone: { color: '#242424', fontSize: 12, },
    number: { borderBottomColor: '#FFAD40', borderBottomWidth: 1, marginLeft: calcWidth(15), height: calcHeight(45), flexDirection: 'row', justifyContent: "space-between", alignItems: "center" },
    inputMask: { paddingVertical: 0, paddingTop: calcHeight(18), fontSize: 12, color: '#242424', height: calcHeight(45), },
    text: { color: '#4F8CDF', fontSize: 11, fontWeight: '300', textDecorationLine: 'underline', paddingTop: calcHeight(10), paddingLeft: calcWidth(16) },
    list: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', },
    input: { fontSize: 18, textAlign: 'center', paddingTop: 0 },
    error: { color: 'red', fontSize: 11, fontStyle: 'normal', fontWeight: 'bold', marginBottom: calcHeight(25), marginTop: calcHeight(16), width: calcWidth(186), textAlign: "center", lineHeight: 15 },
    footer: { marginTop: '9.1%' },
    root: { flex: 1, padding: 20 },
    title: { textAlign: 'center', fontSize: 30 },
    codeFieldRoot: { marginTop: 20 },
    cell: {
        width: 40,
        height: 40,
        lineHeight: 38,
        fontSize: 24,
        borderWidth: 2,
        borderColor: '#00000030',
        textAlign: 'center',
    },
    focusCell: {
        borderColor: '#000',
    },
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

const Verification: React.FunctionComponent<Props> = ({ navigation }) => {

    const [value, setValue] = useState('');
    const [error, setError] = useState('')
    const login = useSelector(loginSelector)
    const user = useSelector(userInfoSelector)
    const { t } = useTranslation();
    const heading = t("verificationHeading");
    const continuee = t("continue")
    const verificationmessage = t("verificationmessage")
    const verificationerror = t("verificationerror")
    const dispatch = useDispatch()
    const [s, setS] = useState(true);
    const [process, setProcess] = useState(false)
    const [check, setCheck] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleChange = (code: string) => {
        setValue(code)
        setS((s) => !s);
    };
    return (
        <View style={styles.screen}>
            <HeaderLogin back={true} text={t("verificationText") + "   " + login.phone} heading={t("verificationHeading")} />
            <OtpInputs
                // value={value}
                autofillFromClipboard
                handleChange={handleChange}
                keyboardType="phone-pad"
                numberOfInputs={4}
                //ts-ignore
                //  ref={() => { otpRef }}
                style={{ flexDirection: "row", width: calcWidth(298), alignItems: "center", justifyContent: "space-between", marginLeft: calcWidth(39), marginTop: calcHeight(40), marginBottom: calcHeight(30) }}
                // selectTextOnFocus={true}

                //@ts-ignore
                inputStyles={{ height: calcHeight(70), width: calcWidth(60), backgroundColor: "#EAEAFF", borderRadius: 12, justifyContent: "center", alignItems: "center", fontSize: 25, alignContent: "center", paddingLeft: calcWidth(22),color:"#F87711" }}
                //@ts-ignore

                // focusStyles={{ height: calcHeight(72), width: calcWidth(62), borderRadius:12,borderWidth:1,borderColor:"red",backgroundColor:"#F87711",zIndex:50 }}
                
            />
            <Text style={{ color: "#F87711", textDecorationLine: "underline", fontSize: calcFontSize(16), textAlign: "center", fontWeight: "500" }}>Выслать код повторно</Text>

            <View style={{ marginTop: calcHeight(20) }}>
                <SimpleButton active={false} text={t("continue")} onPress={() => {
                }} />

            </View>
        </View>
    );
};

export default Verification;
