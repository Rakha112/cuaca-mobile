import {StyleSheet, Text, TouchableHighlight} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
const Button = ({page}) => {
  const navigation = useNavigation();
  return (
    <TouchableHighlight
      style={styles.button}
      onPress={() => {
        navigation.replace(page);
      }}>
      <Text style={styles.judul}>MULAI</Text>
    </TouchableHighlight>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    height: 60,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: '#2c5564',
    borderRadius: 50,
  },
  judul: {
    fontFamily: 'Rubik-Regular',
    fontSize: 25,
    color: '#b0d0de',
  },
});
