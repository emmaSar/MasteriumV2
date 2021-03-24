import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView, Image, Alert, SafeAreaView } from 'react-native';
import { useDispatch, useSelector, } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import { calcFontSize, calcHeight, calcWidth } from "../../utils/demensios"
import Header from '../../components/Header'
import Footer from '../../components/Footer';
import { loginSelector } from '../../store/selector/loginSelector';
//@ts-ignore
import TextInputMask from 'react-native-text-input-mask';
//@ts-ignore
import SimpleButton from '../../components/SimpleButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';
//@ts-ignore
import Back from "../../assets/icons/back.svg"

//import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
    navigation: NavigationScreenProp<any, any>;
}

const styles = StyleSheet.create({
    screen: { flex: 1,justifyContent:'space-between' ,backgroundColor:'white'},
    middle: { marginLeft: calcWidth(17), marginRight: calcWidth(36), marginTop: calcHeight(26), 
    
    },
    back:{ marginTop: calcHeight(23), marginLeft: calcWidth(24) },
    heading:{ color: '#212121', fontSize: 14, fontWeight: '700' },
    body:{ color: '#212121', fontSize: 14, },
    line:{backgroundColor:'white',width:'100%',height:0.5,  shadowColor: "#000",
    shadowOffset: {
        width: 1,
        height: 2,
    },
   // shadowOpacity: 0.25,
   // shadowRadius: 3.84,
    elevation:2,
},
 footer:{alignItems:'center',marginBottom:calcHeight(69),marginTop:calcHeight(51)},
 

});

const Contract: React.FunctionComponent<Props> = ({ navigation }) => {

    const line = require('../../assets/icons/line.png')
    const back = require('../../assets/icons/back.png')
    const georgia = require('../../assets/icons/georgia.png')

    const list = [
        {
            heading: 'Lorem ipsum dolor sit ame',
            body: 'consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        },
        {
            heading: 'Lorem ipsum dolor sit ame',
            body: 'consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit aconsectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserconsectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia desconsectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia desconsectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.erunt mollit anim id est laborum.erunt mollit anim id est laborum.unt mollit anim id est laborum.nim id est laborum.',
        },
    ]
    const [error, setError] = useState('')


    const dispatch = useDispatch()
    const { t } = useTranslation();
    const heading=t("contractHeading");
    const agree=t("agree");


    return (
        <View style={styles.screen}>
            <TouchableOpacity onPress={() => { navigation.goBack() }}>
            <View style={styles.back} >
                    <Back />
                    </View>
            </TouchableOpacity>
            <Header
                text={heading}
                back={true}
            />
            <ScrollView style={styles.middle}>
                {list.map((elem,i) => {
                    return <View
                    key={i}
                    style={{ marginTop: calcHeight(16) }}>
                        <Text style={styles.heading}>{elem.heading}</Text>
                        <Text style={styles.body}>{elem.body}</Text>
                    </View>
                })}
                

            </ScrollView>

            <View style={styles.line}>
                </View>
                <View style={styles.footer}>
                <SimpleButton
                        text={agree}
                        onPress={() => {
                         navigation.navigate('Welcome')
                        }}
                    />
                    </View>
        </View>
    );
};

export default Contract;
