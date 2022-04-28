import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  PermissionsAndroid,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Cuacacard from '../components/Cuacacard';
import CuacaCardDaily from '../components/CuacaCardDaily';
import Chart from '../components/Chart';
import {connect} from 'react-redux';
import axios from 'axios';
import {HERE_API_KEY, OW_API_KEY2} from '@env';
import moment from 'moment/min/moment-with-locales.js';
// import Carousel from 'react-native-snap-carousel';

const HomePage = ({lat, lon}) => {
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
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${OW_API_KEY2}&units=metric`,
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

          // const aaa = res.data.hourly.map(a => a.dt <= 1651251600);
          // const bbb = res.data.hourly.map(a => a.dt);
          // const ddd = [];
          // const ccc = bbb.forEach(element => {
          //   if (element <= 1651251600) {
          //     ddd.push(moment.unix(element).locale('id').format('HH:mm'));
          //   }
          // });
        })
        .catch(err => console.log(err));
    }
  }, [lat, lon]);

  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.cuacaCard}>
        <Text>HALOO</Text>
      </View> */}
      <ScrollView showsVerticalScrollIndicator={false}>
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
        />
        <View style={styles.cuacaCardDaily}>
          <View style={styles.daily}>
            <Text style={styles.textDaily}>Hari Ini</Text>
            <Text style={styles.textDaily}>Lihat 7 Hari</Text>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {hourly.jam.map((element, key) => {
              if (element <= 1651251600) {
                return (
                  <CuacaCardDaily
                    hourly={moment.unix(element).locale('id').format('HH:mm')}
                    temp={hourly.temp[key]}
                    weather={hourly.weather[key]}
                    key={key}
                  />
                );
              }
            })}

            {/* <CuacaCardDaily />
            <CuacaCardDaily />
            <CuacaCardDaily />
            <CuacaCardDaily />
            <CuacaCardDaily />
            <CuacaCardDaily /> */}
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
    setLat: data => dispatch({type: 'LAT', payload: data}),
    setLon: data => dispatch({type: 'LON', payload: data}),
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
    marginTop: 50,
  },
  textDaily: {
    marginLeft: 20,
    marginBottom: 20,
    fontFamily: 'Rubik-Regular',
    fontSize: 20,
    color: '#0161eb',
  },
  daily: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 20,
  },
});
