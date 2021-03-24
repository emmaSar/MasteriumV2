import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView, Image, Alert, SafeAreaView, TouchableOpacity, TouchableNativeFeedback, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector, } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import { calcFontSize, calcHeight, calcWidth } from "../../utils/demensios"

import HeaderPage from '../../components/HeaderPage';

import Item from '../../components/Item';
//@ts-ignore
import Menu from "../../assets/icons/menu1F.svg"
import Carousel from 'react-native-snap-carousel';

import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { getCategoryList, getSubCategoryList, setCategoryList, setLoading } from '../../store/actions/categoryActions';
import { categoryListSelector, LoadingSelector, subCategoryListSelector } from '../../store/selector/categorySelector';
import navigationService from '../../services/NavigationService';
import { languageSelector, loadingSelector, popularProductsSelector } from '../../store/selector/mainSelector';
import { getPopularSubCategory, setIndex } from '../../store/actions/mainActions';
import Modal from "react-native-modal"
import { chooseLanguageIndex } from '../../utils/config';
import { getStocks } from '../../store/actions/products';
import { stocksSelector } from '../../store/selector/productsSelector';

//import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
    navigation: NavigationScreenProp<any, any>;
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.6)', },
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

const HomeScreen: React.FunctionComponent<Props> = ({ navigation }) => {
    const dispatch = useDispatch()
    const popularProducts = useSelector(popularProductsSelector)
    const languageIndex=chooseLanguageIndex()
    let [works, setWorks] = useState([])
    const loading = useSelector(LoadingSelector)
    const items = useSelector(stocksSelector)
    
    // [
    //     {
    //         image: require("../../assets/icons/item3.png"),

    //     },
    //     {
    //         image: require("../../assets/icons/item3.png"),

    //     },
    //     {
    //         image: require("../../assets/icons/item1.png"),

    //     },
    //     {
    //         image: require("../../assets/icons/item3.png"),

    //     },
    // ]
    useEffect(() => {
        if (popularProducts.length > 0) {
            let list_array = []
            for (let i = 0; i < popularProducts.length; i++) {
                list_array.push({ name: popularProducts[i].title[languageIndex].value, image: popularProducts[i].icon ,id:popularProducts[i].id})
            }
            list_array.push({ name: "", image: "" })
            //@ts-ignore
            setWorks(list_array)
        }
    }, [popularProducts])
    
    const list = useSelector(categoryListSelector)
    const sublist = useSelector(subCategoryListSelector)
    //@ts-ignore
      useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            dispatch(setIndex(undefined))
        });

        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        if (list.length > 0) {
            for (let i = 0; i < list.length; i++) {
                dispatch(getSubCategoryList(list[i].id))
            }
        }
    }, [list]);
    useEffect(() => {
        dispatch(setLoading(true))
        dispatch(getPopularSubCategory())
        dispatch(getStocks())
        dispatch(getCategoryList())

    }, []);
    //@ts-ignore
    function _renderItem({ item }) {
        return (
         
                <Item image={{uri:item.image}} />
        )
    }
    
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
            <View style={{ flexDirection: "row", flexWrap: 'wrap', marginTop: '5.15%', marginLeft: calcWidth(11), marginRight: calcWidth(17), height: "28%" }}>
                {works.map((elem, i) => {
                    if (i < 5) {
                        return <TouchableOpacity
                            key={i}
                            //@ts-ignore
                            onPress={() => { navigation.navigate("OrderScreen", { stock: false, id: elem.id, image: elem.image }) }}

                            style={{ alignItems: "center", width: "33%", height: "auto", marginBottom: '4.11%', }}>

                            <Image source={{
                                //@ts-ignore
                                uri: elem.image
                            }} style={{ height: calcHeight(48), width: calcWidth(48) }} />
                            <Text style={{ width: calcWidth(89), color: "#212121", fontSize: calcFontSize(10), textAlign: "center", marginTop: calcHeight(8) }}>{
                                //@ts-ignore

                                elem.name}</Text>
                        </TouchableOpacity>
                    }
                    else if (i == 5) {
                        return <TouchableOpacity
                            key={i}

                            onPress={() => { navigationService.navigate("MenuNavigator") }}
                            style={{ alignItems: "center", width: "33%", height: "auto", marginBottom: calcHeight(32), justifyContent: "space-between" }}>
                            <Menu width={calcHeight(48)} height={calcHeight(48)} />

                            <Text style={{ width: calcWidth(89), color: "#212121", fontSize: calcFontSize(10), textAlign: "center", marginBottom: calcHeight(22), marginTop: calcHeight(8) }}>Ещё работы...</Text>
                        </TouchableOpacity>

                    }
                })}
            </View>
            <View style={{ marginVertical: calcHeight(10), height: calcHeight(195) }}>
                <Carousel
                    // ref={(c) => { this._carousel = c; }}
                    layout="default"
                    loop={true}
                    autoplay={true}
                    autoplayDelay={1000}
                    autoplayInterval={2000}
                    data={items}
                    renderItem={_renderItem}
                    sliderWidth={400}
                    itemWidth={400}
                    inactiveSlideScale={1}
                    inactiveSlideOpacity={1}
                    inactiveSlideShift={0.7}
                //    loopClonesPerSide={80}
                />
                {/* <Swiper
            autoplay={true}
        
            loop={true}
            autoplayTimeout={1.5}


                         dotColor="transparent"
                     activeDotColor="transparent"
                  
                        >
                
                {
                    items.map((el)=>{
                        return<TouchableWithoutFeedback

                        onPress={()=>{navigation.navigate('OrderScreen')}}>
                         <Item image={el.image}  />
                         </TouchableWithoutFeedback>                    })
                }
                </Swiper> */}
            </View>
            <View style={{ height: calcHeight(218), width: "100%", position: "absolute", bottom: "4%", }}>
                <View style={{ position: "absolute", top: -1, zIndex: 10, height: "32%", width: "100%" }}>
                    <Image source={require('../../assets/icons/vector.png')} style={{ position: "absolute", top: 0, height: "100%", width: "100%" }} />
                </View>
                <View style={{ width: "100%", height: "100%" }}>
                    <Image source={require('../../assets/icons/image.png')} style={{ width: "100%", height: "100%" }}
                        resizeMode='cover'
                    />
                </View>
            </View>


        </View>
    );
};

export default HomeScreen;
