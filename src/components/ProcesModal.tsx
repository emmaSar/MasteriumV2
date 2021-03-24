import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Image, Text, StyleSheet, Linking } from "react-native";
import Modal from 'react-native-modal';
import { useTranslation } from "react-i18next";
//import { useNavigation } from "@react-navigation/native";

interface Props {
    visiable?: boolean,
    onPress?: any,
    error?: boolean
}
const ProcesModal: React.FunctionComponent<Props> = (props) => {
    // const navigation = useNavigation()
    const { t } = useTranslation();
    const errorMessage = t("errorMessage")
    const successMeassage = t("successMeassage")

    const styles = StyleSheet.create({


    });

    return <Modal
        backdropColor="transparent"
        // onBackdropPress={()=>props.onPress()}
        isVisible={props.visiable}
        animationIn={'slideInLeft'}
        animationOut={'slideOutLeft'}
        style={{ position: 'absolute', left: "20%", top: "5%", height: 50, width: 200, backgroundColor: "white", elevation: 5 }}
    >
        {props.error ? <Text style={{ fontSize: 18, color: "red" }}>{errorMessage}</Text> : <Text style={{ fontSize: 18, color: "green" }} >{successMeassage}</Text>}

    </Modal>
};

export default ProcesModal
