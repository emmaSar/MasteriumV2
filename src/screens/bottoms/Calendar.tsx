import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView, Image, Alert, SafeAreaView } from 'react-native';
import { useDispatch, useSelector, } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import { calcFontSize, calcHeight, calcWidth } from "../../utils/demensios"
import Header from '../../components/Header'
import Footer from '../../components/Footer';
import { loginSelector } from '../../store/selector/loginSelector';
import { spareSelector } from '../../store/selector/spareselector';
import { addSpare } from "../../store/actions/spareActions"
//@ts-ignore
import TextInputMask from 'react-native-text-input-mask';
//@ts-ignore
import SimpleButton from '../../components/SimpleButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import HeaderPage from '../../components/HeaderPage';

import { Calendar, CalendarList, Agenda } from 'react-native-calendars'
//import { SafeAreaView } from 'react-native-safe-area-context';
import { LocaleConfig } from 'react-native-calendars';
import { setDay } from '../../store/actions/loginActions';
import { daySelector } from '../../store/selector/mainSelector';
//@ts-ignore
import Arrow from "../../assets/icons/arrow.svg"
//@ts-ignore
import Right from "../../assets/icons/right.svg"


LocaleConfig.locales['ru'] = {
  monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
  monthNamesShort: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
  dayNames: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
  dayNamesShort: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],

};
LocaleConfig.defaultLocale = 'ru';
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
  calendar: { height: calcHeight(447), width: calcWidth(355), marginHorizontal: calcWidth(10) }

});

const CalendarScreen: React.FunctionComponent<Props> = ({ navigation }) => {

  const back = require('../../assets/icons/back.png')
  const check = require('../../assets/icons/check.png')

  //const [value, setValue] = useState("")
  const value = useSelector(daySelector)
  const list = ['2020-10-29', '2020-10-23']
  const dispatch = useDispatch()
  const  _renderArrow = (direction:any) => {
    if(direction === 'left') {
        return <View style={{marginLeft:calcWidth(90)}}><Arrow /></View>
    } else {
        return <View style={{marginRight:calcWidth(90)}}><Right /></View>
    }
}



  return (
    <View style={styles.screen}>
      <HeaderPage back={false} />
      <View style={{ marginTop: calcHeight(40) }}>
        <Calendar

          style={styles.calendar}
          current={value}

          onDayPress={(day: any) => {
            dispatch(setDay(day.dateString)), setTimeout(() => {
              navigation.navigate('TimelineCalendarScreen')
            }, 50);
          }}
          onDayLongPress={(day: any) => { setTimeout(() => { navigation.navigate('TimelineCalendarScreen') }, 150) }}
       //   markingType={'custom'}

         monthFormat={'MMMM'}
          markedDates={{
           [value]: { selected: true, selectedColor: '#FF5252' },
           //@ts-ignore
           '2020-11-02': {marked: true, dotColor: '#24A322',count:2,selected: true,selectedColor: '#FF5252'},
          }}
          renderArrow={(dir)=>_renderArrow(dir)}
          hideExtraDays={true}
          // disableMonthChange={true}
          // firstDay={1}
          // hideDayNames={true}
          // showWeekNumbers={true}
          onPressArrowLeft={(subtractMonth: () => any) => subtractMonth()}
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
                marginBottom: calcHeight(33),
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
    </View>
  );
};

export default CalendarScreen;
