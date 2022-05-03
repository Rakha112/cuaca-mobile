import {
  StyleSheet,
  View,
  Platform,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Text,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Arrow from '../assets/svg/right-arrow-svgrepo-com.svg';
import {useNavigation} from '@react-navigation/native';
import Cuacacard from '../components/Cuacacard';
import moment from 'moment/min/moment-with-locales.js';
import {connect} from 'react-redux';
import axios from 'axios';
import {OW_API_KEY} from '@env';
import CuacaCardHourly from '../components/CuacaCardHourly';
const Kotapage = ({cariKota, dataCariKota}) => {
  const navigation = useNavigation();
  const [hourly, setHourly] = useState({
    jam: [],
    temp: [],
    weather: [],
  });
  const tanggalan = new Date();
  const sekarang = tanggalan.getDate();
  var besok = tanggalan;
  besok.setDate(besok.getDate() + 1);

  const getBesok = date => {
    var dd = (date.getDate() < 10 ? '' : '') + date.getDate();
    return dd;
  };
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${dataCariKota.coord.lat}&lon=${dataCariKota.coord.lon}&appid=${OW_API_KEY}&units=metric`,
      )
      .then(res => {
        setHourly({
          jam: res.data.hourly.map(a => a.dt),
          temp: res.data.hourly.map(a => a.temp),
          weather: res.data.hourly.map(a => a.weather[0].main),
        });
      })
      .catch(err => console.log(err));
  }, [dataCariKota.coord.lat, dataCariKota.coord.lon, dataCariKota.lat]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.pop();
        }}>
        <Arrow width={20} height={30} style={styles.arrow} fill={'#0161eb'} />
      </TouchableOpacity>
      <Cuacacard
        district={cariKota}
        city={cariKota}
        temp={dataCariKota.main.temp}
        sunrise={moment.unix(dataCariKota.sys.sunrise).format('h:mm A')}
        sunset={moment.unix(dataCariKota.sys.sunset).format('h:mm A')}
        wind={dataCariKota.wind.speed}
        humid={dataCariKota.main.humidity}
        date={moment.unix(dataCariKota.dt).locale('id').format('Do MMMM YYYY')}
        weather={dataCariKota.weather[0].main}
        mrgnTop={0}
      />
      <View style={styles.daily}>
        <Text style={styles.textDaily}>Hari Ini</Text>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {hourly.jam.map((element, key) => {
          const tgl = moment.unix(element).locale('id').format('D');
          if (
            tgl.toString() === sekarang.toString() ||
            tgl.toString() === getBesok(besok)
          ) {
            return (
              <CuacaCardHourly
                hourly={element}
                temp={hourly.temp[key]}
                weather={hourly.weather[key]}
                key={key}
              />
            );
          }
        })}
      </ScrollView>
    </View>
  );
};
const mapStateToProps = state => {
  return {
    cariKota: state.cariKota,
    dataCariKota: state.dataCariKota,
  };
};
export default connect(mapStateToProps)(Kotapage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b0d0de',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  arrow: {
    transform: [{rotateY: '180deg'}],
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  textDaily: {
    marginLeft: 20,
    fontFamily: 'Rubik-Regular',
    fontSize: 20,
    color: '#0161eb',
  },
  daily: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 20,
    marginTop: 20,
    marginBottom: 20,
  },
});
