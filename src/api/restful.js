/**
 * 接口请求
 * 基本http请求
 * 支持cookie刷新
 * 返回接口处理
 * 错误处理
 * 请求头处理
 * author: LN
 */
import configs from '@/configs';
import Ajax from '@/utils/ajax';
import storage from '@/utils/storage';
import { Message } from 'element-ui';
import cmsRouter from '@/cms/router';
import clientRouter from '@/client/router';
// import { getCookie, setCookie } from '@/utils/utils';
// import moment from 'moment';
/**
 * 获取数据
 * 主要是get请求数据
 * 1. 常量没有data
 * 2. 登录没有data
 * 3. 其他情况下都会有data
 */
function getData(res) {
  if (res && res.data) {
    // touch cookie
    // touchCookie();
    return res.data.data ? res.data.data : res.data;
  }
  return null;
}

/**
 * 获取结果
 * 成功： 响应数据 data，消息 message
 * 失败： 响应状态码 statusCode，消息 message
 */
function getResult(res) {
  // touchCookie();
  return res.data;
}

/**
 * 每次请求成功 touch一次cookie
 */
// function touchCookie() {
//   setTimeout(() => {
//     const isLogin = getCookie('isLogin');
//     const isRemember = getCookie('isRemember');
//     if (isLogin) {
//       if (isRemember) {
//         setCookie(
//           true,
//           'isLogin',
//           new Date(
//             moment()
//               .add(30, 'days')
//               .add(-5, 'minutes')
//           )
//         );
//         setCookie(
//           true,
//           'isRemember',
//           new Date(
//             moment()
//               .add(30, 'days')
//               .add(-5, 'minutes')
//           )
//         );
//       } else {
//         // 提前5分钟（两小时过期）
//         setCookie(true, 'isLogin', new Date(moment().add(115, 'minutes')));
//       }
//     }
//   }, 500);
// }

/**
 * 错误处理
 * // todo: token过期处理
 * @param {*} err
 */
function handlerError(err) {
  console.log('err', err.response);
  if (!err.response) {
    return Promise.reject(err);
  }
  const { status } = err.response;
  const body = err.response.data;
  if (status === 401) {
    // 重新登录
    storage.clear();
    cmsRouter.push({ name: 'login' });
    clientRouter.push({ name: 'login' });
    return Promise.reject(false);
  }
  if (status === 403) {
    Message.error(body ? body.message : status);
    return Promise.reject(false);
  }
  if (status <= 504 && status >= 500) {
    Message.error('服务器错误！');
    return Promise.reject(body);
  }
  if (status >= 404 && status < 422) {
    // 这种情况是不允许出现的，所以，这个消息只会给开发者提醒用的
    Message.error(`状态：${status}，请确认API地址是否存在！`);
    return Promise.reject(body);
  }
  if (status === 400) {
    // 400状态码返回页面处理
    return Promise.reject(body);
  }
  // 其他状态码不处理
  // Alert.alert('提示', '状态：' + status + '，网络异常！');
  return Promise.reject(body);
}

/**
 * 请求API，把结果展平再返回
 */

class Restful {
  constructor() {
    this.ajax = new Ajax(configs.serverURL);
    this.canRefreshToken = true; // 限制refresh token的并发请求
  }

  async setToken(token) {
    this.ajax.setHeader({
      Authorization: token || '',
    });
    return this;
  }

  async getToken() {
    const accessToken = storage.getAccessToken();
    console.log('accessToken', accessToken);
    if (!accessToken) {
      return '';
    }
    if (accessToken.isValid()) {
      // 判断是否过期了
      // time && clearTimeout(time);
      return accessToken.token;
    }
    // 如果过期了就使用refresh token 获取新的access token
    if (this.canRefreshToken) {
      console.log('执行了');
      // time && clearTimeout(time);
      const token = await this.freshAccessToken(accessToken);
      console.log('new token', token);
      return token;
    } else {
      console.log('进来了');
      let token = '';
      setTimeout(async () => {
        token = await this.getToken();
      }, 200);
      if (token) {
        return token;
      }
    }
  }

  /* 刷新token */
  async freshAccessToken(accessToken) {
    const freshToken = storage.getRefreshToken();
    if (!freshToken) {
      return accessToken.token;
    }
    const url = `/login-service/token/refresh?refreshToken=${freshToken.token}`;
    // refresh token的时候不需要携带token，所以去掉请求头的token（带上token导致refresh token报500，被坑地好惨）
    this.setToken();
    this.canRefreshToken = false;
    const data = await this.ajax.get(url).then(
      res => getResult(res),
      err => handlerError(err)
    );
    this.canRefreshToken = true;
    // storage.saveRefreshToken(data.refreshToken);
    const newAccessToken = storage.saveAccessToken(data.data);
    console.log('请求完成');
    return newAccessToken.token;
  }

  /* 处理token */
  async ensureAccessToken() {
    const token = await this.getToken();
    console.log(token);
    return this.setToken(token);
  }

  async get(url, cancleRequest = false) {
    await this.ensureAccessToken();
    return this.ajax.get(url, cancleRequest).then(
      res => getData(res),
      err => handlerError(err)
    );
  }

  async delete(url, data) {
    await this.ensureAccessToken();
    return this.ajax.delete(url, data).then(
      res => getResult(res),
      err => handlerError(err)
    );
  }

  async post(url, data) {
    await this.ensureAccessToken();
    return this.ajax.post(url, data).then(
      res => getResult(res),
      err => handlerError(err)
    );
  }

  async put(url, data) {
    await this.ensureAccessToken();
    return this.ajax.put(url, data).then(
      res => getResult(res),
      err => handlerError(err)
    );
  }

  async formPost(url, data) {
    await this.ensureAccessToken();
    return this.ajax.formPost(url, data).then(
      res => getResult(res),
      err => handlerError(err)
    );
  }

  async formGet(url) {
    await this.ensureAccessToken();
    return this.ajax.formGet(url).then(
      res => getData(res),
      err => handlerError(err)
    );
  }

  async upload(url, formData) {
    await this.ensureAccessToken();
    return this.ajax.upload(url, formData).then(
      res => getResult(res),
      err => handlerError(err)
    );
  }
}

export default new Restful();
