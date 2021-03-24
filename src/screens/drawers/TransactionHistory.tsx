import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView, Image, Alert, SafeAreaView, ImageBackground, Linking, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector, } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import { calcFontSize, calcHeight, calcWidth } from "../../utils/demensios"
import HeaderPage from '../../components/HeaderPage';
import { getMyTransactions, getNextTransaction } from '../../store/actions/orderAction';
import { transactionSelector } from '../../store/selector/orderSelector';
import moment from 'moment';
import { setLoading } from '../../store/actions/mainActions';
import { languageSelector, loadingSelector } from '../../store/selector/mainSelector';
import Modal from "react-native-modal"
import { chooseLanguageIndex } from '../../utils/config';


interface Props {
    navigation: NavigationScreenProp<any, any>;
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.6)' },
    middle: { marginLeft: calcWidth(17), marginRight: calcWidth(36), marginTop: calcHeight(26) },
    back: { marginTop: calcHeight(24), marginLeft: calcWidth(24) },
    plus: { marginTop: calcHeight(57), marginBottom: calcHeight(8) },
    text: { color: '#7C7C7C', fontSize: 14, fontWeight: 'bold', lineHeight: 19 },
    footer: { alignItems: 'center', marginBottom: calcHeight(69), marginTop: calcHeight(51) },
    heading1: { color: '#7C7C7C', fontSize: 14, fontWeight: 'bold', lineHeight: 19, marginTop: calcHeight(7), },

    name: { fontSize: 18, fontWeight: 'bold', color: '#24A322', marginTop: calcHeight(5), marginLeft: calcWidth(9), },
    count: {
        fontSize: 24,
        marginLeft: calcWidth(18),
        paddingVertical: -calcHeight(15),
        fontWeight: 'bold',
        color: '#212121',
        borderBottomColor: 'rgba(33, 33, 33, 0.5)',
        //backgroundColor:'red',
        borderBottomWidth: 0.5
        //textDecorationLine: 'underline', textDecorationColor: 'rgba(33, 33, 33, 0.5)'
    },


});

const TransactionHistory: React.FunctionComponent<Props> = ({ navigation }) => {
    const dispatch = useDispatch()
    const transaction = useSelector(transactionSelector)
    const loading = useSelector(loadingSelector)
    const [list, setList] = useState([])
    const languageIndex=chooseLanguageIndex()

    //@ts-ignore
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            dispatch (setLoading(true))
            dispatch(getMyTransactions())

        });
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);
    useEffect(() => {
        if (Object.keys(transaction).length > 0) {
            let arr = []
            let t = transaction.results
            for (let i = 0; i < t.length; i++) {
                let obj = {
                    price: 0,
                    date: "",
                    products: []
                }
                obj.price = t[i].price
                obj.date =moment.utc( t[i].start_date).format("D.MM.Y")
                
                for (let j = 0; j < t[i].subservices.length; j++) {
                    obj.products.push({
                        //@ts-ignore
                        title: t[i].subservices[j].service_name[languageIndex].value,
                        //@ts-ignore
                        price: t[i].subservices[j].real_price
                    })
                }
                for (let j = 0; j < t[i].products.length; j++) {
                    obj.products.push({
                        //@ts-ignore
                        title: t[i].products[j].product_name[languageIndex].value,
                        //@ts-ignore
                        price: t[i].products[j].real_price
                    })
                }
                arr.push(obj)
            }
            //@ts-ignore
            setList(arr)
        }
    }, [transaction]);
        //@ts-ignore

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };
    let mustWait = false

    return (
        <View style={styles.screen}>
            <HeaderPage back={false} text="История транзакций" />
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
                    if (transaction.results.length  !==transaction.count && transaction.next!==null) {
                        if (mustWait) return
                        mustWait = true
                     !loading&& dispatch(getNextTransaction({body:transaction.next}))
                    //   !loading&& dispatch(getOrders({ start_index: orders.length, status_id: value, load: true, limit: 10 }))
                        dispatch(setLoading(true))
  
                        // dispatch(loadDataByPage({ ...filter, a: loadDataParam,opportunityTypeStatuses:opportunityTargetStatuses}, OpportunitiesActionTypes.SET_OPPORTUNITIES as string))
                    }
                }
            }}
            style={{ marginTop: calcHeight(38), }}>
                {
                    list.map((el, i) => {
                        return <View
                            key={i}
                            style={{
                                width: calcWidth(355),
                                marginHorizontal: calcWidth(10),
                                paddingVertical:calcHeight(15),
                               // height: calcHeight(147),
                                backgroundColor: "#EEF4F6",
                                borderRadius: 50,
                                paddingTop: calcHeight(13),
                                paddingLeft: calcWidth(41),
                                marginBottom: i == (list.length - 1) ? calcHeight(100) : calcHeight(24),

                            }}
                        >
                            <Text style={{ color: "#24A322", fontSize: 13, fontWeight: "bold" }}>Покупка</Text>
                            {
                                //@ts-ignore
                                el.products.map((item,i) => {
                                    return <View 
                                    key={i}
                                    style={{ flexDirection: "row" }}>
                                        <Text style={{ width: "60%", color: "#212121", fontSize: 13, fontWeight: "bold" }}>{item.title}</Text>
                                        <Text style={{ width: "40%", color: "#7C7C7C", fontSize: 14, fontWeight: "bold" }}>{item.price} gel</Text>

                                    </View>
                                })
                            }
                            <View style={{ marginTop: '3.5%', flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" }}>
                                <Text style={{ width: "60%", color: "#212121", fontSize: 13, fontWeight: "bold" }}>{
                                    //@ts-ignore
                                    el.date}</Text>
                                <Text style={{ width: "60%", color: "#FF5252", fontSize: 24, fontWeight: "bold" }}>{
                                    //@ts-ignore
                                    el.price} gel</Text>

                            </View>
                        </View>
                    })
                }
            </ScrollView>
        </View>
    );
};

export default TransactionHistory;
