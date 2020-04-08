function getUser() {
  // from localStorage get
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
}

/**
 * 判断是否有路由权限
 * @param {*} route
 */
export function hasPermission(route) {
  if (route.meta && route.meta.permissions) {
    const user = getUser();
    // is full permissions
    if (user && user.fullPermissions) {
      return true;
    }

    const permission = user ? user.authorities : [];
    if (route.meta.permissions.includes('full:permission')) {
      return user && user.fullPermissions;
    }
    // console.log(route.meta.permissions, permission.some(role => route.meta.permissions.includes(role)))
    if (route.meta.all) {
      return route.meta.permissions.every(role => permission.includes(role));
    }
    // return permission.some(role => route.meta.permissions.includes(role));
    // 暂时使用全部路由
    return true;
  } else {
    return true;
  }
}
