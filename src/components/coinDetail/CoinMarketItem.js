/* eslint-disable prettier/prettier */
/* eslint-disable comma-dangle */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Colors from '../../res/colors';

const CoinDetailScreen = ({item}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.nameText}>{item.name}</Text>
      <Text style={styles.priceText}>{item.price_usd}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bg_item_color,
    borderColor: Colors.blackPearl,
    borderWidth: 1,
    borderRadius: 25,
    padding: 16,
    marginRight: 8,
    alignItems: 'center'
  },
  nameText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  priceText: {
    color: '#fff'
  }
});

export default CoinDetailScreen;
