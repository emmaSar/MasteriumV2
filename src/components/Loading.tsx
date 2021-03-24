import React, { useEffect } from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView, Image, Alert, SafeAreaView, ActivityIndicator } from 'react-native';
import Modal from "react-native-modal"



import { calcFontSize, calcHeight, calcWidth } from "../utils/demensios"
//@ts-ignore
import Logo from "../assets/icons/logo.svg"
//@ts-ignore
import Pro from "../assets/icons/pro.svg"
import { useSelector } from 'react-redux';
import { loadingSelector } from '../store/selector/mainSelector';
//import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
    text?: string,
    first?:boolean,
    back?:boolean,
    text1?:string
}

const styles = StyleSheet.create({
    screen: { alignItems: "center", marginTop: calcHeight(49),marginBottom:calcHeight(5) },
    screen1: { alignItems: "center", },
    cont:{ flexDirection: "row" },
    logo1:{ height: calcHeight(33), width: calcWidth(100) },
    logo2:{ marginTop: calcHeight(35),marginLeft:calcWidth(-7) },
    heading:{ fontSize: 20, color: "#242424", lineHeight: 25, fontWeight: 'bold', fontStyle: 'normal', marginTop: calcHeight(19.4) },
    heading1:{ fontSize: 20, color: "#242424", lineHeight: 25, fontWeight: 'bold', fontStyle: 'normal', },
    heading2:{fontSize: 14, color: "#7C7C7C", lineHeight: 16, fontWeight: 'bold', fontStyle: 'normal', marginTop: calcHeight(19.4)}
  
});

const Loading: React.FunctionComponent<Props> = (props) => {
    
    const loading=useSelector(loadingSelector)
    return (
 
        <Modal
        isVisible={loading}
        backdropColor="rgba(153, 153, 153,0.5)"
        style={{ height: 50, width: 50, position: "absolute", top: "40%", left: "40%" }}
    >
        <ActivityIndicator size="large" color="#FFAD40" />
    </Modal>
    );
};

export default Loading;
