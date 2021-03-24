import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, ActivityIndicator, Keyboard, Dimensions } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

import HeaderLogin from '../../components/headerLogin';
import SimpleButton from '../../components/simpleButton';
//@ts-ignore
import Facebook from "../../assets/icons/facebook.svg"
//@ts-ignore
import Google from "../../assets/icons/google.svg"
//@ts-ignore
import Twitter from "../../assets/icons/twitter.svg"
import { calcHeight } from '../../assets/style/dimensions';
import { calcWidth } from '../../utils/demensios';
import { Text } from 'native-base';
import { useTranslation } from 'react-i18next';
import PhoneInput, { formatPhoneNumberIntl, isValidPhoneNumber } from 'react-phone-number-input'
import { useDispatch, useSelector } from 'react-redux';
import { infoSelector, loginSelector } from '../../store/selector/loginSelector';
import { changePhone, loginAction, setUserData } from '../../store/actions/loginActions';
import { TextInput } from 'react-native-gesture-handler';
//@ts-ignore
import Phone from "../../assets/icons/phone.svg"
import { setLoading } from '../../store/actions/mainActions';
import Loading from '../../components/Loading';
interface Props {
  navigation: NavigationScreenProp<any, any>;
}

const styles = StyleSheet.create({
  all: { flex: 1, backgroundColor: "#f2f2f2", alignItems: "center" },
  footer: { position: "absolute", top: Dimensions.get("window").height - calcHeight(150), marginHorizontal: calcHeight(16), },
  social: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: calcHeight(36) },
  line: { width: calcWidth(94), height: calcHeight(1), backgroundColor: "#C3BEDA" },
  socialText: { color: "#C3BEDA", fontSize: 14 },
  socialBlock: { flexDirection: "row", justifyContent: "space-around", width: calcWidth(343), marginBottom: calcHeight(15) },
  socialButton: {
    paddingHorizontal: calcWidth(42.5), paddingVertical: calcHeight(17.5), borderWidth: 1, borderColor: "#C3BEDA", borderRadius: 16
  },
  phoneBlock:{ flexDirection: "row", width: calcWidth(343), alignItems: "center" },
  textInputLine:{ width: calcWidth(343), height: 1, backgroundColor: "#EAEAFF" }
});

const SignupScreen: React.FunctionComponent<Props> = ({ navigation }) => {
  const social_list = [<Facebook />, <Google />
  ]
  const login = useSelector(loginSelector)
  const { id } = useSelector(infoSelector)

  const validForm = () => {

    if (login.phone.length > 0 && isValidPhoneNumber(login.phone)) {
      return true

    } else {
      return false
    }

  }
  const { t } = useTranslation();
  const phoneBefor = login.phone.length > 0 ? login.phone : ''
  const phone = phoneBefor.indexOf('+') == -1 ? '+' + phoneBefor : phoneBefor
  const dispatch = useDispatch()
  //@ts-ignore
  useEffect(() => {
    if (id !== null && id !== undefined) {
      dispatch(setLoading(false))
      navigation.navigate("Verification")
      dispatch(setUserData({}))
    }
  }, [id])
  return (
    <ScrollView contentContainerStyle={styles.all}>
      <HeaderLogin back={false} text={t("signText")} heading={t("welcome")} />
      <Loading />
      <View style={{ marginTop: calcHeight(78) }}>
        <View style={styles.phoneBlock}>
          <Phone />
          <TextInput
            style={{ width: calcWidth(343), }}
            keyboardType={"numeric"}
            value={formatPhoneNumberIntl(phone) == "" ? phone : formatPhoneNumberIntl(phone)}
            onChangeText={(text) => {
              dispatch(changePhone(text))
            }}
          />
        </View>
        <View style={styles.textInputLine}></View>
      </View>
      <View style={{ marginTop: calcHeight(24) }}>
        <SimpleButton active={validForm()} text={t("continue")} onPress={()=>{
          dispatch(loginAction(login.phone)) && dispatch(setLoading(true))
        }} />
      </View>
      <View style={styles.footer}>
        <View style={styles.social}>
          <View style={styles.line}></View>
          <Text style={styles.socialText}>Или войти с ...</Text>
          <View style={styles.line}></View>
        </View>
        <View style={styles.socialBlock}>
          {
            social_list.map((el, index) => {
              return <TouchableOpacity
                key={index}
                style={styles.socialButton}>
                {el}
              </TouchableOpacity>
            })
          }
        </View>
      </View>
    </ScrollView>
  );
};

export default SignupScreen;


