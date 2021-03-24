import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView, Image, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector, } from 'react-redux';
import { NavigationScreenProp, TabRouter } from 'react-navigation';
import { calcFontSize, calcHeight, calcWidth } from "../../utils/demensios"
import Modal from 'react-native-modal';
//import { TouchableOpacity } from 'react-native-gesture-handler';
import HeaderPage from '../../components/HeaderPage';
//@ts-ignore
import Clock from "../../assets/icons/clock.svg"
//@ts-ignore
import Trash from "../../assets/icons/trash1.svg"
import { useTranslation } from 'react-i18next';
import Popup from '../../components/Popup';
import { deleteOrderById, getOrders, getOrderStatus, checkOrderSubOrders, getSuborderDetails, setOrders, setOrderDetails, setSubOrders } from '../../store/actions/orderAction';
import { orderDetailsSelector, orderSelector, statusListSelector, subOrdersSelector } from '../../store/selector/orderSelector';
import { loadingSelector } from '../../store/selector/mainSelector';
import { setLoading } from '../../store/actions/mainActions';
import { log } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
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
    //  image:{ height: calcHeight(65), width: calcWidth(65) },
    title: { color: "#212121", fontSize: calcFontSize(13), fontWeight: 'bold', marginTop: calcHeight(-45) },
    footer: { position: 'absolute', right: 27, alignItems: 'flex-end' },
    // number:{ color: "#212121", fontSize: calcFontSize(12), fontWeight: 'bold', },
    status: { color: "#212121", fontSize: calcFontSize(13), fontWeight: 'bold', marginTop: calcHeight(9) },
    block1: { width: calcWidth(355), marginHorizontal: calcWidth(10), height: "auto", borderRadius: 50 },
    item: { flexDirection: "row", marginLeft: calcWidth(27), marginRight: calcWidth(47), marginTop: calcHeight(16) },
    title1: { color: "#212121", fontSize: calcFontSize(12), width: calcWidth(189) },
    image: { height: calcHeight(49), width: calcWidth(47), marginLeft: calcWidth(43) },
    block2: { flexDirection: "row", marginHorizontal: calcWidth(32), marginTop: calcHeight(11), justifyContent: 'space-between', alignItems: "center", marginBottom: calcHeight(15) },
    price: { color: "#7C7C7C", fontSize: calcFontSize(24), fontWeight: 'bold' },
    svg: { flexDirection: "row", alignItems: "center", justifyContent: "flex-end", marginRight: calcWidth(38), marginTop: calcHeight(15) },
    clock: { color: "#212121", fontSize: calcFontSize(9), fontWeight: '300', marginRight: calcWidth(10), marginLeft: calcWidth(5) },
    number: { color: "#212121", fontSize: calcFontSize(12), fontWeight: 'bold' },
    deadline: { color: "#24A322", fontSize: calcFontSize(9), fontWeight: '300', textAlign: "right", marginBottom: calcHeight(10), marginRight: calcWidth(73) }
});

