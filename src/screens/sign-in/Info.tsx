import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView, Image, Alert, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector, } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import { calcFontSize, calcHeight, calcWidth } from "../../utils/demensios"
import Header from '../../components/Header'
import Footer from '../../components/Footer';
import { loginSelector } from '../../store/selector/loginSelector';
//@ts-ignore
import SimpleButton from '../../components/SimpleButton';
import { useTranslation } from 'react-i18next';
import { setName } from '../../store/actions/loginActions';
//@ts-ignore
import Check from "../../assets/icons/oCheck.svg"
import { languageSelector, typesSelector } from '../../store/selector/mainSelector';
import Popup from '../../components/Popup';
import { chooseLanguageIndex } from '../../utils/config';

//import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
    navigation: NavigationScreenProp<any, any>;
}

const styles = StyleSheet.create({
    screen: { backgroundColor: "white", flex: 1 },
    middle: { alignItems: 'center', marginTop: '2.3%', },
    back: { marginTop: calcHeight(23), marginLeft: calcWidth(24) },
    cont: { flexDirection: 'row', marginTop: calcWidth(46), marginBottom: "5.7%" },
    phone: { width: calcWidth(52), borderBottomColor: '#FFAD40', borderBottomWidth: 1, flexDirection: 'row', height: calcHeight(45), alignItems: "center", paddingTop: calcHeight(10) },
    callphone: { color: '#242424', fontSize: 12, },
    number: { borderBottomColor: '#FFAD40', borderBottomWidth: 1, marginLeft: calcWidth(15), height: calcHeight(45), flexDirection: 'row', justifyContent: "space-between", alignItems: "center" },
    inputMask: { paddingVertical: 0, paddingTop: calcHeight(10), fontSize: 12, color: '#242424', height: calcHeight(45), },
    text: { color: '#4F8CDF', fontSize: 11, fontWeight: '300', textDecorationLine: 'underline', paddingTop: calcHeight(10), paddingLeft: calcWidth(16) },
    list: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', },
    input: { marginBottom: calcHeight(-11), fontSize: 15, textAlign: 'center', paddingTop: 0 },
    error: { color: 'red', fontSize: 11, fontStyle: 'normal', fontWeight: 'bold', marginBottom: calcHeight(25), marginTop: calcHeight(16), width: calcWidth(186), textAlign: "center", lineHeight: 15 },
    footer: { position: "absolute", bottom: 0 }
});

