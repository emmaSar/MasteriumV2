import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView, Image, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector, } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import { calcFontSize, calcHeight, calcWidth } from "../../utils/demensios"
import Header from '../../components/Header'
import Footer from '../../components/Footer';
import { loginSelector } from '../../store/selector/loginSelector';
import { spareSelector } from '../../store/selector/spareselector';
import { addSpare } from "../../store/actions/spareActions"
//@ts-ignore
import TextInputMask from 'react-native-text-input-mask';
//@ts-ignore
import SimpleButton from '../../components/SimpleButton';
import HeaderPage from '../../components/HeaderPage';
// import SlidingUpPanel from 'rn-sliding-up-panel';
//import { SafeAreaView } from 'react-native-safe-area-context';
import Contract from "../../assets/icons/contract.svg"
import Writing from "../../assets/icons/writing.svg"
import Clock from "../../assets/icons/clock.svg"
import LinearGradient from 'react-native-linear-gradient';
import Network from "../../assets/icons/network.svg"
import Tool1 from "../../assets/icons/tool1.svg"
import Tool2 from "../../assets/icons/tool2.svg"
import Tool3 from "../../assets/icons/tool3.svg"
import Search1 from "../../assets/icons/search1.svg"
import Search2 from "../../assets/icons/search2.svg"
import Search3 from "../../assets/icons/search3.svg"
import User from "../../assets/icons/user1.svg"
import Swiper from 'react-native-swiper';
import { categoryListSelector, LoadingSelector, subCategoryListSelector } from '../../store/selector/categorySelector';
import { getSubCategoryList, setLoading } from '../../store/actions/categoryActions';

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
    linear:{ backgroundColor: "#FFAD40", width: "100%", height: "100%", borderTopLeftRadius: 50, borderTopRightRadius: 50, marginTop: calcHeight(25), alignItems: "center" ,},
    line:{ backgroundColor: "#D2D2D2", height: 4, width: 108, borderRadius: 30, marginTop: 15 },
    all:{ flexDirection: "row", marginTop: calcHeight(24),marginLeft:calcWidth(150) },
    heading:{ color: "white", fontSize: calcFontSize(18), fontWeight: "bold", width: calcWidth(97) },
    block:{ backgroundColor: "#F8993C", height: calcHeight(55), width: calcWidth(125), borderRadius: 10, marginTop: calcHeight(27), paddingHorizontal: calcWidth(8), paddingTop: calcHeight(9) },
    title:{ color: "white", fontSize: calcFontSize(9), fontWeight: 'bold' },
    block1:{width:calcWidth(355),marginHorizontal:calcWidth(10),height:calcHeight(135),backgroundColor:"#E3E3E3",marginBottom:20,borderRadius:50},
    item:{flexDirection:"row",marginLeft:calcWidth(27),marginRight:calcWidth(47),marginTop:calcHeight(16)},
    title1:{color:"#212121",fontSize:calcFontSize(12),width:calcWidth(189)},
    image:{height:calcHeight(49),width:calcWidth(47),marginLeft:calcWidth(43)},
    block2:{flexDirection:"row",marginLeft:calcWidth(32),marginTop:calcHeight(15),marginRight:calcWidth(54),justifyContent:'space-between',alignItems:"center"},
    price:{color:"#7C7C7C",fontSize:calcFontSize(24),fontWeight:'bold'},
    svg:{flexDirection:"row",alignItems:"center"},
    clock:{color:"#212121",fontSize:calcFontSize(9),fontWeight:'300',marginRight:calcWidth(10),marginLeft:calcWidth(5)},
    number:{color:"#212121",fontSize:calcFontSize(12),fontWeight:'bold'},
    deadline:{color:"#24A322",fontSize:calcFontSize(9),fontWeight:'300',position:'absolute',bottom:5,right:72,marginTop:calcHeight(10)}
});

