import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView, Image, Alert, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector, } from 'react-redux';
import { calcFontSize, calcHeight, calcWidth } from "../../utils/demensios"
import Modal from 'react-native-modal';
//@ts-ignore
import HeaderPage from '../../components/HeaderPage';
//@ts-ignore
import Search from "../../assets/icons/search.svg"
import { useNavigation } from '@react-navigation/native';
import { loadingSelector, subCategorySelector } from '../../store/selector/productsSelector';
import Carousel, { Pagination } from 'react-native-snap-carousel';
//import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
    add?: boolean
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.6)' },
    middle: { marginLeft: calcWidth(17), marginRight: calcWidth(36), marginTop: calcHeight(26) },
    back: { marginTop: calcHeight(24), marginLeft: calcWidth(24) },
    plus: { marginTop: calcHeight(30), marginBottom: calcHeight(8) },
    text: { color: '#7C7C7C', fontSize: 14, fontWeight: 'bold', lineHeight: 19 },
    footer: { alignItems: 'center', marginBottom: calcHeight(69), marginTop: calcHeight(51) },
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
        // width:calcWidth(47),
        //backgroundColor:'red',
        borderBottomWidth: 0.5
        //textDecorationLine: 'underline', textDecorationColor: 'rgba(33, 33, 33, 0.5)'
    },
all:{ marginTop: calcHeight(15), marginBottom: calcHeight(26), marginLeft: calcWidth(28), marginRight: calcWidth(35), flexDirection: 'row', alignItems: "flex-end" },
heading:{ color: "#212121", fontSize: calcFontSize(18), fontWeight: "bold", marginLeft: calcWidth(45),textAlign:"center" },
textinput:{ borderBottomColor: "#4B4B4B", borderBottomWidth: 1, marginLeft: calcWidth(16), width: calcWidth(241) },
block1:{ width: '94.7%', backgroundColor: '#EFF0F8', borderRadius: 50, flexDirection: 'row', marginLeft: calcWidth(9), paddingLeft: calcWidth(11), paddingVertical: calcHeight(17), marginTop: calcHeight(15) },
block2:{ justifyContent: "space-between", marginLeft: calcWidth(17) },
blockheading:{ fontSize: 12, color: '#212121', marginBottom: calcHeight(35) },
view:{ width: calcWidth(47), borderBottomColor: 'rgba(33, 33, 33, 0.5)', borderBottomWidth: 0.5, marginLeft: calcWidth(80) },
image:{ position: 'absolute', right: 0, },
modal:{ position: 'absolute', marginLeft: 0, left: 9, top: 100 },
modalView:{
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
input:{ width: calcWidth(320), marginTop: calcHeight(30), marginLeft: calcWidth(13), height: calcHeight(151), backgroundColor: "#FFFFFF", borderRadius: 30, },
textName:{marginLeft:calcWidth(30),marginTop:calcHeight(30)},
countModal:{ flexDirection: 'row', alignItems: 'center',marginLeft:calcWidth(30),marginTop:calcHeight(33)},
minusBlock:{height:18,width:18,alignItems:"center",justifyContent:"center"},
countDetalBlock:{ height: calcHeight(39), width: calcWidth(39), borderRadius: 10, borderWidth: 0.5, borderColor: "#000000", alignItems: "center", justifyContent: 'center', marginHorizontal: calcWidth(28) },
countDetal:{ color: "#212121", fontSize: calcFontSize(24) },
add:{ position: 'absolute', right: 6 ,bottom:60},
block3:{ flexDirection: 'row', position: 'absolute', bottom: 30, left: 34 },
image1:{ height: calcHeight(76), width: calcWidth(76), borderRadius: 39, },
texta:{ marginLeft: 28, color: "#FFAD40", fontSize: calcFontSize(12), fontWeight: 'bold' },
footer1:{ alignItems: 'center', marginBottom: calcHeight(25), }
});

