import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView, Image, Alert, SafeAreaView, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector, } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import { calcFontSize, calcHeight, calcWidth } from "../../utils/demensios"
import { loginSelector, userInfoSelector } from '../../store/selector/loginSelector';
import { TouchableOpacity } from 'react-native-gesture-handler';
import HeaderPage from '../../components/HeaderPage';
import { useTranslation } from 'react-i18next';
//@ts-ignore
import Vector from "../../assets/icons/vec.svg"
//@ts-ignore
import Master from "../../assets/icons/master.svg"
//@ts-ignore
import Plus from "../../assets/icons/plus.svg"
import { useNavigation } from '@react-navigation/native';
import { cardsSelector, loadingSelector } from '../../store/selector/mainSelector';
import { getCreditCards, setLoading } from '../../store/actions/mainActions';
import Modal from "react-native-modal"


//import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

const styles = StyleSheet.create({
  screen: { backgroundColor: 'rgba(255, 255, 255, 0.6)', flex: 1 },
  middle: { marginLeft: calcWidth(17), marginRight: calcWidth(36), marginTop: calcHeight(26) },
  back: { marginTop: calcHeight(23), marginLeft: calcWidth(24) },
  plus: { marginTop: calcHeight(57), marginBottom: calcHeight(8) },
  footer: { alignItems: 'center', marginBottom: calcHeight(69), justifyContent: "flex-end", marginTop: calcHeight(416) },
  heading1: { color: '#7C7C7C', fontSize: 14, fontWeight: 'bold', lineHeight: 19, marginTop: calcHeight(7), },
  itemBlock: {
    backgroundColor: "#EEF4F6",
    flexDirection: "row",
    borderRadius: 50, height: calcHeight(38),
    width: calcWidth(355),
    marginHorizontal: calcWidth(10), alignItems: "center",
    marginTop: calcHeight(38),
  },
  itemBlock1: {
    backgroundColor: "#EEF4F6",
    flexDirection: "row",
    borderRadius: 50, height: calcHeight(71),
    width: calcWidth(355),
    justifyContent: "space-between",
    marginHorizontal: calcWidth(10),
    marginTop: calcHeight(38),
  },
  block: { marginHorizontal: calcWidth(30), flexDirection: "row", alignItems: 'center' },
  text: { color: "rgba(33, 33, 33, 0.5)", fontSize: calcFontSize(14), fontWeight: 'bold' },
  textinput: { color: "rgba(33, 33, 33, 0.5)", fontSize: calcFontSize(14), fontWeight: 'bold' },
  buttontext: { color: "#E36958", fontSize: calcFontSize(9), fontWeight: 'bold', textDecorationLine: 'underline', position: 'absolute', right: 0 }
});

const Cart: React.FunctionComponent<Props> = (route) => {


  const navigation=useNavigation()
  const info=useSelector(userInfoSelector)
  const { t } = useTranslation();
  const data= useSelector(cardsSelector)
  const loading=useSelector(loadingSelector)
const carts=Object.keys(data).length==0?[]: data.results
 //@ts-ignore
 useEffect(() => {
  const unsubscribe = navigation.addListener('focus', () => {
   dispatch(getCreditCards({id:info.user}))
   dispatch(setLoading(true))
  });
  // Return the function to unsubscribe from the event so it gets removed on unmount
  return unsubscribe;
}, [navigation]);
  const dispatch = useDispatch()


  return (
    <View style={styles.screen}>
      
      <Modal
            isVisible={loading}
            backdropColor="rgba(153, 153, 153,0.5)"
            style={{ height: 50, width: 50, position: "absolute", top: "40%", left: "40%" }}
          >
            <ActivityIndicator size="large" color="#FFAD40" />
          </Modal>
      <HeaderPage back={false} text={t("requisites")} />
      {carts.length == 0 ?
        <View style={styles.itemBlock}>
          <Text style={{ color: "rgba(33, 33, 33, 0.5)", fontSize: calcFontSize(14), fontWeight: "bold", marginLeft: calcWidth(14) }}>{t('cardisnotlinked')}</Text>
          <Text style={{ color: "#E36958", fontSize: calcFontSize(9), fontWeight: "bold", marginLeft: calcWidth(60), textDecorationLine: "underline", marginRight: calcWidth(23) }} onPress={() => { navigation.navigate("CartInfo") }}>{t('tether')}</Text>
          <Vector />
        </View>
        :
        <ScrollView >
          {
            //@ts-ignore
          carts.map((elem, i) => {
            //@ts-ignore
            let start = elem.number.slice(0, 4)
                        //@ts-ignore

            let end = elem.number.slice(4, 8)
            return <View style={styles.itemBlock1}>
              <View style={{ marginVertical: calcHeight(11), marginLeft: calcWidth(30) }}>
                <Text style={{ color: "rgba(33, 33, 33, 0.5)", fontSize: calcFontSize(14), fontWeight: "bold" }}>{start} **** **** {end}</Text>
                <Text style={{ color: "#24A322", fontSize: calcFontSize(13), fontWeight: "bold", marginTop: calcHeight(12) }}>{
                            //@ts-ignore

                elem.is_primary ?"Основная":""}</Text>
              </View>
              <View style={{ marginTop: calcHeight(9), marginRight: calcWidth(20), flexDirection: "row" }}>
                <Text style={{ color: "#E36958", fontSize: calcFontSize(12), fontWeight: "bold", textDecorationLine: "underline", marginRight: calcWidth(27) }}>открепить</Text>
                <Master />
              </View>
            </View>
          })}
          <TouchableOpacity style={{marginTop:calcHeight(42),alignItems:"center",marginBottom:calcHeight(150)}} onPress={()=>{navigation.navigate("CartInfo")}}>
            <Plus />
        <Text style={{color:"#7C7C7C",fontSize:calcFontSize(14),fontWeight:"bold",marginTop:calcHeight(8)}}>{t('addCard')}</Text>
            </TouchableOpacity>
        </ScrollView>
      }

    </View>
  );
};

export default Cart;
