import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView, Image, Alert, SafeAreaView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector, } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import { calcFontSize, calcHeight, calcWidth } from "../../utils/demensios"
import Modal from 'react-native-modal';

import { spareSelector } from '../../store/selector/spareselector';
import { addSpare } from "../../store/actions/spareActions"
//@ts-ignore
import TextInputMask from 'react-native-text-input-mask';
//@ts-ignore
import HeaderPage from '../../components/HeaderPage';
//@ts-ignore
import Search from "../../assets/icons/search.svg"
import { useNavigation } from '@react-navigation/native';
import { addSpareService, deleteSpareService } from '../../store/actions/spareserviceActions';
import { spareServiceSelector } from '../../store/selector/spareserviceSelector';
//@ts-ignore

import Plus from "../../assets/icons/plus.svg"
//@ts-ignore

import Ominus from "../../assets/icons/ominus.svg"
//@ts-ignore

import Oplus from "../../assets/icons/oplus.svg"
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
all:{ marginTop: calcHeight(15), marginBottom: calcHeight(54), marginLeft: calcWidth(28), marginRight: calcWidth(35), flexDirection: 'row', alignItems: "flex-end" },
heading:{ color: "#212121", fontSize: calcFontSize(18), fontWeight: "bold", marginLeft: calcWidth(45) },
textinput:{ borderBottomColor: "#4B4B4B", borderBottomWidth: 1, marginLeft: calcWidth(16), width: calcWidth(241) },
block1:{ width: '94.7%', backgroundColor: '#EFF0F8', borderRadius: 50, flexDirection: 'row', marginLeft: calcWidth(9), paddingLeft: calcWidth(11), paddingVertical: calcHeight(17), marginTop: calcHeight(15) },
block2:{ justifyContent: "space-between", marginLeft: calcWidth(17) },
blockheading:{ fontSize: 12, color: '#212121', marginBottom: calcHeight(35) },
view:{ width: calcWidth(47), borderBottomColor: 'rgba(33, 33, 33, 0.5)', borderBottomWidth: 0.5, marginLeft: calcWidth(80) },
image:{ position: 'absolute', right: 0, },
modal:{ position: 'absolute', marginLeft: 0, left: 9, top: 100 },
modalView:{
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
input:{ width: calcWidth(320), marginTop: calcHeight(30), marginLeft: calcWidth(13), height: calcHeight(151), backgroundColor: "#FFFFFF", borderRadius: 30, },
textName:{marginLeft:calcWidth(30),marginTop:calcHeight(30)},
countModal:{ flexDirection: 'row', alignItems: 'center',marginLeft:calcWidth(30),marginTop:calcHeight(33)},
minusBlock:{height:18,width:18,alignItems:"center",justifyContent:"center"},
countDetalBlock:{ height: calcHeight(39), width: calcWidth(39), borderRadius: 10, borderWidth: 0.5, borderColor: "#000000", alignItems: "center", justifyContent: 'center', marginHorizontal: calcWidth(28) },
countDetal:{ color: "#212121", fontSize: calcFontSize(24) },
add:{ position: 'absolute', right: 6 ,bottom:60},
block3:{ flexDirection: 'row', position: 'absolute', bottom: 30, left: 34 },
image1:{ height: calcHeight(76), width: calcWidth(76), borderRadius: 39, },
texta:{ marginLeft: 28, color: "#FFAD40", fontSize: calcFontSize(12), fontWeight: 'bold' },
footer1:{ alignItems: 'center', marginBottom: calcHeight(25), }
});

