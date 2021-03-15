/* eslint-disable prettier/prettier */
/* eslint-disable comma-dangle */
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import Http from 'cryptoTracker/src/libs/http';
import CoinsItem from './CoinsItem';
import CoinsSearch from './CoinsSearch';

function CoinsScreen(props) {
  const [coins, setCoins] = useState([]);
  const [allCoins, setAllCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCoins();
  }, []);

  async function getCoins() {
    const {data} = await Http.instance.get(
      'https://api.coinlore.net/api/tickers/'
    );
    setCoins(data);
    setAllCoins(data);
    setLoading(false);
  }

  const handlePress = (coin) => {
    props.navigation.navigate('CoinDetail', {coin});
  };
  const handleSearch = (query) => {
    const queryLower = query.toLowerCase();
    const filteredCoins = allCoins.filter((coin) => {
      return (
        coin.name.toLowerCase().includes(queryLower) ||
        coin.symbol.toLowerCase().includes(queryLower)
      );
    });
    setCoins(filteredCoins);
  };

  return (
    <View style={styles.container}>
      <CoinsSearch onChange={handleSearch} />
      {loading ? (
        <ActivityIndicator style={styles.loader} color="black" size="large" />
      ) : (
        <FlatList
          data={coins}
          renderItem={({item}) => (
            <CoinsItem item={item} onPress={() => handlePress(item)} />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#13121e'
  },
  title: {
    color: '#fff',
    textAlign: 'center'
  },
  btn: {
    padding: 8,
    backgroundColor: 'blue',
    margin: 16,
    borderRadius: 16
  },
  btnText: {
    color: '#fff',
    textAlign: 'center'
  },
  loader: {
    marginTop: 60
  }
});

export default CoinsScreen;
