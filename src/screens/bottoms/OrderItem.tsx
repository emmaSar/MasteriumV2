import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView, Image, Alert, TouchableOpacity, ImageBackground, Linking } from 'react-native';
import { useDispatch, useSelector, } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import { calcFontSize, calcHeight, calcWidth } from "../../utils/demensios"


import SimpleButton from '../../components/SimpleButton';
import HeaderPage from '../../components/HeaderPage';
//@ts-ignore
import Master from "../../assets/icons/master.svg"
//@ts-ignore

import PhoneCall from "../../assets/icons/phoneCall.svg"
//@ts-ignore

import Edit from "../../assets/icons/edit.svg"
//@ts-ignore

import Delete from "../../assets/icons/delete.svg"
//@ts-ignore

import Check from "../../assets/icons/checkModal.svg"
//import { SafeAreaView } from 'react-native-safe-area-context';
//@ts-ignore

import Clock from "../../assets/icons/clock.svg"
import Modal from 'react-native-modal';
import { useTranslation } from 'react-i18next';
//@ts-ignore
import ImageView from 'react-native-image-view';
import { useNavigation } from '@react-navigation/native';
import { infoSelector, userInfoSelector } from '../../store/selector/loginSelector';
import { orderDetailsSelector } from '../../store/selector/orderSelector';
import moment from 'moment';
import { getExecutorById, getRoomForUser, setChatUserId, setElement } from '../../store/actions/mainActions';
import { chatUserIdSelector, languageSelector } from '../../store/selector/mainSelector';
import { chooseLanguageIndex } from '../../utils/config';
import { setOrderDetails } from '../../store/actions/orderAction';
interface Props {
    navigation: NavigationScreenProp<any, any>;
}

const styles = StyleSheet.create({
    screen: { backgroundColor: 'rgba(255, 255, 255, 0.6)', flex: 1, },
    block5: {
        backgroundColor: "white", height: calcHeight(30), width: calcWidth(168), alignItems: "center", justifyContent: "center", borderRadius: 30, shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2, position: 'absolute', right: 16, marginTop: calcHeight(18)
    },
    status: { color: "#212121", fontSize: calcFontSize(13), fontWeight: 'bold' },
    touchView: {
        backgroundColor: '#EEF4F6',
        borderRadius: 30, height: calcHeight(76),
        width: calcWidth(355),
        marginHorizontal: calcWidth(10),
        paddingLeft: calcWidth(20),
        paddingVertical: calcHeight(14),
        paddingRight: calcWidth(13),
        marginRight: calcWidth(13),

        marginTop: calcHeight(38)
    },
    textA: { color: "#212121", fontSize: calcFontSize(12), flex: 1 },
    clock: { color: "#212121", fontSize: calcFontSize(9), fontWeight: '300', marginRight: calcWidth(10), marginLeft: calcWidth(5) },
    heading1: {
        color: '#7C7C7C', fontSize: 14, fontWeight: 'bold', lineHeight: 19,
        marginTop: calcHeight(15),
    },

    name: { fontSize: 18, fontWeight: 'bold', color: '#24A322', marginTop: calcHeight(5), marginLeft: calcWidth(9), },
    view: { marginLeft: calcWidth(80), textDecorationLine: "underline", fontSize: calcFontSize(24), color: "#212121", fontWeight: "bold" },


});

