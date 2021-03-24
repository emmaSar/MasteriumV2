import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView, Image, Alert, SafeAreaView, TouchableOpacity, PermissionsAndroid } from 'react-native';
import { useDispatch, useSelector, } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import { calcFontSize, calcHeight, calcWidth } from "../../utils/demensios"
//@ts-ignore
import SimpleButton from '../../components/SimpleButton';
import HeaderPage from '../../components/HeaderPage';
import { useTranslation } from 'react-i18next';
//@ts-ignore
import Place from "../../assets/icons/placeOrange.svg"
//@ts-ignore
import Check from "../../assets/icons/check.svg"
import MapView, { Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import Modal from 'react-native-modal';
//@ts-ignore
import GPS from "../../assets/icons/gps.svg"
import GetLocation from 'react-native-get-location'
import { addAddress, getAddresses } from '../../store/actions/mainActions';
import { addressesSelector } from '../../store/selector/mainSelector';

//import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
    navigation: NavigationScreenProp<any, any>;
}

const styles = StyleSheet.create({
    screen: { backgroundColor: 'rgba(255, 255, 255, 0.6)', flex: 1, justifyContent: "space-between" },
    map: {},
    middle: { marginLeft: calcWidth(17), marginRight: calcWidth(36), marginTop: calcHeight(26) },
    back: { marginTop: calcHeight(23), marginLeft: calcWidth(24) },
    plus: { marginTop: calcHeight(57), marginBottom: calcHeight(8) },
    text: { color: '#7C7C7C', fontSize: 14, fontWeight: 'bold', lineHeight: 19 },
    footer: { alignItems: 'center', justifyContent: "flex-end", marginBottom: calcHeight(137) },
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

const AddStreet: React.FunctionComponent<Props> = ({ navigation }) => {


    const [visible, setVisible] = useState(false)
    const { t } = useTranslation();


    const [initialMarker, changeInitialMarker] = useState({

        latitude: 54.1684465,
        longitude: 37.5956478,

    })
    var map: Object | null;

    const dispatch = useDispatch()
    const adresses=useSelector(addressesSelector)
    const [status, setStatus] = useState(adresses.length>0?false:true)
    const [address, setAddress] = useState("г. Москва. проспект Ясенево, дом 124..")

    function getAdressName(e: any) {
        //@ts-ignore
        Geocoder.init("AIzaSyCfNWAyY1xKJWCvmatPaOLENMkZyIGYK1Q")
        //@ts-ignore 
        Geocoder.from(e.latitude, e.longitude)
            //@ts-ignore
            .then(json => {
                setAddress(json.results[0].formatted_address)
                setVisible(true)
            })
    }

    async function getLocation() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                // {
                //   title: "Cool Sound Permission",
                //   message:
                //     "Cool Photo App needs access to your camera " +
                //     "so you can take awesome pictures.",
                //   buttonNeutral: "Ask Me Later",
                //   buttonNegative: "Cancel",
                //   buttonPositive: "OK"
                // }
            );

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {

                GetLocation.getCurrentPosition({
                    enableHighAccuracy: true,
                    timeout: 15000,
                })
                    .then(location => {

                        var latlng = {
                            latitude: location.latitude,
                            longitude: location.longitude,
                            latitudeDelta: 0.1,
                            longitudeDelta: 0.1,
                        }
                        changeInitialMarker(latlng)
                        getAdressName(latlng)
                        //@ts-ignore
                        map !== null && map.animateToRegion(latlng, 100);
                    })
                    .catch(error => {
                        const { code, message } = error;
                        console.warn(code, message);
                    })
            }
        }
        catch (err) {
            //console.warn(err);
        }
    }
    //@ts-ignore

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setStatus(adresses.length>0?false:true)
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);

    return (
        <View style={styles.screen}>
            <HeaderPage back={true} />
            <View
                style={{
                    borderRadius: 7, width: calcWidth(355), overflow: "hidden",
                    height: calcHeight(270), marginHorizontal: calcWidth(10),
                }}>
                <MapView
                    ref={(ref) => ref !== null ? map = ref : null}
                    // zoomEnabled={false}
                    // zoomControlEnabled={false}
                    // onRegionChangeComplete={(e) => {
                    //   changeRegion(e)
                    // }}
                    // onLayout={() => {
                    onPress={(event) => { changeInitialMarker(event.nativeEvent.coordinate); getAdressName(event.nativeEvent.coordinate) }}
                    //   chnageMapReady(true)
                    // }}
                    // onPress={() => { setFilterCollapsing(false) }}
                    style={{ flex: 1 }}
                    //  minZoomLevel={50}
                    // maxZoomLevel={1000}
                    initialRegion={{
                        ...initialMarker,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    <Marker
                        coordinate={initialMarker}

                    >
                        <Place />
                    </Marker>
                </MapView>

            </View>
            <TouchableOpacity
                onPress={() => { getLocation() }}
                style={{ position: "absolute", height: 50, width: 50, right: 0, top: calcHeight(370) }}>
                <GPS width={20} height={20} fill="black" />
            </TouchableOpacity>
            <Modal
                backdropColor="transparent"
                onBackdropPress={() => { setVisible(false) }}
                isVisible={visible}
                animationIn={'slideInLeft'}
                animationOut={'slideOutLeft'}
                style={{ position: 'absolute', bottom: "49%", left: "3%", }}
            >
                <View style={{ backgroundColor: "white", height: calcHeight(65), width: calcWidth(316), borderRadius: 30, flexDirection: "row", paddingHorizontal: calcWidth(20), paddingVertical: calcHeight(20), justifyContent: "space-between", marginVertical: 0 }}>
                    <Place />
                    <View style={{ width: calcWidth(240), height: "auto", borderBottomColor: "rgba(33, 33, 33, 0.5)", borderBottomWidth: 1, alignItems: "center", paddingVertical: 0, justifyContent: 'flex-end' }}>
                        <Text style={{ width: calcWidth(218), color: "#000000", fontSize: calcFontSize(12), paddingVertical: 0, marginVertical: 0 }} numberOfLines={1}>{address}</Text>
                    </View>
                </View>
            </Modal>

            <TouchableOpacity
                onPress={() => {adresses.length>0? setStatus(!status):null}}
                style={{ backgroundColor: "#EEF4F6", height: calcHeight(38), width: calcWidth(355), marginHorizontal: calcWidth(10), borderRadius: 50, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <Text style={{ marginLeft: calcWidth(13), color: "#000000", fontSize: calcFontSize(12) }}>Выбрать как основную?</Text>
                {status ? <TouchableOpacity onPress={() => {adresses.length>0? setStatus(false) :null}} style={{ marginRight: calcWidth(5) }}>
                    <Check />
                </TouchableOpacity> :
                    <TouchableOpacity
                        onPress={() => { setStatus(true) }}
                        style={{ height: calcHeight(28), width: calcWidth(26), borderRadius: 14, borderWidth: 0.5, borderColor: "#212121", marginRight: calcWidth(5) }}></TouchableOpacity>}

            </TouchableOpacity>

            <View style={styles.footer}>
                <SimpleButton
                    text={t('save')}
                    big={true}
                    onPress={() => {
                        dispatch(addAddress({ address: address, longitude: initialMarker.longitude.toString(), latitude: initialMarker.latitude.toString(), is_primary: status }))

                        navigation.goBack()
                    }}
                />
            </View>
        </View>
    );
};

export default AddStreet;
