import {StyleSheet, View, TextInput} from 'react-native';
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {OW_API_KEY} from '@env';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
const Search = ({setCariKota, setDataCariKota}) => {
  const navigation = useNavigation();
  const [isFocus, setIsFocus] = useState(false);
  const [kota, setKota] = useState('');
  const submitHandle = kota1 => {
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
            visibilityTime: 1500,
          });
        }
      });
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={isFocus ? styles.inputFocus : styles.input}
        placeholder={'Cari kota...'}
        onBlur={() => setIsFocus(false)}
        onFocus={() => setIsFocus(true)}
        onChangeText={e => setKota(e)}
        onSubmitEditing={() => {
          submitHandle(kota);
          setCariKota(kota);
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
  },
  input: {
    backgroundColor: '#eaf0f5',
    width: '100%',
    borderRadius: 50,
    // margin: 10,
    position: 'absolute',
    paddingLeft: 20,
  },
  inputFocus: {
    position: 'absolute',
    backgroundColor: '#eaf0f5',
    width: '100%',
    borderRadius: 50,
    // margin: 10,
    paddingLeft: 20,
    borderColor: '#0161eb',
    borderWidth: 1,
  },
});
