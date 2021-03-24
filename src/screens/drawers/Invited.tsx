import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView, Image, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector, } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import { calcFontSize, calcHeight, calcWidth } from "../../utils/demensios"
//@ts-ignore
import SimpleButton from '../../components/SimpleButton';
import HeaderPage from '../../components/HeaderPage';
import { useTranslation } from 'react-i18next';
import { cartSelector, loadingSelector } from '../../store/selector/mainSelector';
//@ts-ignore
import Check from "../../assets/icons/checkModal.svg"
import { addFriend, setLoading } from '../../store/actions/mainActions';
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

const Invited: React.FunctionComponent<Props> = ({ navigation }) => {

  // const carts = useSelector(cartSelector)
  const [error, setError] = useState(false)
  const loading = useSelector(loadingSelector)
  const { t } = useTranslation();
  const [carts, setCarts] = useState([
    {
      number: "11112222",
      status: "Основная"
    }
  ])
  const [inspect, setInspect] = useState(false)
  useEffect(() => {
    if (!loading && inspect) {
      setCheck(true)
      setValue("")
    }
  }, [loading]);

  const dispatch = useDispatch()
  function handleInspector() {
    if (value.length == 13) {
      setError(false)
      dispatch(setLoading(true))
      dispatch(addFriend({ phone_number: value }))

      setInspect(true)
    }
    else {
      setError(true)
    }
  }

  const [check, setCheck] = useState(false)
  const [value, setValue] = useState('')
  const phone = value.indexOf('+995') == -1 ? '+995' : value
  //@ts-ignore
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setCheck(false)
      setValue("")
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);
  return (
    <View style={styles.screen}>
      <HeaderPage back={false} text={t("addFriends")} />
      {!check ? <>
        <ScrollView keyboardShouldPersistTaps='handled'>

          <Modal
            isVisible={loading}
            backdropColor="rgba(153, 153, 153,0.5)"
            style={{ height: 50, width: 50, position: "absolute", top: "40%", left: "40%" }}
          >
            <ActivityIndicator size="large" color="#FFAD40" />
          </Modal>
          <TextInput
            keyboardType="numeric"
            maxLength={13}
            value={phone}
            onChangeText={(text) => { setValue(text) }}
            style={{
              backgroundColor: "#EEF4F6",
              width: calcWidth(355),
              marginHorizontal: calcWidth(10),
              height: calcHeight(38),
              marginTop: calcHeight(38),
              borderWidth: error ? 0.5 : 0,
              borderColor: error ? "red" : "transparent",
              borderRadius: 50,
              color: "rgba(33, 33, 33, 0.5)",
              fontSize: calcFontSize(14), fontWeight: "bold",
              paddingLeft: calcWidth(14), paddingVertical: calcHeight(5)
            }}
            placeholder="+995 586826853"
          //  defaultValue={'+995'}
          />
          <Text style={{ color: "#212121", fontSize: calcFontSize(18), fontWeight: 'bold', marginLeft: calcWidth(17), marginTop: calcHeight(17) }}>{t('invitedmessage')}</Text>
          <Text
            onPress={() => { navigation.navigate('HistoryOfInvitations') }}
            style={{ textAlign: "center", marginTop: calcHeight(100), color: "#FFAD40", textDecorationLine: "underline", fontSize: calcFontSize(18), fontWeight: "bold" }}>история приглашений</Text>
        </ScrollView>
        <TouchableOpacity style={{ position: "absolute", top: calcHeight(550), alignItems: "center", width: "100%" }}>
          <SimpleButton
            text={t('send')}
            big={true}
            onPress={() => {
              handleInspector()
              //navigation.navigate('SuccessCreateOrder')
            }}
          />
        </TouchableOpacity>
      </>
        : <View style={{ alignItems: "center", marginTop: calcHeight(38) }}>
          <Check />
          <Text style={{ color: "#212121", fontSize: calcFontSize(18), fontWeight: "bold" }}>Отправлено</Text>
          <Text
            onPress={() => { navigation.navigate('HomeScreen') }}
            style={{ color: "#FFAD40", fontSize: calcFontSize(18), fontWeight: "bold", textDecorationLine: "underline", marginVertical: calcHeight(20) }}>на главную</Text>
          <Text
            onPress={() => { setCheck(false) }}
            style={{ color: "#FFAD40", fontSize: calcFontSize(18), fontWeight: "bold", textDecorationLine: "underline" }}>пригласить ещё</Text>


        </View>
      }
    </View>
  );
};

export default Invited;
