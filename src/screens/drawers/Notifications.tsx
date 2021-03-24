import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView, Image, Alert, SafeAreaView, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector, } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import { calcFontSize, calcHeight, calcWidth } from "../../utils/demensios"
import Header from '../../components/Header'
import Footer from '../../components/Footer';
import { loginSelector } from '../../store/selector/loginSelector';
import { spareSelector } from '../../store/selector/spareselector';
import {addSpare} from "../../store/actions/spareActions"
//@ts-ignore
import TextInputMask from 'react-native-text-input-mask';
//@ts-ignore
import SimpleButton from '../../components/SimpleButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import HeaderPage from '../../components/HeaderPage';
import { useTranslation } from 'react-i18next';
import { getMyNotification, getNextNotifications, setLoading } from '../../store/actions/mainActions';
import { loadingSelector, notificationSelector } from '../../store/selector/mainSelector';
import Modal from "react-native-modal"

//import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
    navigation: NavigationScreenProp<any, any>;
}

const styles = StyleSheet.create({
    screen: { backgroundColor:'rgba(255, 255, 255, 0.6)',flex:1 },
    middle: { marginLeft: calcWidth(17), marginRight: calcWidth(36), marginTop: calcHeight(26) },
    back:{ marginTop: calcHeight(23), marginLeft: calcWidth(24) },
    plus:{marginTop:calcHeight(57),marginBottom:calcHeight(8)},
    text:{color:"#7C7C7C",fontSize:calcFontSize(13),fontWeight:'bold',marginLeft:calcWidth(16),width:calcWidth(230)},
    footer:{alignItems:'center',marginBottom:calcHeight(69),justifyContent:"flex-end",marginTop:calcHeight(416)},
    heading1: { color: '#7C7C7C', fontSize: 14, fontWeight: 'bold', lineHeight: 19 ,marginTop: calcHeight(7),},
    item:{backgroundColor:"#EEF4F6",
    borderRadius:50,height:calcHeight(80),
    width:calcWidth(355),
    marginHorizontal:calcWidth(10),flexDirection:"row",alignItems:"center",
    marginBottom:calcHeight(16),},
    date:{color:"#242424",fontSize:calcFontSize(12),fontWeight:'300',marginLeft:calcWidth(11)}

});

const Notifications: React.FunctionComponent<Props> = ({ navigation }) => {

    const loading=useSelector(loadingSelector)

    const notifications=useSelector(notificationSelector)

    const list=Object.keys(notifications).length>0?notifications.results:[]
    
 //@ts-ignore
 useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
        dispatch(setLoading(true))
      dispatch(getMyNotification())
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

    const dispatch = useDispatch()
//       const list=[
//           {
//               date:"28.10.2020",
//               text:"Новое сообщение от Иван Павлова"
//           },
//           {
//             date:"28.10.2020",
//             text:"Новое сообщение от Иван Павлова"
//         },
//         {
//             date:"28.10.2020",
//             text:"Новое сообщение от Иван Павлова ПавловаПавлова ПавловаПавлова ПавловаПавлова Павлова ПавловаПавлова Павлова"
//         },
//         {
//             date:"28.10.2020",
//             text:"Новое сообщение от Иван Павлова"
//         },
//         {
//           date:"28.10.2020",
//           text:"Новое сообщение от Иван Павлова"
//       },
//       {
//           date:"28.10.2020",
//           text:"Новое сообщение от Иван Павлова ПавловаПавлова ПавловаПавлова ПавловаПавлова Павлова ПавловаПавлова Павлова"
//       },
//       {
//         date:"28.10.2020",
//         text:"Новое сообщение от Иван Павлова"
//     },
//     {
//       date:"28.10.2020",
//       text:"Новое сообщение от Иван Павлова"
//   },
//   {
//       date:"28.10.2020",
//       text:"Новое сообщение от Иван Павлова ПавловаПавлова ПавловаПавлова ПавловаПавлова Павлова ПавловаПавлова Павлова"
//   },

//       ]
let mustWait = false
//@ts-ignore
const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom;
};
      const { t } = useTranslation();
    return ( 
        <View style={styles.screen}>
            <HeaderPage back={false} text={t("notifications")} />
            <Modal
            isVisible={loading}
            backdropColor="rgba(153, 153, 153,0.5)"
            style={{ height: 50, width: 50, position: "absolute", top: "40%", left: "40%" }}
          >
            <ActivityIndicator size="large" color="#FFAD40" />
          </Modal>
            <ScrollView 
                   onScroll={({ nativeEvent }) => {
                    if (isCloseToBottom(nativeEvent)) {
                        if (list.length  !==notifications.count && notifications.next!==null) {
                            if (mustWait) return
                            mustWait = true
                         !loading&& dispatch(getNextNotifications({body:notifications.next}))
                        //   !loading&& dispatch(getOrders({ start_index: orders.length, status_id: value, load: true, limit: 10 }))
                            dispatch(setLoading(true))
      
                            // dispatch(loadDataByPage({ ...filter, a: loadDataParam,opportunityTypeStatuses:opportunityTargetStatuses}, OpportunitiesActionTypes.SET_OPPORTUNITIES as string))
                        }
                    }
                }}
            style={{marginTop:calcHeight(38)}}>
            {
                //@ts-ignore
                list.map((el,i)=>{
                    return  <View 
                    key={i}
                    style={[styles.item,{marginBottom:i==(list.length-1)?calcHeight(100):calcHeight(31),}]}>
                        <Text style={styles.date}>{el.date}</Text>
                        <Text  style={styles.text} numberOfLines={3}>{el.text}</Text>

                    </View> 
                })
            }
              </ScrollView>
        </View>
    );
};

export default Notifications;
