import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView, Image, Alert, SafeAreaView, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector, } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import { calcFontSize, calcHeight, calcWidth } from "../../utils/demensios"


import HeaderPage from '../../components/HeaderPage';

interface Props {
    navigation: NavigationScreenProp<any, any>;
}

import { categoryListSelector } from '../../store/selector/categorySelector';
import LinearGradient from 'react-native-linear-gradient';
import { setIndex } from '../../store/actions/mainActions';
import { getProductList, getProductSubCategoryList, setLoading } from '../../store/actions/products';
import { loadingSelector, productsListSelector } from '../../store/selector/productsSelector';
import Modal from "react-native-modal"

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
        //    width: calcWidth(47),
        //backgroundColor:'red',
        borderBottomWidth: 0.5
        //textDecorationLine: 'underline', textDecorationColor: 'rgba(33, 33, 33, 0.5)'
    },
    all: { marginTop: calcHeight(30), marginLeft: calcWidth(28), marginRight: calcWidth(27), flexDirection: "row", justifyContent: "space-between" },
    heading: { color: "#212121", fontSize: calcFontSize(18), fontWeight: "bold", marginLeft: calcWidth(45) },
    textinput: { borderBottomColor: "#4B4B4B", borderBottomWidth: 1, marginLeft: calcWidth(16), width: calcWidth(241) },
    block1: { justifyContent: "space-between", marginLeft: calcWidth(17) },
    block2: { justifyContent: "space-between", marginLeft: calcWidth(17) },
    blockheading: { fontSize: 12, color: '#212121', marginBottom: calcHeight(35) },
    view: { width: calcWidth(47), borderBottomColor: 'rgba(33, 33, 33, 0.5)', borderBottomWidth: 0.5, marginLeft: calcWidth(80), paddingBottom: 0 },
    image: { height: calcHeight(110), width: calcWidth(108),resizeMode:"contain" },
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
    minusBlock: { height: 30, width: 30, alignItems: "center", justifyContent: "center", },
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

    item: { width: '94.7%', backgroundColor: '#EFF0F8', borderRadius: 50, flexDirection: 'row', marginLeft: calcWidth(9), paddingLeft: calcWidth(11), paddingVertical: calcHeight(19), marginTop: calcHeight(15) },

    name1: { fontSize: 12, color: '#212121', },
});

const OrdersList: React.FunctionComponent<Props> = ({ navigation }) => {
    const list = useSelector(productsListSelector)
    const dispatch=useDispatch()
     //@ts-ignore
     useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          

            dispatch(setIndex(undefined))
        });

        return unsubscribe;
    }, [navigation]);
    useEffect(()=>{
        dispatch(setLoading(true))
        dispatch(getProductList())
    },[])
    const loading=useSelector(loadingSelector)
    return (
        <View style={styles.screen}>

            <View style={{ marginBottom: calcHeight(36) }}>
                <HeaderPage back={false} />
            </View>
            <Modal
                isVisible={loading}
                backdropColor="rgba(153, 153, 153,0.5)"
                style={{ height: 50, width: 50, position: "absolute", top: "40%", left: "40%" }}
            >
                <ActivityIndicator size="large" color="#FFAD40" />
            </Modal>
            <ScrollView contentContainerStyle={{ width: "100%", height: "auto", alignItems: "flex-end" }}>
                {list.map((elem, i) => {
                  
                    return <TouchableOpacity 
                    onPress={()=>{
                        dispatch(getProductSubCategoryList(elem.id)),
                        dispatch(setLoading(true))
                        navigation.navigate("SubCategoryList",{index:i,title:elem.title,image:elem.image})}}
                    style={{
                        width: calcWidth(314),
                        height: calcHeight(148),
                        //  backgroundColor: "green",
                        marginBottom: i == list.length - 1 ? calcHeight(100) : calcHeight(26)
                        , marginRight: calcWidth(10)
                    }}>
                        <LinearGradient colors={[elem.color_one, elem.color_two]}
                            useAngle={true}
                            angle={186.33}
                            style={{ backgroundColor: "#FFAD40", width: "100%", height: "100%", borderRadius: 30, alignItems: "center" }}
                        >
                            <View style={{ position: "absolute", left: -40, top: "15%" }}>
                                <Image source={{ uri: elem.image }} style={styles.image}  />
                            </View>
                            <View style={{ marginTop: calcHeight(18),  alignItems: "flex-start", width: calcWidth(200),marginLeft:calcWidth(30) }}>
                                <Text style={{ color: "white", fontSize: calcFontSize(18), fontWeight: "bold", }}>{elem.title}</Text>
                                <Text style={{ color: "white", fontSize: calcFontSize(14), fontWeight: "normal", marginTop:calcHeight(15) }}>{elem.description}</Text>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                })}
            </ScrollView>
            {/* <HeaderPage back={true}  />
            <View style={styles.all}>
                <TouchableOpacity onPress={() => { setSearch(true) }}><Search /></TouchableOpacity>
                {!search ?        <Popup items={items}
                     visible={visible}
                     setVisibile={(value:boolean)=>{setVisible(value)}}
                />
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
            <ScrollView style={{marginTop:calcHeight(34),width:"100%",height:"auto",}}>
            {
                productsList.map((elem,i)=>{
                    
                    return <TouchableOpacity 
                    onPress={()=>{navigation.navigate('AddBasket',{index:i})}}
                    key={i}
                    style={[styles.item,{marginBottom:i==(productsList.length-1)?calcHeight(80):0}]} >
                        <Image source={{uri:elem.primaryImage}} style={styles.image} />
                        <View style={styles.block1}>
                <Text style={styles.name1}>{elem.title}</Text>
                <View style={{ flexDirection: "row",alignItems:"flex-end" }}>
                              
                              <Text style={{ color: "#7C7C7C", fontSize: 14, fontWeight: "bold" }}>Стоимость</Text>
                                           {elem.discounted_price!==elem.price ?
                          <Text


                              style={{ color: "#FF5252", fontSize: 14, fontWeight: 'bold',  textDecorationLine: "line-through" ,marginHorizontal:calcWidth(6)}}>{  //@ts-ignore
                                elem.price}
                          </Text> : null}
                              <Text style={{ color: "#212121", fontSize: 24, fontWeight: "bold", marginLeft:elem.discounted_price!==elem.price ?calcWidth(0): calcWidth(11) }}>{
                              //@ts-ignore
                              elem.discounted_price}<Text style={{ fontSize: 18, color: "#24A322" }}> gel <Text style={{ fontSize: 14, color: "#7C7C7C" }}> {elem.measurement}</Text></Text></Text>
                        
                          </View>
                            </View>
                            <TouchableOpacity
                            onPress={()=>{setElem(elem);}}
                            style={{position:"absolute",right:13,top:38}}>
                                <Plus />
                                </TouchableOpacity>
                        </TouchableOpacity>
                })
            }
          
                        </ScrollView> */}
        </View>
    );
};

export default OrdersList;
