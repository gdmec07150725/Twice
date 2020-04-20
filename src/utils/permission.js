import storage from './storage';
function getUser() {
  // from localStorage get
  const userStr = storage.getUserDetail();
  return userStr ? JSON.parse(userStr) : null;
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
