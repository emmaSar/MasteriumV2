import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView, Image, Alert, SafeAreaView, TouchableOpacity, ActivityIndicator, } from 'react-native';
import { useDispatch, useSelector, } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import { calcFontSize, calcHeight, calcWidth } from "../../utils/demensios"

import { loginSelector, userInfoSelector } from '../../store/selector/loginSelector';

//@ts-ignore
import SimpleButton from '../../components/SimpleButton';
import HeaderPage from '../../components/HeaderPage';
import { useTranslation } from 'react-i18next';
import { cartSelector, loadingSelector, typesSelector } from '../../store/selector/mainSelector';
//@ts-ignore
import Edit from "../../assets/icons/oEdit.svg"
//@ts-ignore
import Georgia from "../../assets/icons/georgia.svg"
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';
import { errorSelector } from "../../store/selector/loginSelector"
import Popup from '../../components/Popup';
import { editInfo, error } from '../../store/actions/loginActions';
import { setLoading } from '../../store/actions/mainActions';
import ProcesModal from '../../components/ProcesModal';


//import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
    navigation: NavigationScreenProp<any, any>;
}

const styles = StyleSheet.create({
    screen: { backgroundColor: 'rgba(255, 255, 255, 0.6)', flex: 1 },

});

const SettingsScreen: React.FunctionComponent<Props> = ({ navigation }) => {


    const { t } = useTranslation();
    const info = useSelector(userInfoSelector)
    const [visible, changeVisible] = useState(false)
    const [nameSurname, setNameSurname] = useState(false)
    const [city, setCity] = useState(info.city)
    const [mail, setMail] = useState(info.email)
    const errors = useSelector(errorSelector)
    const [name, setName] = useState(info.first_name)
    const [compname, setCompName] = useState(!info.is_cooperative_user ? '' : info.company_name)
    const [compType, setType] = useState(!info.is_cooperative_user ? '' : info.company_type)
    const [id, setId] = useState(!info.is_cooperative_user ? '' : info.company_id)
    const [visable, setVisable] = useState(false)
    const [surname, setSurname] = useState(info.last_name)
    const [errorText, setErrorText] = useState("")
    const [image, setImage] = useState(info.image)
    const [img, setImg] = useState({})
    const types = useSelector(typesSelector)
    const [change,setChange]=useState(false)
    let items: Array<any>
    items = []

    const loading = useSelector(loadingSelector)
    const [check, setCheck] = useState(false)
    for (let i = 0; i < types.length; i++) {
        items = [...items, { label: types[i].value, value: types[i].id }]
    }

    const onOpenPicker = () => {
        ImagePicker.openPicker({
            // multiple: true,
            // width: 300,
            // height: 400,

            //    cropping: true,
            //   includeBase64: true,
            //   compressImageQuality: 0.1,
        }).then((imagea: any) => {

            setImg(imagea)
            changeVisible(false)
            setImage(imagea.path)

        });
    }

    const onOpenCamera = () => {
        changeVisible(false)
        ImagePicker.openCamera({
            //  multiple: true,
            // width: 300,
            // height: 400,
            // cropping: true,
            // includeBase64: true,

        }).then((imga: any) => {

            setImg(imga)

            setImage(imga.path)
        });
    }
    const gallery = t("gallery")
    const status = info.is_cooperative_user
    const cameraa = t("camera")
    const dispatch = useDispatch()
    //@ts-ignore
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setNameSurname(false)

        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);
    //@ts-ignore
    useEffect(() => {
        if (errors !== null && check && !loading) {
            setVisable(true)
            setTimeout(() => {
                setVisable(false)
            }, 2000)
        }
    }, [errors, check, loading]);
    const [visableSelect, setVisableSelect] = useState(false)
    //@ts-ignore
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {

            setVisableSelect(false)
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);
    function validate(text: string) {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            return false;
        }
        else {
            return true
        }
    }
    return (
        <View style={styles.screen}>
            <ScrollView>

                {/* <ProcesModal visiable={visable} error={errors == null ? false : errors} /> */}

                <Modal
                    isVisible={loading}
                    backdropColor="rgba(153, 153, 153,0.5)"
                    style={{ height: 50, width: 50, position: "absolute", top: "40%", left: "40%" }}
                >
                    <ActivityIndicator size="large" color="#FFAD40" />
                </Modal>
                <HeaderPage back={false} text={"Личные данные"} />
                <View style={{ alignItems: "center" }}>
                    <TouchableOpacity onPress={() => { changeVisible(true) }}>
                        <Image
                            source={{ uri: image !== null ? image : "data:image/png;base64,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" }}
                            style={{ height: calcHeight(121), width: calcWidth(121), borderRadius: 60, marginTop: calcHeight(30) }}
                        />

                    </TouchableOpacity>
                    <View style={{ flexDirection: "row", height: calcHeight(100) }}>
                        {/* <Text>Name</Text> */}
                        {!nameSurname ? <Text style={{ color: "#242424", fontSize: 18, fontWeight: 'bold', marginTop: calcHeight(14) }}>{name}  {surname}  </Text> :
                            <View style={{}}>
                                <TextInput
                                    value={name}
                                    onChangeText={(text) => { setName(text);setChange(true) }}
                                    style={{ borderBottomColor: "#FFAD40", borderBottomWidth: 0.5, paddingBottom: 0, color: "#242424", fontSize: 12, fontWeight: 'bold', width: calcWidth(200) }}
                                />
                                <TextInput
                                    value={surname}
                                    onChangeText={(text) => { setSurname(text);setChange(true) }}
                                    style={{ borderBottomColor: "#FFAD40", borderBottomWidth: 0.5, paddingBottom: 0, color: "#242424", fontSize: 12, fontWeight: 'bold', width: calcWidth(200) }}
                                />
                            </View>
                        }
                        <TouchableOpacity
                            onPress={() => { setNameSurname(true) }}
                            style={{ marginLeft: calcWidth(15), marginTop: calcHeight(15) }}>
                            {!nameSurname ? <Edit /> : null}
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={{ marginLeft: calcWidth(18), marginTop: calcHeight(20) }}>
                    <View style={{ flexDirection: "row" }}>
                        <Georgia />
                        <Text style={{ color: "#242424", fontSize: 12, fontWeight: "bold", marginLeft: calcWidth(5) }}>{info.phone_number.slice(0, 4)} {info.phone_number.slice(4, info.phone_number.length)}</Text>
                        <Text
                            onPress={() => { dispatch(error(null)), navigation.navigate('NewTelephone') }}
                            style={{ color: "#4F8CDF", fontSize: 11, fontWeight: "600", marginLeft: calcWidth(8), textDecorationLine: "underline" }}>Изменить номер</Text>

                    </View>
                    <View style={{ flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", width: "70%" }}>
                        <Text style={{ fontSize: 12, color: "rgba(36, 36, 36, 0.8)" }}>City</Text>

                        {/* {!visCity ? <Text style={{ color: "#242424", fontSize: 12, fontWeight: 'bold', marginTop: calcHeight(14) }}>{!status ? city : compname}</Text> :
                          
                        } */}
                        <TextInput
                            value={!status ? city : compname}
                            onChangeText={(text) => { !status ? setCity(text) : setCompName(text) ;setChange(true) }}
                            style={{ borderBottomColor: "#FFAD40", borderBottomWidth: 0.5, paddingBottom: 0, color: "#242424", fontSize: 12, fontWeight: 'bold', width: calcWidth(200) }}
                        />
                        {/* <TouchableOpacity
                            onPress={() => { setVisCity(!visCity) }}
                            style={{ marginLeft: calcWidth(15), marginBottom: calcHeight(5) }}>
                            {!visCity ? <Edit /> : <Check />}
                        </TouchableOpacity> */}
                    </View>
                    {status ? <View style={{ flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", width: "70%" }}>
                        <Text style={{ fontSize: 12, color: "rgba(36, 36, 36, 0.8)" }}>Type</Text>

                        {/* {!visType ? <Text style={{ color: "#242424", fontSize: 12, fontWeight: 'bold', marginTop: calcHeight(14) }}>{compType}</Text>
                            :
                      
                        } */}
                        <Popup
                            items={items}
                            firstitem={info.company_type}
                            check={true}
                            onSelect={(id: number) => { setType(id);setChange(true)  }}
                            visible={visableSelect}
                            setVisibile={(value: boolean) => { setVisableSelect(value) }}
                        />
                        {/* <TextInput
                                value={compType}
                                onChangeText={(text) => { setType(text) }}
                                style={{ borderBottomColor: "#FFAD40", borderBottomWidth: 0.5, paddingBottom: 0, color: "#242424", fontSize: 12, fontWeight: 'bold', width: calcWidth(200) }}
                            /> */}
                        {/* <TouchableOpacity
                            onPress={() => { setVisType(!visType) }}
                            style={{ marginLeft: calcWidth(15), marginBottom: calcHeight(5) }}>
                            {!visType ? <Edit /> : <Check />}
                        </TouchableOpacity> */}
                    </View> : null}
                    {status ? <View style={{ flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", width: "70%" }}>
                        <Text style={{ fontSize: 12, color: "rgba(36, 36, 36, 0.8)" }}>Id</Text>
                        {/* 
                        {!visId ? <Text style={{ color: "#242424", fontSize: 12, fontWeight: 'bold', marginTop: calcHeight(14) }}>{id}</Text>
                            :
                         
                        } */}
                        <TextInput
                            value={id}
                            onChangeText={(text) => { setId(text);setChange(true)  }}
                            style={{ borderBottomColor: "#FFAD40", borderBottomWidth: 0.5, paddingBottom: 0, color: "#242424", fontSize: 12, fontWeight: 'bold', width: calcWidth(200) }}
                        />
                        {/* <TouchableOpacity
                            onPress={() => { setVisId(!visId) }}
                            style={{ marginLeft: calcWidth(15), marginBottom: calcHeight(5) }}>
                            {!visId ? <Edit /> : <Check />}
                        </TouchableOpacity> */}
                    </View> : null}
                    {/* {status ? <View style={{ flexDirection: "row", alignItems: "flex-end" }}> */}

                    {/* {!visCart ? <Text style={{ color: "#242424", fontSize: 12, fontWeight: 'bold', marginTop: calcHeight(14) }}>{cart}</Text>
                        :
                        <TextInput
                            value={cart}
                            onChangeText={(text) => { setCart(text) }}
                            style={{ borderBottomColor: "#FFAD40", borderBottomWidth: 0.5, paddingBottom: 0, color: "#242424", fontSize: 12, fontWeight: 'bold', width: calcWidth(200) }}
                        />
                    } */}
                    {/* <TouchableOpacity
                            onPress={() => { setVisCart(!visCart) }}
                            style={{ marginLeft: calcWidth(15), marginBottom: calcHeight(5) }}>
                            {!visCart ? <Edit /> : <Check />}
                        </TouchableOpacity>
                    </View> : null} */}
                    <View style={{ flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", width: "70%" }}>
                        <Text style={{ fontSize: 12, color: "rgba(36, 36, 36, 0.8)" }}>Email</Text>

                        {/* {!visMail ? <Text style={{ color: "#242424", fontSize: 12, fontWeight: 'bold', marginTop: calcHeight(14) }}>{mail}</Text>
                            :
                        
                        } */}
                        <TextInput
                            value={mail}
                            onChangeText={(text) => { setMail(text) ;setChange(true) }}
                            style={{ borderBottomColor: validate(mail)|| mail.length==0? "#FFAD40":"red", borderBottomWidth: 0.5, paddingBottom: 0, color: "#242424", fontSize: 12, fontWeight: 'bold', width: calcWidth(200) }}
                        />
                        {/* <TouchableOpacity
                            onPress={() => { setVisMail(!visMail) }}
                            style={{ marginLeft: calcWidth(15), marginBottom: calcHeight(5) }}>
                            {!visMail ? <Edit /> : <Check />}
                        </TouchableOpacity> */}
                    </View>

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

                        <TouchableOpacity style={{ width: "50%", height: "100%", alignItems: "center", justifyContent: "center" }}
                            onPress={() => { onOpenPicker() }}
                        >
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
            </ScrollView>

            <View style={{ position: "absolute", top: calcHeight(600), alignItems: "center", width: "100%" }}>
                <SimpleButton
                    text={t('save')}
                    big={true}
                    onPress={() => {
                        if((validate(mail || mail.length==0)&& change)){
                            setNameSurname(false)
                            setChange(false)
                            setCheck(true)
                            dispatch(setLoading(true))
                            dispatch(editInfo({
                                first_name: name,
                                last_name: surname,
                                phone_number: info.phone_number,
                                company_name: !info.is_cooperative_user ? null : compname,
                                company_type_id: !info.is_cooperative_user ? null : compType,
                                company_id: !info.is_cooperative_user ? null : id,
                                about: null,
                                experience: null,
                                study_history: null,
                                credit_card_number: null,
                                email: mail,
                                image: Object.keys(img).length === 0 ? image : img,
                                city: city
                            }))
    
                        }
                       
                    }}
                />
            </View>
        </View>
    );
};

export default SettingsScreen;
