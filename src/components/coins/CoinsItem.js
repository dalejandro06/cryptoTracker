/* eslint-disable prettier/prettier */
/* eslint-disable comma-dangle */
import React from 'react';
import {View, Text, StyleSheet, Platform, Pressable, Image} from 'react-native';
import Colors from '../../res/colors';

export default function CoinsItem({item, onPress}) {
  const positivePrice = () => {
    if (item.percent_change_1h > 0) {
      return styles.percentTextGreen;
    } else {
      return styles.percentTextRed;
    }
  };

  const getSymbolIcon = (coinNameId) => {
    if (coinNameId) {
      return `https://c1.coinlore.com/img/16x16/${coinNameId}.png`;
    }
  };
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.row}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{uri: getSymbolIcon(item.nameid)}}
          />
        </View>
        <View>
          <Text style={styles.nameText}>{item.name}</Text>
          <Text style={styles.symbolText}>{item.symbol}</Text>
        </View>
      </View>
      <View style={styles.column}>
        <Text style={styles.priceText}>{`$${item.price_usd}`}</Text>
        <Text style={positivePrice()}>{item.percent_change_1h}%</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomColor: Colors.blackPearl,
    borderBottomWidth: 1,
    marginLeft: Platform.OS === 'ios' ? 16 : 0
  },
  imageContainer: {
    backgroundColor: '#23222c',
    width: 50,
    height: 50,
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  row: {
    flexDirection: 'row'
  },
  image: {
    width: 26,
    height: 26
  },
  symbolText: {
    color: 'grey',
    fontSize: 14,
    marginRight: 20
  },
  nameText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 12
  },
  priceText: {
    color: '#fff',
    fontSize: 17
  },
  percentTextRed: {
    color: 'red',
    fontSize: 14,
    padding: 2,
    margin: 2
  },
  percentTextGreen: {
    color: 'green',
    fontSize: 14,
    padding: 2,
    margin: 2
  },
  imageIcon: {
    width: 22,
    height: 22,
    marginLeft: 10
  }
});
