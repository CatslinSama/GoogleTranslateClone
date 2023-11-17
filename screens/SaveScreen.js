import { FlatList,StyleSheet, Text, View } from 'react-native';
import colors from '../utils/colors';
import TranslationResult from '../components/TranslationResult';
import { useSelector } from 'react-redux';

export default function SaveScreen() {
  const savedItems = useSelector(state => state.savedItems.items)

  return (
    <View style={styles.container}>
      <FlatList
        data={savedItems.slice().reverse()}
        renderItem={itemData => {
          return <TranslationResult itemId={itemData.item.id} />
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.greyBackground,
    padding: 10,
  },
});
