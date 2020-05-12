import storage from './storage';
function getUser() {
  // from localStorage get
  const userStr = storage.getUserDetail();
  return userStr ? JSON.parse(userStr) : null;
}

/**
 * @param {Array} value
 * @returns {Boolean}
 * @example see @/views/permission/directive.vue
 */
export default function checkPermission(value) {
  return somePermission(value);
}

/**
 * 只要包含一个匹配到的权限点就返回true
 * @param {*} value
 */
export function somePermission(value) {
  if (value && value instanceof Array && value.length > 0) {
    const user = getUser();

    const permission =
      user && user.roles.length > 0
        ? user.roles[0].permissions.map(item => item.name)
        : [];

    return permission.some(p => {
      return value.includes(p);
    });
  } else {
    // console.error(`need roles! Like v-permission="['admin','editor']"`);
    return false;
  }
}

/**
 * 判断是否有路由权限
 * @param {*} route
 */
export function hasPermission(route) {
  if (route.meta && route.meta.permissions) {
    const user = getUser();
    const permission =
      user && user.roles.length > 0
        ? user.roles[0].permissions.map(item => item.name)
        : [];
    // console.log(route.meta.permissions, permission.some(role => route.meta.permissions.includes(role)))
    // if (route.meta.all) {
    //   return route.meta.permissions.every(role => permission.includes(role));
    // }
    return permission.some(role => route.meta.permissions.includes(role));
  } else {
    return true;
  }
}
