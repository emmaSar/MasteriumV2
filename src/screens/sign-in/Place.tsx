import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView, Image, Alert, SafeAreaView } from 'react-native';
import { useDispatch, useSelector, } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import { calcFontSize, calcHeight, calcWidth } from "../../utils/demensios"
import Header from '../../components/Header'
import Footer from '../../components/Footer';
import { loginSelector } from '../../store/selector/loginSelector';
//@ts-ignore
import SimpleButton from '../../components/SimpleButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';
//@ts-ignore
import Back from "../../assets/icons/back.svg"
import { setCity } from '../../store/actions/loginActions';


//import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
    navigation: NavigationScreenProp<any, any>;
}

const styles = StyleSheet.create({
    screen: {  backgroundColor:"white",flex:1 },
    middle: { alignItems: 'center',marginTop:calcHeight(51) },
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
    footer: {  marginTop: '9.6%' }
});

const Place: React.FunctionComponent<Props> = ({ navigation }) => {


    const [city, setcity] = useState('')
    const { t } = useTranslation();
    const heading = t("enteryourcity");
    const continuee = t("continue")
    const dispatch = useDispatch()

    return (
        <ScrollView contentContainerStyle={styles.screen}>
               <TouchableOpacity onPress={() => { navigation.goBack()}}>
                <View style={styles.back} >
                    <Back />
                    </View>
            </TouchableOpacity>
            <Header
                text={heading}
                back={true}
            />
            <View style={styles.middle}>
                <View style={{width:calcWidth(215)}}>
                        <TextInput
                        value={city}
                        onChangeText={(text)=>{setcity(text)}}
                        placeholderTextColor={"rgba(36, 36, 36, 0.2)"}
                        placeholder={"Москва"}
                            style={{width:"100%",borderBottomColor:"#FFAD40",borderBottomWidth:1,paddingTop:0,paddingBottom:-5}}
                        />
                      <Text style={{color:"#242424",fontSize:calcFontSize(12),marginTop:calcHeight(5)}}>({t('notNecessary')})</Text>
                    </View>
                <View style={{ marginTop: '17%' }}>
                    <SimpleButton
                        text={continuee}
                        onPress={() => {
                            dispatch(setCity(city))
                            navigation.navigate("Contract")
                        }}
                    />
                </View>
            </View>
                <Footer />
       
        </ScrollView>
    );
};

export default Place;
