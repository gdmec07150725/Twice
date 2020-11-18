import layouts from '@/client/views/layouts';
import home from '@/client/views/home';
import publishArticle from '@/client/views/publishArticle';
import articleDetail from '@/client/views/articleDetail';
import trend from '@/client/views/trend';

export const permissionRouter = []; // TODO: 加上路由权限控制

export const routes = [
  {
    path: '/',
    name: 'home',
    component: layouts,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: home,
      },
    ],
  },
  {
    path: '/trend',
    name: 'trend',
    component: layouts,
    children: [
      {
        path: 'index',
        name: 'trend',
        component: trend,
      },
    ],
  },
  {
    path: '/publishArticle',
    name: 'publishArticle',
    component: publishArticle,
  },
  {
    path: '/myArticle',
    name: 'myArticle',
    component: layouts,
    children: [
      {
        path: 'index',
        name: 'myArticle',
        component: () => import('@/client/views/myArticle'),
      },
    ],
  },
  {
    path: '/articleDetail',
    component: layouts,
    redirect: '/articleDetail/index',
    children: [
      {
        path: 'index',
        name: 'articleDetail',
        component: articleDetail,
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    hidden: true,
    component: () => import('@/common/login'),
    meta: {
      title: '登录',
    },
  },
];