const SubCategoryList: React.FunctionComponent<Props> = (route: any) => {

    const navigation = useNavigation()
    const [search, setSearch] = useState(false)
    const x = require('../../assets/icons/x.png')
    const [index,setIndex]=useState(null)
    const [indx,setIndx]=useState(null)    
    const sublist = useSelector(subCategorySelector)
    const [activeIndex,setActiveIndex]=useState(0)
    const loading=useSelector(loadingSelector)
    const [searchText, setSearchText] = useState('')

    const n = 3
    //@ts-ignore
     //@ts-ignore
    //  let l = sublist.length > 0 ? new Array(Math.ceil(sublist.length / n)).fill().map(_ => sublist.splice(0, n)) : []
    let [result,setResult]=useState([])
    //@ts-ignore

   // let result = []
    // let s1 = [...sublist[route.route.params.index]]
  
    //@ts-ignore
    // useEffect(() => {
    //     const unsubscribe = navigation.addListener('focus', () => {
    //         if(!loading){            
    //             //@ts-ignore
    //              let a = sublist.length > 0 ? new Array(Math.ceil(sublist.length / n)).fill().map(_ => sublist.splice(0, n)) : []
    //                        //@ts-ignore
    //              setResult(a)
    //         }

    //     });

    //     return unsubscribe;
    // }, [navigation]);
     //@ts-ignore
     function _changeSearchData(text: string,) {
        setSearchText(text)
        // this.setState({ searchvalue: text }); changetext
        let data=[...sublist]         
          let l = data.filter((i: any) => i.title.toLowerCase().includes(text.toLowerCase()))

        //@ts-ignore
        let res = l.length > 0 ? new Array(Math.ceil(l.length / n)).fill().map(_ => l.splice(0, n)) : []

        // let a = [...result]
        // a[index] = res
               //@ts-ignore

        setResult(res)

        

    }
    useEffect(() => {
        //@ts-ignore

        const unsubscribe = navigation.addListener('blur', () => {
            setSearch(false)
            setSearchText("")

            //@ts-ignore

        });
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);
    //@ts-ignore
     function _renderItem({ item, index }) {
         
        return (
            <View style={{}}>
          {
                      //@ts-ignore

          item.map((elem,i) => {
                
                return <TouchableOpacity
                    onPress={() => { 
                        //@ts-ignore
                        // setIndex(i)
                        //                                             //@ts-ignore

                        // setIndx(index)
                        setTimeout(()=>{navigation.navigate("ProductList",{image:elem.image,id:elem.id,title:elem.title})},200)
                       // navigation.navigate("OrderScreen", { stock: false, id: elem.id, image: elem.image })
                     }}
                    style={{ width: calcWidth(355), marginHorizontal: calcWidth(10), height: calcHeight(90), backgroundColor:i===index && index==indx?"#FFAD40": "#EEF4F6", marginBottom: calcHeight(26), borderRadius: 30 }}>
                    <View style={{ flexDirection: "row", marginLeft: calcWidth(36), marginRight: calcWidth(28), alignItems: "center", justifyContent: "space-between", height: "100%" }}>
                        <Image source={{ uri: elem.image }} style={{ height: calcHeight(49), width: calcWidth(47), }} />
                        <Text style={{ color: "#212121", fontSize: 12, width: calcWidth(170) }} numberOfLines={1}>{elem.title}</Text>
                    </View>
                </TouchableOpacity>
            })}
            </View>
        )
    }

    const  pagination= ()=> {
        // const { entries, activeSlide } = this.state;
        return (
            <View style={{marginBottom:calcHeight(0)}}>
            <Pagination
              dotsLength={result.length}
              activeDotIndex={activeIndex}
              containerStyle={{ backgroundColor: 'breen' }}
              dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  //marginHorizontal: 2,
                  backgroundColor: '#FFAD40'
              }}
              inactiveDotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
               // marginHorizontal: 2,
                backgroundColor: '#A7A7A7'
                  // Define styles for inactive dots here
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
            </View>
        );
    }
    useEffect(()=>{
        
        if(!loading){   
            let s=[...sublist]         
            //@ts-ignore
             let a = s.length > 0 ? new Array(Math.ceil(s.length / n)).fill().map(_ => s.splice(0, n)) : []
                       //@ts-ignore
             setResult(a)
        }
    },
    [sublist,loading])
    // let result = s1.length > 0 ? new Array(Math.ceil(s1.length / n)).fill().map(_ => s1.splice(0, n)) : []

    return ( 
        <View style={styles.screen}>
 <Modal
                isVisible={loading}
                backdropColor="rgba(153, 153, 153,0.5)"
                style={{ height: 50, width: 50, position: "absolute", top: "40%", left: "40%" }}
            >
                <ActivityIndicator size="large" color="#FFAD40" />
            </Modal>
            <HeaderPage back={true} />
            <View style={styles.all}>
                <TouchableOpacity onPress={() => { setSearch(true) }}><Search /></TouchableOpacity>
                {!search ? <View style={{width:calcWidth(230)}}><Text style={styles.heading}>{route.route.params.title}</Text></View>
                    : <View style={styles.textinput}>
                        <TextInput 
                        value={searchText}
                        onChangeText={(text)=>{_changeSearchData(text)}}
                        style={{ paddingVertical: 0 }} />
                    </View>
                }
                {search ? <TouchableOpacity
                    onPress={() => { setSearch(false) }}
                    style={{ marginLeft: calcWidth(10) }}>
                    <Image source={x} />
                </TouchableOpacity> : null}


            </View>
            <View style={{width:"100%",alignItems:"center"}}>
                <Image source={{uri:route.route.params.image}} style={{height:calcHeight(100),width:calcWidth(150),resizeMode:"contain"}} />
                </View>
            <View style={{ height: calcHeight(400), marginTop: calcHeight(38) }}>
            <Carousel
            // ref={(c) => { this._carousel = c; }}
            onSnapToItem={(index) => setActiveIndex(index)}

            layout="default"
            data={result}
            //@ts-ignore
            renderItem={_renderItem}
            sliderWidth={400}
            itemWidth={400}
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
            inactiveSlideShift={0.7}
            
            //    loopClonesPerSide={80}
        />
        {pagination()}
                    {/* <Swiper
                        dotColor="#A7A7A7"
                        activeDotColor="#FFAD40"
                        style={{ paddingBottom: 0, alignItems: "center", justifyContent: "center" }}
                    >
                        {
                            //@ts-ignore
                            result.map((e,ind) => {
                                //@ts-ignore

                                return e.map((elem,i) => {
                                    return <TouchableOpacity
                                        onPress={() => { 
                                            //@ts-ignore
                                            setIndex(i)
                                                                                        //@ts-ignore

                                            setIndx(ind)
                                            setTimeout(()=>{navigation.navigate("ProductList",{image:elem.image,id:elem.id,title:elem.title})},200)
                                           // navigation.navigate("OrderScreen", { stock: false, id: elem.id, image: elem.image })
                                         }}
                                        style={{ width: calcWidth(355), marginHorizontal: calcWidth(10), height: calcHeight(90), backgroundColor:i===index && ind==indx?"#FFAD40": "#EEF4F6", marginBottom: calcHeight(26), borderRadius: 30 }}>
                                        <View style={{ flexDirection: "row", marginLeft: calcWidth(36), marginRight: calcWidth(28), alignItems: "center", justifyContent: "space-between", height: "100%" }}>
                                            <Image source={{ uri: elem.image }} style={{ height: calcHeight(49), width: calcWidth(47), }} />
                                            <Text style={{ color: "#212121", fontSize: 12, width: calcWidth(170) }} numberOfLines={1}>{elem.title}</Text>
                                        </View>
                                    </TouchableOpacity>
                                })
                            })
                        }
                    </Swiper> */}
                </View>
         

        </View>
    );
};

export default SubCategoryList;

