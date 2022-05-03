import {StyleSheet, Text, View, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import {getImage} from '../utilities/dataGambar';

const CuacaCardDaily = ({date, weather, min, max, eve}) => {
  return (
    <LinearGradient
      style={styles.container}
      start={{x: 1, y: 0}}
      end={{x: 0, y: 0}}
      colors={['#0161eb', '#0086f0', '#00b5e5']}>
      <View style={styles.suhuContainer}>
        <Text style={styles.textTanggal}>{date}</Text>
        <Image source={getImage(weather)} style={styles.image} />
        <View style={styles.suhu}>
          {/* <BlurView
            style={styles.absolute}
            blurType="light"
            blurAmount={5}
            reducedTransparencyFallbackColor="white"
          /> */}
          <View style={styles.suhuContainer}>
            <Text style={styles.textSuhu}>Min</Text>
            <Text style={styles.textTanggal}>{min}&deg;C</Text>
          </View>
          <View style={styles.suhuContainer}>
            <Text style={styles.textSuhu}>Rerata</Text>
            <Text style={styles.textTanggal}>{eve}&deg;C</Text>
          </View>
          <View style={styles.suhuContainer}>
            <Text style={styles.textSuhu}>Max</Text>
            <Text style={styles.textTanggal}>{max}&deg;C</Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default CuacaCardDaily;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    marginRight: 20,
    marginLeft: 20,
    borderRadius: 20,
    backgroundColor: 'orange',
  },
  image: {
    height: 70,
    width: 120,
    resizeMode: 'contain',
  },
  textTanggal: {
    fontFamily: 'Rubik-Regular',
    fontSize: 20,
    color: '#b0d0de',
  },
  textSuhu: {
    fontFamily: 'Rubik-Light',
    fontSize: 20,
    color: '#b0d0de',
  },
  suhu: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    width: 320,
    padding: 10,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    overflow: 'hidden',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  suhuContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
