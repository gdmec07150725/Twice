import Cookies from 'js-cookie';
import clonedeep from 'clonedeep';
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

/* 移除cookie */
export const removeCookie = name => {
  return Cookies.remove(name);
};

// 判断是否ie浏览器
export const isIE = () => {
  if (!!window.ActiveXObject || 'ActiveXObject' in window) {
    return true;
  }
  return false;
};

// 传参数时过滤掉为'', null和空数组的属性
export const filterData = (arr = {}) => {
  for (var key in arr) {
    if (
      arr[key] === '' ||
      arr[key] === null ||
      JSON.stringify(arr[key]) === '[]'
    ) {
      delete arr[key];
    }
  }
  return arr;
};

/**
 * 获得常量对象的值，返回数组的形式
 */
export const getConstantValues = (constant, key) => {
  if (!constant || !constant[key]) {
    return [];
  }
  const obj = constant[key].detailMap;
  const valueArr = Object.values(obj);
  const originArr = clonedeep(sortArr(valueArr, 'paramValue'));
  return originArr.filter(item => {
    return !item.hidden;
  });
};

// 处理分页
export const calculationPage = (arr = Number) => {
  let page;
  page = arr === 1 ? arr : Number(arr) - 1;
  return page;
};

// 使用unicode对数组进行排序
export const sortArr = (arr = [], sortKey) => {
  if (arr.length > 0) {
    // 对指定语言的字段进行排序
    return arr.sort((a, b) =>
      a[sortKey].localeCompare(b[sortKey], 'EN', { sensitivity: 'accent' })
    );
  } else {
    return [];
  }
};

/**
 * 消息提示音
 *
 */
export function playMus() {
  var gamemuiscs1 = new Audio('/static/resources/default.mp3');
  gamemuiscs1.play();
}
