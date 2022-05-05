import {StyleSheet, View, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {OW_API_KEY} from '@env';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import SearchIcon from '../assets/svg/search-svgrepo-com.svg';
const Search = ({setCariKota, setDataCariKota}) => {
  const navigation = useNavigation();
  const [isFocus, setIsFocus] = useState(false);
  const [kota, setKota] = useState('');
  const submitHandle = () => {
    if (kota !== '') {
      getData(kota);
      setCariKota(kota);
    } else {
      Toast.show({
        type: 'kotaNotFound',
        text1: 'Isikan nama kota terlebih dahulu...',
        visibilityTime: 2000,
      });
    }
  };
  const getData = kota1 => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${kota1},ID&appid=${OW_API_KEY}&units=metric`,
      )
      .then(res => {
        setDataCariKota(res.data);
        navigation.push('Kota');
      })
      .catch(err => {
        if (err.response.status === 404) {
          Toast.show({
            type: 'kotaNotFound',
            text1: 'Kota Tidak Ditemukan',
            visibilityTime: 2000,
          });
        }
      });
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.icon} onPress={() => submitHandle()}>
        <SearchIcon width={20} height={20} fill={'#0161eb'} />
      </TouchableOpacity>
      <TextInput
        style={isFocus ? styles.inputFocus : styles.input}
        placeholder={'Cari kota...'}
        onBlur={() => setIsFocus(false)}
        onFocus={() => setIsFocus(true)}
        onChangeText={e => setKota(e)}
        onSubmitEditing={() => {
          submitHandle();
        }}
      />
    </View>
  );
};
const mapDispatchToProps = dispatch => {
  return {
    setCariKota: data => dispatch({type: 'CARIKOTA', payload: data}),
    setDataCariKota: data => dispatch({type: 'DATACARIKOTA', payload: data}),
  };
};
export default connect(null, mapDispatchToProps)(Search);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
  },
  input: {
    backgroundColor: '#eaf0f5',
    width: '100%',
    borderRadius: 50,
    paddingLeft: 40,
    borderColor: '#eaf0f5',
    borderWidth: 1,
  },
  inputFocus: {
    backgroundColor: '#eaf0f5',
    width: '100%',
    borderRadius: 50,
    paddingLeft: 40,
    borderColor: '#0161eb',
    borderWidth: 1,
  },
  icon: {
    position: 'absolute',
    zIndex: 9,
    margin: 15,
  },
});
