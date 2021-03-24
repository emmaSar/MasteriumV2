import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView, Image, Alert, TouchableOpacity, Keyboard, Platform, KeyboardAvoidingView } from 'react-native';
import { useDispatch, useSelector, } from 'react-redux';
import { NavigationScreenProp, TabRouter } from 'react-navigation';
import { calcFontSize, calcHeight, calcWidth } from "../../utils/demensios"
import HeaderPage from '../../components/HeaderPage';
import { useTranslation } from 'react-i18next';
import { GiftedChat } from 'react-native-gifted-chat'
//@ts-ignore
import Folder from "../../assets/icons/folder.svg"
//@ts-ignore
import Export from "../../assets/icons/export.svg"
//import { SafeAreaView } from 'react-native-safe-area-context';
import { io } from "socket.io-client";
import { infoSelector, userInfoSelector } from '../../store/selector/loginSelector';

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
    blockitem: { flexDirection: "row", justifyContent: "space-between", marginHorizontal: calcWidth(42) },
    name: { color: "#212121", fontSize: calcFontSize(18), fontWeight: 'bold', marginLeft: calcWidth(7) },
    block1: { flexDirection: "row", alignItems: "center" },
    status: { color: "#FFAD40", fontSize: calcFontSize(12), textDecorationLine: "underline", marginRight: calcWidth(2) },
    circle: { height: calcHeight(9), width: calcWidth(9), backgroundColor: "#FFAD40", borderRadius: 4.5 },
    item: {
        backgroundColor: "#EEF4F6",
        borderRadius: 50, height: calcHeight(59),
        width: calcWidth(355),
        marginHorizontal: calcWidth(10),
        marginBottom: calcHeight(33), alignItems: 'center', flexDirection: "row"
    },
    image: { height: calcHeight(56), width: calcWidth(56), borderRadius: 28 },
    message: { fontSize: calcFontSize(9), color: "#212121", fontWeight: '600', marginLeft: calcWidth(16), flex: 1, marginRight: calcWidth(10) },
    header: {
        width: "100%", height: calcHeight(98),
        overflow: "hidden",
        backgroundColor: "white",
        marginTop: calcHeight(21),
        flexDirection: "row",
        alignItems: "center",
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
    },
    image1: { height: calcHeight(56), width: calcWidth(56), borderRadius: 28, marginTop: calcHeight(5), marginLeft: calcWidth(12) }

});

