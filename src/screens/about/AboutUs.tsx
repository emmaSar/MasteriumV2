import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView, Image, Alert, SafeAreaView, } from 'react-native';
import { useDispatch, useSelector, } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import { useTranslation } from 'react-i18next';
import Content from '../../components/Content';
//@ts-ignore
import Logo from "../../assets/icons/logo.svg"
//@ts-ignore
import FrameOne from "../../assets/icons/frame1.svg"
//@ts-ignore
import FrameTwo from "../../assets/icons/frame2.svg"
//@ts-ignore
import FrameThree from "../../assets/icons/frame3.svg"
//@ts-ignore
import FrameFour from "../../assets/icons/frame4.svg"
import { calcHeight } from '../../utils/demensios';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { TouchableOpacity } from 'react-native-gesture-handler';
//@ts-ignore
import NextButton from "../../assets/icons/buttonNext.svg"
import { setOpen } from '../../store/actions/mainActions';
import AsyncStorage from '@react-native-community/async-storage';

interface Props {
    navigation: NavigationScreenProp<any, any>;
}

const styles = StyleSheet.create({
    all:{flex: 1, backgroundColor: "#f2f2f2", alignItems: "center", marginTop: calcHeight(50) },
    footer:{ position: "absolute", bottom: 0, flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 16 ,width:"100%"},
    item:{ marginTop: calcHeight(68),alignItems:"center" }
});

const AboutUs: React.FunctionComponent<Props> = ({ navigation }) => {
    const dispatch = useDispatch()
    const { t } = useTranslation();
    const [activeIndex, setActiveIndex] = useState(0)
    let _carouselRef:any=undefined
    const pages = [
        {
            index: 0,
            heading:  t("heading1"),
            text:  t("text1"),
            image:<FrameOne />
        },
        {
            index: 0,
            heading:  t("heading2"),
            text:  t("text2"),
            image:<FrameTwo/>
        },
        {
            index: 0,
            heading:  t("heading3"),
            text:  t("text3"),
            image:<FrameThree/>
        },
        {
            index: 0,
            heading:  t("heading4"),
            text:  t("text4"),
            image:<FrameFour />
        },
    ]
    //@ts-ignore
    function _renderItem({ item }) {
        console.log("****");

        return (

            <View style={styles.item}>
                {item.image}
                <Content heading={item.heading} text={item.text} />
            </View>
        )
    }
    const pagination = () => {
        // const { entries, activeSlide } = this.state;
        return (
            <View style={{ marginLeft:-25 }}>
                <Pagination
                    dotsLength={pages.length}
                    activeDotIndex={activeIndex}
                  
                    dotStyle={{
                        width: 16,
                        height: 5,
                        borderRadius: 42,
                        //marginHorizontal: 2,
                        backgroundColor: '#FFAD40'
                    }}
                    inactiveDotStyle={{
                        width: 7,
                        height: 7,
                        borderRadius: 42,
                        // marginHorizontal: 2,
                        backgroundColor: '#C3BEDA'
                        // Define styles for inactive dots here
                    }}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                />
            </View>
        );
    }
    return (
        <View style={styles.all}>
            <Logo />
            <View >
                <Carousel
                    //  loop={true}
                    //  autoplay={true}
                    // ref={(c) => { this._carousel = c; }}
                    onSnapToItem={(index) => setActiveIndex(index)}
                    ref={ ref => { _carouselRef = ref; } }

                    layout="default"
                    data={pages}
                    renderItem={_renderItem}
                    sliderWidth={400}
                    itemWidth={400}
                    inactiveSlideScale={1}
                    inactiveSlideOpacity={1}
                    inactiveSlideShift={0.7}
                //    loopClonesPerSide={80}
                />


            </View>
            <View style={styles.footer}>
                {pagination()}
            
                <TouchableOpacity onPress={()=>{
                    if(activeIndex<3){
                        setActiveIndex(activeIndex+1);
                        //@ts-ignore
                        _carouselRef!==undefined&& _carouselRef.snapToItem( activeIndex+1 )
                    }
                    else{
                        AsyncStorage.setItem('isopen', JSON.stringify(1))

                        dispatch(setOpen(1))
                    }
                   }}>
                    <NextButton />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AboutUs;