const UpcomingOrders: React.FunctionComponent<Props> = ({ navigation }) => {

    const back = require('../../assets/icons/back.png')
    const check = require('../../assets/icons/check.png')

    const [visible, setVisible] = useState()
    const sublist=useSelector(subCategoryListSelector)

    const n = 3
    const catlist=useSelector(categoryListSelector)
    const id=catlist[1].id
    const loading=useSelector(LoadingSelector)
    const dispatch=useDispatch()
    //@ts-ignore
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            dispatch(setLoading(true))

           dispatch(getSubCategoryList(id))
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);
        //@ts-ignore
        let result =sublist.length>0? new Array(Math.ceil(sublist.length / n)).fill().map(_ => sublist.splice(0, n)):[]
      useEffect(()=>{
            //@ts-ignore

         result = new Array(Math.ceil(sublist.length / n)).fill().map(_ => sublist.splice(0, n))

    },[sublist])
    return (
       !loading?
        <View style={styles.screen}>
            <HeaderPage back={false} />
    

            <LinearGradient colors={['#FFAB3D',"#FEC880"]}
                useAngle={true}
             angle={186.33}
                 style={styles.linear}>
              <TouchableOpacity
                        style={{ height: calcHeight(70), width: calcWidth(250), alignItems: "center" }}
                        onPress={() => { navigation.goBack() }}
                    >
                        <View
                            //    
                            style={{ backgroundColor: "#D2D2D2", height: 4, width: 108, borderRadius: 30, marginTop: 15, }}
                        >
                        </View>
                    </TouchableOpacity>
                    <View style={{position:"absolute",left:0,top:0}}>
                    <Network />
                    </View>
                    <View style={{position:"absolute",top:14,left:17}}>
                    <Tool1 />
                    </View>
                    <View style={{position:"absolute",top:14,left:-11}}>
                    <Tool2 />
                    </View>
                    <View style={styles.all}>
                  
                        <View style={{ marginLeft: calcWidth(35) }}>
                            <Text style={styles.heading}>Ремонт</Text>
                            <View style={{ backgroundColor: "#F8993C", height: calcHeight(55), width: calcWidth(125), borderRadius: 10, marginTop: calcHeight(27), paddingHorizontal: calcWidth(8), paddingTop: calcHeight(9) }}>
                            <View style={{flexDirection:"row"}}>
                                <User />
                            <Text style={{ color: "white", fontSize: calcFontSize(9), fontWeight: 'bold',marginLeft:calcWidth(8) }}>252 специалиста</Text></View>
                            <Text style={{ color: "white", fontSize: calcFontSize(6), fontWeight: '300', marginTop: calcHeight(5) }}>Загруженность 65%</Text>
                            <View style={{ backgroundColor: 'white', height: 4, width: 108, borderRadius: 30, justifyContent: "center", paddingHorizontal: calcWidth(1) }}>
                                <View style={{ backgroundColor: '#F8993C', height: 2, width: 66, borderRadius: 30, }}></View>
                            </View>
                           
                            </View>
                            <View style={{marginTop:calcHeight(19),alignItems:"flex-end",marginRight:calcWidth(19)}}>
                            <Search2 />
                        </View>
                        </View>
                    </View>
                    <View style={{ height: calcHeight(320),marginTop:calcHeight(30)}}>
                        <Swiper
                            //     showsPagination={true}
                            dotColor="white"
                            activeDotColor="#B96819"
                            // dot={<View style={{backgroundColor:'red', width: 8, height: 8,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,zIndex:50}} />}
                            // showsButtons={true}
                          //  style={{ backgroundColor:"blue" }}
                        >
                            { result.map((e)=>{
                             return    e.map((elem)=>{
                                 
                                  return   <TouchableOpacity
                                    onPress={()=>{navigation.navigate("OrderScreen",{stock:false})}}
                                        style={{width:calcWidth(300),marginHorizontal:calcWidth(37),height:calcHeight(65),backgroundColor:"white",marginBottom:calcHeight(35),borderRadius:50}}>
                                         <View style={{flexDirection:"row",marginLeft:calcWidth(36),marginRight:calcWidth(28),alignItems:"center",justifyContent:"space-between",height:"100%"}}>
                                         <Image source={{uri:elem.image}}  style={{height:calcHeight(49),width:calcWidth(47),}}/>
   
                                          <Text style={{color:"#212121",fontSize:calcFontSize(12),width:calcWidth(170)}} numberOfLines={1}>{elem.title}</Text>
                                          </View>
                                         
                                           </TouchableOpacity>
                             })
                            })
                        }
                        </Swiper>
                    </View>
                </LinearGradient>


        </View>:        <View style={styles.screen}>
            <ActivityIndicator size="large" color="#0000ff" style={{alignItems:"center",justifyContent:"center",marginTop:'40%'}} />

        </View>
    );
};

export default UpcomingOrders;