const Orders: React.FunctionComponent<Props> = (route) => {

    const navigation=useNavigation()
    const orders = useSelector(orderSelector)
    const orderDetails=useSelector(orderDetailsSelector)
    const statuses = useSelector(statusListSelector)
    const [value, setValue] = useState(null);
    const [visible, setVisible] = useState(false)
    const loading=useSelector(loadingSelector)
    const suborders=useSelector(subOrdersSelector)
    const { t } = useTranslation();
    const dispatch = useDispatch()

    //@ts-ignore
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setVisible(false)
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, []);
        //@ts-ignore
        useEffect(() => {
            dispatch(setOrders({ list: [], status: false, load: false }))
            dispatch(setLoading(true))
            dispatch(getOrders({ start_index: 0, status_id: null, load: false, limit: 10 }))
            dispatch(getOrderStatus())
            dispatch(setOrderDetails([]))
            dispatch(setSubOrders([]))
        }, []);
        useEffect(() => {
            //@ts-ignore
            if(route.route.params.new!==undefined){
                dispatch(setOrders({ list: [], status: false, load: false }))
                dispatch(setLoading(true))
                dispatch(getOrders({ start_index: 0, status_id: null, load: false, limit: 10 }))
                dispatch(getOrderStatus())
            }
  
        }, [
            //@ts-ignore
            route.route.params
        ]);   
    
    useEffect(() => {
        if(Object.keys(orderDetails).length !== 0 ){
            dispatch(setLoading(false))
            navigation.navigate('OrderItem')
        }
    }, [orderDetails]);
    useEffect(() => {
        if(Object.keys(suborders).length !== 0 ){
            dispatch(setLoading(false))
            navigation.navigate('OrderItemList')
        }
    }, [suborders]);

    let mustWait = false
    //@ts-ignore
    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };
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
            {orders.length > 0 || statuses.length > 0 ?
                <>

                    <View style={{ flexDirection: "row", alignItems: 'flex-end', marginTop: calcHeight(37), marginHorizontal: '5%', }}>
                        <Text style={{ width: "38%", color: "#FF5252", fontSize: calcFontSize(24), fontWeight: "bold", }}>{t('orders')}</Text>
                        <View style={{ width: '40%', }}>

                            <Popup items={statuses}
                                visible={visible}
                                setVisibile={(value: boolean) => { setVisible(value) }}
                                onSelect={(value: any) => {
                                    setValue(value)
                                    dispatch(setLoading(true))
                                    dispatch(setOrders({ list: [], status: false, load: false }))
                                    dispatch(getOrders({ start_index: 0, status_id: value, limit: 10 }))

                                }}
                            />
                        </View>

                    </View>
                    <ScrollView
                        style={{ marginTop: calcHeight(38), }}
                        onScroll={({ nativeEvent }) => {
                            if (isCloseToBottom(nativeEvent)) {
                                if (orders.length % 10 == 0) {
                                    if (mustWait) return
                                    mustWait = true

                                   !loading&& dispatch(getOrders({ start_index: orders.length, status_id: value, load: true, limit: 10 }))
                                    dispatch(setLoading(true))

                                    // dispatch(loadDataByPage({ ...filter, a: loadDataParam,opportunityTypeStatuses:opportunityTargetStatuses}, OpportunitiesActionTypes.SET_OPPORTUNITIES as string))
                                }
                            }
                        }}
                    >
                        {orders.map((elem, i) => {
                            return <TouchableOpacity
                                key={i}
                                onPress={() => {
                                    dispatch(setLoading(true))
                                    dispatch(checkOrderSubOrders({id:elem.order_id}))
                                   // navigation.navigate("OrderItemList", { order_number: elem.order_number, order_id: elem.order_id, suborder_id: elem.suborder_id })
                                }}
                                style={[styles.block1, { backgroundColor: elem.status_key == "CNC" ? "#B9B9B9" : elem.status_key == "DN" ? "#EEF4F6" : "#E3E3E3", marginBottom: i == (orders.length - 1) ? calcHeight(100) : calcHeight(20) }]}>

                                {elem.order_id !== null ? <TouchableOpacity
                                    onPress={() => {
                                        Alert.alert(
                                            "Alert Title",
                                            "My Alert Msg",
                                            [
                                                {
                                                    text: "Cancel",
                                                    onPress: () => console.log("Cancel Pressed"),
                                                    style: "cancel"
                                                },
                                                { text: "OK", onPress: () => dispatch(deleteOrderById({ id: elem.order_id, start_index: orders.length - 1, status_id: value, load: true, limit: 1 })) }
                                            ],
                                            { cancelable: false }
                                        );
                                    }}
                                    style={{
                                        position: "absolute", right: 9, top: 0, backgroundColor: "white", width: calcWidth(27), height: calcHeight(27), borderRadius: 13.5, alignItems: "center", justifyContent: "center"
                                        , shadowOffset: {
                                            width: 0,
                                            height: 1,
                                        },
                                        shadowOpacity: 0.20,
                                        shadowRadius: 1.41,

                                        elevation: 7,
                                    }}>

                                    <Trash />
                                </TouchableOpacity> : null}
                                <View style={styles.item}>
                                    <Text style={styles.title1} numberOfLines={3}>{elem.description}</Text>
                                    {/* <Image source={{ uri: elem.image }} style={styles.image} /> */}
                                </View>
                                <View style={styles.svg}>
                                    <Clock />
                                 
                                    <Text style={styles.clock}>{ elem.date.toString()}</Text>
                                    <Text style={styles.number}>№ {elem.order_number}</Text>
                                </View>
                                <View style={styles.block2}>
                                    <Text style={styles.price}>{elem.price}<Text style={{ fontSize: calcFontSize(14) }}> gel</Text></Text>

                                    {elem.guarantee_date !== null ? <View style={{ justifyContent: "space-between", flexDirection: "row", width: "50%" }}>
                                        <View>
                                            <Text style={{ width: "100%", color: "#212121", fontSize: calcFontSize(9) }}>Гарантийный перод
                               </Text>
                                            <Text style={{ textDecorationLine: "underline", fontWeight: "bold", color: "#212121", fontSize: calcFontSize(9), textAlign: "right" }}> {elem.guarantee_date}</Text>
                                        </View>
                                        {elem.is_active !== null ? <Text style={{ color: "#24A322", fontSize: calcFontSize(9) }}>{elem.is_active}</Text> : null}
                                    </View> : null}
                                    <Text style={styles.number}>{elem.status}</Text>
                                </View>


                            </TouchableOpacity>
                        })}
                    </ScrollView>
                </>
                : null}
        </View>
    );
};

export default Orders;
