/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
class Storage {
  static instance = new Storage();

  async add(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.error('add method Storage error', error);
      return false;
    }
  }
  async get(key) {
    try {
      const item = await AsyncStorage.getItem(key);
      return item;
    } catch (error) {
      console.error('get method Storage error', error);
    }
  }
  async getAll(keys) {
    try {
      const allItems = AsyncStorage.multiGet(keys);
      return allItems;
    } catch (error) {
      console.error('getAll method Storage error', error);
    }
  }
  async getAllKeys() {
    try {
      const allKeys = AsyncStorage.getAllKeys();
      return allKeys;
    } catch (error) {
      console.error('getAllKeys method Storage error', error);
    }
  }
  async remove(key) {
    try {
      const removedItem = await AsyncStorage.removeItem(key);
      return removedItem;
    } catch (error) {
      console.error('remove method Storage error', error);
    }
  }
}

export default Storage;
