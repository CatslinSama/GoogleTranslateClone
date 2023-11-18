import { ActivityIndicator, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../utils/colors';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import { useEffect, useState, useCallback } from 'react';
import supportedLanguages from '../utils/supportedLanguages';
import translate from '../utils/translate';
import * as Clipboard from 'expo-clipboard';
import { useDispatch, useSelector } from 'react-redux';
import { addHistoryItem, setHistoryItems } from '../store/historySlice';
import TranslationResult from '../components/TranslationResult';
import uuid from 'react-native-uuid'
import AsyncStorage from '@react-native-async-storage/async-storage';

const loadData = () => {
  return async dispatch => {
    try {
      const historyString = await AsyncStorage.getItem('history');
      if (historyString !== null) {
        const history = JSON.parse(historyString);
        dispatch(setHistoryItems({ items: history }));
      }
    } catch (error) {
      console.log(error);
    }
  }
}


export default function HomeScreen(props) {
  const params = props.route.params || {};
  const [enteredText, setEnteredText] = useState("");
  const [resultText, setResultText] = useState("");
  const [languageTo, setLanguageTo] = useState("en");
  const [languageFrom, setLanguageFrom] = useState("zh");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const history = useSelector(state => state.history.items);



  useEffect(() => {
    if (params.languageTo) {
      setLanguageTo(params.languageTo);
    }

    if (params.languageFrom) {
      setLanguageFrom(params.languageFrom);
    }
  }, [params.languageTo, params.languageFrom]);

  useEffect(() => {
    dispatch(loadData())
  }, [dispatch])

  useEffect(() => {
    const saveHistory = async () => {
      try {
        await AsyncStorage.setItem('history', JSON.stringify(history));
      } catch (error) {
        console.log("saveHistory is ::", error);
      }
    }
    saveHistory();
  }, [history])

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await translate(enteredText, languageFrom, languageTo);
      console.log("Translation result: ", result);
      if (!result) {
        setResultText("");
        return;
      }
      setResultText(result.trans_result[0].dst);

      const id = uuid.v4();
      result.id = id;
      result.dataTime = new Date().toString();
      // dispatch
      dispatch(addHistoryItem({ item: result }));
    } catch (error) {
      console.log("bug in onSubmit :", error);
    }
    finally {
      setIsLoading(false);
    }

  }, [enteredText, languageTo, languageFrom, dispatch]);


  const copyToClipboard = useCallback(async () => {
    await Clipboard.setStringAsync(resultText);
  }, [resultText]);




  return (
    <View style={styles.container}>
      <View style={styles.languageContainer}>
        <TouchableOpacity
          style={styles.languageOption}
          onPress={() => props.navigation.navigate("languageSelect", { title: 'Teanslate from', selected: languageFrom, mode: 'from' })}
        >
          <Text style={styles.languageOptionText}>{supportedLanguages[languageFrom]}</Text>
        </TouchableOpacity>

        <View
          style={styles.arrowContainer}
        ><MaterialCommunityIcons name="arrow-right" size={26} color={colors.lightGrey} /></View>

        <TouchableOpacity
          style={styles.languageOption}
          onPress={() => props.navigation.navigate("languageSelect", { title: 'Teanslate To', selected: languageTo, mode: 'to' })}
        >
          <Text style={styles.languageOptionText}>{supportedLanguages[languageTo]}</Text>
        </TouchableOpacity>
      </View>


      <View style={styles.inputContainer}>
        <TextInput
          multiline
          placeholder='Enter'
          style={styles.textInput}
          onChangeText={(text) => setEnteredText(text)}
        />

        <TouchableOpacity
          onPress={isLoading ? undefined : onSubmit}
          disabled={enteredText === ""}
          style={styles.iconContainer}>

          {
            isLoading ?
              <ActivityIndicator size={'small'} color={colors.primary} /> :
              <MaterialCommunityIcons name="translate" size={24} color={resultText !== '' ? 'black' : 'gray'} />
          }

        </TouchableOpacity>
      </View>


      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>{resultText}</Text>

        <TouchableOpacity
          onPress={copyToClipboard}
          disabled={resultText === ""}
          style={styles.iconContainer}>
          <MaterialCommunityIcons name="content-copy" size={24} color={resultText !== '' ? 'black' : 'gray'} />
        </TouchableOpacity>
      </View>

      <View
        style={styles.historyContainer}
      >
        <FlatList
          data={history.slice().reverse()}
          renderItem={itemData => {
            return <TranslationResult itemId={itemData.item.id} />
          }}
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
    flexDirection: 'row',
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 1
  },
  textInput: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontFamily: 'regular',
    letterSpacing: 0.3,
    height: 90,
    color: colors.textColor
  },
  iconContainer: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  resultContainer: {
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 1,
    flexDirection: 'row',
    height: 90,
    paddingVertical: 15
  },
  resultText: {
    fontFamily: 'regular',
    letterSpacing: 0.3,
    color: colors.primary,
    flex: 1,
    marginHorizontal: 20,
  },

  historyContainer: {
    backgroundColor: colors.greyBackground,
    flex: 1,
    padding: 10
  }
});
