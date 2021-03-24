import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, Image, Alert, SafeAreaView, } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { useTranslation } from 'react-i18next';

import { useNavigation } from '@react-navigation/native';
import { calcHeight, calcWidth } from '../utils/demensios';
//import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
    text: string,
    active: boolean,
    onPress:any
}

const styles = StyleSheet.create({
    button:{
        width: calcWidth(343), paddingVertical: calcHeight(17), justifyContent: "center", alignItems: "center",
        borderRadius: 14
    },
    buttonText:{ color: "#FFFFFF", fontSize: 17 }
});

const SimpleButton: React.FunctionComponent<Props> = (props) => {

    const navigation = useNavigation()
    const { t } = useTranslation();
    return (
        <View style={{ alignItems: "center" }}>
            <TouchableOpacity 
            onPress={()=>{props.active&&props.onPress()}}
            style={[styles.button, { backgroundColor: props.active ? "#F87711" : "#E1E1ED",}]}>
                <Text style={styles.buttonText}>{props.text}</Text>
            </TouchableOpacity>
        </View>
    );
};
export default SimpleButton;