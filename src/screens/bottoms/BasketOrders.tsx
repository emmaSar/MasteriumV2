import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView, Image, Alert, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector, } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import { calcFontSize, calcHeight, calcWidth } from "../../utils/demensios"

import Header from '../../components/Header'
import Footer from '../../components/Footer';
import { loginSelector } from '../../store/selector/loginSelector';
import { spareSelector } from '../../store/selector/spareselector';
import { addSpare } from "../../store/actions/spareActions"
//@ts-ignore
import TextInputMask from 'react-native-text-input-mask';
//@ts-ignore
import SimpleButton from '../../components/SimpleButton';
//import { TouchableOpacity } from 'react-native-gesture-handler';
import HeaderPage from '../../components/HeaderPage';
//import { SafeAreaView } from 'react-native-safe-area-context';
//@ts-ignore
import Trash from "../../assets/icons/trash1.svg"
import { useTranslation } from 'react-i18next';
import Popup from '../../components/Popup';
//@ts-ignore
import Ominus from "../../assets/icons/minus.svg"
//@ts-ignore
import Oplus from "../../assets/icons/plus.svg"
//@ts-ignore
import Minus from "../../assets/icons/ominus.svg"
//@ts-ignore
import Plus from "../../assets/icons/oplus.svg"
import { orderListSelector } from '../../store/selector/orderSelector';
import { deleteOrder, setOrderList } from '../../store/actions/orderAction';
import { setIndex } from '../../store/actions/mainActions';
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
        borderRadius: 100, height: calcHeight(200),
        width: calcWidth(355),
        paddingHorizontal: calcWidth(25),
        marginBottom: calcHeight(33), alignItems: 'center', flexDirection: "row"
    },
    //  image:{ height: calcHeight(65), width: calcWidth(65) },
    title: { color: "#212121", fontSize: calcFontSize(13), fontWeight: 'bold', marginTop: calcHeight(-45) },
    footer: { position: 'absolute', right: 27, alignItems: 'flex-end' },
    // number:{ color: "#212121", fontSize: calcFontSize(12), fontWeight: 'bold', },
    status: { color: "#212121", fontSize: calcFontSize(13), fontWeight: 'bold', marginTop: calcHeight(9) },
    block1: { width: calcWidth(355), marginHorizontal: calcWidth(10), height: calcHeight(135), borderRadius: 50, },
    item: { flexDirection: "row", marginLeft: calcWidth(27), marginRight: calcWidth(47), marginTop: calcHeight(16) },
    title1: { color: "#212121", fontSize: calcFontSize(12), width: calcWidth(189) },
    image: { height: calcHeight(49), width: calcWidth(47), marginLeft: calcWidth(43) },
    block2: { flexDirection: "row", marginLeft: calcWidth(32), marginTop: calcHeight(11), marginRight: calcWidth(54), justifyContent: 'space-between', alignItems: "center", marginBottom: calcHeight(15) },
    price: { color: "#7C7C7C", fontSize: calcFontSize(24), fontWeight: 'bold' },
    svg: { flexDirection: "row", alignItems: "center", justifyContent: "flex-end", marginRight: calcWidth(38), marginTop: calcHeight(15) },
    clock: { color: "#212121", fontSize: calcFontSize(9), fontWeight: '300', marginRight: calcWidth(10), marginLeft: calcWidth(5) },
    number: { color: "#212121", fontSize: calcFontSize(12), fontWeight: 'bold' },
    deadline: { color: "#24A322", fontSize: calcFontSize(9), fontWeight: '300', textAlign: "right", marginBottom: calcHeight(10), marginRight: calcWidth(73) },
    countModal: { flexDirection: 'row', alignItems: 'center', },
    minusBlock: { height: 18, width: 18, alignItems: "center", justifyContent: "center" },
    countDetalBlock: { height: calcHeight(39), width: calcWidth(39), borderRadius: 10, borderWidth: 0.5, borderColor: "#000000", alignItems: "center", justifyContent: 'center', marginHorizontal: calcWidth(28) },
    countDetal: { color: "#212121", fontSize: calcFontSize(24) },

});

