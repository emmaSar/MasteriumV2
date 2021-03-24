import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView, Image, Alert, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import { useDispatch, useSelector, } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import { calcFontSize, calcHeight, calcWidth } from "../../utils/demensios"
import Header from '../../components/Header'
import Footer from '../../components/Footer';
import Swiper from 'react-native-swiper'

import { loginSelector } from '../../store/selector/loginSelector';
import { spareSelector } from '../../store/selector/spareselector';
import { addSpare } from "../../store/actions/spareActions"
//@ts-ignore
import TextInputMask from 'react-native-text-input-mask';
//@ts-ignore
import SimpleButton from '../../components/SimpleButton';
import HeaderPage from '../../components/HeaderPage';

import { spareServiceSelector } from '../../store/selector/spareserviceSelector';
import { useTranslation } from 'react-i18next';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars'
import { LocaleConfig } from 'react-native-calendars';
//@ts-ignore
import Arrow from "../../assets/icons/arrow.svg"
//@ts-ignore
import Right from "../../assets/icons/right.svg"
import { daySelector } from '../../store/selector/mainSelector';
import { setDay } from '../../store/actions/loginActions';
import { useNavigation } from '@react-navigation/native';
interface Props {
  navigation: NavigationScreenProp<any, any>;
}

const styles = StyleSheet.create({
  screen: { backgroundColor: 'rgba(255, 255, 255, 0.6)', flex: 1, justifyContent: "space-between" },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  plus: { marginTop: calcHeight(30), marginBottom: calcHeight(8) },
  text: { color: '#7C7C7C', fontSize: 14, fontWeight: 'bold', lineHeight: 19 },
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
    width: calcWidth(47),
    //backgroundColor:'red',
    borderBottomWidth: 0.5
    //textDecorationLine: 'underline', textDecorationColor: 'rgba(33, 33, 33, 0.5)'
  },
  all: { marginTop: calcHeight(20), marginLeft: calcWidth(10), marginRight: calcWidth(27), flexDirection: "row" },
  heading: { color: "#212121", fontSize: calcFontSize(18), fontWeight: "bold", marginLeft: calcWidth(45) },
  textinput: { borderBottomColor: "#4B4B4B", borderBottomWidth: 1, marginLeft: calcWidth(16), width: calcWidth(241) },
  block1: { width: '94.7%', backgroundColor: '#EFF0F8', borderRadius: 50, flexDirection: 'row', marginLeft: calcWidth(9), paddingLeft: calcWidth(11), paddingVertical: calcHeight(17), marginTop: calcHeight(15) },
  block2: { justifyContent: "space-between", marginLeft: calcWidth(17) },
  blockheading: { fontSize: 12, color: '#212121', marginBottom: calcHeight(35) },
  view: { width: calcWidth(47), borderBottomColor: 'rgba(33, 33, 33, 0.5)', borderBottomWidth: 0.5, marginLeft: calcWidth(80) },
  image: {
    marginLeft: '12.8%',
    height: calcHeight(200), width: '74.4%', borderRadius: 30,

  },
  modal: { position: 'absolute', marginLeft: 0, left: 9, top: 100 },
  modalView: {
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
  input: { width: calcWidth(320), marginTop: calcHeight(30), marginLeft: calcWidth(13), height: calcHeight(151), backgroundColor: "#FFFFFF", borderRadius: 30, },
  textName: { marginLeft: calcWidth(30), marginTop: calcHeight(30) },
  countModal: { flexDirection: 'row', alignItems: 'center', marginLeft: calcWidth(30), marginTop: calcHeight(33) },
  minusBlock: { height: 18, width: 18, alignItems: "center", justifyContent: "center" },
  countDetalBlock: { height: calcHeight(39), width: calcWidth(39), borderRadius: 10, borderWidth: 0.5, borderColor: "#000000", alignItems: "center", justifyContent: 'center', marginHorizontal: calcWidth(28) },
  countDetal: { color: "#212121", fontSize: calcFontSize(24) },
  add: { position: 'absolute', right: 6, bottom: 60 },
  block3: { flexDirection: 'row', position: 'absolute', bottom: 30, left: 34 },
  image1: { height: calcHeight(76), width: calcWidth(76), borderRadius: 39, },
  texta: { marginLeft: 28, color: "#FFAD40", fontSize: calcFontSize(12), fontWeight: 'bold' },
  footer1: { alignItems: 'center', marginBottom: calcHeight(25), },
  image2: { height: calcHeight(56), width: calcWidth(56), borderRadius: 28, },
  heading2: { color: "#242424", fontSize: calcFontSize(18), fontWeight: 'bold' },
  nameText: { color: "#242424", fontSize: calcFontSize(18), fontWeight: 'bold' },
  number: { color: "rgba(36, 36, 36, 0.5)", fontSize: calcFontSize(13), fontWeight: '300' },
  i: { marginLeft: calcWidth(39), marginTop: calcHeight(20) },
  edit: { marginLeft: calcWidth(16.8), marginTop: calcHeight(20) },
  block5: {
    backgroundColor: "white", height: calcHeight(30), width: calcWidth(168), alignItems: "center", justifyContent: "center", borderRadius: 30, shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2, position: 'absolute', right: 16, marginTop: calcHeight(12)
  },
  status: { color: "#212121", fontSize: calcFontSize(13), fontWeight: 'bold' },
  touchView: {
    backgroundColor: '#EEF4F6',
    borderRadius: 10, height: calcHeight(76),
    width: calcWidth(355),
    marginHorizontal: calcWidth(10),
    paddingLeft: calcWidth(20),
    paddingTop: calcHeight(14),
    paddingRight: calcWidth(13),
    marginRight: calcWidth(13),

    marginTop: calcHeight(38)
  },
  textA: { color: "#212121", fontSize: calcFontSize(12), flex: 1 },
  circle: {
    backgroundColor: 'white', width: calcWidth(56), height: calcHeight(56),
    shadowColor: 'black', justifyContent: 'center', alignItems: 'center',
    // shadowOpacity: 1,
    elevation: 5, position: 'absolute', right: 26, bottom: -25,
    borderRadius: 28
  },
  imageItem: {
    flexDirection: 'row', marginTop: calcHeight(20), marginBottom: calcHeight(7),
    // backgroundColor:'red'
  },
  // image: {
  //     marginLeft: '12.8%',
  //     height: calcHeight(200), width: '74.4%', borderRadius: 30
  // },
  minus: { marginLeft: calcWidth(-20), marginTop: calcHeight(-5), height: calcHeight(35) },
  calendar: { height: calcHeight(450), width: calcWidth(355), marginHorizontal: calcWidth(10), borderRadius: 50 }

});

