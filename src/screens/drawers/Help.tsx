import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView, Image, Alert, SafeAreaView, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector, } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import { calcFontSize, calcHeight, calcWidth } from "../../utils/demensios"
import { TouchableOpacity } from 'react-native-gesture-handler';
import HeaderPage from '../../components/HeaderPage';
import { useTranslation } from 'react-i18next';
//@ts-ignore
import Question from "../../assets/icons/question.svg"
import { helpSelector, languageSelector } from '../../store/selector/mainSelector';
import { getHelp } from '../../store/actions/mainActions';
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
    text: { color: '#7C7C7C', fontSize: 14, fontWeight: 'bold', lineHeight: 19 },
    footer: { alignItems: 'center', marginBottom: calcHeight(69), justifyContent: "flex-end", marginTop: calcHeight(416) },
    heading1: { color: '#7C7C7C', fontSize: 14, fontWeight: 'bold', lineHeight: 19, marginTop: calcHeight(7), },
    itemBlock:{
        backgroundColor: "#EEF4F6",
        borderTopRightRadius:50,
        borderTopLeftRadius:50,


        width: calcWidth(355),
        marginHorizontal: calcWidth(10),
        justifyContent: "center",
       marginBottom:calcHeight(5)
     
    },
    question:{color:"#7C7C7C",fontSize:calcFontSize(14),fontWeight:'bold',},
    scroll:{marginVertical:calcHeight(10),marginRight:calcWidth(9)},
    answer:{color:"#212121",fontSize:calcFontSize(14),fontWeight:'300',flex:1},
    block:{position:'absolute',right:0}

});

const Help: React.FunctionComponent<Props> = ({ navigation }) => {

    const question = require('../../assets/icons/question.png')
    const phone = require('../../assets/icons/phone.png')
    const helps=useSelector(helpSelector)
    const [inspect,setinspect]=useState()
    const [loading,setLoading]=useState(true)
    const dispatch=useDispatch()
    const [list,setList]=useState([])
    useEffect(()=>{
        dispatch(getHelp())
    },[])
    const languageIndex=chooseLanguageIndex()

    useEffect(()=>{
        if(helps.length>0){
            setLoading(false)
            let array=[]
            for(let i=0;i<helps.length;i++){
                array.push({question:helps[i].title[languageIndex].value,answer:helps[i].description[languageIndex].value})
            }
            //@ts-ignore
            setList(array)
        }
        
        
    },[helps])

    const { t } = useTranslation();
  
    return (
      <View style={styles.screen}>
             <Modal
                    isVisible={loading}
                    backdropColor="rgba(153, 153, 153,0.5)"
                    style={{ height: 50, width: 50, position: "absolute", top: "40%", left: "40%" }}
                >
                    <ActivityIndicator size="large" color="#FFAD40" />
                </Modal>
            <HeaderPage back={false} text={t("help")} />
            <ScrollView style={{ marginTop: calcHeight(38)}}>
           
            {list.map((el,i) => {
                return <TouchableOpacity 
                key={i}
                style={[styles.itemBlock,{
                    borderRadius:inspect!==i? 50:0,
                    marginBottom:i==(list.length-1)?calcHeight(100):calcHeight(5),
                    height: inspect!==i? calcHeight(40):'auto',
                },]}
                onPress={()=>{
                    //@ts-ignore
                    inspect!==i? setinspect(i):setinspect(null)}}
                >
                    <View style={{marginHorizontal:calcWidth(24),   flexDirection:inspect!==i?"row":'column',alignItems:inspect!==i? 'center':'flex-start',marginTop:inspect==i?  calcWidth(9):0}}>
                    <Text style={styles.question}>{
                    //@ts-ignore
                    el.question}</Text>
                  {inspect!==i?  <View style={styles.block}>
                       <Question />
                        </View>
                    :<ScrollView style={styles.scroll}>
                    <Text style={styles.answer}>{
                    //@ts-ignore
                    el.answer}</Text>

                    </ScrollView>    
                    }
                    </View>
                </TouchableOpacity>

            })}
            </ScrollView>
        </View>
    );
};

export default Help;
