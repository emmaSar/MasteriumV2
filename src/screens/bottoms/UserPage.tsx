import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView, Image, Alert, SafeAreaView, ImageBackground, Linking, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector, } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import { calcFontSize, calcHeight, calcWidth } from "../../utils/demensios"
import { loginSelector } from '../../store/selector/loginSelector';
import { spareSelector } from '../../store/selector/spareselector';
import { TouchableOpacity } from 'react-native-gesture-handler';
import HeaderPage from '../../components/HeaderPage';
import { Rating, AirbnbRating } from 'react-native-ratings';
import Comment from '../../components/Comment';
//@ts-ignore
import Star from "../../assets/icons/starY.svg"
//@ts-ignore
import Hat from "../../assets/icons/hat.svg"
//@ts-ignore
import Goal from "../../assets/icons/goal.svg"
import { bottomIndexSelector, chatUserIdSelector, executorSelector, languageSelector, loadingSelector } from '../../store/selector/mainSelector';
//@ts-ignore
import PhoneCall from "../../assets/icons/phoneCall.svg"
//@ts-ignore
import Edit from "../../assets/icons/edit.svg"
//@ts-ignore
import Add from "../../assets/icons/add.svg"
import { useNavigation } from '@react-navigation/native';
import { addExecutor, getExecutorById, getRoomForUser, setChatUserId, setElement, setLoading } from '../../store/actions/mainActions';
import Modal from "react-native-modal"
import { getNextReviews } from '../../store/actions/orderAction';
import { chooseLanguageIndex } from '../../utils/config';



//import { SafeAreaView } from 'react-native-safe-area-context';

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

