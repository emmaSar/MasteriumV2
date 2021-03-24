import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView, Image, Alert, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector, } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import { calcFontSize, calcHeight, calcWidth } from "../../utils/demensios"
import { spareSelector } from '../../store/selector/spareselector';
import SimpleButton from '../../components/SimpleButton';
import HeaderPage from '../../components/HeaderPage';
import { useTranslation } from 'react-i18next';
//@ts-ignore
import Place from "../../assets/icons/place.svg"
//@ts-ignore
import Check from "../../assets/icons/check.svg"
//@ts-ignore
import Plus from "../../assets/icons/plus.svg"
import { useNavigation } from '@react-navigation/native';
import { getAddresses, setAddresses, setLoading, setPrimaryAddress } from '../../store/actions/mainActions';
import { addressesSelector, loadingSelector } from '../../store/selector/mainSelector';
import { createOrder } from '../../store/actions/orderAction';
import { neworderSelector } from '../../store/selector/orderSelector';
import Modal from 'react-native-modal';


//import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
    navigation: NavigationScreenProp<any, any>;
}

const styles = StyleSheet.create({
    screen: { backgroundColor: 'rgba(255, 255, 255, 0.6)', flex: 1 },
    middle: { marginLeft: calcWidth(17), marginRight: calcWidth(36), marginTop: calcHeight(26) },
    back: { marginTop: calcHeight(23), marginLeft: calcWidth(24) },
    plus: { marginTop: calcHeight(57), marginBottom: calcHeight(8) },
    text: { color: '#7C7C7C', fontSize: 14, fontWeight: 'bold', lineHeight: 19 },
    footer: { alignItems: 'center', marginBottom: calcHeight(69), justifyContent: "flex-end", marginTop: calcHeight(416) },
    heading1: { color: '#7C7C7C', fontSize: 14, fontWeight: 'bold', lineHeight: 19, marginTop: calcHeight(7), },
    block: {
        backgroundColor: "#EEF4F6",
        borderRadius: 50, height: calcHeight(40),
        width: calcWidth(355),
        marginHorizontal: calcWidth(10), justifyContent: "center",
        marginTop: calcHeight(33),
    },
    block1: { marginRight: calcWidth(13), marginLeft: calcWidth(16), flexDirection: "row", alignItems: 'center', },
    image1: { height: calcHeight(37), width: calcWidth(30) },
    location: { width: calcWidth(210), marginLeft: calcWidth(23) },
    block2: { position: 'absolute', right: 0 },
    image2: { height: calcHeight(37), width: calcWidth(30) },
    phoneBlock: { position: 'absolute', top: calcHeight(390), alignItems: "center", width: "100%" },
    image: { height: calcHeight(48), width: calcWidth(46.6) },
    texta: { width: calcWidth(174), color: "#7C7C7C", fontWeight: "bold", fontSize: calcFontSize(14), textAlign: "center", marginTop: calcHeight(13.4) }
});

const LocationWorks: React.FunctionComponent<Props> = (route) => {
    const [error, setError] = useState(false)
    //@ts-ignore
    const [status, setStatus] = useState(route.route.params.create)
    const { t } = useTranslation();
    const addresses = useSelector(addressesSelector)
    const navigation = useNavigation()
    const neworder = useSelector(neworderSelector)
    const loading=useSelector(loadingSelector)
    let start_date=""
    //@ts-ignore
    if(route.route.params.selectedHours!==undefined){
    //@ts-ignore
    let h = route.route.params.selectedHours.toString().length > 1 ? route.route.params.selectedHours.toString() : `0${route.route.params.selectedHours}`
    //@ts-ignore
    let m = route.route.params.selectedMinut.toString().length > 1 ? route.route.params.selectedMinut.toString() : `0${route.route.params.selectedMinut}`
    //@ts-ignore
     start_date = route.route.params.date + " " + h + ":" + m
    }
    useEffect(() => {
        //@ts-ignore

        setStatus(route.route.params.create)

    }, [ //@ts-ignore
        route.route.params]);
    useEffect(() => {
        if (neworder.length > 0) {
            dispatch(setLoading(false))
            navigation.navigate("SuccessCreateOrder")
        }

    }, [neworder]);
    useEffect(()=>{
    dispatch(getAddresses())
    },[])

    const dispatch = useDispatch()

    function _onPress(index: number) {
        let l = [...addresses]
        if (status && l[index].is_primary == true) {
            l[index].is_primary = false
            setError(true)
        } else {
            setError(false)
            l[index].is_primary = true

        }

        for (let i = 0; i < l.length; i++) {
            if (i !== index) {
                l[i].is_primary = false
            }

        }
        console.log(l[index],"l[index]l[index]l[index]l[index]");
        
       dispatch(setPrimaryAddress({id:l[index].id}))
        dispatch(setAddresses(l))
    }
    function handleInspector() {
        for (let i = 0; i < addresses.length; i++) {
            if (addresses[i].is_primary == true) {
                //setId()
               
                    //@ts-ignore  
                    route.route.params.check == true ? 
                    dispatch(setLoading(true))&&
                        dispatch(createOrder({
                            //@ts-ignore  
                            description: route.route.params.description,
                            //@ts-ignore  
                            image: route.route.params.image,
                            //@ts-ignore  
                            start_date: start_date,
                            //@ts-ignore  
                            address_id: addresses[i].id,
                            subservice: [],
                            product: []
                        })) :
                        navigation.navigate('Allorders',{
                             //@ts-ignore
              description: route.route.params.description,
              //@ts-ignore
              image: route.route.params.image,
              start_date: start_date,
              address_id: addresses[i].id,
              //@ts-ignore
              subservice: route.route.params.subservice,
              //@ts-ignore
              product: route.route.params.product,
              //@ts-ignore
              list:route.route.params.list,

                        })
                

                
                break
            }
        }

    }

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
            <ScrollView style={{ marginTop: calcHeight(61) }}>
                {addresses.map((elem, i) => {
                    return <TouchableOpacity
                        key={i}
                        onPress={() => { _onPress(i) }}
                        style={[styles.block, { borderWidth: error ? 1 : 0, borderColor: error ? "#FF5252" : "" }]}>
                        <View style={styles.block1}>
                            <Place />
                            <Text style={styles.location} numberOfLines={1}>{elem.address}</Text>
                            <View style={styles.block2}>
                                {elem.is_primary ? <Check /> : <View style={{ height: calcHeight(28), width: calcWidth(28), borderRadius: 14, borderWidth: 0.5, borderColor: "#212121" }}></View>}
                            </View>
                        </View>
                    </TouchableOpacity>
                })

                }
                <TouchableOpacity style={{ marginTop: calcHeight(38), alignItems: "center" }} onPress={() => { navigation.navigate("AddStreet") }}>
                    <Plus />
                    <Text style={{ color: "#7C7C7C", fontSize: calcFontSize(14), fontWeight: "bold" }}>{t('addastreet')}</Text>
                </TouchableOpacity>

            </ScrollView>
            {
                status ?
                    <View style={{ position: "absolute", bottom: 137, alignItems: "center", width: "100%" }}>
                        <SimpleButton
                            text={t('next')}
                            big={true}
                            onPress={() => {
                                !error && ( handleInspector() )
                                
                            }}
                        />
                    </View> : null
            }
        </View>
    );
};

export default LocationWorks;
