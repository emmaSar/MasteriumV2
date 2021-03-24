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
import { useNavigation } from '@react-navigation/native';

//import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
    navigation: NavigationScreenProp<any, any>;
}

const styles = StyleSheet.create({
    screen: { backgroundColor: "white", flex: 1 },
    middle: { alignItems: 'center', marginTop: '5.3%', },
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

const InfoTwo: React.FunctionComponent<Props> = (route) => {

    const navigation=useNavigation()
    const [errorName, setErrorName] = useState(false)
    const [errorSurname, setErrorSurname] = useState(false)
    const [firstName, setfirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [mail, setMail] = useState('')
    const { t } = useTranslation();
    const heading = t("whatisyourname");
    const continuee = t("continue")
    const dispatch = useDispatch()
    function _handleInspect() {
        if (firstName.length < 2 && lastName.length < 2) {
            setErrorName(true)
            setErrorSurname(true)
        }
       else  if (firstName.length > 2 && lastName.length < 2) {
            setErrorName(false)
            setErrorSurname(true)
        }
        else  if (firstName.length < 2 && lastName.length > 2) {
            setErrorName(true)
            setErrorSurname(false)
        }
        else {
            setErrorName(false)
            setErrorSurname(false)
            //@ts-ignore
            dispatch(setName({ first_name: firstName, last_name: lastName ,is_cooperative_user:true,company_name:route.route.params.name,company_type:route.route.params.type,company_id:route.route.params.id,email:mail}))
            navigation.navigate("Place")
        }
    }

  
    return (
        <View style={styles.screen}>
            <View style={{ marginTop: '6.3%' }}>
                <Header
                    text={heading}
                    back={true}
                />
            </View>
            <View style={styles.middle}>

                <View style={{ width: calcWidth(215), alignItems: "center", height: calcHeight(150) }}>
                    <TextInput
                        placeholder={t('name')}
                        value={firstName}
                        onChangeText={(text) => { setfirstName(text) }}
                        style={{ width: "100%", borderBottomColor: !errorName ? "#FFAD40" : "red", borderBottomWidth: 1, paddingTop: 0, paddingBottom: -5 ,paddingLeft:calcWidth(18)}}
                    />

                    <TextInput
                        value={lastName}
                        onChangeText={(text) => { setlastName(text) }}
                        placeholder={t('surname')}
                        style={{ width: "100%", borderBottomColor: !errorSurname ? "#FFAD40" : "red", borderBottomWidth: 1, paddingBottom: -5 ,paddingLeft:calcWidth(18)}}
                    />
                    <TextInput
                        value={mail}
                        onChangeText={(text) => { setMail(text) }}
                        placeholder={t("mail")}
                        style={{ width: "100%", borderBottomColor: "#FFAD40" , borderBottomWidth: 1, paddingBottom: -5,paddingLeft:calcWidth(18)}}
                    />
                                            <View style={{ alignItems: "flex-start", width: calcWidth(215) }}>

                    <Text style={{ color: "#242424", fontSize: calcFontSize(12), marginTop: calcHeight(5), textAlign: "left" }}>({t('notNecessary')})</Text>

</View>
                </View>


                <View style={{ marginTop: '12%' }}>
                    <SimpleButton
                        text={continuee}
                        onPress={() => {
                            _handleInspect()
                            //   
                        }}
                    />
                </View>
            </View>


            <Footer />

        </View>
    );
};

export default InfoTwo;
