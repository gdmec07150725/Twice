import Cookies from 'js-cookie';

/* 获取cookie */
export const getCookie = (name = 'JSESSIONID') => {
  return Cookies.get(name) || '';
};

/* 设置cookie */
export const setCookie = (cookie, name = 'JSESSIONID', expires) => {
  if (expires) {
    Cookies.set(name, cookie, { expires: expires });
  } else {
    Cookies.set(name, cookie);
  }
};

// 判断是否ie浏览器
export const isIE = () => {
  if (!!window.ActiveXObject || 'ActiveXObject' in window) {
    return true;
  }
  return false;
};
