import axios from 'axios';
import STRING_CONSTANTS from '../constants/STRING_CONSTANTS';
import API_CONSTANTS from '../constants/API_CONSTANTS';
import Toast from 'react-native-toast-message';

export const sendHTTPRequest = async options => {
  try {
    const config = {
      headers: {
        'content-Type': 'application/json',
      },
    };

    if (options.token && options.registrationTokenType) {
      config.headers.Authorization =
        options.registrationTokenType === STRING_CONSTANTS.AUTH_TYPE_BEARER
          ? `Bearer ${options.token}`
          : `Basic ${options.token}`;
    }

    let res;

    if (options.method === STRING_CONSTANTS.GET_METHOD) {
      console.log(config.headers.Authorization);
      console.log(`URL: ${API_CONSTANTS.BASE_URL}${options.url}`, 'Get method');
      res = await axios.get(`${API_CONSTANTS.BASE_URL}${options.url}`, config);
    } else {
      console.log(
        `URL: ${API_CONSTANTS.BASE_URL}${options.url}`,
        'Post method',
      );
      console.log(config.headers.Authorization);
      res = await axios.post(
        `${API_CONSTANTS.BASE_URL}${options.url}`,
        options.body,
        config,
      );
    }

    if (res && res.data) {
      return res.data;
    }
  } catch (error) {
    console.log(error.response.data);
    
    Toast.show({
      type: 'error',
      text1: 'Error occured',
      text2: error.response?.data?.message,
    });
  }
};
