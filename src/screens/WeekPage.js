import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import CuacaCardDaily from '../components/CuacaCardDaily';
import Arrow from '../assets/svg/right-arrow-svgrepo-com.svg';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import moment from 'moment/min/moment-with-locales.js';
const WeekPage = ({daily}) => {
  const navigation = useNavigation();
  const sekarang = new Date();
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.pop();
        }}>
        <Arrow width={20} height={30} style={styles.arrow} fill={'#0161eb'} />
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false}>
        {daily.map((el, key) => {
          if (
            moment.unix(el.dt).locale('id').format('D').toString() !==
            sekarang.getDate().toString()
          ) {
            return (
              <CuacaCardDaily
                date={moment.unix(el.dt).locale('id').format('D MMMM YYYY')}
                key={key}
                weather={el.weather[0].main}
                min={el.temp.min}
                eve={el.temp.eve}
                max={el.temp.max}
              />
            );
          }
        })}
      </ScrollView>
    </SafeAreaView>
  );
};
const mapStateToProps = state => {
  return {
    daily: state.daily,
  };
};

export default connect(mapStateToProps)(WeekPage);

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
});
