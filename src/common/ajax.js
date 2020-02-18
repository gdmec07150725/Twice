/**
 * ajax 请求基础类库
 * 支持get、post、delete、put
 * 支持提交表单数据
 * author: LN
 */

import axios from 'axios';
import qs from 'qs';

/**
 * ajax 请求封装
 */

// axios.defaults.withCredentials = true; //让ajax携带cookie
const CancelToken = axios.CancelToken;
let cancel;

class Ajax {
  constructor(baseURL) {
    this.header = {};
    this.request = axios.create();
    this.request.defaults.baseURL = baseURL;
    this.request.defaults.headers.common.Accept = 'application/json';
    this.request.defaults.headers.common['Content-Type'] = 'application/json';
    this.request.interceptors.request.use(
      config => {
        return config;
      },
      error => Promise.reject(error)
    );
    this.request.interceptors.response.use(
      response => {
        return response;
      },
      error => Promise.reject(error)
    );
  }

  setHeader(headers) {
    this.header = headers || {};
    return this;
  }

  /* cancelRequest: 是否block掉上次请求 */
  get(url, cancleRequest = false) {
    if (!cancleRequest) {
      return this.request.get(url, { headers: this.header });
    }
    if (typeof cancel === 'function') {
      // cancel the request
      cancel();
    }
    return this.request.get(url, {
      headers: this.header,
      cancelToken: new CancelToken(function executor(c) {
        // An executor function receives a cancel function as a parameter
        cancel = c;
      }),
    });
  }

  post(url, data) {
    return this.request.post(url, data, { headers: this.header });
  }

  delete(url, data) {
    return this.request.delete(url, { data }, { headers: this.header });
  }

  put(url, data) {
    return this.request.put(url, data, { headers: this.header });
  }

  formPost(url, data) {
    return this.request.post(
      url,
      qs.stringify(data, { arrayFormat: 'repeat' }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          ...this.header,
        },
      }
    );
  }

  formGet(url) {
    return this.request.get(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        ...this.header,
      },
    });
  }

  upload(url, formData) {
    return this.request.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
        ...this.header,
      },
    });
  }
}

export default Ajax;
