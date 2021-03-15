/* eslint-disable prettier/prettier */
/* eslint-disable comma-dangle */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function FavoritesEmpty() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sin ningún favorito por el momento</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center'
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    alignSelf: 'center'
  }
});
