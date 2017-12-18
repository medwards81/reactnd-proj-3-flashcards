import { AsyncStorage } from 'react-native';

const DECKS_STORAGE_KEY = 'Flashcards:decks';

export function getDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(
    data => (data === null ? {} : JSON.parse(data))
  );
}

// export function submitEntry({ entry, key }) {
//   return AsyncStorage.mergeItem(
//     DECKS_STORAGE_KEY,
//     JSON.stringify({
//       [key]: entry
//     })
//   );
// }
//
// export function removeEntry(key) {
//   return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(results => {
//     const data = JSON.parse(results);
//     data[key] = undefined;
//     delete data[key];
//     AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data));
//   });
// }
