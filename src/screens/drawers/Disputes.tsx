import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView, Image, Alert, SafeAreaView, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector, } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import { calcFontSize, calcHeight, calcWidth } from "../../utils/demensios"
import {  userInfoSelector } from '../../store/selector/loginSelector';

import { TouchableOpacity } from 'react-native-gesture-handler';
import HeaderPage from '../../components/HeaderPage';
//import { SafeAreaView } from 'react-native-safe-area-context';
import Modal from 'react-native-modal';
import { useTranslation } from 'react-i18next';
import Popup from '../../components/Popup';
import { getDisputs, getDisputStatus, getNextDisputs } from '../../store/actions/orderAction';
import { disputsSelector, disputStatusListSelector } from '../../store/selector/orderSelector';
import { languageSelector, loadingSelector } from '../../store/selector/mainSelector';
import keys from '../../services/keys';
import { setLoading } from '../../store/actions/mainActions';
import { useNavigation } from '@react-navigation/native';
import { chooseLanguageIndex } from '../../utils/config';
interface Props {
  navigation: NavigationScreenProp<any, any>;
}

const styles = StyleSheet.create({
  screen: { backgroundColor: 'rgba(255, 255, 255, 0.6)', flex: 1 },
  middle: { marginLeft: calcWidth(17), marginRight: calcWidth(36), marginTop: calcHeight(26) },
  back: { marginTop: calcHeight(23), marginLeft: calcWidth(24) },
  plus: { marginTop: calcHeight(57), marginBottom: calcHeight(8) },
  text: { color: "#FF5252", fontSize: calcFontSize(9), textDecorationLine: 'underline', marginTop: calcHeight(26) },
  heading1: { color: '#7C7C7C', fontSize: 14, fontWeight: 'bold', lineHeight: 19, marginTop: calcHeight(7), },
  buttonBlock: {
    position: 'absolute',
    // zIndex: 1,
    right: 16,
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    width: 40,
  },
  filterCollapseBlock: {
    // zIndex: 2,
    // position: 'absolute',
    paddingHorizontal: 16,
    width: '30%',
    // bottom: 0,
    backgroundColor: '#fff',
  },
  buttonItem: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    //backgroundColor:"red",
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.16,
    shadowRadius: 8,
    marginBottom: 14,
  },
  buttonText: {
    color: '#666',
    fontSize: 24,
    fontWeight: '400',
    letterSpacing: 1.2,
    lineHeight: 24,
  },
  semiRoundedTop: {
    marginBottom: 0,
    borderBottomWidth: 0.5,
    borderBottomColor: '#666',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  semiRoundedBottom: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },

  filterHeader: {
    paddingTop: 12,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filterHeaderText: {
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 0.8,
    lineHeight: 24,
  },
  radioContainer: {
    paddingTop: 16,
    paddingBottom: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  circle: {
    marginRight: 12,
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#cccccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedCircle: {
    width: 19,
    height: 19,
  },
  radioContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  radioText: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  expandButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 19,
    height: 19,
    marginRight: 32,
  },
  expandedIcon: {
    transform: [{ rotateX: '180deg' }],
  },
  block: {
    borderRadius: 100, height: calcHeight(135),
    width: calcWidth(355),
    paddingHorizontal: calcWidth(25),
    marginBottom: calcHeight(33), alignItems: 'center', flexDirection: "row"
  },
  image: { height: calcHeight(65), width: calcWidth(65) },
  title: { color: "#212121", fontSize: calcFontSize(13), fontWeight: 'bold', marginTop: calcHeight(-45) },
  footer: { position: 'absolute', right: 27, alignItems: 'flex-end' },
  number: { color: "#212121", fontSize: calcFontSize(12), fontWeight: 'bold', },
  status: { color: "#212121", fontSize: calcFontSize(13), fontWeight: 'bold', marginTop: calcHeight(35) }
});

