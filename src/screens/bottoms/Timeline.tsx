
import React, { useEffect, useState, } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Button
} from 'react-native';
import {
    //@ts-ignore
  ExpandableCalendar,
      //@ts-ignore
  Timeline,
      //@ts-ignore
  CalendarProvider
} from 'react-native-calendars';
import moment from 'moment';
import { NavigationScreenProp } from 'react-navigation';
import { useSelector } from 'react-redux';
import HeaderPage from '../../components/HeaderPage';
import { calcHeight, calcWidth } from '../../utils/demensios';
import { daySelector } from '../../store/selector/mainSelector';

const EVENTS = [
  {
    start: '2020-10-22 09:30:00',
    end: '2020-10-22 10:00:00',
    title: 'Заказ №0123 12:35                              Принят',
    summary: 'Позвонить клиенту',
    color: '#FF5252',
  
  },
  {
    start: '2020-10-22 12:00:00',
    end: '2020-10-22 12:30:00',
    title: 'Заказ №0123 12:35                            Принять',
    summary: 'Позвонить клиенту',
    color: '#FFAD40'
  },
  {
    start: '2020-10-22 15:10:00',
    end: '2020-10-22 15:40:00',
    title: 'Заказ №0123 12:35                             Принят',
    summary: 'Позвонить клиенту',
    color: '#FF5252'

  },
  {
    start: '2020-10-29 09:30:00',
    end: '2020-10-29 10:00:00',
    title: 'Заказ №0123 12:35                              Принят',
    summary: 'Позвонить клиенту',
    color: '#FF5252'
  },
  {
    start: '2020-10-24 12:00:00',
    end: '2020-10-24 12:30:00',
    title: 'Заказ №0123 12:35                            Принять',
    summary: 'Позвонить клиенту',
    color: '#FFAD40'
  },
  {
    start: '2020-10-28 15:10:00',
    end: '2020-10-28 15:40:00',
    title: 'Заказ №0123 12:35                             Принят',
    summary: 'Позвонить клиенту',
    color: '#FF5252',
    
  },


];
interface Props {
    navigation: NavigationScreenProp<any, any>;
}
const styles = StyleSheet.create({
  screen:{height:calcHeight(150),backgroundColor:"rgba(255, 255, 255, 0.6)"},
  day:{marginTop:calcHeight(66),marginBottom:calcHeight(33),color:"#212121",fontSize:14,textDecorationLine:'underline',fontWeight:'bold',marginLeft:calcWidth(10)}

});
const TimelineCalendarScreen: React.FunctionComponent<Props> = ({ navigation }) => {
    
    const value=useSelector(daySelector)
    const monthNames= ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь']
    const day=value.split("-")[2]
    const intmonth=parseInt( value.split('-')[1])
    const month=monthNames[intmonth-1]

    return (
        <>
        <View style={styles.screen}>
         <HeaderPage back={true} />
 
    <Text style={styles.day} >{day} {month}</Text>
            
         </View>
         
      <CalendarProvider
      // date={ITEMS[0].title}
        date={value}
        // onDateChanged={this.onDateChanged}
        // onMonthChange={this.onMonthChange}
        theme={{todayButtonTextColor: '#0059ff'}}
        // showTodayButton
        disabledOpacity={0.6}
        // todayBottomMargin={16}
      >
      
        <Timeline
          format24h={true}
          
          eventTapped={
            //@ts-ignore  
            e => e}
          events={EVENTS.filter(event => moment(event.start).isSame(value, 'day'))}
       //scrollToFirst={true}
           start={8}
           end={20}
        />
      </CalendarProvider>
      </>
    );
  }
// }
export default TimelineCalendarScreen;

