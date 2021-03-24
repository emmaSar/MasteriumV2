import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView, Image, Alert, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import { useDispatch, useSelector, } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import { calcFontSize, calcHeight, calcWidth } from "../../utils/demensios"
import SimpleButton from '../../components/SimpleButton';
import HeaderPage from '../../components/HeaderPage';
import { useTranslation } from 'react-i18next';

import { Rating } from 'react-native-ratings';
//@ts-ignore
import Master from "../../assets/icons/master.svg"
import { addReview } from '../../store/actions/orderAction';
import { useNavigation } from '@react-navigation/native';

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

const RatingScreen: React.FunctionComponent<Props> = (route) => {


    const dispatch = useDispatch()
    const navigation=useNavigation()
    const { t } = useTranslation();
    const [check, setCheck] = useState(false)
    const [value,setValue]=useState("")
    const [tip,setTip]=useState("0")
    const [rating,setRating]=useState(0)
    return (
        <View style={styles.screen}>
            <HeaderPage back={true} text={t('rating')} />
            <ScrollView keyboardShouldPersistTaps='handled'

>
            <View
                style={{
                    backgroundColor: "#EEF4F6",
                    width: calcWidth(355),
                    paddingLeft: calcWidth(20),
                    marginTop: calcHeight(13),
                    paddingRight: calcWidth(13),
                  //  paddingTop: calcHeight(37),
                    paddingBottom: calcHeight(50),
                    marginHorizontal: calcWidth(10),
                    borderRadius: 50
                }}>
                <TextInput
                    value={value}
                     onChangeText={(text)=>{setValue(text)}}
                    style={{ fontSize: calcFontSize(12), color: "#212121" }}
                    multiline={true}

                />


            </View>
            <View style={{ marginTop: calcHeight(34) }}>
                <Rating
                    type='star'

                    // ratingColor={'red'}
                    //  readonly={true}
                    startingValue={0}
                    ratingCount={5}
                    imageSize={48}
                
                    onFinishRating={(a) => {
                        setRating(a)                        
                     }}
                />
            </View>
            {!check ? <Text
            onPress={()=>{setCheck(true)}}
                style={{
                    color: "#F2C94C",
                    textDecorationLine: "underline",
                    fontSize: calcFontSize(18), fontWeight: 'bold',
                    textAlign: "center",
                    marginTop: calcHeight(87)
                }}>
                Оставить чаевые
                         </Text> :
                <View style={{backgroundColor:"#EEF4F6",width:calcWidth(355),marginHorizontal:calcWidth(10),height:calcHeight(103),borderRadius:50,marginTop:calcHeight(58)}}>
                <View style={{flexDirection:"row",marginHorizontal:calcWidth(30),justifyContent:"space-between",marginTop:calcHeight(11)}}>
                    <Text style={{color:"rgba(33, 33, 33, 0.5)",fontSize:calcFontSize(14),fontWeight:'bold'}}>7204 **** **** 3845</Text>
                    <Master />
                </View>
                <View style={{flexDirection:"row",marginTop:calcHeight(5),justifyContent:"center",alignItems:"flex-end"}}>
                    <TextInput
                    value={tip}
                    onChangeText={(text)=>{setTip(text)}}
                    keyboardType="numeric"
                     style={{
                        width:calcWidth(52), 
                        color:"#212121",
                     fontWeight:"bold",fontSize:calcFontSize(24),borderBottomColor:'rgba(33, 33, 33, 0.5)',borderBottomWidth:0.5,paddingVertical:0}}
                    />
                    <Text style={{color:"#24A322",fontSize:calcFontSize(18),fontWeight:"bold"}}>gel</Text>
                    </View>
                </View>
            }
                      </ScrollView>
            <View style={{ position: "absolute", top: calcHeight(550), alignItems: "center", width: "100%" }}>
                <SimpleButton
                    text={!check? t('leaveaReaview'):t('leaveaReaviewTea')}
                    big={true}
                    onPress={() => {
                        //@ts-ignore
                       dispatch(addReview({to_user:route.route.params.user_id,review:value,rating:rating,for_suborder:route.route.params.suborder_id,tip:parseInt(tip) }))
                       //@ts-ignore
                       navigation.navigate('UserPage',{check:false,user_id:route.route.params.user_id})
                    }}
                />
            </View>
  
        </View>
    );
};

export default RatingScreen;
