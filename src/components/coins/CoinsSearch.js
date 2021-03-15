/* eslint-disable prettier/prettier */
/* eslint-disable comma-dangle */
import React, {useState} from 'react';
import {TextInput, StyleSheet, Platform, View} from 'react-native';
import Colors from '../../res/colors';

function CoinsSearch({onChange}) {
  const [query, setQuery] = useState('');
  const handleText = (q) => {
    setQuery(q);
    onChange(q);
  };

  return (
    <View>
      <TextInput
        style={[
          styles.textInput,
          Platform.OS === 'ios' ? styles.textInputIOS : styles.textInputAndroid
        ]}
        onChangeText={handleText}
        value={query}
        placeholder="Search coin"
        placeholderTextColor="#fff"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    height: 46,
    backgroundColor: Colors.charade,
    paddingLeft: 16,
    color: 'white'
  },
  textInputAndroid: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.zircon
  },
  textInputIOS: {
    margin: 8,
    borderRadius: 8
  }
});

export default CoinsSearch;
