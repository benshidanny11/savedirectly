import axios from "axios";
import STRING_CONSTANTS from "../constants/STRING_CONSTANTS";

export const sendHTTPRequest = async (options) => {
  console.log(`URL: ${options.url}`);
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
      res = await axios.get(options.url, config);
    }else {
      res = await axios.post(options.url, options.body, config);
    }

    if (res && res.data) {
      return res.data;
    }
  } catch (error) {
    console.log(error.response);
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