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
import { useTranslation } from 'react-i18next';
import SmoothPicker from 'react-native-smooth-picker';
import { useNavigation } from '@react-navigation/native';


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
  timer: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: calcWidth(115),
    marginRight: calcWidth(69),
    marginTop: calcHeight(143)

  },
  calendar: { height: calcHeight(447), width: calcWidth(355), marginHorizontal: calcWidth(10) },
  timeText: {
    color: '#1E2B4D',
    fontWeight: 'bold',
    marginBottom: calcHeight(6),
    fontSize: calcFontSize(17),
    marginTop: calcHeight(25),
    marginLeft: calcWidth(6)
  },

});

const TimePicker: React.FunctionComponent<Props> = (route) => {
  const navigation = useNavigation()
  const back = require('../../assets/icons/back.png')
  const check = require('../../assets/icons/check.png')
  const { t } = useTranslation();
  useEffect(() => {
    //@ts-ignore
    if (route.route.params.add) {
      //  setError(false)

      setSelectedHours(0)
      setSelectedMinut(0)
    }
  }, [
    //@ts-ignore
    route.route.params])
  //const [value, setValue] = useState("")
  const value = useSelector(daySelector)
  const list = ['2020-10-29', '2020-10-23']
  const dispatch = useDispatch()
  const _renderArrow = (direction: any) => {
    if (direction === 'left') {
      return <View style={{ marginLeft: calcWidth(90) }}><Arrow /></View>
    } else {
      return <View style={{ marginRight: calcWidth(90) }}><Right /></View>
    }
  }


  const hours = [
    0,
    1,
    2,
    3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23
  ];
  const minutes = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46,
    47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59
  ];
  const date = new Date();
  // isEnabled: true,
  const [selectedHours, setSelectedHours] = useState(0)
  const [selectedMinut, setSelectedMinut] = useState(0);
  const handleChangeHours = (index: number) => {
    setSelectedHours(index)
  };
  const handleChangeMinut = (index: number) => {
    setSelectedMinut(index)
  };
  return (
    <View style={styles.screen}>
      <HeaderPage back={true} />
      <View style={{ alignItems: "center", marginBottom: calcHeight(67) }}>
        <View style={styles.timer}>
          <View >
            <SmoothPicker
              magnet
              scrollAnimation
              //  selectOnPress
              showsVerticalScrollIndicator={false}
              // offsetSelection={-5}
              initialScrollToIndex={hours[selectedHours]}
              data={hours}
              style={{ height: 240 }}
              onSelected={({ item, index }) => {
                handleChangeHours(item)
              }

              }
              renderItem={({ item, index }) => (<View>
                {item < 10 ? <Text style={{
                  fontSize: calcFontSize(37),
                  color: selectedHours == item ? 'red' : '#B3BACE'
                }}
                >0{item}</Text> : <Text style={{
                  fontSize: calcFontSize(37),
                  color: selectedHours == item ? 'red' : '#B3BACE'
                }}
                >{item}</Text>}</View>
              )}
            />
          </View>
          <Text style={[styles.timeText, { marginRight: calcWidth(41), }]}>ч.</Text>
          <View >
            <SmoothPicker
              magnet
              scrollAnimation
              //   selectOnPress
              showsVerticalScrollIndicator={false}
              //  offsetSelection={-5}
              data={minutes}
              style={{ height: 240 }}
              initialScrollToIndex={minutes[selectedMinut]}
              onSelected={({ item, index }) => {
                handleChangeMinut(item)
              }

              }
              renderItem={({ item, index }) => (
                <View>
                  {item < 10 ? <Text style={{
                    fontSize: calcFontSize(37),
                    color: selectedMinut == item ? 'red' : '#B3BACE'
                  }}
                  >0{item}</Text> : <Text style={{
                    fontSize: calcFontSize(37),
                    color: selectedMinut == item ? 'red' : '#B3BACE'
                  }}
                  >{item}</Text>}
                </View>)}
            />
          </View>
          <Text style={[styles.timeText, {}]}>мин.</Text>
        </View>

      </View>
      <View style={{ position: "absolute", bottom: 137, alignItems: "center", width: "100%" }}>
        <SimpleButton
          text={t('next')}
          big={true}
          onPress={() => {
            //  handleInspector()

            navigation.navigate('LocationWorkss', {
              create: true,
              //@ts-ignore
              description: route.route.params.description,
              //@ts-ignore
              image: route.route.params.image,
              //@ts-ignore
              date: route.route.params.date,
              selectedHours: selectedHours,
              selectedMinut: selectedMinut,
              //@ts-ignore
              subservice: route.route.params.subservice,
              //@ts-ignore
              product: route.route.params.product,
              //@ts-ignore
              list:route.route.params.list,

              //@ts-ignore
              check: route.route.params.check
            })
          }}
        />
      </View>
    </View>
  );
};

export default TimePicker;
