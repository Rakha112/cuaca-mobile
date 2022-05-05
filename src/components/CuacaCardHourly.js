import {StyleSheet, Text, Image} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {getImage} from '../utilities/dataGambar';
import moment from 'moment/min/moment-with-locales.js';
const CuacaCardHourly = ({hourly, temp, weather}) => {
  return (
    <LinearGradient
      // start={{x: 1, y: 0}}
      // end={{x: 0, y: 0}}
      colors={['#0161eb', '#0086f0', '#00b5e5']}
      style={styles.container}>
      <Text style={styles.textTanggal}>
        {moment.unix(hourly).locale('id').format('HH:mm') === '00:00'
          ? moment.unix(hourly).locale('id').format('DD/MM')
          : moment.unix(hourly).locale('id').format('HH:mm')}
      </Text>
      <Image source={getImage(weather)} style={styles.image} />
      <Text style={styles.textSuhu}>SUHU</Text>
      <Text style={styles.textTanggal}>{temp}&deg;C</Text>
    </LinearGradient>
  );
};

export default CuacaCardHourly;

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 180,
    backgroundColor: 'grey',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
    marginBottom: 20,
    // marginRight: 20,
  },
  image: {
    height: 70,
    width: 120,
    resizeMode: 'contain',
  },
  textTanggal: {
    fontFamily: 'Rubik-Light',
    fontSize: 20,
    color: '#b0d0de',
  },
  textSuhu: {
    marginTop: 10,
    fontFamily: 'Rubik-Light',
    fontSize: 20,
    color: '#b0d0de',
  },
});
