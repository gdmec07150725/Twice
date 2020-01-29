/**
 * 路由工具方法
 */

// 递归方式查找打开的路由的name,用于侧边栏submit
export const getOpenArrByName = (name, routerList) => {
  let arr = [];
  routerList.some(item => {
    if (item.name === name) {
      arr.push(item.name);
      return true;
    }
    if (item.children && item.children.length) {
      let childArr = getOpenArrByName(name, item.children);
      if (childArr.length) {
        arr = arr.concat(item.name, childArr);
        return true;
      }
    }
  });
  return arr;
};
