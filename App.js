import React from 'react';
import WelcomePage from './src/screens/WelcomePage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import HomePage from './src/screens/HomePage';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import WeekPage from './src/screens/WeekPage';

const App = () => {
  const Stack = createStackNavigator();
  const initialState = {
    lat: 0,
    lon: 0,
    daily: null,
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
      default:
        return state;
    }
  };
  const store = configureStore({reducer: rootReducer});
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
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