const UserPage: React.FunctionComponent<Props> = (route) => {
    const navigation = useNavigation()
    //@ts-ignore
    const [status, setStatus] = useState(route.route.params.check)
    const executor = useSelector(executorSelector)
    const loading=useSelector(loadingSelector)
    const view = require('../../assets/icons/view.png')
    const viewg = require('../../assets/icons/viewg.png')
    const id=useSelector(chatUserIdSelector)
    const [inspect,setInspect]=useState(false)
    const language=useSelector(languageSelector)
    const languageIndex=chooseLanguageIndex()

    useEffect(()=>{
        if (id !== null && !inspect) {

            dispatch(setElement( { room_id: id,   
                //@ts-ignore
                 name:executor.user_details.first_name+" "+ executor.user_details.last_name,
            image: executor.user_details.image == null || executor.user_details.image.slice(0, 4) !== "http" ?
            "data:image/png;base64,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" :
            executor.user_details.image}))

            // navigation.navigate("Chat",{check:true,item:3}) 
            dispatch(setChatUserId(null))

        }
    },[id,inspect])
    const [check,setCheck]=useState(false)
    const dispatch = useDispatch()
  //@ts-ignore
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
        //@ts-ignore
        dispatch(getExecutorById({id: route.route.params.user_id}))
        dispatch(setLoading(true))
        setInspect(false)

    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
}, [navigation]);
    useEffect(() => {
        //@ts-ignore

        setStatus(route.route.params.check)

    }, [ //@ts-ignore
        route.route.params]);
        useEffect(()=>{
            if(check && !loading){
                navigation.navigate("MyMasters")
            }
        }
        ,[check,loading])
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
              { 
              Object.keys(executor).length!==0?
              <>
            <View style={{ flexDirection: "row", marginTop: calcHeight(50), marginHorizontal: calcWidth(27), justifyContent: "space-between" }}>
                <View style={{}}>
                    <TouchableOpacity
                        style={{ marginBottom: calcHeight(14) }}
                        onPress={() => { Linking.openURL(`tel:${executor.user_details.phone_number}`) }}
                    >
                        <PhoneCall />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() =>
                             {
                                 //@ts-ignore
                                dispatch(getRoomForUser({user_id:route.route.params.user_id,is_with_admin:false}))

                                 // navigation.navigate("Messages") 
                    }}

                    >
                        <Edit />
                    </TouchableOpacity>
                </View>

                <View style={{ alignItems: "center" }}>
                    <View>
                        <ImageBackground source={view} style={{ height: calcHeight(26.71), width: calcWidth(63.14), position: 'absolute', zIndex: 1, flexDirection: "row", }}  >
                            <View style={{ marginLeft: calcWidth(10) }} >
                                <Star />
                            </View>
                            <Text style={{ fontStyle: 'normal', fontWeight: '300', fontSize: 14, color: "rgba(0, 0, 0, 0.5)", marginLeft: calcWidth(3) }}>{executor.results.rating}</Text>
                        </ImageBackground>
                        <Image
                            source={{
                                uri:
                                    executor.user_details.image == null || executor.user_details.image.slice(0, 4) !== "http" ?
                                        "data:image/png;base64,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" :
                                        executor.user_details.image
                            }}
                            style={{ height: 136, width: 136, borderRadius: 68 }}
                        />
                        {executor.user_details.is_pro ? <ImageBackground source={viewg} style={{ height: calcHeight(26.59), width: calcWidth(56), position: 'absolute', zIndex: 1, right: 0, top: 109.41, justifyContent: "center", alignItems: "center" }}  >
                            <Text style={{ color: "white" }}>PRO</Text>
                        </ImageBackground> : null}
                    </View>
                    <Text style={{ color: "#212121", fontWeight: 'bold', fontSize: 18, marginRight: calcWidth(16) }}>{executor.user_details.first_name} {executor.user_details.last_name}</Text>
                    <View style={{ flexDirection: "row", marginTop: calcHeight(9.41) }} >
                        <Rating
                            type='star'
                            readonly={true}
                            startingValue={executor.results.rating}
                            ratingCount={5}
                            imageSize={20}

                            onFinishRating={() => { }}
                        />
                        <Text style={{ color: "#212121", fontSize: 18, marginLeft: calcWidth(11) }}>{executor.results.rating}</Text>
                    </View>
                </View>
                {!status ?
                    <View>
                        <TouchableOpacity
                            onPress={() => {
                                setLoading(true)

                                dispatch(addExecutor({ id: executor.user_details.user }))
                                setCheck(true)
                                //navigation.navigate("MyMasters")
                            }}
                            style={{ alignItems: "center", }}>
                            <Add />
                        </TouchableOpacity>
                        <Text style={{ color: "#7C7C7C", fontSize: calcFontSize(10), fontWeight: "bold", textAlign: "center", width: calcWidth(80) }}>Добавить в «Мои мастера»</Text>

                    </View> : <View></View>}
            </View>
            <ScrollView 
             onScroll={({ nativeEvent }) => {
                if (isCloseToBottom(nativeEvent)) {
                    if (executor.results.reviews.length  !==executor.count && executor.next!==null) {
                        if (mustWait) return
                        mustWait = true
                    !loading&& dispatch(getNextReviews({body:executor.next}))
                       dispatch(setLoading(true))
  
                   }
                }
            }}
            style={{ marginBottom: calcHeight(72) }}>
                <View style={{ marginTop: calcHeight(18), height: 56, marginLeft: calcWidth(18) }}>
                    {
                        //@ts-ignore
                        executor.user_specialization.map((elem, i) => {
                            return <Text key={i} style={{ color: "#7C7C7C", fontSize: calcFontSize(10), fontWeight: 'bold' }}>{elem.specialization[languageIndex].value}</Text>
                        })
                    }
                </View>
                <View style={{ marginTop: calcHeight(31), marginLeft: calcWidth(18), marginRight: calcWidth(104) }}>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ width: calcWidth(18) }}>
                            <Hat />
                        </View>
                        <Text style={{ color: "#212121", fontSize: 12, fontWeight: '300', marginLeft: calcWidth(6), fontStyle: 'normal', width: calcWidth(229) }}>
                            {executor.user_details.study_history}
                        </Text>
                    </View>
                    <View style={{ flexDirection: "row", marginTop: calcHeight(9), }}>
                        <View style={{ width: calcWidth(18) }}>
                            <Goal />
                        </View>
                        <Text style={{ color: "#212121", fontSize: 12, fontWeight: '300', marginLeft: calcWidth(6), fontStyle: 'normal', width: calcWidth(229) }}>

                            {executor.user_details.experience}

                        </Text>
                    </View>
                </View>
                <View >
                    <View style={{ marginLeft: calcWidth(18), marginTop: calcWidth(18), marginBottom: calcHeight(26), marginRight: calcWidth(50), }}>
                        <Text style={{ flex: 1, color: "#212121", fontWeight: "bold", fontSize: calcFontSize(12) }}>
                            {executor.user_details.about}

                        </Text>
                    </View>
                </View>
                <View style={{}}>
                    {
                        //@ts-ignore
                        executor.results.reviews.map((el, i) => {
                            return <Comment key={i} name={el.from_user.first_name + " " + el.from_user.last_name} text={el.review} rating={el.rating} />
                        })
                    }
                </View>
            </ScrollView>
            </> 
            :null
            }
        </View>
    );
};

export default UserPage;
