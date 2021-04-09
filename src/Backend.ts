import axios from "axios";
import { AxiosResponse, AxiosRequestConfig } from "axios";
// import cookie from "react-cookies";

//NOT SURE IF THESE ARE ACTUALLY DOING ANYTHING
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

// const client = axios.create({
//     xsrfCookieName: 'csrftoken',
//     xsrfHeaderName: 'X-CSRFToken'
// })

// const BASE_URL = "https://e4b45af1fadf.ngrok.io/";
// const BASE_URL = "http://127.0.0.1:8000";
// const BASE_URL = "https://acoustic-backend.herokuapp.com";
// const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://127.0.0.1:8000';
const BASE_URL = 'https://acoustic-backend.herokuapp.com';


// interface TokenObj {
//     access_token?: string
//     error?: null | string
//     expires_in?: number
//     refresh_token?: string
//     token_type?: string
//     response?: string
// }

// interface AxiosResponseObject {
//     data: TokenObj
//     status?: number
//     statusText?: string
//     headers?: Object
//     config?: Object
//     request?: Object
// }

// interface AuthenticateUser extends TokenObj {
//     response: string
// }
  
// interface AxiosObj {
//     method: string
//     url: string|AxiosRequestConfig
// }

// interface AxiosGetRequest extends AxiosObj {
//     params: Object
// }

// interface AxiosPostRequest extends AxiosObj {
//     data: Object
// }

class Backend {

    static async request(endpoint: string, paramsOrData: Object = {}, verb: string = "get"): Promise<AxiosResponse> {
        // const csrfToken = cookie.load("csrftoken");
        // console.log("csrfToken = ", csrfToken);
        // if (csrfToken !== undefined) {
        //     console.log("valid csrfToken: ", csrfToken);
        //     return (await axios({
        //         method: verb,
        //         url: `${BASE_URL}/${endpoint}`,
        //         [verb === "get" ? "params" : "data"]: paramsOrData,
        //         headers: {'X-CSRFToken': csrfToken},
        //         credentials: 'include'
        //     }));
        // }

        const res = await axios({
            method: verb,
            url : `${BASE_URL}/${endpoint}`,
            [verb === "get" ? "params" : "data"]: paramsOrData
        } as AxiosRequestConfig)
    
        return res;


    };

    static async registerUser(data: Object) {
        let res = await this.request("registerUser/", {data}, "post");
        // console.log("This is res: ", res);
        return res.data.response
    };

    static async requestAccessTokens(code: string | null) {
        const res = await this.request("requestAccessTokens/", {code});
        if (res.data.error !== null) {
            //HANDLE ERROR
            return;
        }
        return res.data
    };

    

    // static async getCSRF() {
    //     console.log("I'm in getCSRF");
    //     let res = await this.request("getCSRF/");
    //     console.log("This is res: ", res);
    // };

    static async loginUser(data: Object) {
        let res = await this.request("/accounts/login", {data});
        return res.data.response
    };

    // static getCookie(name) {
    //     let cookieValue = null;
    //     if (document.cookie && document.cookie !== '') {
    //         const cookies = document.cookie.split(';');
    //         for (let i = 0; i < cookies.length; i++) {
    //             const cookie = cookies[i].trim();
    //             // Does this cookie string begin with the name we want?
    //             if (cookie.substring(0, name.length + 1) === (name + '=')) {
    //                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
    //                 break;
    //             }
    //         }
    //     }
    //     return cookieValue;
    // }
};

export default Backend;