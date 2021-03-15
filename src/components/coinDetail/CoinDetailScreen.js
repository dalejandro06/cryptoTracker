/* eslint-disable prettier/prettier */
/* eslint-disable comma-dangle */
import React from 'react';
import {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  SectionList
} from 'react-native';
import Colors from '../../res/colors';
import Http from '../../libs/http';
import CoinMarketItem from './CoinMarketItem';

function CoinDetailScreen({route, navigation}) {
  const [currentCoin, setCurrentCoin] = useState({});
  const [markets, setMarkets] = useState({});

  useEffect(() => {
    const {coin} = route.params;
    setCurrentCoin(coin);
  }, [route.params]);

  useEffect(() => {
    navigation.setOptions({title: currentCoin.symbol});
  }, [currentCoin.symbol, navigation]);
  useEffect(() => {
    getMarkets(currentCoin.id);
  }, [currentCoin.id]);
  const getSymbolIcon = (coinNameId) => {
    if (coinNameId) {
      return `https://c1.coinlore.com/img/16x16/${coinNameId}.png`;
    }
  };

  const getSections = (coin) => {
    const sections = [
      {
        title: 'Market cap',
        data: [coin.market_cap_usd]
      },
      {
        title: 'Volumen 24h',
        data: [coin.volume24]
      },
      {
        title: 'Change 24h',
        data: [coin.percent_change_24h]
      }
    ];
    return sections;
  };

  const getMarkets = async (coinId) => {
    const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`;
    const data = await Http.instance.get(url);
    setMarkets(data);
  };

  return (
    <View style={styles.container}>
      <View style={styles.subHeader}>
        <Image
          style={styles.iconImg}
          source={{uri: getSymbolIcon(currentCoin.nameid)}}
        />
        <Text style={styles.titleText}>{currentCoin.name}</Text>
      </View>
      <View style={styles.main_container}>
        <SectionList
          style={styles.section}
          sections={getSections(currentCoin)}
          keyExtractor={(item) => item}
          renderItem={({item}) => (
            <View style={styles.sectionItem}>
              <Text style={styles.itemText}>{item}</Text>
            </View>
          )}
          renderSectionHeader={({section}) => (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionText}>{section.title}</Text>
            </View>
          )}
        />
      </View>
      <Text style={styles.marketsTitle}>Markets</Text>
      <FlatList
        keyExtractor={(item) => `${item.base}-${item.name}-${item.quote}`}
        style={styles.list}
        horizontal
        data={markets}
        renderItem={({item}) => <CoinMarketItem item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black
  },
  subHeader: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  main_container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16
  },
  section: {
    width: '100%',
    backgroundColor: Colors.bg_item_color,
    borderRadius: 20,
    padding: 16
  },
  titleText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8
  },
  iconImg: {
    height: 25,
    width: 25
  },
  sectionHeader: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 8
  },
  sectionItem: {
    padding: 8
  },
  itemText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center'
  },
  sectionText: {
    color: '#f2edd7',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  list: {
    maxHeight: 100,
    paddingLeft: 16
  },
  marketsTitle: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 16,
    marginLeft: 16,
    fontWeight: 'bold'
  }
});

export default CoinDetailScreen;
