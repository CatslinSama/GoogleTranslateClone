import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../utils/colors';
import { TextInput } from 'react-native-gesture-handler';
import { useEffect, useState, useCallback } from 'react';
import supportedLanguages from '../utils/supportedLanguages';
import axios from 'axios';
import CryptoJS from 'crypto-js';

export default function HomeScreen(props) {
  const params = props.route.params || {};
  const [enteredText, setEnteredText] = useState("");
  const [resultText, setResultText] = useState("");
  const [languageTo, setLanguageTo] = useState("en");
  const [languageFrom, setLanguageFrom] = useState("zh");

  useEffect(() => {
    if (params.languageTo) {
      setLanguageTo(params.languageTo);
    }

    if (params.languageFrom) {
      setLanguageFrom(params.languageFrom);
    }
  }, [params.languageTo, params.languageFrom]);


  const appid = '20231115001880875';  // 你的开发者APP ID
  const key = 'TN25zqTkIPKyVTMi1MCZ'; // 你的开发者密钥

  const onSubmit = useEffect(() => {
    const salt = Date.now().toString();
    const sign = CryptoJS.MD5(appid + enteredText + salt + key).toString();
  
    axios({
      method: 'post',
      url: 'https://fanyi-api.baidu.com/api/trans/vip/translate',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      params: {
        q: enteredText,
        from: languageFrom,
        to: languageTo,
        appid,
        salt,
        sign
      }
    })
    .then(response => {
      console.log(response.data.trans_result[0].dst); // 打印翻译结果
    })
    .catch(error => {
      console.log(error);
    });
  },[enteredText,languageTo,languageFrom])



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
          onPress={onSubmit}
          disabled={enteredText === ''}
          style={styles.iconContainer}
        >
          <MaterialCommunityIcons name="ab-testing" size={24} color={enteredText !== '' ? colors.primary : 'gray'} />
        </TouchableOpacity>
      </View>


      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>{resultText}</Text>
        <TouchableOpacity
          disabled={resultText === ''}
          style={styles.iconContainer}
        >
          <MaterialCommunityIcons name="content-copy" size={24} color={resultText !== '' ? colors.copyColor : colors.textColorcopyColor} />
        </TouchableOpacity>
      </View>

      <View
        style={styles.historyContainer}
      >

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
