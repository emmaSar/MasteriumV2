import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView, Image, Alert, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import { useDispatch, useSelector, } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import { calcFontSize, calcHeight, calcWidth } from "../../utils/demensios"

import HeaderPage from '../../components/HeaderPage';

import { spareServiceSelector } from '../../store/selector/spareserviceSelector';
import { deleteSpareService } from '../../store/actions/spareserviceActions';

import { useTranslation } from 'react-i18next';
//@ts-ignore

import Ominus from "../../assets/icons/ominus.svg"
//@ts-ignore

import Oplus from "../../assets/icons/oplus.svg"
//@ts-ignore

import Basket from "../../assets/icons/basketAdd.svg"
//@ts-ignore
import ImageView from 'react-native-image-view';
import { useNavigation } from '@react-navigation/native';
import { productsListSelector } from '../../store/selector/productsSelector';
import { addOrder } from '../../store/actions/orderAction';
import navigationService from '../../services/NavigationService';

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
    all: { marginTop: calcHeight(20), marginLeft: calcWidth(10), marginRight: calcWidth(27), flexDirection: "row" },
    heading: { color: "#212121", fontSize: calcFontSize(18), fontWeight: "bold", marginLeft: calcWidth(45) },
    textinput: { borderBottomColor: "#4B4B4B", borderBottomWidth: 1, marginLeft: calcWidth(16), width: calcWidth(241) },
    block1: { width: '94.7%', backgroundColor: '#EFF0F8', borderRadius: 50, flexDirection: 'row', marginLeft: calcWidth(9), paddingLeft: calcWidth(11), paddingVertical: calcHeight(17), marginTop: calcHeight(15) },
    block2: { justifyContent: "space-between", marginLeft: calcWidth(17) },
    blockheading: { fontSize: 12, color: '#212121', marginBottom: calcHeight(35) },
    view: { width: calcWidth(47), borderBottomColor: 'rgba(33, 33, 33, 0.5)', borderBottomWidth: 0.5, marginLeft: calcWidth(80) },
    image: {
        marginLeft: '12.8%',
        height: calcHeight(200), width: '74.4%', borderRadius: 30,

    },
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
    countModal: { flexDirection: 'row', alignItems: 'center', marginLeft: calcWidth(30), },
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
    textA: { color: "#212121", fontSize: calcFontSize(12), flex: 1 },
    circle: {
        backgroundColor: 'white', width: calcWidth(56), height: calcHeight(56),
        shadowColor: 'black', justifyContent: 'center', alignItems: 'center',
        // shadowOpacity: 1,
        elevation: 5, position: 'absolute', right: 26, bottom: -25,
        borderRadius: 28
    },
    imageItem: {
        flexDirection: 'row', marginTop: calcHeight(20), marginBottom: calcHeight(7),
        // backgroundColor:'red'
    },
    // image: {
    //     marginLeft: '12.8%',
    //     height: calcHeight(200), width: '74.4%', borderRadius: 30
    // },
    minus: { marginLeft: calcWidth(-20), marginTop: calcHeight(-5), height: calcHeight(35) },
});

const AddBasket: React.FunctionComponent<Props> = (route) => {

    const navigation = useNavigation()
    const dispatch = useDispatch()
    const { t } = useTranslation();
    const productsList = useSelector(productsListSelector)

    const [check, setCheck] = useState(false)
     //@ts-ignore
     let index = route.route.params.index
    const item=productsList[index]
   
    //@ts-ignore

    const list = []
    for (let i = 0; i < item.images.length; i++) {
        list.push(
            {
                source: {
                    uri:item.images.image_url,
                },
                width: calcWidth(375),
                height: calcHeight(400)
            },
        )
    }
    const [countDetal, setcountDetal] = useState(item.minimal_count)
    function _onpresMinus() {
        if (countDetal > item.minimal_count) {
            setcountDetal(countDetal - 1)
        }
    }
    function _onpresPlus() {
        if (countDetal < item.quantity) {
        setcountDetal(countDetal + 1)
        }
    }
    const [counter, setCounter] = useState(30);
    const [isImageViewVisible, setisImageViewVisible] = useState(false)
    return (
        <View style={styles.screen}>
            <HeaderPage back={true} text={item.title} />
            <View style={{ height: calcHeight(180), marginTop: calcHeight(33) }}>
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                //style={}
                >
                    {list.map((elem, i) => {
                        return <TouchableOpacity onPress={() => { setisImageViewVisible(true) }}>
                            <Image
                                source={elem.source}
                                style={{ width: calcWidth(245), height: calcHeight(177,), marginRight: calcWidth(68), marginLeft: i == 0 ? calcWidth(65) : 0 }} />
                        </TouchableOpacity>
                    })}
                </ScrollView>
            </View>
            <ImageView
                //   backgroundColor="#dedede"
                animationType="fade"
                images={list}
                imageIndex={0}
                isVisible={isImageViewVisible}
                onClose={() => { setisImageViewVisible(false) }}
            //W    renderFooter={(currentImage: any) => (<View><Text>My footer</Text></View>)}
            />
            <View
                style={{
                    backgroundColor: "#EEF4F6",
                    width: calcWidth(355), marginHorizontal: calcWidth(10),
                    height: calcHeight(76),
                    marginTop: calcHeight(27),
                    borderRadius: 30
                }}>
                <Text style={{ marginLeft: calcWidth(20), marginRight: calcWidth(13), marginVertical: calcHeight(14), fontSize: calcFontSize(12), color: "#212121" }} numberOfLines={4}>{item.description}</Text>

            </View>
            <View style={{ marginTop: calcHeight(68), marginLeft: calcWidth(22), marginRight: calcWidth(52), flexDirection: "row", justifyContent: "space-between" }}>
                <View style={{ flexDirection: "row", alignItems: 'flex-end' }}>
                    <Text style={{ color: "#212121", fontSize: calcFontSize(24), fontWeight: "bold", borderBottomColor: "rgba(33, 33, 33, 0.5)", borderBottomWidth: 0.5 }}>{item.discounted_price}</Text>
                    <Text style={{ color: "#24A322", fontSize: calcFontSize(24), fontWeight: "bold", marginLeft: calcWidth(8) }}>gel</Text>
                </View>
                <View style={styles.countModal}>
                    <TouchableOpacity onPress={() => { _onpresMinus() }} style={styles.minusBlock}>
                        <Ominus />
                    </TouchableOpacity>
                    <View style={styles.countDetalBlock}>
                        <Text style={styles.countDetal}>{

                            countDetal}</Text>
                    </View>
                    <TouchableOpacity onPress={() => { _onpresPlus() }} style={styles.minusBlock}>
                        <Oplus />
                    </TouchableOpacity>

                </View>
            </View>
            <View style={{ alignItems: "center", flex: 1 }}>
                <TouchableOpacity
                    onPress={() => {                         
                        dispatch(addOrder({...item,count:countDetal,type:0}))
                        navigationService.navigate('BasketOrders') }}
                    style={{ position: "absolute", bottom: calcHeight(109) }}>
                    <Basket />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AddBasket;
