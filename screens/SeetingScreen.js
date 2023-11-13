import { StyleSheet, Text, View } from 'react-native';

export default function SeetingScreen() {
  return (
      <View style={styles.container}>
        <Text>Seeting Screen</Text> 
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
