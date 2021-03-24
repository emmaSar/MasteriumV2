import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView, Image, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector, } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import { calcFontSize, calcHeight, calcWidth } from "../../utils/demensios"

import HeaderPage from '../../components/HeaderPage';

import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { subCategoryListSelector } from '../../store/selector/categorySelector';
import { orderDetailsSelector, suborderDetailsListSelector, subOrdersSelector } from '../../store/selector/orderSelector';
import { getSuborderDetails, getSubOrderDetailsById, setSuborderDetails, setSubOrders } from '../../store/actions/orderAction';
import Modal from 'react-native-modal';

import { setLoading } from '../../store/actions/mainActions';
import { languageSelector, loadingSelector } from '../../store/selector/mainSelector';
import { chooseLanguageIndex } from '../../utils/config';
interface Props {
    navigation: NavigationScreenProp<any, any>;
}

const styles = StyleSheet.create({
    screen: { backgroundColor: 'rgba(255, 255, 255, 0.6)', flex: 1 },

    block: {
        borderRadius: 100, height: calcHeight(135),
        width: calcWidth(355),
        paddingHorizontal: calcWidth(25),
        marginBottom: calcHeight(33), alignItems: 'center', flexDirection: "row"
    },
    //  image:{ height: calcHeight(65), width: calcWidth(65) },
    title: { color: "#212121", fontSize: calcFontSize(13), fontWeight: 'bold', marginTop: calcHeight(-45) },

    // number:{ color: "#212121", fontSize: calcFontSize(12), fontWeight: 'bold', },
    block1: { width: calcWidth(355), marginHorizontal: calcWidth(10), height: calcHeight(100), borderRadius: 50 },
    item: { flexDirection: "row", marginLeft: calcWidth(27), marginRight: calcWidth(47), marginTop: calcHeight(16) },
    title1: { color: "#212121", fontSize: 13, fontWeight: 'bold' },
    image: { height: calcHeight(43), width: calcWidth(41), marginLeft: calcWidth(80) },
    price: { color: "#7C7C7C", fontSize: calcFontSize(24), fontWeight: 'bold', marginTop: calcHeight(8) },
});

const OrderItemList: React.FunctionComponent<Props> = (route) => {

    const orderDetails = useSelector(orderDetailsSelector)
    const loading=useSelector(loadingSelector)
    const navigation = useNavigation()
    const languageIndex=chooseLanguageIndex()

    const suborder = useSelector(subOrdersSelector)
    useEffect(() => {
        if (Object.keys(orderDetails).length !== 0) {
            dispatch(setLoading(false))
            navigation.navigate('OrderItem')
        }
    }, [orderDetails]);
    const language=useSelector(languageSelector)


    const { t } = useTranslation();
    const dispatch = useDispatch()
    //@ts-ignore
    useEffect(() => {
        //@ts-ignore

        const unsubscribe = navigation.addListener('blur', () => {
            dispatch(setSubOrders([]))


            //@ts-ignore

        });
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);

    return (
        <View style={styles.screen}>
            <HeaderPage back={true} text={`Заказ №${
                //@ts-ignore
                suborder.order_number}`} />
            <Modal
                isVisible={loading}
                backdropColor="rgba(153, 153, 153,0.5)"
                style={{ height: 50, width: 50, position: "absolute", top: "40%", left: "40%" }}
            >
                <ActivityIndicator size="large" color="#FFAD40" />
            </Modal>
            <ScrollView style={{ marginTop: calcHeight(38), }}>
                { Object.keys(suborder).length>0&&
                    //@ts-ignore
                    suborder.suborders.map((elem, i) => {
                        return <TouchableOpacity
                            //@ts-ignore
                            onPress={() => { dispatch(getSubOrderDetailsById({ id: elem.suborder_id })); dispatch(setLoading(true)) }}
                            style={[styles.block1, {
                                backgroundColor: '#EEF4F6', marginBottom: i == (
                                    //@ts-ignore
                                    suborder.suborders.length - 1) ? calcHeight(100) : calcHeight(20)
                            }]}>
                            <View style={styles.item}>
                                <View>
                                    <Text style={styles.title1} numberOfLines={1}>{elem.status[languageIndex].value}</Text>
                                    <Text style={styles.price}>{elem.price}<Text style={{ fontSize: calcFontSize(14) }}> gel</Text></Text>
                                </View>
                                <View>
                                    <Image source={{ uri: elem.image }} style={styles.image} />
                                    {/* {elem.image!==undefined? <Text 
                                                    onPress={() => { navigation.navigate("OrderItem") }}

                            style={{color:"#FFAD40",fontSize:13,fontWeight:"bold",textDecorationLine:"underline",marginLeft:calcWidth(38)}}>
                                Читать описание
                            </Text>:null} */}
                                </View>
                            </View>
                        </TouchableOpacity>
                    })}
            </ScrollView>
        </View>
    );
};

export default OrderItemList;
