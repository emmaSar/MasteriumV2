import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView, Image, Alert, SafeAreaView, TouchableOpacity, Animated, Dimensions, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector, } from 'react-redux';
import { calcFontSize, calcHeight, calcWidth } from "../../utils/demensios"
import Modal from 'react-native-modal';
//@ts-ignore
import HeaderPage from '../../components/HeaderPage';
//@ts-ignore
import Search from "../../assets/icons/search.svg"
import { useNavigation } from '@react-navigation/native';
//@ts-ignore

import Plus from "../../assets/icons/plus.svg"
//@ts-ignore

import Ominus from "../../assets/icons/ominus.svg"
//@ts-ignore

import Oplus from "../../assets/icons/oplus.svg"
import { subCategoryListSelector } from '../../store/selector/categorySelector';
import Swiper from 'react-native-swiper';
import { getProductList, getProductListBySub, setLoading, setNextProductsList, setProductListBySub, } from '../../store/actions/products';
import { loadingSelector, productSelector, productsListSelector, subCategorySelector } from '../../store/selector/productsSelector';
import { TouchableNativeFeedback, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { addOrder } from '../../store/actions/orderAction';
import { Callout } from 'react-native-maps';
import AsyncStorage from '@react-native-community/async-storage';
import { orderListSelector } from '../../store/selector/orderSelector';
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
    all: { marginTop: calcHeight(15), marginBottom: calcHeight(26), marginLeft: calcWidth(28), marginRight: calcWidth(35), flexDirection: 'row', alignItems: "flex-end" },
    heading: { color: "#212121", fontSize: calcFontSize(18), fontWeight: "bold", marginLeft: calcWidth(45), textAlign: "center" },
    textinput: { borderBottomColor: "#4B4B4B", borderBottomWidth: 1, marginLeft: calcWidth(16), width: calcWidth(241) },
    block1: { width: '94.7%', backgroundColor: '#EFF0F8', borderRadius: 50, flexDirection: 'row', marginLeft: calcWidth(9), paddingLeft: calcWidth(11), paddingVertical: calcHeight(17), marginTop: calcHeight(15) },
    block2: { justifyContent: "space-between", marginLeft: calcWidth(17) },
    blockheading: { fontSize: 12, color: '#212121', marginBottom: calcHeight(35) },
    view: { width: calcWidth(47), borderBottomColor: 'rgba(33, 33, 33, 0.5)', borderBottomWidth: 0.5, marginLeft: calcWidth(80) },
    image: { position: 'absolute', right: 0, },
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
    countModal: { flexDirection: 'row', alignItems: 'center', marginTop: calcHeight(22) },
    minusBlock: { height: 18, width: 18, alignItems: "center", justifyContent: "center" },
    countDetalBlock: { height: calcHeight(39), width: calcWidth(39), borderRadius: 10, borderWidth: 0.5, borderColor: "#000000", alignItems: "center", justifyContent: 'center', marginHorizontal: calcWidth(28) },
    countDetal: { color: "#212121", fontSize: calcFontSize(24) },
    add: { position: 'absolute', right: 6, bottom: 60 },
    block3: { flexDirection: 'row', position: 'absolute', bottom: 30, left: 34 },
    image1: { height: calcHeight(76), width: calcWidth(76), borderRadius: 39, },
    texta: { marginLeft: 28, color: "#FFAD40", fontSize: calcFontSize(12), fontWeight: 'bold' },
    footer1: { alignItems: 'center', marginBottom: calcHeight(25), }
});

