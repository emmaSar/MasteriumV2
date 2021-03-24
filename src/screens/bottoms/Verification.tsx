import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView, Image, Alert, SafeAreaView, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector, } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import { calcFontSize, calcHeight, calcWidth } from "../../utils/demensios"
import Header from '../../components/Header'
import Footer from '../../components/Footer';
import { infoSelector, loginSelector, messageSelector, userInfoSelector } from '../../store/selector/loginSelector';
//@ts-ignore
import TextInputMask from 'react-native-text-input-mask';
//@ts-ignore
import SimpleButton from '../../components/SimpleButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';
//@ts-ignore
import Georgia from "../../assets/icons/georgia.svg"
import { changePhone, changePhoneNumber, checkCode, loginAction, setMessage, verification } from '../../store/actions/loginActions';
import HeaderPage from '../../components/HeaderPage';
import OtpInputs from 'react-native-otp-inputs';
import ProcesModal from '../../components/ProcesModal';

import Modal from "react-native-modal"

//import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
    navigation: NavigationScreenProp<any, any>;
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: "rgba(255, 255, 255, 0.6)" },
    middle: { alignItems: 'center' },
    back: { marginTop: '3%', marginLeft: calcWidth(24) },
    cont: { flexDirection: 'row', marginTop: '8.48%', marginBottom: "5.7%" },
    phone: { width: calcWidth(52), borderBottomColor: '#FFAD40', borderBottomWidth: 1, flexDirection: 'row', height: calcHeight(45), alignItems: "center", paddingTop: calcHeight(10) },
    callphone: { color: '#242424', fontSize: 12, },
    number: { borderBottomColor: '#FFAD40', borderBottomWidth: 1, marginLeft: calcWidth(15), height: calcHeight(45), flexDirection: 'row', justifyContent: "space-between", alignItems: "center" },
    inputMask: { paddingVertical: 0, paddingTop: calcHeight(18), fontSize: 12, color: '#242424', height: calcHeight(45), },
    text: { color: '#4F8CDF', fontSize: 11, fontWeight: '300', textDecorationLine: 'underline', paddingTop: calcHeight(10), paddingLeft: calcWidth(16) },
    list: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', },
    input: { marginBottom: calcHeight(-11), fontSize: 15, textAlign: 'center', paddingTop: 0 },
    error: { color: 'red', fontSize: 11, fontStyle: 'normal', fontWeight: 'bold', marginBottom: calcHeight(25), marginTop: calcHeight(16), width: calcWidth(186), textAlign: "center", lineHeight: 15 },
    footer: { marginTop: '9.1%' },
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

    const line = require('../../assets/icons/line.png')
    const back = require('../../assets/icons/back.png')
    const georgia = require('../../assets/icons/georgia.png')
    const [check, setCheck] = useState(false)

    const list = [1, 2, 3, 4]
    const [error, setError] = useState('')
    const [listValues, setValues] = useState(['', '', '', ''])
    const info = useSelector(userInfoSelector)
    const login = useSelector(loginSelector)
    const { phone_number } = useSelector(infoSelector)
    const user = useSelector(userInfoSelector)
    const { t } = useTranslation();
    const heading = t("verificationHeading");
    const continuee = t("continue")
    const verificationmessage = t("verificationmessage")
    const verificationerror = t("verificationerror")
    const [value, setValue] = useState('');
    const [s, setS] = useState(true);
    const [process, setProcess] = useState(false)
    const [loading, setLoading] = useState(false)
    const message = useSelector(messageSelector)
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
    function onPress() {
        if (value.length == 4) {
            setLoading(true)
            setError('')
            dispatch(checkCode({ phone_number: login.phone, code: value }))
        }
        else {
            setError(verificationerror)
        }
    }


    const handleChange = (code: string) => {
        setValue(code)
        setS((s) => !s);
    };
    useEffect(() => {
        if (process) {
            setTimeout(() => {
                setProcess(false)
            }, 2000)
        }
    }, [process])
    useEffect(() => {
        if (message.length > 0) {
            if (message !== "Not found") {
                dispatch(changePhoneNumber(login.phone))
                setError("")
                setLoading(false)
                navigation.navigate('SettingsScreen')
               
                dispatch(setMessage(""))
            }
            else {
                setError(verificationerror)
                setLoading(false)
            }
        }

    }, [message])
    return (
        <View style={styles.screen}>

            <HeaderPage
                text={heading}
                back={true}
            />
            <ScrollView>
                <ProcesModal visiable={process} error={false} />
                <Modal
                    isVisible={loading}
                    backdropColor="rgba(153, 153, 153,0.5)"
                    style={{ height: 50, width: 50, position: "absolute", top: "40%", left: "40%" }}
                >
                    <ActivityIndicator size="large" color="#FFAD40" />
                </Modal>
                <View style={styles.middle}>
                    <View style={styles.cont}>
                        <View style={styles.phone}>
                            <Georgia />
                            <Text style={styles.callphone}> +995</Text>

                        </View>
                        <View style={styles.number}>
                            <Text
                                style={styles.inputMask}>
                                {login.phone.slice(0, 3)}-{login.phone.slice(3, 5)}-{login.phone.slice(5, 7)}-{login.phone.slice(7, 9)}</Text>

                            <Text style={styles.text}
                                onPress={() => {
                                    dispatch(loginAction(login.phone))
                                    setProcess(true)
                                }}
                            >{verificationmessage}</Text>
                        </View>
                    </View>
                    {/* <View style={styles.list}> */}
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
                    {/* {list.map((elem, index) => {
                        return <>
                            <View key={index} style={{ width: calcWidth(27), height: calcHeight(30), borderBottomColor: error.length == 0 ? '#FFAD40' : 'red', borderBottomWidth: 1, justifyContent: 'center', alignItems: 'center' }}>

                                <TextInput
                                    value={listValues[index]}
                                    style={styles.input}
                                    //keyboardType='numeric'
                                    onChange={() => { index <= 2 ? _goNextAfterEdit(index) : null }}
                                    onChangeText={(text) => { onChangeText(text, index) }}
                                    //@ts-ignore
                                    ref={r => inputRefs[index] = r} 
                                    autoFocus={index == 0 ? true : false}
                                    maxLength={1}
                                />
                            </View>
                            {index !== 3 && <Image source={line} style={{ marginHorizontal: calcWidth(3) }} />}
                        </>
                    })} */}
                    {/* </View> */}
                    {error.length !== 0 ? <Text style={styles.error}>{error}</Text> : null}

                </View>
            </ScrollView>

            <View style={{ position: "absolute", top: calcHeight(550), alignItems: "center", width: "100%" }}>
                <SimpleButton
                    text={t('apply')}
                    big={true}
                    onPress={() => {
                        onPress()
                        // navigation.navigate('SettingsScreen')

                    }}
                />
            </View>
        </View>
    );
};

export default Verification;
