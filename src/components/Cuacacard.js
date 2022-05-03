import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {getImage} from '../utilities/dataGambar';

const Cuacacard = ({
  district,
  city,
  temp,
  sunrise,
  sunset,
  wind,
  humid,
  date,
  weather,
  mrgnTop,
}) => {
  return (
    <View>
      <LinearGradient
        start={{x: 1, y: 0}}
        end={{x: 0, y: 0}}
        colors={['#0161eb', '#0086f0', '#00b5e5']}
        style={[styles.cuacaCard, {marginTop: mrgnTop}]}>
        <Text style={styles.text}>{district ? district : city}</Text>
        <Text style={styles.textTanggal}>{date}</Text>
        <View style={styles.cuacaCardAtas}>
          <Image
            source={
              weather !== ''
                ? getImage(weather)
                : require('../assets/images/sun/26.png')
            }
            style={styles.image}
          />
          <View style={styles.suhu}>
            <Text style={styles.textSuhu}>Suhu</Text>
            <Text style={styles.textDeg}>{temp}&deg;C</Text>
          </View>
        </View>
        <View style={styles.cuacaCardBawah}>
          <View>
            <View style={styles.cuacaCardInfo}>
              <Text style={styles.textInfo}>Humidity</Text>
              <Text style={styles.textInfo}>{humid}%</Text>
            </View>
            <View style={styles.cuacaCardInfo}>
              <Text style={styles.textInfo}>Terbit</Text>
              <Text style={styles.textInfo}>{sunrise}</Text>
            </View>
          </View>
          <View>
            <View style={styles.cuacaCardInfo}>
              <Text style={styles.textInfo}>Angin</Text>
              <Text style={styles.textInfo}>{wind} m/s</Text>
            </View>
            <View style={styles.cuacaCardInfo}>
              <Text style={styles.textInfo}>Terbenam</Text>
              <Text style={styles.textInfo}>{sunset}</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default Cuacacard;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Rubik-Regular',
    fontSize: 30,
    color: '#b0d0de',
    marginTop: 20,
  },
  textTanggal: {
    fontFamily: 'Rubik-Regular',
    fontSize: 20,
    color: '#b0d0de',
    marginBottom: 10,
  },
  textDeg: {
    fontFamily: 'Rubik-Regular',
    fontSize: 44,
    color: '#b0d0de',
  },
  textSuhu: {
    fontFamily: 'Rubik-Light',
    fontSize: 35,
    color: '#b0d0de',
  },
  textInfo: {
    fontFamily: 'Rubik-Light',
    fontSize: 20,
    color: '#b0d0de',
  },
  cuacaCard: {
    backgroundColor: '#0161eb',
    // marginTop: 60,
    marginRight: 20,
    marginLeft: 20,
    height: 480,
    borderRadius: 30,
    alignItems: 'center',
  },
  cuacaCardInfo: {
    alignItems: 'center',
    paddingTop: 10,
  },
  cuacaCardAtas: {
    flex: 1,
    // flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  cuacaCardBawah: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    // flex: 1,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '90%',
    marginBottom: 20,
    marginTop: 30,
    paddingBottom: 20,
    paddingTop: 10,
  },
  suhu: {alignItems: 'center', marginTop: 20},
  image: {
    height: 120,
    width: 170,
    resizeMode: 'contain',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
