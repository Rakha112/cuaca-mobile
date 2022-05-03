import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Cuacacard from '../components/Cuacacard';
import CuacaCardHourly from '../components/CuacaCardHourly';
import {connect} from 'react-redux';
import axios from 'axios';
import {HERE_API_KEY, OW_API_KEY} from '@env';
import moment from 'moment/min/moment-with-locales.js';
import Arrow from '../assets/svg/right-arrow-svgrepo-com.svg';
import {useNavigation} from '@react-navigation/native';
import Search from '../components/Search';

const HomePage = ({lat, lon, setDaily}) => {
  const navigation = useNavigation();
  const tanggalan = new Date();
  const sekarang = tanggalan.getDate();
  var besok = tanggalan;
  besok.setDate(besok.getDate() + 1);

  const getBesok = date => {
    var dd = (date.getDate() < 10 ? '' : '') + date.getDate();
    return dd;
  };
  const [address, setAddress] = useState({
    district: '',
    city: '',
  });
  const [currentWeather, setCurrentWeather] = useState({
    temp: '',
    sunrise: '',
    sunset: '',
    wind: '',
    humid: '',
    date: '',
    weather: '',
  });
  const [hourly, setHourly] = useState({
    jam: [],
    temp: [],
    weather: [],
  });
  useEffect(() => {
    if (lat !== 0 && lon !== 0) {
      console.log(lat);
      console.log(lon);
      axios
        .get(
          `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${lat},${lon}&lang=en-US&apiKey=${HERE_API_KEY}`,
        )
        .then(res =>
          setAddress({
            district: res.data.items[0].address.district,
            city: res.data.items[0].address.city,
          }),
        )
        .catch(err => console.log(err));
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${OW_API_KEY}&units=metric`,
        )
        .then(res => {
          setCurrentWeather({
            temp: res.data.current.temp,
            sunrise: moment.unix(res.data.current.sunrise).format('h:mm A'),
            sunset: moment.unix(res.data.current.sunset).format('h:mm A'),
            wind: res.data.current.wind_speed,
            humid: res.data.current.humidity,
            date: moment
              .unix(res.data.current.dt)
              .locale('id')
              .format('Do MMMM YYYY'),
            weather: res.data.current.weather[0].main,
          });
          setHourly({
            jam: res.data.hourly.map(a => a.dt),
            temp: res.data.hourly.map(a => a.temp),
            weather: res.data.hourly.map(a => a.weather[0].main),
          });
          setDaily(res.data.daily);
        })
        .catch(err => console.log(err));
    }
  }, [lat, lon, setDaily]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Search />
        <Cuacacard
          district={address.district}
          city={address.city}
          temp={currentWeather.temp}
          sunrise={currentWeather.sunrise}
          sunset={currentWeather.sunset}
          wind={currentWeather.wind}
          humid={currentWeather.humid}
          date={currentWeather.date}
          weather={currentWeather.weather}
          mrgnTop={60}
        />
        <View style={styles.cuacaCardDaily}>
          <View style={styles.daily}>
            <Text style={styles.textDaily}>Hari Ini</Text>
            <TouchableOpacity
              style={styles.touchable}
              onPress={() => {
                navigation.push('Week');
              }}>
              <Text style={styles.textDaily}>Lihat 7 Hari</Text>
              <Arrow
                width={20}
                height={30}
                style={styles.arrow}
                fill={'#0161eb'}
              />
            </TouchableOpacity>
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
          {/* <Chart /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const mapStateToProps = state => {
  return {
    lat: state.lat,
    lon: state.lon,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setDaily: data => dispatch({type: 'DAILY', payload: data}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b0d0de',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  cuacaCardDaily: {
    marginTop: 20,
  },
  textDaily: {
    marginLeft: 20,
    marginBottom: 10,
    fontFamily: 'Rubik-Regular',
    fontSize: 20,
    color: '#0161eb',
  },
  daily: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 20,
  },
  arrow: {
    marginLeft: 5,
    marginBottom: 10,
  },
  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
