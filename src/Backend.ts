import axios from 'axios';
import {AxiosResponse, AxiosRequestConfig} from 'axios';

// const BASE_URL = 'http://127.0.0.1:8000';
// const BASE_URL = 'https://acoustigram-backend.herokuapp.com';
// const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://127.0.0.1:8000';
const BASE_URL = 'https://acoustigram-backend.herokuapp.com';

class Backend {

  static async request(endpoint: string, paramsOrData: Object = {}, verb: string = 'get'): Promise<AxiosResponse> {
    const res = await axios({
        method: verb,
        url : `${BASE_URL}/${endpoint}`,
        [verb === 'get' ? 'params' : 'data']: paramsOrData
    } as AxiosRequestConfig)

    return res;
  };

  static async registerUser(data: Object) {
    let res = await this.request('registerUser/', {data}, 'post');
    return res.data.response
  };

  static async requestAccessTokens(code: string | null) {
    const res = await this.request('requestAccessTokens/', {code});
    if (res.data.error !== null) {
        //HANDLE ERROR
        return;
    }
    return res.data
  };

  static async loginUser(data: Object) {
    let res = await this.request('/accounts/login', {data});
    return res.data.response
  };
};

export default Backend;