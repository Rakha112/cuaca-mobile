import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  StatusBar,
  PermissionsAndroid,
  Alert,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Button from '../components/Button';
import Geolocation from 'react-native-geolocation-service';
import {connect} from 'react-redux';
const WelcomePage = ({lat, lon, setLat, setLon}) => {
  const [isGranted, setIsGranted] = useState(false);
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
        setIsGranted(true);
      } else {
        console.log('location permission denied');
        setIsGranted(false);
        Alert.alert('Cuaca', 'Aplikasi Cuaca memerlukan lokasi anda', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => Linking.openSettings(),
          },
        ]);
      }
    } catch (err) {
      console.warn(err);
    }
  };
  useEffect(() => {
    requestLocationPermission();
    if (isGranted) {
      requestLocationPermission();
      Geolocation.getCurrentPosition(
        position => {
          setLat(position.coords.latitude);
          setLon(position.coords.longitude);
        },
        error => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }
  }, [isGranted, setLat, setLon]);
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/sun/27.png')}
        style={styles.image}
      />
      <Text style={styles.judul}>CUACA</Text>
      <Text style={styles.p}>
        Aplikasi untuk mengetahui cuaca di kota anda dan seluruh Indonesia
      </Text>
      <Button page="Home" />
    </View>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    setLat: data => dispatch({type: 'LAT', payload: data}),
    setLon: data => dispatch({type: 'LON', payload: data}),
  };
};

export default connect(null, mapDispatchToProps)(WelcomePage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#b0d0de',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  judul: {
    marginTop: 150,
    fontFamily: 'Rubik-Regular',
    fontSize: 60,
    color: '#2c5564',
  },
  p: {
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    fontFamily: 'Rubik-Regular',
    fontSize: 23,
    color: '#2c5564',
    textAlign: 'center',
  },
  image: {
    height: 200,
    resizeMode: 'contain',
  },
});
