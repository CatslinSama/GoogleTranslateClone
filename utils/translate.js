import axios from 'axios';
import CryptoJS from 'crypto-js';

const translate = async (enteredText, languageFrom, languageTo) => {
  const appid = '20231115001880875';  // 你的开发者APP ID
  const key = 'TN25zqTkIPKyVTMi1MCZ'; // 你的开发者密钥
  const salt = Date.now().toString();
  const sign = CryptoJS.MD5(appid + enteredText + salt + key).toString();

  try {
    const response = await axios({
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
    });

    if (response.status !== 200) {
      throw new Error('Translate call failed. Response status: ' + response.status);
    }

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('Translate call failed: ' + error.message);
  }
};

export default translate;