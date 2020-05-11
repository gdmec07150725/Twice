import { routes, permissionRouter } from '@/client/router/router';
import { hasPermission } from '@/utils/permission';

export function filterAsyncRoutes(routes) {
  const res = [];

  routes.forEach(route => {
    const tmp = { ...route };
    // console.log('hasPermission', hasPermission(tmp))
    if (hasPermission(tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children);
      }
      res.push(tmp);
    }
  });
  // console.log('res', res)
  return res;
}

const state = {
  routers: routes,
  hasGetRules: false,
};

const mutations = {
  RESET_CLIENT_RULES(state) {
    state.hasGetRules = false;
  },
  CONCAT_CLIENT_ROUTES(state, routerList) {
    // 合并路由，注意合并的先后顺序
    state.routers = routes.concat(routerList);
    state.hasGetRules = true;
  },
};
const actions = {
  concatClientRoutes({ commit }) {
    return new Promise(resolve => {
      let accessedRoutes = filterAsyncRoutes(permissionRouter);
      // console.log('accessedRoutes', accessedRoutes)
      commit('CONCAT_CLIENT_ROUTES', accessedRoutes);
      resolve(accessedRoutes);
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