const ProductList: React.FunctionComponent<Props> = (route: any) => {
    const [searchText, setSearchText] = useState('')

    const [search, setSearch] = useState(false)
    const x = require('../../assets/icons/x.png')
    const [index1, setIndex] = useState(null)
    const [indx, setIndx] = useState(null)
    const loading = useSelector(loadingSelector)
    const navigation = useNavigation()
    const [bounceValue1, setBonuceValue1] = useState(new Animated.Value(Dimensions.get("window").height))
    const [visable, setVisable] = useState(false)
    const dispatch = useDispatch()
    const products = useSelector(productSelector)
    const [indexSwiper, setIndexSwiper] = useState(0)
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            dispatch(getProductListBySub(route.route.params.id))
            dispatch(setLoading(true))
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);
    const n = 9
    //@ts-ignore
    //@ts-ignore
    function _changeSearchData(text: string,) {
        setSearchText(text)
        // this.setState({ searchvalue: text }); changetext
        let data = [...products.results]
        let l = data.filter((i: any) => i.title.toLowerCase().includes(text.toLowerCase()))

        //@ts-ignore
        let res = l.length > 0 ? new Array(Math.ceil(l.length / n)).fill().map(_ => l.splice(0, n)) : []

        // let a = [...result]
        // a[index] = res
               //@ts-ignore

        setResult(res)

        

    }
    //@ts-ignore
    useEffect(() => {
        //@ts-ignore

        const unsubscribe = navigation.addListener('blur', () => {
            dispatch(setProductListBySub({}))

            //@ts-ignore

        });
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);
    let swiper: any = null
    useEffect(() => {
        console.log("////////////////////////////////", swiper);

        //    console.log(swiper,"swiperswiperswiperswiperswiperswiper");

        swiper !== null && swiper.scrollTo(1, true)
    }, [swiper])
    let [result, setResult] = useState([])
    const [activeIndex,setActiveIndex]=useState(0)
    const [countDetal, setcountDetal] = useState(1)
    const orderList = useSelector(orderListSelector)
    useEffect(() => {
        if (!loading && Object.keys(products).length > 0) {
            let array = [...products.results]

            //@ts-ignore
            let list = products.count > 0 ? new Array(Math.ceil(products.count / n)).fill().map(_ => array.splice(0, n)) : []
            //@ts-ignore
            setResult(list)

        }
    }, [products, loading]);
    function _onpresMinus() {
        if (countDetal >//@ts-ignore
            result[indx][index1].minimal_count) {
            setcountDetal(countDetal - 1)
        }
    }
    function _onpresPlus() {
        if (countDetal < //@ts-ignore
            result[indx][index1].quantity) {
            setcountDetal(countDetal + 1)
        }
    }
    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {

        });
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);
    useEffect(() => {
        if (visable) {
            setTimeout(() => {
                setVisable(false)
                setIndex(null)
                setIndx(null)
                let toValue = Dimensions.get("window").height

                Animated.timing(bounceValue1, {
                    toValue: toValue,
                    duration: 1000,
                    useNativeDriver: true
                }).start();
                setcountDetal(0)
            }, 1000)
        }
    }, [visable])
    console.log(result, "resulyyyyyyyyy");
    //@ts-ignore
    function _renderItem({ item, index }) {
        return (
            <View
                key={index + Math.random()}
                style={{
                    flexDirection: "row", flexWrap: "wrap",
                    //  marginHorizontal: calcWidth(10)
                    // ,width:calcWidth(355),
                }}>
                {     
                //@ts-ignore
                item.map((elem, i) => {

                    return <TouchableOpacity
                        key={elem.id + Math.random()}
                        onPress={() => {
                            console.log("iiiiiiiiii",i);
                            console.log("indindindind",index);
                            //@ts-ignore
                            setIndex(i)
                            //@ts-ignore

                            setIndx(index)
                            setTimeout(() => {
                                let toValue = 0

                                Animated.timing(bounceValue1, {
                                    toValue: toValue,
                                    duration: 1000,
                                    useNativeDriver: true
                                }).start();
                            }, 200
                            )
                        }}
                        style={{
                            width: calcWidth(90),
                            paddingVertical: 7,
                            //                          height: calcHeight(90),
                            backgroundColor: i === index1 && index == indx ? "#FFAD40" : "#EEF4F6",
                            marginBottom: calcHeight(26),
                            borderRadius: 30,
                            marginLeft: calcWidth(25),
                            alignItems: "center"
                        }}>

                        <Image source={{ uri: elem.primaryImage }} style={{ height: calcHeight(45), width: calcWidth(50) }} />
                        <Text style={{ color: "#212121", fontSize: calcFontSize(9), fontWeight: "bold", textAlign: "center" }}>{elem.title}</Text>
                        <Text style={{ color: "#212121", fontSize: calcFontSize(9), fontWeight: "bold", textAlign: "center" }}>{elem.discounted_price} <Text style={{ color: "#24A322" }}>gel</Text></Text>
                    </TouchableOpacity>
                })}
            </View>
        )
    }

   const  pagination= ()=> {
        // const { entries, activeSlide } = this.state;
        return (
            <View style={{marginBottom:calcHeight(120)}}>
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

    return (
        <View style={styles.screen}>

          <HeaderPage back={true} />
       <Modal
            isVisible={loading}
            backdropColor="rgba(153, 153, 153,0.5)"
            style={{ height: 50, width: 50, position: "absolute", top: "40%", left: "40%" }}
        >
            <ActivityIndicator size="large" color="#FFAD40" />
        </Modal>
        <View style={styles.all}>
            <TouchableOpacity onPress={() => { setSearch(true) }}><Search /></TouchableOpacity>
            {!search ? <View style={{ width: calcWidth(230) }}><Text style={styles.heading}>{route.route.params.title}</Text></View>
                : <View style={styles.textinput}>
                    <TextInput
                    value={searchText}
                    onChangeText={(text)=>{_changeSearchData(text)}}
                    style={{
                         paddingVertical: 0 }} />
                </View>
            }
            {search ? <TouchableOpacity
                onPress={() => { setSearch(false) }}
                style={{ marginLeft: calcWidth(10) }}>
                <Image source={x} />
            </TouchableOpacity> : null}
        </View>
        <View style={{ width: "100%", alignItems: "center" }}>
            <Image source={{ uri: route.route.params.image }} style={{ height: calcHeight(100), width: calcWidth(150), resizeMode: "contain" }} />
        </View> 
        <View style={{height:calcHeight(550)}}>
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
    </View>
            <Animated.View style={{
                height: calcHeight(550), width: "100%",
                backgroundColor: "#EEF4F6", position: 'absolute',
                borderTopLeftRadius: 50,
                borderTopRightRadius: 50,
                alignItems: "center",
                bottom: 0, transform: [{ translateY: bounceValue1 }]
            }}>
                <TouchableWithoutFeedback style={{ height: calcHeight(50), width: calcWidth(355), alignItems: "center", }}

                    onPress={() => {
                        let toValue = Dimensions.get("window").height
                        setIndex(null)
                        setIndx(null)
                        !visable && Animated.timing(bounceValue1, {
                            toValue: toValue,
                            duration: 1000,
                            useNativeDriver: true
                        }).start();

                    }}>
                    <View style={{ backgroundColor: "#D2D2D2", height: 4, width: 108, borderRadius: 30, marginTop: calcHeight(15) }}>


                    </View>
                </TouchableWithoutFeedback>

                {index1 !== null && indx !== null ? <View style={{ marginTop: calcHeight(30), alignItems: "center" }}>
                    <Image source={{
                        //@ts-ignore
                        uri: result[indx][index1].primaryImage
                    }} style={{ height: calcHeight(80), width: calcWidth(148), resizeMode: "contain", }} />
                    <Text style={{ marginTop: calcHeight(16), color: "#212121", fontSize: 14, fontWeight: "bold" }}>{
                        //@ts-ignore
                        result[indx][index1].title}</Text>
                    <Text style={{ marginTop: calcHeight(16), color: "#212121", fontSize: 12, fontWeight: "normal" }}>{
                        //@ts-ignore
                        result[indx][index1].description}</Text>

                    <Text style={{ marginTop: calcHeight(25), color: "#212121", fontSize: 36, fontWeight: "bold" }}>{
                        //@ts-ignore
                        result[indx][index1].discounted_price}<Text style={{ color: "#24A322", fontSize: 24 }}> gel</Text> </Text>

                </View> : null}
                <View style={styles.countModal}>
                    <TouchableOpacity onPress={() => { _onpresMinus() }} style={styles.minusBlock}>
                        <Ominus />
                    </TouchableOpacity>
                    <View style={styles.countDetalBlock}>
                        <Text style={styles.countDetal}>{

                            countDetal}</Text>
                    </View>
                    <TouchableOpacity onPress={() => { _onpresPlus() }} style={styles.minusBlock}>
                        <Oplus />
                    </TouchableOpacity>

                </View>
                <TouchableOpacity

                    onPress={() => {
                        //@ts-ignore
                        countDetal !== 0 && dispatch(addOrder({ ...result[indx][index1], count: countDetal, type: 0 })) &&
                            //@ts-ignore
                            AsyncStorage.setItem('orders', JSON.stringify([...orderList, { ...result[indx][index], count: countDetal, type: 0 }]))
                        setVisable(true)
                    }}
                    style={{ marginTop: calcHeight(40) }}>
                    <Plus />
                </TouchableOpacity>
            </Animated.View>
            <Modal
                backdropColor="transparent"
                onBackdropPress={() => { }}
                isVisible={visable}
                animationIn={'slideInLeft'}
                animationOut={'slideOutLeft'}
                style={{ position: 'absolute', alignItems: "center", justifyContent: "center", height: calcHeight(50), width: calcHeight(250), backgroundColor: "#24A322", elevation: 8, }}
            >
                <Text style={{ color: "white", fontSize: calcFontSize(15) }}>Success</Text>
            </Modal>
        </View>
    );
};

export default ProductList;