const Disputes: React.FunctionComponent<Props> = (route) => {
  const navigation=useNavigation()
  const info = useSelector(userInfoSelector)
  const statuses = useSelector(disputStatusListSelector)
  const loading = useSelector(loadingSelector)
  const data = useSelector(disputsSelector)
  //@ts-ignore
  let disputs = Object.keys(data).length !== 0 ? data.results : []
  const [visible, setVisible] = useState(false)
  const { t } = useTranslation();
  const dispatch = useDispatch()
  //@ts-ignore
  useEffect(() => {
    //@ts-ignore
    if(route.route.params.start!==undefined){
      dispatch(setLoading(true))
      dispatch(getDisputStatus())
      dispatch(getDisputs({ user_id: info.user, status_id: null }))
      setVisible(false)
    }
   
 
  }, [
    //@ts-ignore
    route.route.params]);
    let mustWait = false
    //@ts-ignore
    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };
    const languageIndex=chooseLanguageIndex()

  return (
    <View style={styles.screen}>
      <HeaderPage back={false} />
      <Modal
                isVisible={loading}
                backdropColor="rgba(153, 153, 153,0.5)"
                style={{ height: 50, width: 50, position: "absolute", top: "40%", left: "40%" }}
            >
                <ActivityIndicator size="large" color="#FFAD40" />
            </Modal>
      <View style={{ flexDirection: "row", alignItems: 'center', marginTop: calcHeight(37), justifyContent: "space-between", marginHorizontal: '3%' }}>
        <Text style={{ color: "#FF5252", fontSize: calcFontSize(24), fontWeight: "bold" }}>{t('disputes')}</Text>
        <Popup
          items={statuses}
          visible={visible}
          setVisibile={(value: boolean) => { setVisible(value) }}
          onSelect={(value: any) => {
            dispatch(setLoading(true))
            dispatch(getDisputs({ user_id: info.user, status_id: value }))

          }}
        />

      </View>
      <ScrollView
            onScroll={({ nativeEvent }) => {
              if (isCloseToBottom(nativeEvent)) {
                  if (disputs.length  !==data.count && data.next!==null) {
                      if (mustWait) return
                      mustWait = true
                   !loading&& dispatch(getNextDisputs({body:data.next}))
                  //   !loading&& dispatch(getOrders({ start_index: orders.length, status_id: value, load: true, limit: 10 }))
                      dispatch(setLoading(true))

                      // dispatch(loadDataByPage({ ...filter, a: loadDataParam,opportunityTypeStatuses:opportunityTargetStatuses}, OpportunitiesActionTypes.SET_OPPORTUNITIES as string))
                  }
              }
          }}
      style={{ marginTop: calcHeight(38), }}>
        {
          //@ts-ignore
        disputs.map((elem, i) => {
          return <TouchableOpacity
            onPress={() => { navigation.navigate('DisputesOrder',{elem:elem}) }}
            style={{ marginHorizontal: calcWidth(10), marginBottom: i == (disputs.length - 1) ? calcHeight(80) : 0 }} key={i}>

            <View

              style={[{
                backgroundColor: elem.status_code == "IP" ? '#EEF4F6' : (elem.status_code == 'CMP' ? "#B9B9B9" : "#E3E3E3"),

              }, styles.block]}>
           {elem.disput_images.length>0?   <Image source={{ uri: elem.disput_images[0].image_url }} style={styles.image} />:<View></View>}
              <View style={{ marginLeft: calcWidth(30) ,width:calcWidth(120),}}>
                <Text 
                numberOfLines={2}
                style={styles.title}>{elem.description}</Text>
                {/* <Text
                                        onPress={()=>{navigation.navigate('DisputesOrder')}}
                                 style={styles.text}>открыть диспут</Text> */}

              </View>
              <View style={styles.footer}>
                <Text style={styles.number}>№{elem.order_number}</Text>
                <Text style={styles.status}>{elem.status[languageIndex].value}</Text>
              </View>
            </View>
          </TouchableOpacity>
        })}
      </ScrollView>
    </View>
  );
};

export default Disputes;