const OrderItem: React.FunctionComponent<Props> = (route) => {
    const orderDetails = useSelector(orderDetailsSelector)

    const navigation = useNavigation()
    const [visible, setVisible] = useState(false)
    const [visible1, setVisible1] = useState(false)
    const info = useSelector(userInfoSelector)
    const [list, setList] = useState([])
    const id = useSelector(chatUserIdSelector)
    const phoneNumber = '+37494847540'
    const [inspect,setInspect]=useState(false)
    const languageIndex=chooseLanguageIndex()

    useEffect(() => {
        if (id !== null && !inspect) {

            dispatch(setElement( { room_id: id,  
                //@ts-ignore
                name: orderDetails.workers[0].user.first_name + " " + orderDetails.workers[0].user.last_name,
            //@ts-ignore
            image: orderDetails.workers[0].user.image.length == 0 || orderDetails.workers[0].user.image.slice(0, 4) !== "http" ?
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEXBx9D///+9w83Y3OHDydL19vfS1t3q7O/IzdXt7/HN0tnd4OXGy9Tl5+v4+frg4+dnyPTjAAAKUUlEQVR4nN2d28KjKgyFGUTF8/u/7dba/tWWQ0IWSve6mYuZqX5yTEiC+pdfc9cuQ9X01o7GKGNGa/umGpa2my94usr543M3VdboVcql7S+Mraa8oLkI53boNzI324lzI+2HNhdmDsJ5aoyn2QKg2jRTDko4YVdZNt2b0lYd+oWwhG2jkvFekKppoe8EJNzwRHRvSiQkirCuQHhPSFXVoDfDEE4WifeEtBPk3QCE8wBtvgOjGgCTq5iwbvLgPSEbcWcVEublgzCKCOs+Nx+AUUA4Z2+/N6NgPKYTVlfxPRirywmnC/F2pa4daYT1eGUD7tJj2nBMIry0gx4Yk7pqAmF3C96uBMuDT3jZDOpSQjNyCTtzI98mwx2NTMLhzgbcpYeMhHMGE4IvbVnrP4fwzinmLM6EwyAsoIe+pJcchJfssqnSPZxwHu+G+tBIHYxEwvpuIIeIywaNsC2ph76kafMNiXAqEXBFJJkbFMKlTEDilEogLBaQhhgnLGgZ/BZhCxclLBqQghgjLLiL7op21AhhobPoUbEZNUz4A4BRxCBh9wuAsaU/RFj/BqAKb+BChHe/N0NphPbu12bIphD26Ld4hJXswh84+u1FLyF2IdRbmMXSdnU913XXLlvABvYB3mXRR4icRrVqpu+5oJ5QkQ37Q3wTqodwBj668U/mHdK97DH6PYSoWUabmA03GRSkZ7ZxE4K223E+JKNnE+4kxAxCTT7ymzAD0j0UnYSQswndEPk2YcajoRI2iKcpXuBWC3mm66M6CBGONR3YZLg1IyY37fisDkLEk1JOayEnyxTCSv4YzrHCQYht1Pen/SIEmEw0P6ZDAINbf22evgjl5xPJgBDEMUYof0ZiF90l76hf3/eTUPoASfTSJsB0EyaUTzPsZeJD8kXj4xOfCWf4F+RL/Ab6bGSc30i8myGeeIUk3xSfdzYnQvlKIRuEu8Qj5bxinAjlrhkAIKCfnpw2x3cSN6FgJTxKvGKdGvFIKG5C6Tz6kng+PTbigVDehKhMF7F1c2zEA6F4Iv3aMCVLvHU8TKdvQvFaCBqFm+Qj8b0mvgkH4Y+CJtLna0n19kq9X6uItfAl+fb0mxA7RUsFXLj+CMUztNPRlSyxu+9v5XoRyj8aspMCuulfl1KwX8Qm8Ir3339f/EUo/L0vm0UqnB33/FPuI0Xt2F4SL/qvHdaTUO7m5vjwKYK90ZNQ3ick/ieXFvEb6SOhvJPCdt0vwV5pJ5R3CfBUCjnhaw6E4h/D7mg2IXzvb0LA9wIvFpDlYu9XD0KAG1aDARGT377oPwgBR3clEu5r9EYI6BBlEj6GzkaIiCItcRzuJtRGiDi3L5LwsV5shIjQixJXi91mVaCvVeCeRu09S6GSmsrbl6r9uytIaALcxEfl/FcPQkyUHto+hL2Vgiw8Cr8gwt5KYSaa8vw0z7eaV0JU9iQzTT4iuQf+ofW7K8ykpZDnMptQIbzLSoiJRATvakBDZ9vVKFxaBXJFRHWsdTJVmHDZTchuCsuNNysh6reQsykwF+KfAqZv0escxITL19G1An4umH0B/Oq6U8iiXahGRKZcTQo2aynYSIQmdi4KmquN2X4ji4zoQUFsp7/fQ6yJ2Ky5SqG2NLsAGxvYdmZXo8CJlPJ+Ci6E0yt0LqzU1oeOmlUWTiiMjIJXALAKXh1JtGTgKwBYha+hJ9jaZKgAYDIQpiPmKHGQqQpiWkfNVKQiC2OSBzxPmZEsvVQlOYgzlX01+Ll0F7N8Y76ikyN8PXyLszDmK7yMX/Hf0pY6p9YZq4Za9L70JFql8byVz3uwbfEhHa8Yn7syf4O1Dx0KX1OR42KMsyqsje+U1r2jtMnaessFJVFXGx/ppwk8SPWHm6u2m676TNd+fGqB+trCehQXMsYo7yVeOTQh/aUlSndIn3eJ0jXw3KJMIc+eipRBnh8WKQs8Ay5TDfAcv0wtwFiMIqVbXDxNmXrE04Cij8qUBsa1lSmLi00sVBUwvrRIPeNL/8dTzTNG+H+8b3vGeSN2NTqH5K/1itWXudO1Gvsqj/pR5gj4y7dIH4ju6rJI1YugUu1fzkzqiqgtOgXBrWSH3F/eU9qhiO7ztt5RadeBHnLXEnw12sIv0A6qS2jHQ/4h35PBvfwMIH5HO+SQ8teLaxtwF/tStGMeMHPjRr5NCivmrVqnXG6eBYVOj6GLNemf8vFZ3RRbpoUnzgbzXFOB003v6aK7GLXiP+pi0GdTeGkBnhgL24vs+Sd5LkZn4XFFtde/6tNQjy+wuT8pIk6oXzWGiNPUzX10E7GfftWJIppQuJSKdJFiKxy1vkhLYgFNSGzEd8Inr+befWv9UZQB5aq5R7GDcZURJSKctDjrJhL2NfDCCWkitIWz9iVhwSijkxK6qad+aXSSgufcpyq6PfHUoI02IrwyRKpiu2hvHeFYI8Kre6Qq1hTeWtCx/1nIRBOdagL1vGPT6aUYIYVfM1CTPfJx7jR9zwoawsG6+mHb5EcIg3cjhNv/Rwg//i3njpKfIIzeURIyMH+CMHrPTGjF+AVCwl1BgcnmFwgJ9z0FJptfIPz+t5x718onJN675t3ZlE9IvDvP+wPFE5LvP/T5ekonZNxh6bmHtHBCzj2kPj8BunJgspxvx7pL1nPGc8PZtlPuTsq7D9gzFItAnN19lHmns6/CSAHOqNrdvdj3cvucNqw7cHPIE6+QcLe61yvJTGEGy2PdBTy5AULvifKNLjefpzTw1UPeJZ8hBbzYiSlP8FfQzRn0n/nOsW4ajL6QofCZX9hD6PVp3DEYffWjIl0q4gP1Il7u4fcWXYiNmZiX11t46+Ke6r2ZPFpeLOrH9uZ6a+bt6RL5ixLEd1lxT70/nZ1WMgGgyRsITdhGEs4i/BXi9CXH3oGqGZQKeJTTloCXWI/ZozMCx6GkhZl0nhRyhGcO9w6VGKTN57QTs2AIS8bhOJnQg2ndh3gm6DZZXoi6ysIY5qNuj8mnnsGAOUKVFraWMB85LoR+rhtJedA9cnmcq3CmjKYH2DFOrmN1XrRZQJ21jSWQcLwpnLP5eMgcoiHrSPMpZgAhK/qAUHJMq0YCWQ9j/BE8w4YZX0GpSLRBJnXXbqCk/nD9fdwIko6UD6C1HXibnW4hFh0y3E0UP0aGWptL67EiJSfWbWWpCaMJNltCFBAn/2jF3ApEuUHnbhoay0mHZTdgGiE3jUw/soSN7ZumGoahqqqm6a3hp/qmuaPTIrlSywA+/ldiCjO9SCGCMGcpR59STdH0aLxM9UbdEpyXCOIN81Z0PPFJ7DNRRGVaAjKbT2ZjC2NG8zOKfQjiqNi81TkBdicg7nceMhV51GoAmGOYyOYcZUjDhU/pQsVuE6w6Fp6qUG4RYHR6K6jR8YEnsjE/hI2/3yBllBqL9w9NuKqjm0IOPFvBfeg5cijmqTFsytX6aKYcbtdcWSJzO/RU62j9d/2Q5vggKGsezNwtjX3UDfaRKWObpct6SHdFpk/dtctQrVavHY1Rxox2tYarYWk9tj9W/wHyKYDIdACaHQAAAABJRU5ErkJggg=="
                :
                //@ts-ignore
                orderDetails.workers[0].user.image }))

            navigation.navigate("Chat", {check:true,item:2
            })
            dispatch(setChatUserId(null))

        }
    }, [id,inspect])
       //@ts-ignore
 useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
   setInspect(false)
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);
     //@ts-ignore
     useEffect(() => {
        //@ts-ignore

        const unsubscribe = navigation.addListener('blur', () => {
            dispatch(setOrderDetails({}))


            //@ts-ignore

        });
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);
    const [isImageViewVisible, setisImageViewVisible] = useState(false)

    const view = require('../../assets/icons/view.png')
    const viewg = require('../../assets/icons/viewg.png')
    const { t } = useTranslation();
    const [chec, setCheck] = useState(false)
    const star = require('../../assets/icons/star.png')
    const dispatch = useDispatch()
    
    useEffect(() => {
        if (chec && !visible1) {
            setTimeout(function () { setCheck(false), setVisible1(true) }, 2000);
        }

    }, [chec, visible1]);
    //@ts-ignore
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            let l = []
            //@ts-ignore
            for (let i = 0; i < orderDetails.images.length; i++) {
                l.push({
                    source: {
                        //@ts-ignore
                        uri: orderDetails.images[i].image_url,
                    },
                    width: calcWidth(375),
                    height: calcHeight(400)
                })
            }
            //@ts-ignore
            setList(l)

        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, []);

    const language=useSelector(languageSelector)

    return (
        <>
            {!chec && Object.keys(orderDetails).length>0 ? <>
                <HeaderPage back={true} text={`Заказ ${
                    //@ts-ignore
                    orderDetails.suborder_name}`} />
                <ScrollView style={{ height: "auto", marginBottom: calcHeight(75) }}>
                    <View style={{ marginTop: calcHeight(5) }}>
                        <View style={styles.block5}>
                            <Text style={styles.status}>{
                                //@ts-ignore
                                orderDetails.status[languageIndex].value
                            }</Text>
                        </View>
                        <TouchableOpacity style={styles.touchView}>

                            <Text style={styles.textA} numberOfLines={3}>{
                                //@ts-ignore
                                orderDetails.description}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: calcHeight(14), marginLeft: calcWidth(18) }}>
                        <Clock />
                        <Text style={styles.clock}>{
                            //@ts-ignore
                            moment.utc(orderDetails.date).format("D MMM HH:mm")}</Text></View>
                    <Text style={{ color: "#FF5252", fontSize: calcFontSize(13), fontWeight: "bold", textDecorationLine: "underline", textAlign: "right", marginRight: calcWidth(57) }}>Отменить</Text>
                    <View style={{ flexDirection: "row", marginLeft: calcWidth(18), alignItems: "flex-end", marginBottom: calcHeight(15) }}>
                        <Text style={{ color: "#7C7C7C", fontSize: calcFontSize(24), fontWeight: "bold", marginRight: calcWidth(17) }}>{
                            //@ts-ignore
                            orderDetails.price
                        } <Text style={{ fontSize: calcFontSize(14) }}> gel</Text></Text>
                        <Master />
                    </View>
                    {
                        //@ts-ignore
                        orderDetails.images.length > 0 ? <View style={{ height: calcHeight(160), alignItems: "center", marginTop: calcHeight(28), marginBottom: calcHeight(35) }}>
                            <ScrollView
                                showsHorizontalScrollIndicator={false}
                                horizontal={true}
                                contentContainerStyle={{}}
                            >
                                {//@ts-ignore
                                    orderDetails.images.map((elem) => {
                                        return <TouchableOpacity onPress={() => { setisImageViewVisible(true) }}>
                                            <Image
                                                source={{ uri: elem.image_url }}
                                                style={{ width: calcWidth(114), height: calcHeight(158,), marginHorizontal: calcWidth(10) }} />
                                        </TouchableOpacity>
                                    })}
                            </ScrollView>
                        </View> : null}
                    {//@ts-ignore
                        orderDetails.services.map((elem) => {
                            return <View style={{
                                marginHorizontal: calcWidth(10),
                                backgroundColor: "#dcdeef",
                                width: calcWidth(355),
                                height: 'auto',
                                borderRadius: 50,
                                marginBottom: calcHeight(10)
                                // marginBottom: i == (serviceList.length - 1) ? calcHeight(100) : calcHeight(10),
                            }}>
                                <View style={{ flexDirection: "row", marginTop: calcHeight(15), marginLeft: calcWidth(19) }}>
                                    <Image source={{ uri: elem.image }} style={{ height: calcHeight(57), width: calcWidth(54) }} />
                                    <View style={{ marginLeft: calcWidth(33) }}>
                                        <View style={{
                                            flexDirection: "row",
                                        }}>
                                            <Text numberOfLines={1} style={{ color: "#7C7C7C", fontSize: calcFontSize(12), fontWeight: "bold", }}>
                                                {elem.service_name!==undefined? elem.service_name[languageIndex].value:elem.name[languageIndex].value}</Text>


                                        </View>
                                        {/* <Text

                                    style={{ width: calcWidth(185), height: calcHeight(30), color: "#FFAD40", fontSize: calcFontSize(10), fontWeight: "normal", marginTop: calcHeight(8) }}>{elem.description}</Text> */}
                                        <View style={{ flexDirection: "row", alignItems: "flex-end", marginVertical: calcHeight(15) }}>

                                            <Text style={{ color: "#7C7C7C", fontSize: 14, fontWeight: "bold" }}>Стоимость</Text>

                                            <Text style={{ color: "#212121", fontSize: 24, fontWeight: "bold", marginLeft: elem.stock ? calcWidth(0) : calcWidth(11) }}>{
                                                //@ts-ignore
                                                elem.price}<Text style={{ fontSize: 18, color: "#24A322" }}> gel
                                                </Text></Text>

                                        </View>
                                    </View>

                                </View>

                            </View>
                        })

                    }
                    {//@ts-ignore
                        orderDetails.products.map((elem) => {
                            return <View style={{ width: calcWidth(355), marginHorizontal: calcWidth(10), backgroundColor: "#dee9ed", borderRadius: 50, flexDirection: "row", paddingVertical: calcHeight(20), paddingHorizontal: calcWidth(15), marginBottom: calcHeight(10) }}>
                                <Image
                                    style={{ width: calcWidth(68), height: calcHeight(70), borderRadius: 35 }}
                                    source={{ uri: elem.image }}
                                />
                                <View style={{ marginLeft: calcWidth(10) }}>
                                    <Text>{elem.name[languageIndex].value}</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={styles.heading1}>Стоимость</Text>
                                        <Text style={styles.view}>{elem.price}</Text>
                                        <Text style={styles.name} > gel</Text>
                                    </View>
                                </View>
                            </View>
                        })

                    }
                    <ImageView
                        animationType="fade"
                        images={list}
                        imageIndex={0}
                        isVisible={isImageViewVisible}
                        onClose={() => { setisImageViewVisible(false) }}
                    />
                    {
                        //@ts-ignore
                        orderDetails.workers !== undefined && orderDetails.workers.length > 0 &&
                        <>

                            <View style={{ marginLeft: calcWidth(17), marginTop: calcHeight(33) }}>
                                <View style={{ flexDirection: "row" }}>
                                    <View style={{}}>
                                        <ImageBackground source={view} style={{ height: calcHeight(17), width: calcWidth(40), position: 'absolute', zIndex: 1, flexDirection: "row", alignItems: "center" }}  >
                                            <View style={{ marginLeft: calcWidth(3) }} >
                                                <Image source={star} style={{ height: calcHeight(10), width: calcWidth(10) }} />
                                            </View>
                                            <Text style={{ fontStyle: 'normal', fontWeight: '300', fontSize: calcFontSize(10), color: "rgba(0, 0, 0, 0.5)", }}>{
                                                //@ts-ignore
                                                orderDetails.workers[0].rating==null?
    0:               
    //@ts-ignore
    orderDetails.workers[0].rating                         
                                            }</Text>
                                        </ImageBackground>
                                        <TouchableOpacity
                                        onPress={()=>{
                                               //@ts-ignore
                                        navigation.navigate('UserPage', {
                                            //@ts-ignore
                                            check: false, user_id: orderDetails.workers[0].user.user
                                        })
                                        }}
                                        >
                                        <Image
                                            source={{
                                                //@ts-ignore
                                                uri: orderDetails.workers[0].user.image==null || orderDetails.workers[0].user.image.length == 0 || orderDetails.workers[0].user.image.slice(0, 5) !== "https" ?
                                                    "data:image/png;base64,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"
                                                    :
                                                    //@ts-ignore
                                                    orderDetails.workers[0].user.image
                                            }}
                                            style={{ height: 87, width: 87, borderRadius: 43 }}
                                        />
                                        </TouchableOpacity>
                                        {//@ts-ignore
                                            orderDetails.workers[0].user.is_pro ? <ImageBackground source={viewg} style={{ height: calcHeight(17), width: calcWidth(32), position: 'absolute', zIndex: 1, justifyContent: "center", alignItems: "center", left: 50, bottom: calcHeight(15) }}  >
                                                <Text style={{ color: "white", fontSize: calcFontSize(10) }}>Pro</Text>
                                            </ImageBackground>
                                                :
                                                null

                                        }
                                    </View>
                                    <View style={{ marginLeft: calcWidth(21) }}>
                                        <Text style={{ color: "#212121", fontSize: calcFontSize(18), fontWeight: "bold" }}>{
                                            //@ts-ignore
                                            orderDetails.workers[0].user.first_name} {
                                                //@ts-ignore
                                                orderDetails.workers[0].user.last_name} </Text>
                                        <Text style={{ color: "#24A322", fontWeight: "bold", fontSize: calcFontSize(12), marginTop: calcHeight(4), marginBottom: calcHeight(7) }}>Исполнитель</Text>
                                        <View style={{ flexDirection: "row", width: "40%", justifyContent: "space-between", }}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    Linking.openURL(`tel:${
                                                        //@ts-ignore 
                                                        orderDetails.workers[0].user.phone_number}`)
                                                }}
                                            >
                                                <PhoneCall width={35} height={35} />
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setVisible(false), setVisible1(false),
                                                    //@ts-ignore
                                                    dispatch(getRoomForUser({ user_id: orderDetails.workers[0].user.user, is_with_admin: false }))

                                                    // navigation.navigate("Messages") 
                                                }}

                                            >
                                                <Edit width={35} height={35} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row",  justifyContent: "space-around", alignItems: "center", marginVertical: calcHeight(15), }}>
                                <Text
                                    onPress={() => { setVisible(true) }}
                                    style={{ textDecorationLine: "underline", fontSize: calcFontSize(18), fontWeight: "bold", color: "#F2C94C" }}>Заказ выполнен</Text>
                                <Text
                                    //@ts-ignore
                                    onPress={() => { setVisible(false), setVisible1(false), navigation.navigate('Request', { id: orderDetails.suborder_id, number: orderDetails.order_number }) }}
                                    style={{ textDecorationLine: "underline", fontSize: calcFontSize(12), fontWeight: 'normal', color: "#FF5252" }}>проблема с заказом</Text>
                            </View>
                        </>
                    }
                </ScrollView>
                <Modal
                    backdropColor="transparent"
                    onBackdropPress={() => { setVisible(false) }}
                    isVisible={visible}
                    animationIn={'slideInLeft'}
                    animationOut={'slideOutLeft'}
                    style={{ alignItems: "center", justifyContent: "center" }}
                >
                    <View style={{
                        height: '50.4%', width: calcWidth(318), backgroundColor: "white",
                        borderRadius: 30,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 1,
                        },
                        shadowOpacity: 0.20,
                        shadowRadius: 1.41,
                        elevation: 2,
                    }}>
                        <Text style={{
                            marginTop: '8%',
                            marginHorizontal: calcWidth(29), color: "#212121", fontSize: calcFontSize(18), fontWeight: "bold", textAlign: "center"
                        }}>Вы потверждаете  выполнение заказа № { //@ts-ignore
                                orderDetails.order_number}?</Text>
                        <Text style={{ marginTop: calcHeight(10), color: "#24A322", fontSize: calcFontSize(24), fontWeight: "bold", textAlign: "center" }}>50 gel </Text>
                        <View style={{ alignItems: "center", marginTop: calcHeight(18) }}>
                            <SimpleButton
                                text={'Да, оплатить мастеру'}
                                big={true}
                                onPress={() => {
                                    setVisible(false),
                                        setCheck(true);
                                    //@ts-ignore
                                    //  handleInspector()
                                }}
                            />
                        </View>
                        <View style={{ alignItems: "center", marginTop: calcHeight(31) }}>
                            <SimpleButton
                                text={'Оплата наличными'}
                                big={true}
                                background={true}
                                onPress={() => {
                                    setVisible(false)
                                    //  handleInspector()
                                }}
                            />
                        </View>
                        <TouchableOpacity
                            onPress={() => { setVisible(false) }}
                            style={{ alignItems: "center", marginTop: '4.4%' }}>
                            <Delete />
                        </TouchableOpacity>
                    </View>
                </Modal>
                <Modal
                    backdropColor="transparent"
                    onBackdropPress={() => { setVisible1(false) }}
                    isVisible={visible1}
                    animationIn={'slideInLeft'}
                    animationOut={'slideOutLeft'}
                    style={{ alignItems: "center", justifyContent: "center" }}
                >
                    <View style={{
                        height: calcHeight(392), width: calcWidth(318), backgroundColor: "white",
                        borderRadius: 30,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 1,
                        },
                        shadowOpacity: 0.20,
                        shadowRadius: 1.41,
                        elevation: 2,
                    }}>
                        <View style={{ alignItems: "center", marginTop: calcHeight(50) }}>
                            <Check />
                        </View>
                        <Text style={{
                            marginTop: calcHeight(10),
                            marginHorizontal: calcWidth(29), color: "#212121", fontSize: calcFontSize(18), fontWeight: "bold", textAlign: "center"
                        }}>Оплата прошла успешно!</Text>
                        <View style={{ alignItems: "center", marginTop: calcHeight(31) }}>
                            <SimpleButton
                                text={'Оставить отзыв'}
                                big={true}
                                background={true}
                                onPress={() => {
                                    //@ts-ignore
                                    setVisible(false), setVisible1(false),
                                        //@ts-ignore
                                        navigation.navigate('RatingScreen', { user_id: orderDetails.workers[0].user.user, suborder_id: orderDetails.suborder_id })
                                }}
                            />
                        </View>
                        <View style={{ alignItems: "center", marginTop: calcHeight(18) }}>
                            <SimpleButton
                                text={'Спасибо!'}
                                big={true}
                                onPress={() => {
                                    setVisible(false), setVisible1(false),
                                        //@ts-ignore
                                        navigation.navigate('UserPage', {
                                            //@ts-ignore
                                            check: false, user_id: orderDetails.workers[0].user.user
                                        })
                                }}
                            />
                        </View>


                    </View>

                </Modal>
            </> : <Text
                style={{ fontSize: calcFontSize(24), fontWeight: "bold", textAlign: "center", textAlignVertical: "center" }}>
                    Автоматическая оплата с карты
                     </Text>
            }
        </>
    );
};

export default OrderItem;
