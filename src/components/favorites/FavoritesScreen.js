/* eslint-disable prettier/prettier */
/* eslint-disable comma-dangle */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import FavoritesEmpty from './FavoritesEmpty';
import Colors from '../../res/colors';
function FavoritesScreen() {
  return (
    <View style={styles.container}>
      <FavoritesEmpty />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    flex: 1
  }
});

export default FavoritesScreen;
