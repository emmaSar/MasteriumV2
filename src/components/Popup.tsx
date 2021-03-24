import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView, Image, Alert, SafeAreaView, ImageBackground } from 'react-native';

import { calcFontSize, calcHeight, calcWidth } from "../utils/demensios"
import DropDownPicker from 'react-native-dropdown-picker';

//import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
    items: any
    check?:boolean
    onSelect?:any
    firstitem?:string
    visible?:boolean
    setVisibile?:any
}

const styles = StyleSheet.create({
    screen: { alignItems: "center", marginTop: calcHeight(49), marginBottom: calcHeight(5) },
    screen1: { alignItems: "center", },
    cont: { flexDirection: "row" },
    logo1: { height: calcHeight(33), width: calcWidth(100) },
    logo2: { marginTop: calcHeight(35), marginLeft: calcWidth(-7) },
    heading: { fontSize: 20, color: "#242424", lineHeight: 25, fontWeight: 'bold', fontStyle: 'normal', marginTop: calcHeight(19.4) },
    heading1: { fontSize: 20, color: "#242424", lineHeight: 25, fontWeight: 'bold', fontStyle: 'normal', },
    heading2: { fontSize: 14, color: "#7C7C7C", lineHeight: 16, fontWeight: 'bold', fontStyle: 'normal', marginTop: calcHeight(19.4) }

});

const Popup: React.FunctionComponent<Props> = (props) => {

    const logo = require('../assets/icons/logo.png')
    const pro = require('../assets/icons/pro.png')
    const [value, setValue] = useState('')
    //const [visible,setVisibile]=useState(false)
    return (
        <>
            <DropDownPicker 
                            arrowSize={15}

            isVisible={props.visible}
                items={props.items}
                defaultValue={null}
                onOpen={()=>{props.setVisibile(true)}}
                onClose={()=>{props.setVisibile(false)}}
                placeholder={props.firstitem!==undefined? props.firstitem:props.items[0].label}
                placeholderStyle={{ color: "#212121", fontSize: calcFontSize(13), fontWeight:props.check?"normal": "bold" }}
                selectedLabelStyle={{ color: "#212121", fontSize: calcFontSize(13),fontWeight:props.check?"normal": "bold"  }}
                labelStyle={{ color: "#7C7C7C", fontSize: calcFontSize(13), fontWeight:props.check?"normal": "bold" , marginLeft: calcWidth(20) }}
                activeItemStyle={{ backgroundColor: "#468BD7", width: '100%', height: calcHeight(18), borderRadius: 50, alignItems: "center", }}
                activeLabelStyle={{ color: "white", fontSize: calcFontSize(13), fontWeight:props.check?"normal": "bold"  }}
                containerStyle={{ height: 30, width: calcWidth(210), }}
                style={{ borderColor:props.check==true?"transparent": "#EEF4F6",
                borderBottomColor:props.check?"#FFAD40":"#EEF4F6",
                borderLeftColor:props.check && props.visible?"#FFAD40":"transparent",
                borderRightColor:props.check && props.visible?"#FFAD40":"transparent",
                borderTopRightRadius:props.check==true?0:props.visible?15: 30, borderTopLeftRadius:props.check==true?0:props.visible?15: 30, borderBottomRightRadius:props.check==true?0: 30, borderBottomLeftRadius:props.check==true?0: 30 }}
                itemStyle={{
                    justifyContent: 'flex-start',
                    
                }}
                dropDownStyle={{ backgroundColor: 'white', borderTopColor: "white", borderColor:props.check?"#FFAD40" :"#EEF4F6", borderBottomLeftRadius: 15, borderBottomRightRadius: 15, }}
                onChangeItem={item => {setValue(item.value),props.onSelect!==undefined? props.onSelect(item.value):null}}
            />
        </>
    );
};

export default Popup;
