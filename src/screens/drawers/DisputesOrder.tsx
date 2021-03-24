import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView, Image, Alert, SafeAreaView } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { calcFontSize, calcHeight, calcWidth } from "../../utils/demensios"

import { TouchableOpacity } from 'react-native-gesture-handler';
import HeaderPage from '../../components/HeaderPage';
import { chooseLanguageIndex } from '../../utils/config';

//import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
    navigation: NavigationScreenProp<any, any>;
}

const styles = StyleSheet.create({
    screen: { backgroundColor:'rgba(255, 255, 255, 0.6)',flex:1 },
    middle: { marginLeft: calcWidth(17), marginRight: calcWidth(36), marginTop: calcHeight(26) },
    back:{ marginTop: calcHeight(23), marginLeft: calcWidth(24) },
    plus:{marginTop:calcHeight(57),marginBottom:calcHeight(8)},
    footer:{alignItems:'center',marginBottom:calcHeight(69),justifyContent:"flex-end",marginTop:calcHeight(416)},
    heading1: { color: '#7C7C7C', fontSize: 14, fontWeight: 'bold', lineHeight: 19 ,marginTop: calcHeight(7),},
    block:{backgroundColor:"white",height:calcHeight(30),width:calcWidth(168),alignItems:"center",justifyContent:"center",borderRadius:30,  shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    
    elevation: 2,position:'absolute',right:16,marginTop:calcHeight(18)},
    text:{color:"#212121",fontSize:calcFontSize(13),fontWeight:'bold'},
    block1:{backgroundColor:'#EEF4F6',
    borderRadius:30,height:calcHeight(76),
    width:calcWidth(355),
    marginHorizontal:calcWidth(10),
    paddingLeft:calcWidth(20),
    paddingTop:calcHeight(14),
    marginRight:calcWidth(13),
    marginBottom:calcHeight(13),
    marginTop:calcHeight(38)
    },
    title:{color:"#212121",fontSize:calcFontSize(12),flex:1},
    item:{flexDirection:'row',flexWrap:'wrap'},
    image:{width:calcWidth(114),height:calcHeight(158,),marginHorizontal:calcWidth(10)}

});

const DisputesOrder: React.FunctionComponent<Props> = (route) => {

   

    const languageIndex=chooseLanguageIndex()

    return ( 
        <View style={styles.screen}>
            <HeaderPage back={true} text={`Заказ ${
                //@ts-ignore
                route.route.params.elem.order_number}`} />
            <View>
            <View style={styles.block}>
            <Text style={styles.text}>{
            //@ts-ignore
            route.route.params.elem.status[languageIndex].value}</Text>
                   </View>
            <TouchableOpacity style={styles.block1}>
                 
    <Text style={styles.title} numberOfLines={3}>
    {
            //@ts-ignore
            route.route.params.elem.description}
    </Text>
               </TouchableOpacity>
            <Text style={{textAlign:"right",marginRight:calcWidth(29),color:"#FF5252",fontSize:calcFontSize(13),fontWeight:"bold",textDecorationLine:"underline",marginBottom:calcHeight(25)}}>Отменить диспут</Text>
               <ScrollView style={styles.item} horizontal={true} showsHorizontalScrollIndicator={false}>
               
               {
                   //@ts-ignore
               route.route.params.elem.disput_images.map((el)=>{
                   return <Image source={{uri:el.image_url}} style={styles.image} />
               })}
               </ScrollView>
        </View>
        </View>
    );
};

export default DisputesOrder;
