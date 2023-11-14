import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../utils/colors';
import { TextInput } from 'react-native-gesture-handler';

export default function HomeScreen(props) {
  return (
    <View style={styles.container}>
      <View style={styles.languageContainer}>
        <TouchableOpacity
          style={styles.languageOption}
          opPress={() => console.log("pressed")}
        >
          <Text style={styles.languageOptionText}>English to</Text>
        </TouchableOpacity>

        <View
          style={styles.arrowContainer}
        ><MaterialCommunityIcons name="arrow-right" size={26} color={colors.lightGrey} /></View>

        <TouchableOpacity
          style={styles.languageOption}
          onPress={() => console.log("object")}
        >
          <Text style={styles.languageOptionText}>French</Text>
        </TouchableOpacity>
      </View>


      <View style={styles.inputContainer}>
        <TextInput
          multiline
          placeholder='Enter context'
          style={styles.textInput}
          onChangeText={(text) => console.log(text)}
        />
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  languageContainer: {
    flexDirection: 'row',
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 1
  },
  languageOption: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15
  },
  arrowContainer: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  languageOptionText: {
    color: colors.primary,
    fontFamily: 'regular',
    letterSpacing: 0.3
  },
  inputContainer: {

  },
  textInput: {

  }
});
