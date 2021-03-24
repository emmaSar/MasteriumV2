import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView, Image, Alert, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import { useDispatch, useSelector, } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import { calcFontSize, calcHeight, calcWidth } from "../../utils/demensios"
import Header from '../../components/Header'
import Footer from '../../components/Footer';
import Swiper from 'react-native-swiper'

import { loginSelector } from '../../store/selector/loginSelector';
import { spareSelector } from '../../store/selector/spareselector';
import { addSpare } from "../../store/actions/spareActions"
//@ts-ignore
import TextInputMask from 'react-native-text-input-mask';
//@ts-ignore
import SimpleButton from '../../components/SimpleButton';
import HeaderPage from '../../components/HeaderPage';
//@ts-ignore
import Minus from "../../assets/icons/minus.svg"
//@ts-ignore
import Camera from "../../assets/icons/camera.svg"
import ImagePicker from 'react-native-image-crop-picker';
import { useTranslation } from 'react-i18next';
import Modal from 'react-native-modal';
//@ts-ignore
import Error from "../../assets/icons/error.svg"
import { useNavigation } from '@react-navigation/native';
import { setIndex } from '../../store/actions/mainActions';

interface Props {
    add:boolean
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

const Create: React.FunctionComponent<Props> = (route) => {
    //@ts-ignore

    useEffect(() => {
        //@ts-ignore
        if(route.add){
            
            setValue('')
            setAllImages([])
            setImages([])

            setError(false)

        }
    }, [
        //@ts-ignore
        route])
    const [visible, changeVisible] = useState(false)
  
    const [imagesList, setImages] = useState([])
    const [imagesAllList, setAllImages] = useState([])

    const onOpenPicker = () => {
        ImagePicker.openPicker({
            multiple: true,
            // width: 300,
            // height: 400,
            cropping: true,
            includeBase64: true,
        }).then((images: any) => {
            var array = [...imagesList];
            var list=[...imagesAllList]
            for (let i = 0; i < images.length; i++) {
                //@ts-ignore
                array.push(images[i].path)
                //@ts-ignore
                list.push(images[i])
            }
            changeVisible(false)
            setImages(array)
            setAllImages(list)
            // dispatch(setImage({images:array,index:route.params.index}))
        });
    }
    const onOpenCamera = () => {
        changeVisible(false)
        ImagePicker.openCamera({
            multiple: true,
            // width: 300, 
            // height: 400,
            cropping: true,
            includeBase64: true,
        }).then((img: any) => {
            let i = [...imagesList]
            let a=[...imagesAllList]
            //@ts-ignore
            i.push(img.path)
            //@ts-ignore
            a.push(img)
            setImages(i)
            setAllImages(a)
        });
    }
    function deleteElem(index: number) {
        let a = [...imagesList]
        let i=[...imagesAllList]
        a.splice(index, 1);
        i.splice(index,1)
        setImages(a)
        setAllImages(i)
        // dispatch(setImage({images:a,index:route.params.index}))
    }

    const [value, setValue] = useState("")
    const { t } = useTranslation();
    const [error, setError] = useState(false)
    const gallery = t("gallery")
    const cameraa = t("camera")
    const navigation=useNavigation()
    const dispatch=useDispatch()
    function handleInspector() {
        if (value.length < 1) {
            setError(true)
        }
        else {
            //setImages([])
            // setValue('')
            navigation.navigate('DateAndTime',{
                add:true,
                description:value,
                image:imagesAllList,
                //@ts-ignore
                subservice:route.route!==undefined ?route.route.params.subservice!==undefined?route.route.params.subservice:[]:[],
                //@ts-ignore
                product:route.route!==undefined ?route.route.params.product!==undefined?route.route.params.product:[]:[],
                //@ts-ignore
                list:route.route!==undefined ?route.route.params.list!==undefined?route.route.params.list:[]:[],
                //@ts-ignore
                check:route.route!==undefined?route.route.params.add:true
            })
            setError(false)
        }
    }
      //@ts-ignore
      useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            dispatch(setIndex(undefined))
        });

        return unsubscribe;
    }, [navigation]);
    return (
        <View style={[styles.screen, { paddingBottom: imagesList.length > 1 ? calcHeight(195) : 0 }]}>
            <HeaderPage back={true} />
            <Text style={{ marginTop: calcHeight(32), marginLeft: calcWidth(27), width: calcWidth(250), color: "#212121", fontWeight: "bold", fontSize: calcFontSize(18) }}>Подробно опишите задачу и её условия</Text>
            <View >
                <ScrollView style={{ marginBottom: calcHeight(72) }}>
                    <View
                        style={{
                            backgroundColor: "#EEF4F6",
                            width: calcWidth(355),
                            height: calcHeight(135),
                            paddingLeft: calcWidth(25),
                            marginTop: calcHeight(13),
                            paddingRight: calcWidth(13),
                            // paddingTop:calcHeight(37),
                            paddingBottom: calcHeight(20),
                            marginHorizontal: calcWidth(10),
                            borderRadius: 50
                        }}>
                        <TextInput
                            value={value}
                            onChangeText={(text) => { setValue(text) }}
                            style={{ fontSize: calcFontSize(12), color: "#212121" }}
                            multiline={true}

                        />
                        <TouchableOpacity style={styles.circle} onPress={() => { changeVisible(true) }} >
                            {/* <Image source={imagesList.length == 0 ? camera : redPlus} /> */}
                            <Camera />
                        </TouchableOpacity>
                        {error ? <View style={{ position: "absolute", right: 0 }}><Error /></View> : null}
                    </View>
                    <Modal
                        // contentContainerStyle={}
                        isVisible={visible}
                        style={{
                            position: "absolute",
                            bottom: 0,
                            width: "100%",
                            marginLeft: 0,
                            marginBottom: 0,
                            height: 50,
                            backgroundColor: "white",
                            // marginBottom:os=='ios'? 50:0
                        }}
                        onBackdropPress={() => { changeVisible(false) }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}
                        >
                            <TouchableOpacity style={{ width: "50%", height: "100%", alignItems: "center", justifyContent: "center" }} onPress={() => {
                                onOpenPicker()
                            }}>
                                {/* <GaleryIcon width={50} height={50} /> */}
                                <Text>{gallery}</Text>
                            </TouchableOpacity>
                            <View style={{ borderRightWidth: 1, borderColor: "black", height: calcHeight(50) }}></View>
                            <TouchableOpacity style={{ width: "50%", height: "100%", alignItems: "center", justifyContent: "center" }} onPress={() => { onOpenCamera() }}>
                                {/* <CameraIcon width={50} height={50} /> */}
                                <Text>{cameraa}</Text>
                            </TouchableOpacity>

                        </View>
                    </Modal>
                    <View style={{ marginTop: calcHeight(41), }} >
                        {
                            imagesList.map((elem: any, index: number) => {
                                return <View
                                    key={index}
                                    style={styles.imageItem}
                                >
                                    <Image source={{ uri: elem }} style={styles.image} />
                                    <TouchableOpacity style={styles.minus} onPress={() => { deleteElem(index) }}>
                                        <Minus />
                                    </TouchableOpacity>
                                </View>
                            })
                        }
                    </View>

                    <View style={{ alignItems: "center", marginTop: imagesList.length == 0 ? calcHeight(260) : calcHeight(50) }}>


                        <SimpleButton
                            text={t('next')}
                            big={true}
                            onPress={() => {
                                handleInspector()
                                //navigation.navigate('Welcome')
                            }}
                        />

                    </View>
                </ScrollView>

            </View>
        </View>
    );
};

export default Create;