const DateAndTime: React.FunctionComponent<Props> = (route) => {

  const back = require('../../assets/icons/back.png')
  const place = require('../../assets/icons/place.png')
  const spareService = useSelector(spareServiceSelector)
  // const dispatch = useDispatch()
  const navigation = useNavigation()
  const [visible, changeVisible] = useState(false)

  const [imagesList, setImages] = useState([])

  const plus = require('../../assets/icons/plus.png')
  const minus = require('../../assets/icons/minus.png')
  const [search, setSearch] = useState(false)
  // const [value,setValue]=useState("")
  const x = require('../../assets/icons/x.png')
  const { t } = useTranslation();
  const [error, setError] = useState(false)
  const gallery = t("gallery")
  const cameraa = t("camera")
  useEffect(() => {
    //@ts-ignore
    if (route.route.params.add) {
      dispatch(setDay(''))
      setError(false)
    }
  }, [
    //@ts-ignore
    route.route.params])
  LocaleConfig.locales['ru'] = {
    monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    monthNamesShort: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    dayNames: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
    dayNamesShort: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],

  };
  LocaleConfig.defaultLocale = 'ru';
  const value = useSelector(daySelector)


  const list = ['2020-10-29', '2020-10-23']
  const [activemonth,setActiveMonth]=useState(new Date().getMonth()+1)
  const [month,setMonth]=useState(new Date().getMonth()+1)

  const dispatch = useDispatch()
  function handleInspector() {
    if (value.length < 1) {
      setError(true)
    }
    else {
      setError(false)
      //dispatch(setDay(''))
      navigation.navigate('TimePicker', {
        add: true,
        //@ts-ignore
        subservice: route.route.params.subservice,
        //@ts-ignore
        product: route.route.params.product,
        //@ts-ignore
        list:route.route!==undefined ?route.route.params.list!==undefined?route.route.params.list:[]:[],
        //@ts-ignore
        description: route.route.params.description,
        //@ts-ignore
        image: route.route.params.image,
        date: value,
        //@ts-ignore
        check: route.route.params.check
      })
    }
  }
  const _renderArrow = (direction: any) => {
    if (direction === 'left') {
      return <View style={{ marginLeft: calcWidth(90) }}><Arrow /></View>
    } else {
      return <View style={{ marginRight: calcWidth(90) }}><Right /></View>
    }
  }
  
  return (
    <View style={styles.screen}>
      <HeaderPage back={true} />
      <Text style={{ marginTop: calcHeight(32), marginLeft: calcWidth(27), width: calcWidth(279), color: "#212121", fontWeight: "bold", fontSize: calcFontSize(18) }}>Дата и время на выполнение</Text>
      <View style={{ marginTop: calcHeight(20) }}>
        <Calendar

          style={[styles.calendar, { borderWidth: error ? 1 : 0, borderColor: error ? "red" : "white", }]}
          current={value}
          onMonthChange={(month) => {
            setMonth(month.month)
          }}
          onDayPress={(day: any) => {
            let today=new Date().getDate()
            if(day.day>=today){
              dispatch(setDay(day.dateString))

            }
            // , setTimeout(() => {
            //   navigation.navigate('TimelineCalendarScreen')
            // }, 50);
          }}
          //   setTimeout(() => { navigation.navigate('TimelineCalendarScreen') }, 150)
          //  }
          // }
          //   markingType={'custom'}

          monthFormat={'MMMM'}
          markedDates={{
            [value]: { selected: true, selectedColor: '#FF5252' },
            //    '2020-11-02': {marked: true, dotColor: '#24A322',count:2,selected: true,selectedColor: '#FF5252'},
          }}
          renderArrow={(dir) => _renderArrow(dir)}
          hideExtraDays={true}
          // disableMonthChange={true}
          // firstDay={1}
          // hideDayNames={true}
          // showWeekNumbers={true}
          onPressArrowLeft={(subtractMonth: () => any) => {month-activemonth>0&& subtractMonth()}}
          onPressArrowRight={(addMonth: () => any) => addMonth()}

          enableSwipeMonths={true}
          theme={{
            arrowColor: 'black',
            backgroundColor: '#ffffff',
            calendarBackground: '#ffffff',
            textSectionTitleColor: 'rgba(0, 0, 0, 0.5)',
            selectedDayBackgroundColor: '#00adf5',
            todayTextColor: '#212121',
            dayTextColor: '#212121',
            textDisabledColor: '#d9e1e8',
            dotColor: 'red',
            selectedDotColor: '#ffffff',
            monthTextColor: '#212121',
            textDayFontFamily: 'monospace',
            textMonthFontFamily: 'monospace',
            textDayHeaderFontFamily: 'monospace',
            textDayFontWeight: 'bold',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '300',
            textDayFontSize: 18,
            textMonthFontSize: 18,
            textDayHeaderFontSize: 16,
            'stylesheet.calendar.main': {
              week: {
                marginTop: calcHeight(13),
                marginBottom: calcHeight(17),
                flexDirection: 'row',
                justifyContent: 'space-between',
                //  backgroundColor:"red"

              },

            },
            'stylesheet.calendar.header': {
              week: {

                flexDirection: 'row',
                justifyContent: 'space-between',
                //         color:"red",
                //  backgroundColor:"green"
              },

            }

          }}
        />
      </View>

      <View style={{ alignItems: "center", marginBottom: calcHeight(137) }}>
        <SimpleButton
          text={t('next')}
          big={true}
          onPress={() => {
            handleInspector()
            //navigation.navigate('Welcome')
          }}
        />
      </View>

    </View>
  );
};

export default DateAndTime;
