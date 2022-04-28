import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {getImage} from '../utilities/dataGambar';
const CuacaCardDaily = ({hourly, temp, weather}) => {
  // useEffect(() => {
  //   console.log(weather);
  // }, [weather]);

  return (
    <LinearGradient
      // start={{x: 1, y: 0}}
      // end={{x: 0, y: 0}}
      colors={['#0161eb', '#0086f0', '#00b5e5']}
      style={styles.container}>
      <Text style={styles.textTanggal}>{hourly}</Text>
      <Image source={getImage(weather)} style={styles.image} />
      <Text style={styles.textSuhu}>SUHU</Text>
      <Text style={styles.textTanggal}>{temp}&deg;C</Text>
    </LinearGradient>
  );
};

export default CuacaCardDaily;

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 200,
    backgroundColor: 'grey',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
    // marginRight: 20,
  },
  image: {
    height: 80,
    width: 130,
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
