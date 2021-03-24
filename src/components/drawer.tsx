import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Image, Text, StyleSheet, Linking } from "react-native";
import { calcFontSize, calcHeight, calcWidth } from "../utils/demensios";
import Modal from 'react-native-modal';
import { loginSelector, userInfoSelector } from '../store/selector/loginSelector';
//@ts-ignore
// import Email from "../assets/icons/email.svg"
// //@ts-ignore
// import Vector from "../assets/icons/vector.svg"
// //@ts-ignore
// import Location from "../assets/icons/location.svg"
// //@ts-ignore
// import Ring from "../assets/icons/ring.svg"
// //@ts-ignore
// import Help from "../assets/icons/help1.svg"
// //@ts-ignore
// import List from "../assets/icons/list.svg"
// //@ts-ignore
// import Globus from "../assets/icons/globus.svg"
// //@ts-ignore
// import Chat from "../assets/icons/chat.svg"
// //@ts-ignore
// import Star from "../assets/icons/star.svg"
// //@ts-ignore
// import Wallet from "../assets/icons/wallet.svg"
// //@ts-ignore
// import Logout from "../assets/icons/logout.svg"
// //@ts-ignore
// import SEmail from "../assets/icons/semail.svg"
// //@ts-ignore
// import SVector from "../assets/icons/svector.svg"
// //@ts-ignore
// import SLocation from "../assets/icons/slocation.svg"
// //@ts-ignore
// import SRing from "../assets/icons/sring.svg"
// //@ts-ignore
// import SHelp from "../assets/icons/shelp1.svg"
// //@ts-ignore
// import SList from "../assets/icons/slist.svg"
// //@ts-ignore
// import SGlobus from "../assets/icons/sglobus.svg"
// //@ts-ignore
// import SChat from "../assets/icons/schat.svg"
// //@ts-ignore
// import SStar from "../assets/icons/sstar.svg"
// //@ts-ignore
// import SWallet from "../assets/icons/swallet.svg"
// //@ts-ignore
// import SLogout from "../assets/icons/slogout.svg"
// //@ts-ignore
// import SAddFriends from "../assets/icons/addFS.svg"
// //@ts-ignore
// import AddFriends from "../assets/icons/addF.svg"
// //@ts-ignore
// import MyMaster from "../assets/icons/myMaster.svg"
// //@ts-ignore
// import MyMasterS from "../assets/icons/myMasterS.svg"
// //@ts-ignore
// import Pen from "../assets/icons/pen.svg"
// //@ts-ignore
// import X from "../assets/icons/x.svg"

