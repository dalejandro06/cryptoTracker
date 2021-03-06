/* eslint-disable prettier/prettier */
/* eslint-disable comma-dangle */
import React from 'react';
import {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  SectionList,
  Pressable,
  Alert
} from 'react-native';
import Colors from '../../res/colors';
import Http from '../../libs/http';
import CoinMarketItem from './CoinMarketItem';
import Storage from '../../libs/storage';

function CoinDetailScreen({route, navigation}) {
  const [currentCoin, setCurrentCoin] = useState({});
  const [markets, setMarkets] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const {coin} = route.params;
    setCurrentCoin(coin);
  }, [route.params]);

  useEffect(() => {
    navigation.setOptions({title: currentCoin.symbol});
    getFavorite();
  }, [currentCoin, navigation, getFavorite]);

  useEffect(() => {
    getMarkets(currentCoin.id);
  }, [currentCoin]);

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

  const toggleFavorite = () => {
    isFavorite ? removeFavorite() : addFavorite();
  };

  const removeFavorite = () => {
    Alert.alert('Remove Favorite', 'Estas seguro?', [
      {
        text: 'cancel',
        onPress: () => {},
        style: 'cancel'
      },
      {
        text: 'Remove',
        onPress: async () => {
          const key = `favorite-${currentCoin.id}`;
          const deletedItem = await Storage.instance.remove(key);
          deletedItem && setIsFavorite(false);
        },
        style: 'destructive'
      }
    ]);
  };
  const addFavorite = async () => {
    const coin = JSON.stringify(currentCoin);
    const key = `favorite-${currentCoin.id}`;
    const isStored = await Storage.instance.add(key, coin);
    setIsFavorite(isStored);
  };

  const getFavorite = useCallback(async () => {
    try {
      const key = `favorite-${currentCoin.id}`;
      const favorite = await Storage.instance.get(key);
      favorite && setIsFavorite(true);
    } catch (e) {
      console.error('Error obtaining favorite', e);
    }
  }, [currentCoin]);

  return (
    <View style={styles.container}>
      <View style={styles.subHeader}>
        <View style={styles.subHeaderTitle}>
          <Image
            style={styles.iconImg}
            source={{uri: getSymbolIcon(currentCoin.nameid)}}
          />
          <Text style={styles.titleText}>{currentCoin.name}</Text>
        </View>
        <Pressable
          onPress={toggleFavorite}
          style={[
            styles.btnFavorite,
            isFavorite ? styles.btnFavoriteRemove : styles.btnFavoriteAdd
          ]}>
          <Text style={styles.btnFavoriteText}>
            {isFavorite ? 'Remove' : 'Add'} Favorite
          </Text>
        </Pressable>
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
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  subHeaderTitle: {
    flexDirection: 'row',
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
    fontSize: 18,
    marginBottom: 16,
    marginLeft: 16,
    fontWeight: 'bold'
  },
  btnFavorite: {
    padding: 8,
    borderRadius: 8
  },
  btnFavoriteAdd: {
    backgroundColor: Colors.picton
  },
  btnFavoriteRemove: {
    backgroundColor: Colors.carmine
  },
  btnFavoriteText: {
    color: Colors.white
  }
});

export default CoinDetailScreen;
