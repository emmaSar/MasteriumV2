import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView, Image, Alert, SafeAreaView, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector, } from 'react-redux';
import { changePhone, error, sendChangePhone } from "../../store/actions/loginActions"

import { NavigationScreenProp } from 'react-navigation';
import { calcFontSize, calcHeight, calcWidth } from "../../utils/demensios"

//@ts-ignore
import TextInputMask from 'react-native-text-input-mask';
import Modal from "react-native-modal"

import SimpleButton from '../../components/SimpleButton';

import { errorSelector, infoSelector, loginSelector } from '../../store/selector/loginSelector';
import { useTranslation } from 'react-i18next';
//@ts-ignore
import Georgia from "../../assets/icons/georgia.svg"
import HeaderPage from '../../components/HeaderPage';



//import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

const styles = StyleSheet.create({
  screen: { backgroundColor: "rgba(255, 255, 255, 0.6)", flex: 1 },
  middle: { alignItems: 'center', },
  phone: { flexDirection: 'row', marginTop: '7.71%' },
  flag: { width: calcWidth(52), borderBottomColor: '#FFAD40', borderBottomWidth: 1, flexDirection: 'row', height: calcHeight(45), alignItems: "center", paddingTop: calcHeight(10) },
  callphone: { color: '#242424', fontSize: 12, },
  number: { marginLeft: calcWidth(15) },
  inputmask: { paddingVertical: 0, paddingTop: calcHeight(10), fontSize: 12, color: '#242424', height: calcHeight(45), borderBottomColor: '#FFAD40', borderBottomWidth: 1, width: calcWidth(215) },
  footer: { justifyContent: 'flex-end', },
  error: { color: 'red', fontSize: 11, fontStyle: 'normal', fontWeight: 'bold', marginBottom: '4%', marginTop: '2.5%', width: calcWidth(186), textAlign: "center", lineHeight: 15 },

});

const NewTelephone: React.FunctionComponent<Props> = ({ navigation }) => {

  const georgia = require('../../assets/icons/georgia.png')
  const login = useSelector(loginSelector)
  const { id } = useSelector(infoSelector)
  const [loading, setLoading] = useState(false)

  const { t } = useTranslation();
  const welcome = t('welcome',)
  const next = t('next')
  const dispatch = useDispatch()
  const [errora, setError] = useState(false)
  const errors = useSelector(errorSelector)
  useEffect(() => {
    if (id !== null && id !== undefined) {
      setLoading(false)

      navigation.navigate("Verification")
    }
  }, [id])
  function _onPress() {

    if (login.phone.length == 9) {
      setError(false)
      dispatch(sendChangePhone(login.phone)) && setLoading(true)

      // dispatch(loginAction(login.phone))
      // 
    }
    else {
      setError(true)
    }
  }
  useEffect(() => {
    if (errors !== null) {

      if (errors) {
        
        setError(true)
        setLoading(false)
        dispatch(error(null))
      }
      else {
        
        setError(false)
        setLoading(false)
        dispatch(error(null))

      }

    }
  }, [errors]);
  return (
    <View style={styles.screen}>
      <ScrollView>
        <HeaderPage
          text={'Введите новый номер'}
          back={true}
        // first={true}
        />
        <View style={styles.middle}>
          <Modal
            isVisible={loading}
            backdropColor="rgba(153, 153, 153,0.5)"
            style={{ height: 50, width: 50, position: "absolute", top: "40%", left: "40%" }}
          >
            <ActivityIndicator size="large" color="#FFAD40" />
          </Modal>
          <View style={styles.phone}>
            <View style={styles.flag}>
              <Georgia />
              <Text style={styles.callphone}> +995</Text>

            </View>
            <View style={styles.number}>
              <TextInputMask
                value={login.phone}
                onChangeText={(formatted: string, extracted: string) => {
                  dispatch(changePhone(extracted))



                }
                }
                maxLength={12}

                keyboardType={'numeric'}
                placeholderStyle={{ fontSize: 12, color: '#242424' }}
                placeholder={'586-82-69-53'}
                style={[styles.inputmask, { borderBottomColor: !errora ? '#FFAD40' : 'red', }]}
                mask={"[000]-[00]-[00]-[00]"}
              />
            </View>
          </View>
          {errora ? <Text style={styles.error}>Неверно введен </Text> : null}




        </View>
      </ScrollView>
      <View style={{ position: "absolute", top: calcHeight(550), alignItems: "center", width: "100%" }}>
        <SimpleButton
          text={t('continue')}
          big={true}
          onPress={() => {
            _onPress()
            // navigation.navigate('Verification')

          }}
        />
      </View>
    </View>
  );
};

export default NewTelephone;