const Info: React.FunctionComponent<Props> = ({ navigation }) => {

    const [errorName, setErrorName] = useState(false)
    const [errorMail, setErrorMail] = useState(false)
    const [errorSurname, setErrorSurname] = useState(false)
    const [errorCompName, setErrorCompName] = useState(false)
    const [errorID, setErrorID] = useState(false)
    const [firstName, setfirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [mail, setMail] = useState('')
    const [compName, setCompName] = useState('')
    const [id, setId] = useState('')
    const [visible, setVisible] = useState(false)
    const { t } = useTranslation();
    const heading = t("whatisyourname");
    const continuee = t("continue")
    const types = useSelector(typesSelector)
    let items: Array<any>
    items = []
    for (let i = 0; i < types.length; i++) {
        items = [...items, { label: types[i].value, value: types[i].id }]
    }
    const languageIndex=chooseLanguageIndex()

    const dispatch = useDispatch()
    const [type, setType] = useState(items[0].value)
    function validate(text: string) {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            return false;
        }
        else {
            return true
        }
    }
    function _handleInspect() {

        if ((status == 0 && firstName.length < 2) && (status == 0 && lastName.length < 2)) {
            setErrorName(true)
            setErrorSurname(true)
        }
        else if ((status == 1 && compName.length < 2) && (status == 1 && id.length < 2)) {
            setErrorCompName(true)
            setErrorID(true)

        }
        else if ((status == 0 && firstName.length < 2) && (status == 0 && lastName.length > 2)) {
            setErrorName(true)
            setErrorSurname(false)
        }
        else if ((status == 0 && firstName.length > 2) && (status == 0 && lastName.length < 2)) {
            setErrorName(false)
            setErrorSurname(true)
        }
        else if ((status == 1 && compName.length < 2) && (status == 1 && id.length > 2)) {
            setErrorCompName(true)
            setErrorID(false)

        }
        else if ((status == 1 && compName.length > 2) && (status == 1 && id.length < 2)) {
            setErrorCompName(false)
            setErrorID(true)

        }
        else if ((status == 0 && (firstName.length < 2))) {
            setErrorName(true)
        }
        else if (status == 0 && lastName.length < 2) {
            setErrorSurname(true)
        }
        else if(status==0 && mail.length>0 && !validate(mail)){
            setErrorMail(true)
        }
        else if (status == 1 && compName.length < 2) {
            setErrorCompName(true)
        }
        else if (status == 1 && id.length < 2) {
            setErrorID(true)
        }
        else {
            setErrorName(false)
            setErrorSurname(false)
            setErrorCompName(false)
            setErrorID(false)

            if (status == 0) {
                let is_cooperative_user = status ? true : false
                dispatch(setName({ first_name: firstName, last_name: lastName, is_cooperative_user: is_cooperative_user, company_name: null, company_type: null, company_id: null, email: mail }))
                navigation.navigate("Place")
            }
            else {
                navigation.navigate('InfoTwo', { name: compName, type: type, id: id })
            }
        }
    }
    let array = [
        {
            title: "Физ. лицо"
        },
        {
            title: "Юр. лицо"
        },

    ]
    const [status, Setstatus] = useState(0)
    function _onPress(i: number) {
        Setstatus(i)
    }
    //@ts-ignore
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setVisible(false)
        });
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);

    return (
        <View style={styles.screen}>
            <ScrollView>
                <View style={{ marginTop: '6.3%' }}>
                    <Header
                        text={heading}
                        back={true}
                    />
                </View>
                <View style={styles.middle}>
                    <View >
                        {status == 0 ? <View style={{ width: calcWidth(215), alignItems: "center", height: calcHeight(150) }}>
                            <TextInput
                                value={firstName}
                                onChangeText={(text) => { setfirstName(text) }}
                                placeholder={t("name")}
                                style={{ width: "100%", borderBottomColor: !errorName ? "#FFAD40" : "red", borderBottomWidth: 1, paddingBottom: -5, paddingLeft: calcWidth(17), height: calcHeight(30) }}
                            />
                            <TextInput
                                placeholder={t('surname')}
                                value={lastName}
                                onChangeText={(text) => { setlastName(text) }}
                                style={{ width: "100%", borderBottomColor: !errorSurname ? "#FFAD40" : "red", borderBottomWidth: 1, paddingTop: 0, paddingBottom: -5, paddingLeft: calcWidth(17), height: calcHeight(30) }}
                            />

                            <TextInput
                                value={mail}
                                onChangeText={(text) => { setMail(text) }}
                                placeholder={t('mail')}
                                style={{ width: "100%", borderBottomColor:!errorMail?  "#FFAD40":"red", borderBottomWidth: 1, paddingBottom: -5, paddingLeft: calcWidth(17), height: calcHeight(30) }}
                            />
                            <View style={{ alignItems: "flex-start", width: calcWidth(215) }}>
                                <Text style={{ color: "#242424", fontSize: calcFontSize(12), marginTop: calcHeight(5), textAlign: "left" }}>({t('notNecessary')})</Text>
                            </View>
                        </View> :
                            <View style={{ width: calcWidth(215), alignItems: "center", height: calcHeight(150) }}>
                                <TextInput
                                    placeholder={t("compName")}
                                    value={compName}
                                    onChangeText={(text) => { setCompName(text) }}
                                    style={{ width: "100%", borderBottomColor: !errorCompName ? "#FFAD40" : "red", borderBottomWidth: 1, paddingBottom: -5, paddingLeft: calcWidth(17.5), height: calcHeight(30) }}
                                />
                                <Popup
                                    items={items}
                                    check={true}
                                    onSelect={(id: number) => { setType(id) }}
                                    visible={visible}
                                    setVisibile={(value: boolean) => { setVisible(value) }}
                                />
                                <TextInput
                                    value={id}
                                    onChangeText={(text) => { setId(text) }}
                                    placeholder={t("idComp") }
                                    style={{ width: "100%", borderBottomColor: !errorID ? "#FFAD40" : "red", borderBottomWidth: 1, paddingBottom: -5, paddingLeft: calcWidth(17.5), height: calcHeight(30) }}
                                />


                            </View>
                        }
                    </View>
                    <View style={{ marginTop: calcHeight(10), flexDirection: "row", paddingHorizontal: 65, justifyContent: "space-between", width: "100%" }}>
                        {
                            array.map((elem, i) => {
                                return <TouchableOpacity
                                    key={i}
                                    onPress={() => {
                                        _onPress(i), setErrorName(false)
                                        setErrorSurname(false)
                                        setErrorCompName(false)
                                        setErrorID(false)
                                    }}
                                    style={{ flexDirection: "row", alignItems: "center" }}>
                                    {status == i ? <Check /> : <View style={{ borderColor: "#212121", borderWidth: 0.5, width: calcWidth(27), height: calcHeight(28), borderRadius: 14 }}>
                                    </View>}
                                    <Text style={{ color: "rgba(36, 36, 36, 0.96)", fontSize: calcFontSize(13), fontWeight: "300", marginLeft: 10 }}>{elem.title}</Text>

                                </TouchableOpacity>
                            })
                        }
                    </View>
                    <View style={{ marginTop: '5%' }}>
                        <SimpleButton
                            text={continuee}
                            onPress={() => {
                                _handleInspect()
                            }}
                        />
                    </View>
                </View>

            </ScrollView>
            <Footer />

        </View>
    );
};

export default Info;