const SpareBoard: React.FunctionComponent<Props> = (route: any) => {
    const add = route.route.params !== undefined ? route.route.params.add : false
    const plus = require('../../assets/icons/plus.png')

    const spare = useSelector(spareSelector)
    const navigation = useNavigation()
    const [search, setSearch] = useState(false)
    const x = require('../../assets/icons/x.png')
    const [visible, setvisible] = useState(false)
    const spareService = useSelector(spareServiceSelector)
    const [service, setservice] = useState(spare)
    const [element, setElem] = useState({})
   
    const [countDetal,setCountDetal]=useState("1")
    const ominus = require('../../assets/icons/ominus.png')
    const oplus = require('../../assets/icons/oplus.png')
    useEffect(() => {

        setservice(spare)

    }, [spare]);
    useEffect(() => {
        !add && setservice(spare)


    }, [add]);
    const [heading, setheading] = useState('')
    const [count, setcount] = useState("")
    const [index,setIndex]=useState(null)
    const dispatch = useDispatch()
    function chack(id: number) {
        for (let i = 0; i < spareService.length; i++) {
            if (spareService[i].id == id) {
                return true
            }
        }
        return false
    }
    function _onpresMinus(){
        if(parseInt( countDetal)!==0){
        let a=parseInt(countDetal)-1;
        setCountDetal(a.toString())}
    }
    function _onpresPlus(){
        if(parseInt( countDetal)!==parseInt(
            //@ts-ignore
            element.countDetal)){
        let a=parseInt(countDetal)+1;setCountDetal(a.toString())}
    }
    return ( 
        <View style={styles.screen}>

            <HeaderPage back={true} />
            <View style={styles.all}>
                <TouchableOpacity onPress={() => { setSearch(true) }}><Search /></TouchableOpacity>
                {!search ? <Text style={styles.heading}>Запчасти на борту</Text>
                    : <View style={styles.textinput}>
                        <TextInput style={{ paddingVertical: 0 }} />
                    </View>
                }
                {search ? <TouchableOpacity
                    onPress={() => { setSearch(false) }}
                    style={{ marginLeft: calcWidth(10) }}>
                    <Image source={x} />
                </TouchableOpacity> : null}


            </View>
            <ScrollView>
                {add ?
                    <TouchableOpacity
                        onPress={() => {

                            setvisible(true)
                            // navigation.navigate('NameSpare',{index:i}

                            // )
                        }}

                        style={styles.block1} >
                        <View style={styles.block2}>
                            <Text style={styles.blockheading}>Нестандартная услуга</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.heading1}>Стоимость</Text>
                                <View style={styles.view}></View>
                                <Text style={styles.name}  >gel</Text>
                            </View>
                        </View>
                        <View style={styles.image} >
                            <Plus />
                            </View>

                    </TouchableOpacity> : null}
                <Modal
                    onBackdropPress={() => {
                        setvisible(false);
                        setElem({});
                        setIndex(null);
                                setcount('')
                            setheading('')
                        
                        // if (count !== "" && heading !== '') {
                        //     var a = [...service, { name: heading, count: count }];
                        //     //@ts-ignore
                        //     setservice(a);
                    
                        // }
                    }}
                    backdropColor="transparent"
                    isVisible={visible}
                    // animationIn={'slideInLeft'}
                    // animationOut={'slideOutLeft'}
                    style={styles.modal}
                >
                    <View style={styles.modalView}>
                          
                     {Object.keys(element).length === 0 ?   <TextInput
                            style={styles.input}
                            multiline={true}
                            value={heading}
                            onChangeText={(text) => { setheading(text) }}
                        />:<Text style={styles.textName}>{
                        //@ts-ignore
                        element.name}</Text>}
                        
                        {Object.keys(element).length !== 0 ?
                              <View style={styles.countModal}>
                              <TouchableOpacity onPress={()=>{_onpresMinus()}} style={styles.minusBlock}>
                             <Ominus />
                             </TouchableOpacity>
                              <View style={styles.countDetalBlock}>
                                  <Text style={styles.countDetal}>{
                                  //@ts-ignore
                                  countDetal}</Text>
                              </View>
                              <TouchableOpacity onPress={()=>{_onpresPlus()}} style={styles.minusBlock}>
                              <Oplus />
                              </TouchableOpacity>
                         
                          </View>
                        :null}
                      <TouchableOpacity style={styles.add} onPress={()=>{
                            setvisible(false);
                        
                            
                            if ((count !== "" && heading !== '') ) {
                                var a = [...service, { name: heading, count: count }];
                                //@ts-ignore
                                setservice(a);
                                setcount('')
                                setheading('')
                            }
                            if(Object.keys(element).length !== 0 ){
                               
                                //@ts-ignore
                                dispatch(addSpareService({ ...element, id: index }))
                                setElem({})
                                setIndex(null)

                              
                            }
                      }}>
                                    <Plus />
                                </TouchableOpacity >
                        <View style={styles.block3}>
                            <Text style={styles.heading1}>Стоимость</Text>
                            <View style={{ flexDirection: 'row', marginLeft: calcWidth(80) }}>
                              {Object.keys(element).length === 0?  <TextInput
                                    value={count}
                                    onChangeText={(text) => { setcount(text) }}
                                    style={styles.count}
                                    keyboardType={'numeric'}
                                />: <Text style={styles.count}>{
                                    //@ts-ignore
                                    element.count}</Text>
                            }
                                {/* 150</Text> */}
                                <Text style={styles.name}  >gel</Text>
                            
                            </View>
                        </View>
                    </View>
                </Modal>
                {
                    service.map((elem, i) => {

                        return <TouchableOpacity
                            onPress={() => {


                                elem.images ?
                                    (setvisible(true), setElem(elem),
                                    //@ts-ignore
                                    setIndex(i))

                                    : null


                            }}
                            key={i}
                            style={styles.block1} >
                            {elem.images && <Image source={{ uri: elem.images[0] }} style={styles.image1} />}
                            <View style={{ justifyContent: "space-between", marginLeft: calcWidth(17) }}>
                                <Text style={{ fontSize: 12, color: '#212121', }}>{elem.name}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.heading1}>Стоимость</Text>
                                    <Text style={styles.count}>{elem.count}</Text>
                                    <Text style={styles.name}  >gel</Text>
                                    {elem.images &&  <View style={{ justifyContent: "center" }}>
                                        <Text style={styles.texta}  >{elem.countDetal} шт</Text>
                                    </View>}
                                </View>
                            </View>
                            {add ?
                                // !chack(i) ? 
                                <TouchableOpacity style={styles.image} onPress={() => { dispatch(addSpareService({ ...elem, id: i })) }}>
                                  <Plus />
                                </TouchableOpacity > 
                                // :
                                    // <TouchableOpacity style={{ position: 'absolute', right: 0 }} onPress={() => { dispatch(deleteSpareService(i)) }}>
                                    //     <Image source={minus} />
                                    // </TouchableOpacity >
                                : null}

                        </TouchableOpacity>
                    })
                }
                  {!add && <TouchableOpacity style={styles.footer1}
                onPress={() => {


                    navigation.navigate('NameSpare',

                    )
                }}>
                <View style={styles.plus} >
                    <Plus />
                    </View>

                <Text style={styles.text}>Добавить запчасть на борт</Text>
            </TouchableOpacity>}

            </ScrollView>
          

        </View>
    );
};

export default SpareBoard;
