import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView, Image, Alert, SafeAreaView, TouchableOpacity } from 'react-native';
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
import HeaderPage from '../../components/HeaderPage';
import { useTranslation } from 'react-i18next';
import i18n from '../../locale/i18n';
import AsyncStorage from '@react-native-community/async-storage';
import { setLanguage } from '../../store/actions/mainActions';
import { languageSelector } from '../../store/selector/mainSelector';

//import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
    navigation: NavigationScreenProp<any, any>;
}

const styles = StyleSheet.create({
    screen: { backgroundColor: 'rgba(255, 255, 255, 0.6)', flex: 1 },
    middle: { marginLeft: calcWidth(17), marginRight: calcWidth(36), marginTop: calcHeight(26) },
    back: { marginTop: calcHeight(23), marginLeft: calcWidth(24) },
    plus: { marginTop: calcHeight(57), marginBottom: calcHeight(8) },
    text: { color: '#7C7C7C', fontSize: 14, fontWeight: 'bold', lineHeight: 19 },
    heading1: { color: '#7C7C7C', fontSize: 14, fontWeight: 'bold', lineHeight: 19, marginTop: calcHeight(7), },
    item: {
        backgroundColor: "#EEF4F6",
        borderRadius: 50, height: calcHeight(82),
        width: calcWidth(355),
        marginHorizontal: calcWidth(10),
        marginBottom: calcHeight(28), justifyContent: 'center'
    },
    block: { marginHorizontal: calcWidth(26), flexDirection: "row", alignItems: "center", },
    image: { width: 73, height: 48, marginLeft: calcWidth(27) },
    country: { marginLeft: calcWidth(35), color: '#242424', fontSize: calcFontSize(18) },
    block1: { position: "absolute", right: 0, borderWidth: 0.5, borderColor: "#212121", width: calcWidth(28), height: calcHeight(28), borderRadius: 14 },
    block2: { position: "absolute", right: 0, },
    footer: { position: 'absolute', bottom: 137, alignItems: 'center', width: "100%" }
});

const Language: React.FunctionComponent<Props> = ({ navigation }) => {

    const back = require('../../assets/icons/back.png')
    const check = require('../../assets/icons/check.png')
    const dispatch = useDispatch()
    const language = useSelector(languageSelector)
    const [visible, setVisible] = useState(language)

    const list = [
        {
            flag: 'data:image/png;base64,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',
            country: 'Georgian',
            lng: "ge",
            ind: 2
        },
        {
            flag: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAElBMVEX////+AQEBAX7xAQDx8fkAAXxufd3iAAABDElEQVR4nO3QuRGAQBDAsOW5/lsmP0dEEEgVeDwDAAAAAAAAAAAAAAAAAAAA8NLNbk52npQn5Ul5Up6UJ+VJeVKelCflSXlSnpQn5Ul5Up6UJ+VJeVKelCflSXlSnpQn5Ul5Up6UJ+VJeVKelCflSXlSnpQn5Ul5Up6UJ+VJeVKelCflSXlSnpQn5Ul5Up6UJ+VJeVKelCflSc36uuB31lzs5mDnSXlSnpQn5Ul5Up6UJ+VJeVKelCflSXlSnpQn5Ul5Up6UJ+VJeVKelCflSXlSnpQn5Ul5Up6UJ+VJeVKelCflSXlSnpQn5Ul5Up6UJ+VJeVKelCflSXlSnpQn5Ul5Up6UJ+VJeVKe1AOg4ssO6XMNnwAAAABJRU5ErkJggg==',
            country: 'Russian',
            lng: "ru",
            ind: 0,

        },
        {
            flag: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRcciwuS6uiLpAGZB0Hq8vyT9lAFc_VuV7zGQ&usqp=CAU',
            country: 'English',
            lng: "en",
            ind: 1,

        },

    ]

    const { t } = useTranslation();
    const [index,setIndex]=useState(0)
 //@ts-ignore
 useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
        for(let i=0;i<list.length;i++){
            if(list[i].ind==language){
                setIndex(i)
                break;
    
            }
        }
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);
    
    return (
        <View style={styles.screen}>
            <HeaderPage back={false} text={t('changeLanguage')} />
            <ScrollView style={{ marginTop: calcHeight(38) }}>
                {
                    list.map((el, i) => {
                        return <TouchableOpacity
                            key={i}
                            style={styles.item}
                            onPress={() => {
                                //@ts-ignore
                                setVisible(el.ind)
                                setIndex(i)
                            }}
                        >
                            <View style={styles.block}>
                                <Image source={{ uri: el.flag }} style={styles.image} />
                                <Text style={styles.country}>{el.country}</Text>

                                {visible !== el.ind ? <View style={styles.block1}>
                                </View> : <View style={styles.block2}>
                                        <Image source={check} />
                                    </View>
                                }
                            </View>
                        </TouchableOpacity>
                    })
                }
            </ScrollView>
            <View style={styles.footer}>
                <SimpleButton
                    text={t('apply')}
                    big={true}
                    onPress={() => {
                        AsyncStorage.setItem('language', JSON.stringify(list[index].lng))
                        dispatch(setLanguage(list[index].ind))
                        i18n.changeLanguage(list[index].lng)
                    }}
                />
            </View>
        </View>
    );
};

export default Language;
