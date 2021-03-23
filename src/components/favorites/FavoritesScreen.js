/* eslint-disable prettier/prettier */
/* eslint-disable comma-dangle */
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import FavoritesEmpty from './FavoritesEmpty';
import CoinsItem from '../coins/CoinsItem';
import Colors from '../../res/colors';
import Storage from '../../libs/storage';

function FavoritesScreen({navigation}) {
  const [coins, setCoins] = useState([]);

  const getFavorites = async () => {
    try {
      const allKeys = await Storage.instance.getAllKeys();
      const keys = allKeys.filter((key) => key.includes('favorite-'));
      const favs = await Storage.instance.getAll(keys);
      const favorites = favs.map((fav) => JSON.parse(fav[1]));
      setCoins(favorites);
    } catch (e) {
      console.error('error getting favorites', e);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', getFavorites);
    return unsubscribe;
  }, [navigation]);

  const handleNavigate = (coin) => {
    navigation.navigate('CoinDetail', {coin});
  };

  return (
    <View style={styles.container}>
      {coins ? (
        <FlatList
          data={coins}
          renderItem={({item}) => (
            <CoinsItem item={item} onPress={() => handleNavigate(item)} />
          )}
        />
      ) : (
        <FavoritesEmpty />
      )}
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
