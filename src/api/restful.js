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
import Ajax from '@/common/ajax';
import { Message } from 'element-ui';
import { getCookie, setCookie } from '@/utils/utils';
import moment from 'moment';
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
    touchCookie();
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
  touchCookie();
  return res.data;
}

/**
 * 每次请求成功 touch一次cookie
 */
function touchCookie() {
  setTimeout(() => {
    const isLogin = getCookie('isLogin');
    const isRemember = getCookie('isRemember');
    if (isLogin) {
      if (isRemember) {
        setCookie(
          true,
          'isLogin',
          new Date(
            moment()
              .add(30, 'days')
              .add(-5, 'minutes')
          )
        );
        setCookie(
          true,
          'isRemember',
          new Date(
            moment()
              .add(30, 'days')
              .add(-5, 'minutes')
          )
        );
      } else {
        // 提前5分钟（两小时过期）
        setCookie(true, 'isLogin', new Date(moment().add(115, 'minutes')));
      }
    }
  }, 500);
}

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
    return Promise.reject(false);
    // 不需要返回任何消息了
    // return Promise.reject(body)
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
  }

  async get(url, cancleRequest = false) {
    return this.ajax.get(url, cancleRequest).then(
      res => getData(res),
      err => handlerError(err)
    );
  }

  async delete(url, data) {
    return this.ajax.delete(url, data).then(
      res => getResult(res),
      err => handlerError(err)
    );
  }

  async post(url, data) {
    return this.ajax.post(url, data).then(
      res => getResult(res),
      err => handlerError(err)
    );
  }

  async put(url, data) {
    return this.ajax.put(url, data).then(
      res => getResult(res),
      err => handlerError(err)
    );
  }

  async formPost(url, data) {
    return this.ajax.formPost(url, data).then(
      res => getResult(res),
      err => handlerError(err)
    );
  }

  async formGet(url) {
    return this.ajax.formGet(url).then(
      res => getData(res),
      err => handlerError(err)
    );
  }

  async upload(url, formData) {
    return this.ajax.upload(url, formData).then(
      res => getResult(res),
      err => handlerError(err)
    );
  }
}

export default new Restful();
