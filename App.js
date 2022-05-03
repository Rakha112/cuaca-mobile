import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import WelcomePage from './src/screens/WelcomePage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import HomePage from './src/screens/HomePage';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import WeekPage from './src/screens/WeekPage';
import Toast from 'react-native-toast-message';
import TandaSeru from './src/assets/svg/exclamation-lg-svgrepo-com.svg';
import Kotapage from './src/screens/Kotapage';
const App = () => {
  const Stack = createStackNavigator();
  const initialState = {
    lat: 0,
    lon: 0,
    daily: null,
    cariKota: null,
    dataCariKota: null,
  };
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LAT':
        return {
          ...state,
          lat: action.payload,
        };
      case 'LON':
        return {
          ...state,
          lon: action.payload,
        };
      case 'DAILY':
        return {
          ...state,
          daily: action.payload,
        };
      case 'CARIKOTA':
        return {
          ...state,
          cariKota: action.payload,
        };
      case 'DATACARIKOTA':
        return {
          ...state,
          dataCariKota: action.payload,
        };
      default:
        return state;
    }
  };
  const store = configureStore({reducer: rootReducer});

  const toastConfig = {
    kotaNotFound: ({text1}) => (
      <View style={styles.toastContainer}>
        {/* <Text>{text1}</Text> */}
        <View style={styles.tandaSeruStyle}>
          <TandaSeru width={12} height={12} fill={'#FFF'} />
        </View>
        <Text style={styles.textToast}>{text1}</Text>
      </View>
    ),
  };

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{
            headerShown: false,
            ...TransitionPresets.SlideFromRightIOS,
          }}>
          <Stack.Screen name="Welcome" component={WelcomePage} />
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="Week" component={WeekPage} />
          <Stack.Screen name="Kota" component={Kotapage} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast config={toastConfig} />
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  toastContainer: {
    height: 60,
    width: '90%',
    backgroundColor: '#db3056',
    borderRadius: 15,
    alignItems: 'center',
    // justifyContent: 'space-around',
    flexDirection: 'row',
  },
  tandaSeruStyle: {
    backgroundColor: '#851d41',
    borderRadius: 50,
    padding: 10,
    marginHorizontal: 10,
  },
  textToast: {
    fontFamily: 'Rubik-Bold',
    color: '#FFF',
  },
});
