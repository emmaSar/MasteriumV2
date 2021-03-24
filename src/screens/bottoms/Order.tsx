import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView, Image, Alert, SafeAreaView, TouchableOpacity, Dimensions, ImageBackground, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector, } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import { calcFontSize, calcHeight, calcWidth } from "../../utils/demensios"

import HeaderPage from '../../components/HeaderPage';
//@ts-ignore
import Plus from "../../assets/icons/plus.svg"
//@ts-ignore

import Search from "../../assets/icons/search.svg"
//@ts-ignore

import X from "../../assets/icons/x.svg"


import { useNavigation } from '@react-navigation/native';
import { getServiceList, setLoading, setServiceList } from '../../store/actions/serviceAction';
import { loadingSelector, serviceListSelector } from '../../store/selector/serviceSelector';
import { addOrder } from '../../store/actions/orderAction';
import AsyncStorage from '@react-native-community/async-storage';
import { orderListSelector } from '../../store/selector/orderSelector';
import Modal from 'react-native-modal';
import { languageSelector } from '../../store/selector/mainSelector';
import { chooseLanguageIndex } from '../../utils/config';


interface Props {
    navigation: NavigationScreenProp<any, any>;
}

const styles = StyleSheet.create({
    screen: { backgroundColor: 'rgba(255, 255, 255, 0.6)', flex: 1 },
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    plus: { marginTop: calcHeight(30), marginBottom: calcHeight(8) },
    text: { color: '#7C7C7C', fontSize: 14, fontWeight: 'bold', lineHeight: 19 },
    heading1: {
        color: '#7C7C7C', fontSize: 14, fontWeight: 'bold', lineHeight: 19,
        marginTop: calcHeight(15),
    },

    name: { fontSize: 18, fontWeight: 'bold', color: '#24A322', marginTop: calcHeight(5), marginLeft: calcWidth(9), },
    count: {
        fontSize: 24,
        marginLeft: calcWidth(18),
        paddingVertical: -calcHeight(15),
        fontWeight: 'bold',
        color: '#212121',
        borderBottomColor: 'rgba(33, 33, 33, 0.5)',
        width: calcWidth(47),
        //backgroundColor:'red',
        borderBottomWidth: 0.5
        //textDecorationLine: 'underline', textDecorationColor: 'rgba(33, 33, 33, 0.5)'
    },
    all: { marginTop: calcHeight(20), marginLeft: calcWidth(28), marginRight: calcWidth(27), flexDirection: "row" },
    heading: { color: "#212121", fontSize: calcFontSize(18), fontWeight: "bold", marginLeft: calcWidth(45) },
    textinput: { borderBottomColor: "#4B4B4B", borderBottomWidth: 1, marginLeft: calcWidth(16), width: calcWidth(241) },
    block1: { width: '94.7%', backgroundColor: '#EFF0F8', borderRadius: 50, flexDirection: 'row', marginLeft: calcWidth(9), paddingLeft: calcWidth(11), paddingVertical: calcHeight(17), marginTop: calcHeight(15) },
    block2: { justifyContent: "space-between", marginLeft: calcWidth(17) },
    blockheading: { fontSize: 12, color: '#212121', marginBottom: calcHeight(35) },
    view: { width: calcWidth(47), borderBottomColor: 'rgba(33, 33, 33, 0.5)', borderBottomWidth: 0.5, marginLeft: calcWidth(80) },
    image: { position: 'absolute', right: 0, },
    modal: { position: 'absolute', marginLeft: 0, left: 9, top: 100 },
    modalView: {
        width: calcWidth(355), height: calcHeight(300), backgroundColor: "#EFF0F8", borderRadius: 50, shadowColor: "#000",
        // paddingLeft:calcWidth(33),
        // paddingVertical:calcHeight(30),
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },
    input: { width: calcWidth(320), marginTop: calcHeight(30), marginLeft: calcWidth(13), height: calcHeight(151), backgroundColor: "#FFFFFF", borderRadius: 30, },
    textName: { marginLeft: calcWidth(30), marginTop: calcHeight(30) },
    countModal: { flexDirection: 'row', alignItems: 'center', marginLeft: calcWidth(30), marginTop: calcHeight(33) },
    minusBlock: { height: 18, width: 18, alignItems: "center", justifyContent: "center" },
    countDetalBlock: { height: calcHeight(39), width: calcWidth(39), borderRadius: 10, borderWidth: 0.5, borderColor: "#000000", alignItems: "center", justifyContent: 'center', marginHorizontal: calcWidth(28) },
    countDetal: { color: "#212121", fontSize: calcFontSize(24) },
    add: { position: 'absolute', right: 6, bottom: 60 },
    block3: { flexDirection: 'row', position: 'absolute', bottom: 30, left: 34 },
    image1: { height: calcHeight(76), width: calcWidth(76), borderRadius: 39, },
    texta: { marginLeft: 28, color: "#FFAD40", fontSize: calcFontSize(12), fontWeight: 'bold' },
    footer1: { alignItems: 'center', marginBottom: calcHeight(25), },
    image2: { height: calcHeight(56), width: calcWidth(56), borderRadius: 28, },
    heading2: { color: "#242424", fontSize: calcFontSize(18), fontWeight: 'bold' },
    nameText: { color: "#242424", fontSize: calcFontSize(18), fontWeight: 'bold' },
    number: { color: "rgba(36, 36, 36, 0.5)", fontSize: calcFontSize(13), fontWeight: '300' },
    i: { marginLeft: calcWidth(39), marginTop: calcHeight(20) },
    edit: { marginLeft: calcWidth(16.8), marginTop: calcHeight(20) },
    block5: {
        backgroundColor: "white", height: calcHeight(30), width: calcWidth(168), alignItems: "center", justifyContent: "center", borderRadius: 30, shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2, position: 'absolute', right: 16, marginTop: calcHeight(12)
    },
    status: { color: "#212121", fontSize: calcFontSize(13), fontWeight: 'bold' },
    touchView: {
        backgroundColor: '#EEF4F6',
        borderRadius: 10, height: calcHeight(76),
        width: calcWidth(355),
        marginHorizontal: calcWidth(10),
        paddingLeft: calcWidth(20),
        paddingTop: calcHeight(14),
        paddingRight: calcWidth(13),
        marginRight: calcWidth(13),

        marginTop: calcHeight(38)
    },
    textA: { color: "#212121", fontSize: calcFontSize(12), flex: 1 }
});

