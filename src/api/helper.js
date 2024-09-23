import axios from "axios";
import STRING_CONSTANTS from "../constants/STRING_CONSTANTS";
import API_CONSTANTS from "../constants/API_CONSTANTS";

export const sendHTTPRequest = async (options) => {
  try {
    const config = {
      headers: {
        "content-Type": "application/json",
      },

    };

    if (options.token) {
      config.headers.Authorization = `Bearer ${options.token}`;
    }

    let res;

    if (options.method === STRING_CONSTANTS.GET_METHOD) {
      res = await axios.get(`${API_CONSTANTS.BASE_URL}${options.url}`, config);
    }else {
      console.log(`URL: ${API_CONSTANTS.BASE_URL}${options.url}`,"ppppppp");
      res = await axios.post(`${API_CONSTANTS.BASE_URL}${options.url}`, options.body, config);
    }

    if (res && res.data) {
      return res.data;
    }
  } catch (error) {
    console.log(error.request);
    return error;
  }
};


/*

 Future<UserRegModel> veryfyPhoneNumber(
      String counrtyCode, String phonumber) async {
    UserRegModel regModel;
    print(
        'URL:+> ${API_URLS.VERIFY_PHONE_NUMBER}, Country code: $counrtyCode, Phone number $phonumber');
    try {
      final response = await http.post(Uri.parse(API_URLS.VERIFY_PHONE_NUMBER),
          headers: {"Content-Type": "application/json"},
          body: json.encode({"countryCode": counrtyCode, "msisdn": phonumber}));
      regModel = UserRegModel.fromJson(json.decode(response.body));
      _userRegModel = regModel;
      print(response.body);
      return regModel;
    } catch (error) {
      print(error);
      throw (error);
    }
  }

*/