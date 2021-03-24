import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView, Image, Alert, SafeAreaView } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { calcFontSize, calcHeight, calcWidth } from "../../utils/demensios"
import HeaderPage from '../../components/HeaderPage';

//import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
    navigation: NavigationScreenProp<any, any>;
}

const styles = StyleSheet.create({
    screen: { backgroundColor: 'rgba(255, 255, 255, 0.6)', flex: 1 },
    middle: { marginLeft: calcWidth(17), marginRight: calcWidth(36), marginTop: calcHeight(26) },
    back: { marginTop: calcHeight(23), marginLeft: calcWidth(24) },
    plus: { marginTop: calcHeight(57), marginBottom: calcHeight(8) },
    text: {color:"#212121",fontSize:calcFontSize(14),marginBottom:calcHeight(72)},
    footer: { alignItems: 'center', marginBottom: calcHeight(69), justifyContent: "flex-end", marginTop: calcHeight(416) },
    heading1: { color: '#7C7C7C', fontSize: 14, fontWeight: 'bold', lineHeight: 19, marginTop: calcHeight(7), },
    scroll:{ marginTop: calcHeight(38),paddingHorizontal:calcWidth(26)}

});

const ConditionUse: React.FunctionComponent<Props> = ({ navigation }) => {




    return (
        <View style={styles.screen}>
            <HeaderPage back={false} text={"Условия пользования"} />
            <ScrollView style={styles.scroll}>
                <Text style={styles.text}>Lorem ipsum dolor sit amet  consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
 Lorem ipsum dolor sit amet  consectetur adipiscing elit, sed do eiusmod tempor Lorem ipsum dolorLorem ipsum doloLorem ipsum Lorem ipsum Lorem ipLorem ipsum dolor sit amet  consectetur adipiscing elit, sed do eiusmod tempor Lorem ipsum dolor sit amet  consectetur adipiscing elit, sed do eiusmod tempor sum dolor sit amet  consectetur adipiscing elit, sed do eiusmod tempor dolor sit amet  consectetur adipiscing elit, sed do eiusmod tempor dolor sit amet  consectetur adipiscing elit, sed do eiusmod tempor r sit amet  consectetur adipiscing elit, sed do eiusmod tempor  sit amet  consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum  consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum..
                </Text>
            </ScrollView>
        </View>
    );
};

export default ConditionUse;