const OrderScreen: React.FunctionComponent<Props> = (route) => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    // useEffect(() => {
    //     //@ts-ignore

    //     dispatch(getServiceList(route.route.params.id))
    // }, [])
    const languageIndex=chooseLanguageIndex()
    
    let serviceList = useSelector(serviceListSelector)
    let loading= useSelector(loadingSelector)
    // useEffect(() => {
    //     setLoading(false)

    // }, [serviceList])
        //@ts-ignore
        useEffect(() => {
            const unsubscribe = navigation.addListener('focus', () => {
                dispatch(setServiceList([]))
                //@ts-ignore
                dispatch(getServiceList(route.route.params.id))
                dispatch(setLoading(true))
            });
    
            // Return the function to unsubscribe from the event so it gets removed on unmount
            return unsubscribe;
        }, []);
           //@ts-ignore
    useEffect(() => {
        //@ts-ignore

        const unsubscribe = navigation.addListener('blur', () => {
            dispatch(setServiceList([]))

            //@ts-ignore

        });
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);
    let [list, setList] = useState([])
    const language=useSelector(languageSelector)

    const [search, setSearch] = useState(false)
    const orderList=useSelector(orderListSelector)
    function check(i: number, index: number) {

        let array = [...list]
        //@ts-ignore

        array[i].works[index].status = !array[i].works[index].status

        setList(array)
    }
    const [index, setIndex] = useState()
    const [selectwork, setwork] = useState(null)
   
    return (
        <View style={styles.screen}>
            <HeaderPage back={true} />
            <Modal
                isVisible={loading}
                backdropColor="rgba(153, 153, 153,0.5)"
                style={{ height: 50, width: 50, position: "absolute", top: "40%", left: "40%" }}
            >
                <ActivityIndicator size="large" color="#FFAD40" />
            </Modal>
            <View style={styles.all}>
                <TouchableOpacity onPress={() => { setSearch(true) }}><Search /></TouchableOpacity>
                {!search ? <Image
                    style={{ width: calcWidth(96), height: calcHeight(101), marginLeft: calcWidth(88) }}
                    source={{
                        //@ts-ignore
                        uri: route.route.params.image
                    }} />
                    : <View style={styles.textinput}>
                        <TextInput style={{ paddingVertical: 0 }} />
                    </View>
                }
                {search ? <TouchableOpacity
                    onPress={() => { setSearch(false) }}
                    style={{ marginLeft: calcWidth(10) }}>
                    <X />
                </TouchableOpacity> : null}


            </View>

            <ScrollView style={{ marginTop: calcHeight(41) }}>
                { serviceList.map((elem, i) => {
                    return <TouchableOpacity
                        onPress={() => {
                            setwork(null)
                            //@ts-ignore
                            i != index ? setIndex(i) : setIndex(null)
                        }}
                        style={{
                            marginHorizontal: calcWidth(10),
                            backgroundColor: "#EFF0F8",
                            width: calcWidth(355),
                            height: 'auto',
                            borderRadius: 50,
                            marginBottom: i == (serviceList.length - 1) ? calcHeight(100) : calcHeight(10),
                        }}>
                        <View style={{ flexDirection: "row", marginTop: calcHeight(15), marginLeft: calcWidth(19) }}>
                            <Image source={{ uri: elem.icon }} style={{ height: calcHeight(57), width: calcWidth(54) }} />
                            <View style={{ marginLeft: calcWidth(33) }}>
                                <View style={{
                                    flexDirection: "row",
                                }}>
                                    <Text numberOfLines={1} style={{ color: "#7C7C7C", fontSize: calcFontSize(12), fontWeight: "bold", }}>{elem.title}</Text>
                                    {elem.has_discount ? <View style={{ marginTop: calcHeight(3), marginLeft: calcWidth(11) }}>
                                        <ImageBackground
                                            source={require('../../assets/icons/stockView.png')}
                                            style={{ width: calcWidth(48), height: calcHeight(13), justifyContent: "center", alignItems: "center" }}>
                                            <Text style={{ color: "white", fontSize: calcFontSize(9), }}>Скидка</Text>
                                        </ImageBackground>
                                    </View> : null}

                                </View>
                                <Text

                                    style={{ width: calcWidth(185), height: calcHeight(30), color: "#FFAD40", fontSize: calcFontSize(10), fontWeight: "normal", marginBottom: index == i ? selectwork == null ? calcHeight(31) : calcHeight(6) : calcHeight(20), marginTop: calcHeight(8) }}>{elem.description}</Text>

                            </View>

                        </View>
                        {i == index ? <>
                            {selectwork !== null ?
                                <>
                                    <TouchableOpacity
                                        style={{ position: "absolute", right: 8, top: "30%" }}
                                        onPress={() => {
                                            //@ts-ignore
                                            //    route.route.params.stock===true?
                                            check(i, selectwork)
                                            //   : navigation.navigate("Create")
                                        }}>
                                        <TouchableOpacity onPress={() => {
                                            Alert.alert(
                                                "ADD",
                                                "ADD",
                                                [
                                                    {
                                                        text: "Cancel",
                                                        onPress: () => console.log("Cancel Pressed"),
                                                        style: "cancel"
                                                    },
                                                    {
                                                        text: "OK", onPress: () => {
                                                            
                                                            dispatch(addOrder({
                                                                //@ts-ignore 
                                                                title: elem.subservices[selectwork].title[languageIndex].value,
                                                                description:elem.title,
                                                                //@ts-ignore 
                                                                measurement_type: elem.subservices[selectwork].subservice_details.measurement_type[languageIndex].value,                                                               //@ts-ignore 
                                                                subservice_type: elem.subservices[selectwork].subservice_details.subservice_type[languageIndex].value,
                                                                //@ts-ignore 
                                                                id: elem.subservices[selectwork].subservice_details.id,
                                                                //@ts-ignore 

                                                                discounted_price: elem.subservices[selectwork].discounted_price,

                                                                //@ts-ignore
                                                                //  discounted_price: elem.subservices[selectwork].discounted_price,
                                                                type: 1
                                                            }))
                                                            
                        AsyncStorage.setItem('orders', JSON.stringify([...orderList,{
                            //@ts-ignore 
                            title: elem.subservices[selectwork].title[languageIndex].value,
                            description:elem.title,
                            //@ts-ignore 
                            measurement_type: elem.subservices[selectwork].subservice_details.measurement_type[languageIndex].value,                                                               //@ts-ignore 
                            subservice_type: elem.subservices[selectwork].subservice_details.subservice_type[languageIndex].value,
                            //@ts-ignore 
                            id: elem.subservices[selectwork].subservice_details.id,
                            //@ts-ignore 

                            discounted_price: elem.subservices[selectwork].discounted_price,

                            //@ts-ignore
                            //  discounted_price: elem.subservices[selectwork].discounted_price,
                            type: 1
                        }]))
                                                        }
                                                    }
                                                ],
                                                { cancelable: true }
                                            );
                                        }}>
                                            <Plus />
                                        </TouchableOpacity>
                                        {/* {
                                        //@ts-ignore
                                    !elem.works[selectwork].status ? <Plus /> : <Minus />} */}
                                    </TouchableOpacity>
                                    <View style={{ flexDirection: "row", marginLeft: calcWidth(106), alignItems: "flex-end", marginBottom: calcHeight(28) }}>

                                        <Text style={{ color: "#7C7C7C", fontSize: 14, fontWeight: "bold" }}>Стоимость</Text>
                                        {elem.has_discount ?
                                            <Text


                                                style={{ color: "#FF5252", fontSize: 14, fontWeight: 'bold', textDecorationLine: "line-through", marginHorizontal: calcWidth(6) }}>{  //@ts-ignore
                                                    elem.subservices[selectwork].discounted_price}
                                            </Text> : null}
                                        <Text style={{ color: "#212121", fontSize: 24, fontWeight: "bold", marginLeft: elem.stock ? calcWidth(0) : calcWidth(11) }}>{
                                            //@ts-ignore
                                            elem.subservices[selectwork].discounted_price}<Text style={{ fontSize: 18, color: "#24A322" }}> gel <Text style={{ fontSize: 14, color: "#7C7C7C" }}> {elem.subservices[selectwork].subservice_details.measurement_type[languageIndex].value}</Text></Text></Text>

                                    </View>
                                </>
                                : null}
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}

                                style={{ marginHorizontal: calcWidth(45), marginBottom: calcHeight(28), flexDirection: "row" }}>
                                {
                                    //@ts-ignore

                                    elem.subservices.map((e, ind) => {
                                     

                                        return <TouchableOpacity
                                            onPress={
                                                //@ts-ignore
                                                () => { ind != selectwork ? setwork(ind) : setwork(null) }}
                                            style={{ marginRight: calcWidth(13), width: calcWidth(126), height: calcHeight(26), backgroundColor: selectwork == ind ? "#FFAD40" : "white", borderWidth: 0.5, borderColor: "#A9A9A9", borderRadius: 50, alignItems: "center", justifyContent: "center" }}>
                                            <Text style={{ color: "#212121", fontSize: 12 }}>{e.subservice_details.subservice_type[languageIndex].value}</Text>
                                        </TouchableOpacity>
                                    })}
                            </ScrollView>
                        </> : null}
                    </TouchableOpacity>
                })}
            </ScrollView>
        </View>
    );
};

export default OrderScreen;
