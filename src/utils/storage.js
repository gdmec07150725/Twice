/**
 * Storage管理
 * 主要是缓存信息保存
 */
import Token from './token';

const FIRSTLOGIN = 'firstLogin';
const ISLOGIN = 'isLogin';
const USER = 'user';
const COMPANY = 'company';
const VERSION = 'version';
const ACCESS_TOKEN_OBJECT = 'accessTokenObject';
const REFRESH_TOKEN_OBJECT = 'refreshTokenObject';

class Storage {
  setVersion(version) {
    return localStorage.setItem(VERSION, version);
  }

  getVersion() {
    return localStorage.getItem(VERSION);
  }

  setFirstLogin(bool) {
    return localStorage.setItem(FIRSTLOGIN, bool);
  }

  getFirstLogin() {
    return localStorage.getItem(FIRSTLOGIN);
  }

  setLogin(value) {
    return localStorage.setItem(ISLOGIN, value);
  }

  cleanLogin() {
    localStorage.removeItem(ISLOGIN);
  }

  getLogin() {
    return localStorage.getItem(ISLOGIN) || 0;
  }

  setUserDetail(detail) {
    localStorage.setItem(USER, detail);
  }

  cleanUserDetail() {
    localStorage.removeItem(USER);
  }

  getUserDetail() {
    return localStorage.getItem(USER) || '';
  }

  setCompanyDetail(detail) {
    localStorage.setItem(COMPANY, detail);
  }

  getCompanyDetail() {
    return localStorage.getItem(COMPANY) || '';
  }

  getToken() {
    const token = this.getAccessToken();
    return token ? token.token : null;
  }

  /* 获取access token 对象 */
  getAccessToken() {
    const token = localStorage.getItem(ACCESS_TOKEN_OBJECT);
    if (token) {
      const json = JSON.parse(token);
      return new Token(json.token, json.expireTime);
    }
    return null;
  }

  /**
   * 保存access token 提前一分钟过期
   * 现在access token是10分钟过期
   * @param {*} accessToken token
   * @param {*} expiresIn 过期时间
   */
  saveAccessToken(accessToken, expiresIn) {
    const expireTime =
      Date.now() + (expiresIn > 0 ? expiresIn - 60 : 600 - 60) * 1000;
    return this.setAccessToken(accessToken, expireTime);
  }

  setAccessToken(accessToken, expireTime) {
    const token = new Token(accessToken, expireTime);
    localStorage.setItem(ACCESS_TOKEN_OBJECT, JSON.stringify(token));
    return token;
  }

  /* 获取refresh token 对象*/
  getRefreshToken() {
    const token = localStorage.getItem(REFRESH_TOKEN_OBJECT);
    if (token) {
      const json = JSON.parse(token);
      return new Token(json.token, json.expireTime);
    }
    return null;
  }

  /**
   * 保存refresh token 提前一分钟过期
   * 现在refresh token 是1星期过期
   * @param {*} refreshToken
   */
  saveRefreshToken(refreshToken) {
    const expireTime = Date.now() + (3600 * 24 * 7 - 60) * 1000;
    const token = new Token(refreshToken, expireTime);
    localStorage.setItem(REFRESH_TOKEN_OBJECT, JSON.stringify(token));
    return token;
  }

  clear() {
    localStorage.clear();
  }
}

export default new Storage();
