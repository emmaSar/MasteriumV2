import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView, Image, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { calcFontSize, calcHeight, calcWidth } from "../../utils/demensios"
import HeaderPage from '../../components/HeaderPage';
import { useDispatch, useSelector } from 'react-redux';
import { friendSelector, languageSelector, loadingSelector } from '../../store/selector/mainSelector';
import { getFriends, setFriends, setLoading } from '../../store/actions/mainActions';
import Modal from "react-native-modal"
import { chooseLanguageIndex } from '../../utils/config';


//import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
  navigation: NavigationScreenProp<any, any>;
}

const styles = StyleSheet.create({
  screen: { backgroundColor: 'rgba(255, 255, 255, 0.6)', flex: 1 },
  middle: { marginLeft: calcWidth(17), marginRight: calcWidth(36), marginTop: calcHeight(26) },
  back: { marginTop: calcHeight(23), marginLeft: calcWidth(24) },
  plus: { marginTop: calcHeight(57), marginBottom: calcHeight(8) },
  footer: { alignItems: 'center', marginBottom: calcHeight(69), justifyContent: "flex-end", marginTop: calcHeight(416) },
  heading1: { color: '#7C7C7C', fontSize: 14, fontWeight: 'bold', lineHeight: 19, marginTop: calcHeight(7), },
  itemBlock: {
    backgroundColor: "#EEF4F6",
    flexDirection: "row",
    borderRadius: 50, height: calcHeight(38),
    width: calcWidth(355),
    marginHorizontal: calcWidth(10), alignItems: "center",
    marginTop: calcHeight(38),
  },
  itemBlock1: {
    backgroundColor: "#EEF4F6",
    flexDirection: "row",
    borderRadius: 50, height: calcHeight(71),
    width: calcWidth(355),
    justifyContent: "space-between",
    marginHorizontal: calcWidth(10),
    marginTop: calcHeight(38),
  },
  block: { marginHorizontal: calcWidth(30), flexDirection: "row", alignItems: 'center' },
  text: { color: "rgba(33, 33, 33, 0.5)", fontSize: calcFontSize(14), fontWeight: 'bold' },
  textinput: { color: "rgba(33, 33, 33, 0.5)", fontSize: calcFontSize(14), fontWeight: 'bold' },
  buttontext: { color: "#E36958", fontSize: calcFontSize(9), fontWeight: 'bold', textDecorationLine: 'underline', position: 'absolute', right: 0 }
});

const HistoryOfInvitations: React.FunctionComponent<Props> = ({ navigation }) => {
  const friends_list=useSelector(friendSelector)
  const dispatch=useDispatch()
  const [friends,setFriend]=useState([])
  const loading=useSelector(loadingSelector)
  const languageIndex=chooseLanguageIndex()

    //@ts-ignore
    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        dispatch(setLoading(true))
         dispatch(getFriends())
         
      });
      // Return the function to unsubscribe from the event so it gets removed on unmount
      return unsubscribe;
  }, [navigation]);
    //@ts-ignore
    useEffect(() => {
      const unsubscribe = navigation.addListener('blur', () => {
        dispatch(setFriends([]))
        
         
      });
      // Return the function to unsubscribe from the event so it gets removed on unmount
      return unsubscribe;
  }, [navigation]);
  useEffect(()=>{
    if(!loading && friends_list.length>0){
      
      let array=[]
        for(let i=0;i<friends_list.length;i++){
            array.push({phone:friends_list[i].friend_invitation.phone_number,
              bonus:friends_list[i].friend_invitation.bonus,
              status:friends_list[i].friend_invitation.status.code==="PND"?false:true,
              statusText:friends_list[i].status[languageIndex].value
            })
        }
        //@ts-ignore
        setFriend(array)
    }
  },[friends_list,loading])
  function calculateBonus(){
    let bonus=0
    for(let i=0;i<friends.length;i++){
      
      //@ts-ignore
      if(friends[i].bonus!==null){
        //@ts-ignore
        bonus=bonus+ friends[i].bonus
      }
    }
    return bonus
  }
  return (
    <View style={styles.screen}>
      <HeaderPage back={true} text={'Итория приглашений'} />
      <Modal
                    isVisible={loading}
                    backdropColor="rgba(153, 153, 153,0.5)"
                    style={{ height: 50, width: 50, position: "absolute", top: "40%", left: "40%" }}
                >
                    <ActivityIndicator size="large" color="#FFAD40" />
                </Modal>
      <Text style={{color:"#212121",fontSize:calcFontSize(14),fontWeight:"normal",marginTop:calcHeight(31),marginLeft:calcWidth(18),}}>Получено <Text style={{color:"#24A322"}}>{calculateBonus()}</Text> бонусов</Text>
    <ScrollView style={{marginTop:calcHeight(26)}}>
        {friends.map((e)=>{
           return  <View style={{
               marginHorizontal:'2.7%',
               width:'94.7%',height:calcHeight(38),
               //@ts-ignore
               backgroundColor:e.status?"#24A322":"#EEF4F6",
               borderRadius:50,
               marginBottom:calcHeight(7),
               paddingVertical:calcHeight(8),
               paddingLeft:calcWidth(14),
               flexDirection:"row",
               justifyContent:"space-between"
               }}>
                   <Text style={{
                     //@ts-ignore
                     color:e.status?"white":"rgba(33, 33, 33, 0.5)",fontSize:14,fontWeight:'bold'}}>{e.phone}</Text>
                   <Text style={{
                     //@ts-ignore
                     color:e.status?"white":"rgba(33, 33, 33, 0.5)",fontSize:14,fontWeight:'bold',marginHorizontal:'19.7%'}}>{e.statusText}</Text>

                </View>
        })}
        </ScrollView>
    </View>
  );
};

export default HistoryOfInvitations;
