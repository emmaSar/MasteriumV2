import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView, Image, Alert, TouchableOpacity, ImageBackground, Linking, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector, } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import { calcFontSize, calcHeight, calcWidth } from "../../utils/demensios"

import HeaderPage from '../../components/HeaderPage';
import { useTranslation } from 'react-i18next';
//@ts-ignore
import PhoneCall from "../../assets/icons/phoneCall.svg"
//@ts-ignore
import Edit from "../../assets/icons/edit.svg"
//@ts-ignore
import Trash from "../../assets/icons/trash1.svg"
import { deleteMyMasterById, getMyMasters, getRoomForUser, setChatUserId, setElement, setLoading } from '../../store/actions/mainActions';
import { chatUserIdSelector, loadingSelector, mastersSelector } from '../../store/selector/mainSelector';
import Modal from "react-native-modal"

//import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

const styles = StyleSheet.create({
  screen: { backgroundColor: 'rgba(255, 255, 255, 0.6)', flex: 1 },
  back: { marginTop: calcHeight(23), marginLeft: calcWidth(24) },
  plus: { marginTop: calcHeight(57), marginBottom: calcHeight(8) },
  text: { color: "#7C7C7C", fontSize: calcFontSize(13), fontWeight: 'bold', marginLeft: calcWidth(16), width: calcWidth(230) },
  footer: { alignItems: 'center', marginBottom: calcHeight(69), justifyContent: "flex-end", marginTop: calcHeight(416) },
  heading1: { color: '#7C7C7C', fontSize: 14, fontWeight: 'bold', lineHeight: 19, marginTop: calcHeight(7), },
  item: {
    backgroundColor: "#EEF4F6",
    borderRadius: 50, height: calcHeight(71),
    width: calcWidth(355),
    marginHorizontal: calcWidth(10), flexDirection: "row", alignItems: "center",
    marginBottom: calcHeight(31),
  },
  date: { color: "#242424", fontSize: calcFontSize(12), fontWeight: '300', marginLeft: calcWidth(11) }

});

const MyMasters: React.FunctionComponent<Props> = ({ navigation }) => {

  const loading = useSelector(loadingSelector)
  const star = require('../../assets/icons/star.png')
  //@ts-ignore
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(setLoading(true))

      dispatch(getMyMasters())
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);
  const id = useSelector(chatUserIdSelector)
  const [elem, setElem] = useState()
  const [inspect, setInspect] = useState(false)
  useEffect(() => {
    if (id !== null && !inspect) {
      setInspect(true)
      //@ts-ignore

      dispatch(setElement({ room_id: id, name: elem.name, image: elem.image }))

      // navigation.navigate("Chat", { check: true, item: 1 })
      dispatch(setChatUserId(null))


    }
  }, [id, inspect])
  //@ts-ignore
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {

      setInspect(false)
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);
  const view = require('../../assets/icons/view.png')
  const masters = useSelector(mastersSelector)

  const dispatch = useDispatch()
  const { t } = useTranslation();

  return (
    <View style={styles.screen}>
      <HeaderPage back={false} text={t("mymaster")} />
      <Modal
        isVisible={loading}
        backdropColor="rgba(153, 153, 153,0.5)"
        style={{ height: 50, width: 50, position: "absolute", top: "40%", left: "40%" }}
      >
        <ActivityIndicator size="large" color="#FFAD40" />
      </Modal>
      <ScrollView style={{ marginTop: calcHeight(38) }}>
        {
          masters.map((el, i) => {
            const image = el.image !== null && el.image.slice(0, 4) == 'http' ? el.image : "data:image/png;base64,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"
            return <View
              key={i}
              style={[styles.item, { marginBottom: i == (masters.length - 1) ? calcHeight(100) : calcHeight(31), }]}
            >

              <TouchableOpacity
                onPress={() => { navigation.navigate('UserPage', { check: true,user_id:el.id }) }}
                style={{
                  marginTop: calcHeight(0), marginLeft: calcWidth(17),
                }}>

                <ImageBackground
                  source={view}
                  style={{ height: calcHeight(16), width: calcWidth(25), position: 'absolute', zIndex: 1, flexDirection: "row", }}  >
                  <View style={{ marginLeft: calcWidth(3), marginTop: calcHeight(2) }} >
                    <Image source={star} style={{ height: calcHeight(7), width: calcWidth(7) }} />
                  </View>
                  <Text style={{ fontStyle: 'normal', fontWeight: '300', fontSize: 8, color: "rgba(0, 0, 0, 0.5)", }}>{el.rating}</Text>
                </ImageBackground>
                <Image source={{ uri: image }} style={{ height: 56, width: 56, borderRadius: 28 }}
                />
                {/* <ImageBackground source={viewg} style={{ height: calcHeight(11), width: calcWidth(21), position: 'absolute', zIndex: 1, justifyContent: "center", alignItems: "center", right: 0, bottom: 0 }}  >
                    <Text style={{ color: "white", fontSize: calcFontSize(8) }}>{el.pro}</Text>
                  </ImageBackground> */}
              </TouchableOpacity>
              <View style={{ marginLeft: calcWidth(19) }}>
                <Text style={{ color: "#212121", fontSize: calcFontSize(14), fontWeight: '300' }}>{el.first_name} {el.last_name}</Text>
                <View style={{ flexDirection: "row", marginTop: calcHeight(7) }}>
                  <TouchableOpacity
                    onPress={() => { Linking.openURL(`tel:${el.phone_number}`) }}
                  >
                    <PhoneCall width={27} height={27} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ marginLeft: calcWidth(27) }}
                    onPress={() => {
                      setElem({
                        //@ts-ignore
                        name: el.first_name + " " + el.last_name,
                        //@ts-ignore
                        image: image
                      })
                      dispatch(getRoomForUser({ user_id: el.id, is_with_admin: false }))

                      //  navigation.navigate("Messages") 
                    }}

                  >
                    <Edit width={27} height={27} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ marginVertical: calcHeight(7), marginLeft: calcWidth(14) }}>
                {//@ts-ignore
                  el.specializations.map((elem, index) => {
                    return <Text key={index} style={{ color: "#7C7C7C", fontSize: calcFontSize(10), fontWeight: "bold" }}>{elem.title}</Text>
                  })}
              </View>
              <TouchableOpacity
                onPress={() => { dispatch(deleteMyMasterById(el.id)) }}
                style={{
                  position: "absolute", right: 5, bottom: -5, backgroundColor: "white", width: calcWidth(27), height: calcHeight(27), borderRadius: 13.5, alignItems: "center", justifyContent: "center"
                  , shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.20,
                  shadowRadius: 1.41,

                  elevation: 7,
                }}
              >
                <View
                //
                >
                  <Trash />

                </View>
              </TouchableOpacity>
            </View>
          })
        }
      </ScrollView>
    </View>
  );
};

export default MyMasters;