import { useDispatch, useSelector } from "react-redux";
import { setMessage, setUser, setUserData, setUserInfo, setVisibleDrawer } from "../store/actions/loginActions";
import navigationService from "../services/NavigationService";
import { drawerStateSelector, indexSelector, unseenMessageSelector, unseenNotificationSelector } from "../store/selector/mainSelector";
import { getUnseenMessageCount, getUnseenNotificationCount, setIndex, setOpen } from "../store/actions/mainActions";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-community/async-storage";
import { setOrderList } from "../store/actions/orderAction";
import { cleanAll, setSubCategoryList } from "../store/actions/categoryActions";
//import { useNavigation } from "@react-navigation/native";


 const Drawer:  React.FC= () => {
    // const x = require('../assets/icons/x.png')
    const user = useSelector(loginSelector)
    const visible = useSelector(drawerStateSelector)
    const index = useSelector(indexSelector)
    const info = useSelector(userInfoSelector)
    const [visable, setVisable] = useState(false)
    const [image, setImage] = useState(info.image)
    const unseenMessage=useSelector(unseenMessageSelector)
    const unseenNotification=useSelector(unseenNotificationSelector)
    const dispatch = useDispatch()
    // const navigation = useNavigation()
    const { t } = useTranslation();
    const styles = StyleSheet.create({
        screen: { alignItems: "center", marginTop: calcHeight(49), marginBottom: calcHeight(5) },
        screen1: { alignItems: "center", },
        cont: { flexDirection: "row" },
        logo1: { height: calcHeight(22.4), width: calcWidth(56) },
        logo2: { marginTop: calcHeight(2) },
        heading: { fontSize: 20, color: "#242424", lineHeight: 25, fontWeight: 'bold', fontStyle: 'normal', marginTop: calcHeight(19.4) },
        heading1: { fontSize: 20, color: "#242424", lineHeight: 25, fontWeight: 'bold', fontStyle: 'normal', },
        heading2: { fontSize: 14, color: "#7C7C7C", lineHeight: 16, fontWeight: 'bold', fontStyle: 'normal', marginTop: calcHeight(19.4) },
    
        modalContent: {
            backgroundColor: 'white',
            height: calcHeight(650),
            width: calcWidth(278),
            // justifyContent: 'center',
            alignItems: 'flex-start',
            borderTopRightRadius: 50,
            borderBottomRightRadius: 50,
            // borderColor: 'rgba(0, 0, 0, 0.1)',
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.20,
            shadowRadius: 1.41,
    
            elevation: 2,
        },
    
    });
    const list = [
        // {
        //     icon: <Vector width={20} />,
        //     sicon: <SVector width={20} />,
        //     name: t("requisites"),
        //     route: "Cart"
        // },
        // {
        //     icon: <Email width={20} />,
        //     sicon: <SEmail width={20} />,
        //     route: "Chat",
        //     name: t("messages"),
        //     // count:5
        // },
        // {
        //     icon: <AddFriends width={20} />,
        //     sicon: <SAddFriends width={20} />,
        //     route: "Invited",
        //     name: t("addFriends"),
        // },
        // {
        //     icon: <MyMaster width={20} />,
        //     sicon: <MyMasterS width={20} />,
        //     route: "MyMasters",
        //     name: t("mymaster"),
        // },
        // {
        //     icon: <Location width={20} />,
        //     sicon: <SLocation width={20} />,
        //     route: "LocationWorks",
        //     name: t("areaofwork"),
        // },
        // {
        //     icon: <Ring width={20} />,
        //     sicon: <SRing width={20} />,
        //     route: "Notifications",
        //     name: t("notifications"),
        //     // count:15

        // },
        // {
        //     icon: <Help width={20} />,
        //     sicon: <SHelp width={20} />,
        //     route: "Help",
        //     name: t("help"),
        // },
        // {
        //     icon: <List width={20} />,
        //     sicon: <SList width={20} />,
        //     route: "ConditionUse",
        //     name: t("conditionofuse"),
        // },
        // {
        //     icon: <Globus width={20} />,
        //     sicon: <SGlobus width={20} />,
        //     route: "Language",
        //     name: t("changeLanguage"),
        // },
        // {
        //     icon: <Chat width={20} />,
        //     sicon: <SChat width={20} />,
        //     route: "Disputes",
        //     name: t("disputes"),
        // },
        // {
        //     icon: <Star width={20} />,
        //     sicon: <SStar />,
        //     route: "https://play.google.com/",
        //     name: t("rateapp"),
        // },
        // {
        //     icon: <Logout width={20} />,
        //     sicon: <SLogout width={20} />,
        //     route: "SignIn", 
        //     name: t("logout"),
        // },
        // {
        //     icon: <Logout width={20} />,
        //     sicon: <SLogout width={20} />,
        //     route: "Orders",
        //     name: 'Заказы',
        // },
        // {
        //     icon: <Star width={20} />,
        //     sicon: <SStar />,
        //     route: "TransactionHistory",
        //     name: 'История транзакций',
        // },

    ]
  

    return <Modal
        backdropColor="transparent"
        onBackdropPress={()=>{dispatch( setVisibleDrawer(false))}}
        isVisible={visible}
        animationIn={'slideInLeft'}
        animationOut={'slideOutLeft'}
        style={{ position: 'absolute', left: 0, top: 0, marginLeft: calcWidth(0) ,height:"90%"}}
    >
        
        <View style={{ width: calcWidth(300), height: "95%", marginTop: calcHeight(-60), zIndex: 50 }}>
            <View style={{ position: 'absolute', right: 0 }}>
                <TouchableOpacity style={{ paddingHorizontal: 10, paddingVertical: calcWidth(9), }} onPress={() => {
                    dispatch(setVisibleDrawer(false))
                }}>
                  {/* <X /> */}
                </TouchableOpacity>
            </View>
            <View style={styles.modalContent}>

                <View style={{ marginTop: calcHeight(37) }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                   { Object.keys(info).length !=0?<Image
                            source={{ uri:  info.image !== null ? info.image : "data:image/png;base64,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" }} style={{ height: 70, width: 70, borderRadius: 35, marginHorizontal: calcWidth(16) }}
                        />:null}
                        <View>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <Text style={{ color: "#242424", fontSize: 16, fontWeight: 'bold',width:130}}>{info.first_name} {info.last_name}</Text>
                              <TouchableOpacity 
                              style={{height:30,width:50, paddingLeft: calcWidth(14) }}
                              onPress={()=>{  dispatch(setIndex(undefined));       dispatch(setVisibleDrawer(false)),navigationService.navigate('SettingsScreen')}}>
                                {/* <Pen /> */}
                                </TouchableOpacity>
                            </View>
                            <Text style={{ color: "#242424", fontSize: calcFontSize(13), fontWeight: '300', }}>г. {info.city}</Text>
                            {Object.keys(info).length !=0 && info.error===undefined?<Text style={{ color: "rgba(36, 36, 36, 0.5)", fontSize: calcFontSize(12), fontWeight: '300', }}>{info.phone_number.slice(0, 4)}-{info.phone_number.slice(4, 7)}-{info.phone_number.slice(7, 9)}-{info.phone_number.slice(9, 11)}-{info.phone_number.slice(11, 13)}
                            </Text>:null}


                        </View>
                    </View>

                    <View style={{ marginHorizontal: calcWidth(14), marginTop: calcHeight(30) }}>
                        {/* {list.map((el, i) => {
                             let count=el.route== 'Chat'? unseenMessage.toString():el.route== 'Notifications'?unseenNotification.toString():""
                             count=count=='0'?'':count
                             count=count.length>2?"99+":count
                            return <TouchableOpacity
                                key={i}
                                onPress={() => {

                                    dispatch(setIndex(i));
                                    dispatch(setVisibleDrawer(false))
                                    setTimeout(() => {
                                        if(i !== 10  && i!==11){
                                            navigationService.navigate(el.route,{create:el.route=="LocationWorks"?false:null,start:el.route=="Disputes"?true:null,check:false})
                                        }
                                        else if(i==10){
                                            Linking.openURL(el.route)

                                        }
                                        else{
                                        
                                            dispatch(setOpen(1))
                                            //@ts-ignore
                                            dispatch(setIndex(null));
    
                                            AsyncStorage.setItem('isopen', JSON.stringify(1))
                                            dispatch(setUserData({}))
                                            dispatch(setUserInfo({}))
                                            dispatch(setUser())
                                            AsyncStorage.setItem('orders', JSON.stringify([]))
                                            dispatch(setOrderList([]))
                                            dispatch(setMessage(""))
                                            dispatch(cleanAll())
                                        }
                                  

                                    }, 100)

                                }}
                
                                style={{
                                    height: index == i ? calcHeight(35) : calcHeight(19), width: calcWidth(245), marginBottom: calcHeight(15), flexDirection: "row", paddingLeft: 15,
                                    backgroundColor: index == i ? '#468BD7' : 'white', borderRadius: 50, alignItems: 'center',
                                }}>
                                {index == i ? el.sicon : el.icon}
                                <Text style={{ color: index == i ? "white" : '#7C7C7C', fontSize: 14, fontWeight: 'bold', marginLeft: calcWidth(10), width: "80%" }}>{el.name} {count.length>0?`(`:""}<Text style={{color:"#24A322"}}>{count}</Text>{count.length>0?`)`:""}</Text>
                            </TouchableOpacity>
                        })

                        } */}
                    </View>
                </View>
            </View>
        </View>
    </Modal>
};

export default Drawer
