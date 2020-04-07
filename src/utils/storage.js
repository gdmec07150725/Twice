/**
 * Storage管理
 * 主要是缓存信息保存
 */

const FIRSTLOGIN = 'firstLogin';
const USER = 'user';
const VERSION = 'version';

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

  setUserDetail(detail) {
    return localStorage.setItem(USER, detail);
  }

  cleanUserDetail() {
    localStorage.removeItem(USER);
  }

  getUserDetail() {
    return localStorage.getItem(USER);
  }

  clear() {
    localStorage.removeItem();
  }
}

export default new Storage();
