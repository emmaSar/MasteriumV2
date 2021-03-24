import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView, Image, Alert, SafeAreaView, TouchableOpacity, PermissionsAndroid } from 'react-native';
import { useDispatch, useSelector, } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';


//import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
   // navigation: NavigationScreenProp<any, any>;
}

const styles = StyleSheet.create({
    screen: { backgroundColor: 'rgba(255, 255, 255, 0.6)', flex: 1, justifyContent: "space-between" },
  
});

const Loading: React.FunctionComponent<Props> = ({  }) => {


    return (
        <View style={styles.screen}>
        
        </View>
    );
};

export default Loading;