const BasketOrders: React.FunctionComponent<Props> = ({ navigation }) => {

    const [visible, setVisible] = useState(false)
    const orderList = useSelector(orderListSelector)
    const dispatch = useDispatch()
    
    const [chek_list, setCheckList] = useState([])
    const { t } = useTranslation();
    const items = [
        { label: 'Все', value: "0" },
        { label: 'Не оформленные', value: "1" },
        { label: 'На обработке', value: "2" },
    ]
    function _onPress(elem: any) {
        let a = [...chek_list]
        for (let i = 0; i < chek_list.length; i++) {
            //@ts-ignore
            if (chek_list[i].id == elem.id &&chek_list[i].type == elem.type ) {
                a.splice(i, 1)
                setCheckList(a)
                return
            }
        }
        //@ts-ignore
        a.push(elem)
        setCheckList(a)
        return
    }
    function _handleCkeck(id: number,type:number) {
        for (let i = 0; i < chek_list.length; i++) {
            //@ts-ignore
            if (chek_list[i].id == id&&chek_list[i].type == type) {
                return true
            }
        }
        return false
    }
    //@ts-ignore
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setCheckList([])
            setVisible(false)
        });
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);
    function minus(i: number, min: number) {
        let a = [...orderList];
        if (a[i].count > min) {
            a[i].count = a[i].count - 1
        }
        dispatch(setOrderList(a))
    }
    function plus(i: number, max: number) {
        let a = [...orderList];
        if (a[i].count < max) {
            a[i].count = a[i].count + 1
        }
        dispatch(setOrderList(a))
    }
    function inspect(){
        let subservice=[]
        let product=[]
        for(let i=0;i<chek_list.length;i++){
            //@ts-ignore
                if(chek_list[i].type==1){
                                //@ts-ignore

                    subservice.push({id:chek_list[i].id})
                }
                else{
                                //@ts-ignore

                    product.push({id:chek_list[i].id,quantity:chek_list[i].count})
                }
        }
      
        
       navigation.navigate('Create', { add: false,subservice:subservice,product:product,list:chek_list }) 
    }
     //@ts-ignore
     useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            dispatch(setIndex(undefined))
        });

        return unsubscribe;
    }, [navigation]);
    
    return (
        <View style={styles.screen}>
            <HeaderPage back={false} />
            <View style={{ flexDirection: "row", alignItems: 'flex-end', marginTop: calcHeight(37), marginHorizontal: '5%', }}>
                <Text
                    style={{ color: "#FF5252", fontSize: calcFontSize(24), fontWeight: "bold", width: "38%", }}>{t('orders')}</Text>
                <View style={{ width: '40%', }}>
                    <Popup items={items}
                        visible={visible}
                        setVisibile={(value: boolean) => { setVisible(value) }}
                    />
                </View>
            </View>
            <ScrollView style={{ marginTop: calcHeight(38), }} contentContainerStyle={{ alignItems: "center" }}>
                {orderList.map((elem, i) => {
                    return <View
                        //     onPress={() => { navigation.navigate("OrderItem")
                        //  }}
                        style={[styles.block1, { backgroundColor: '#EEF4F6',marginBottom:i==orderList.length-1?calcHeight(180):calcHeight(20) }]}>
                        <TouchableOpacity
                            onPress={() => { _onPress(elem) }}
                            style={{ position: "absolute", right: calcWidth(17), top: calcHeight(40), }}>
                            {!_handleCkeck(elem.id,elem.type) ? <Ominus /> : <Oplus />}
                            {/* <Text style={{ color: "white", fontSize: calcFontSize(18), fontWeight: "bold" }}>{elem.count}</Text> */}
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                Alert.alert(
                                    "Delete Order",
                                    "Do yo have delete order?",
                                    [
                                        {
                                            text: "Cancel",
                                            onPress: () => console.log("Cancel Pressed"),
                                            style: "cancel"
                                        },
                                        { text: "OK", onPress: () =>dispatch(deleteOrder(i)) }
                                    ],
                                    { cancelable: false }
                                );
                            }}
                            style={{
                                position: "absolute", right: calcWidth(17), bottom: 0, backgroundColor: "white", width: calcWidth(27), height: calcHeight(27), borderRadius: 13.5, alignItems: "center", justifyContent: "center"
                                , shadowOffset: {
                                    width: 0,
                                    height: 1,
                                },
                                shadowOpacity: 0.20,
                                shadowRadius: 1.41,

                                elevation: 7,
                            }}>

                            <Trash />


                        </TouchableOpacity>
                        <View style={styles.item}>
                            <Text style={styles.title1} numberOfLines={3}>{elem.title}</Text>
                        
                            {/* <Image source={{ uri: elem.image }} style={styles.image} /> */}
                        </View>
                        {elem.type==1?  <Text style={[styles.title1,{marginLeft: calcWidth(27),}]} numberOfLines={3}>{elem.description}</Text>:null}
                        {/* <View style={styles.svg}>
                            <Clock />
                            <Text style={styles.clock}>{elem.clock}</Text>
                            <Text style={styles.number}>№ {elem.number}</Text>
                        </View> */}
                        <View style={{ flexDirection: "row" }}>
                            <View style={styles.block2}>
                                <Text style={styles.price}>{elem.discounted_price}<Text style={{ fontSize: calcFontSize(14) }}> gel</Text></Text>
                            </View>
                            {elem.type == 0 ? <View style={styles.countModal}>
                                <TouchableOpacity onPress={() => { minus(i, elem.minimal_count) }} style={styles.minusBlock}>
                                    <Minus />
                                </TouchableOpacity>
                                <View style={styles.countDetalBlock}>
                                    <Text style={styles.countDetal}>{elem.count}</Text>
                                </View>
                                <TouchableOpacity onPress={() => { plus(i, elem.quantity) }} style={styles.minusBlock}>
                                    <Plus />
                                </TouchableOpacity>

                            </View>
                                : null
                            }
                        </View>
                    </View>
                })}

            </ScrollView>
            <View style={{ alignItems:"center",position:"absolute",bottom:calcHeight(120),left:calcWidth(77)}}>
                <SimpleButton
                    big={true}
                    onPress={() => { chek_list.length > 0 ? 
                        inspect()
                       
                        : null }}
                    text={`Оформить (${chek_list.length})`}
                />
            </View>
        </View>
    );
};

export default BasketOrders;