const Messages: React.FunctionComponent<Props> = (route) => {
    const { t } = useTranslation();
    const [messages, setMessages] = useState([]);
    const [msgText, setMsgText] = useState<string>()
    const [file, setFile] = useState<any>([])
    const [inspect, setInspect] = useState(false)
    const [select, setSelect] = useState(false)
       //@ts-ignore
       route.route.params.socket.on('receive', (res) => {
        
     })
   //@ts-ignore
    // route.route.params.socket.on('messages', (res) => {
    //     console.log("*****");
        
    //     let array=[]
    //     for(let i=0;i<res.length;i++){
    //         array.push({_id:res[i].id,text:res[i].text,createdAt:new Date( res[i].created_at),user:{
    //             _id:res[i].replier_is_admin?20:res[i].sender.user_id,
    //             name:res[i].replier_is_admin?"Admin":res[i].sender.first_name+" "+res[i].sender.last_name,
    //             avatar:!res[i].replier_is_admin && res[i].sender.image!==null?res[i].sender.image:"data:image/png;base64,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"
                            
    //         }})
    //     }
    //     //@ts-ignore
    //     setMessages(array.reverse())
    // });
 
console.log(messages,"messagesmessagesmessagesmessages");

    // useEffect(() => {

    //     setMessages([
    //         {
    //             //@ts-ignore
    //             _id: 1,
    //             //@ts-ignore
    //             text: 'Hello developer',
    //             //@ts-ignore
    //             createdAt: '12.08',
    //             user: {
    //                 //@ts-ignore
    //                 _id: 1,
    //                 //@ts-ignore
    //                 name: 'Иван',
    //                 //@ts-ignore
    //                 avatar: 'https://placeimg.com/140/140/any',
    //             },

    //         },
    //         {
    //             //@ts-ignore

    //             _id: 2,
    //             //@ts-ignore

    //             text: 'Добрый день! Что Вас интересует и с чем связан ваш впорос?',
    //             //@ts-ignore

    //             createdAt: '10.08',
    //             //@ts-ignore

    //             //  quesion: 'Вопрос касаемо вознаграждения за приглашение друзей',
    //             user: {
    //                 //@ts-ignore

    //                 _id: 2,
    //                 //@ts-ignore

    //                 name: 'Иван',
    //                 //@ts-ignore

    //                 avatar: "https://placeimg.com/140/140/any",
    //             },
    //         },
    //     ])
    // }, [])
    const info=useSelector(userInfoSelector)
    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])
    function show() {
        setInspect(true)
    }
    function hide() {
        setInspect(false)
    }
    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', show)
        Keyboard.addListener('keyboardDidHide', hide)
    }, [])
    const _renderInputToolbar = () => {
        return <View style={{ backgroundColor: "white", height: calcHeight(45), alignItems: "center", width: "100%", flexDirection: "row", paddingHorizontal: calcWidth(16), justifyContent: "space-between", }}>
            <Folder />
            <TextInput
                placeholder={"Cообщение"}
                placeholderTextColor="rgba(36, 36, 36, 0.2)"
                value={msgText}
                onChangeText={(text) => { setMsgText(text),setSelect(true) }}
                style={{
                    // borderBottomColor: "#FFAD40",
                    // borderBottomWidth: 1,
                      //  backgroundColor:"blue",
                    height:calcHeight(50),
                    width: calcWidth(267),
                    paddingBottom: calcHeight(25),
                    paddingTop:0
                  //  paddingVertical: 0,

                }}
            />
            <View style={{width:calcWidth(267),height:calcHeight(1),backgroundColor:"#FFAD40",position:"absolute",left:55,bottom:"43%"}}>
                </View>
            <TouchableOpacity style={{ marginTop: calcHeight(5) }}
            onPress={()=>{
                if (msgText && msgText.length > 0) {
                //@ts-ignore
                // route.route.params.socket.emit('send_message_to_room', {
                //     //@ts-ignore
                //     room: route.route.params.room_id,
                //     message: msgText,
                //     //@ts-ignore
                //     sender:  route.route.params.sender,
                //     file_url: '',
                //     replier_is_admin: false
                // });
            }
            setMsgText("")
            }}
                // onPress={() => {
                //     if (msgText && msgText.length > 0) {
                //         const msg = {
                //             _id: 2,
                //             text: msgText,
                //             createdAt: new Date(),
                //             user: {
                //                 _id: 2,
                //                 name: 'Иван',
                //                 avatar: "https://placeimg.com/140/140/any",
                //             }
                //         }
                //         setMsgText('')
                //         setMessages(previousMessages => GiftedChat.append(previousMessages,
                //             //@ts-ignore
                //             msg))
                //     }

                // }}
            >
                <Export />
            </TouchableOpacity>
        </View>
    }
    const _renderChatFooter = () => {
        return <View style={{ backgroundColor: "white", height: 60, width: "100%", alignItems: "center", flexDirection: "row", paddingHorizontal: calcWidth(16), justifyContent: "space-between", marginBottom: calcHeight(36) }}>

        </View>
    }
    const _renderMessage = (msg: any) => {
        return <View style={{ backgroundColor: "white", height: 'auto', width: "100%", alignItems: "center", flexDirection: msg.currentMessage.user._id !== info.user ? "row" : "row-reverse", marginVertical: calcHeight(15) }}>
            <View style={{ justifyContent: "center", alignItems: "center", marginTop: calcHeight(13) }}>
                <Image source={{ uri: msg.currentMessage.user.avatar }} style={{ height: calcHeight(42), width: calcWidth(42), borderRadius: 21, marginHorizontal: calcWidth(10) }} />
                <Text style={{ color: "#7C7C7C", fontWeight: 'bold', fontSize: calcFontSize(10), textAlign: "center" }}>{msg.currentMessage.user.name} </Text>
            </View>
            <View style={{ height: "auto", backgroundColor: msg.currentMessage.user._id !== info.user ? "#EEF4F6" : "#B5D4FD", width: calcWidth(245), borderRadius: 30, paddingLeft: calcWidth(22), paddingRight: calcWidth(33), paddingVertical: calcHeight(13) }}>
                <Text style={{}}>{msg.currentMessage.text}</Text>
            </View>
        </View>
    }
    return (
        <View style={styles.screen}>
            <HeaderPage back={false} />
            <View style={styles.header}>
                <Image
                    style={styles.image1}
                    source={{ uri: //@ts-ignore
                        route.route.params.image}} />
                <Text style={styles.name}>{
                //@ts-ignore
                route.route.params.name}</Text>
            </View>
       
            <GiftedChat
            minComposerHeight={100}
                //   isKeyboardInternallyHandled ={true}
             // bottomOffset={-25}
                messages={messages}
                showUserAvatar={true}
                showAvatarForEveryMessage={true}
                renderInputToolbar={_renderInputToolbar}
                renderMessage={(msg: any) => _renderMessage(msg)}
                // renderChatFooter={_renderChatFooter}
                onSend={messages => onSend(messages)}

            />
                 {/* {Platform.OS === "android" && (
 <KeyboardAvoidingView behavior="padding"
  keyboardVerticalOffset={!select? -114:0}
 />
)} */}
      { !inspect?     <View style={{ height: calcHeight(110), width: "100%", backgroundColor: "white" }}>
            </View>:null
}     
        </View>
    );
};

export default Messages;
