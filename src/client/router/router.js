import layouts from '@/client/views/layouts';
import home from '@/client/views/home';
import publishArticle from '@/client/views/publishArticle';
import articleDetail from '@/client/views/articleDetail';

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
    path: '/publishArticle',
    name: 'publishArticle',
    component: publishArticle,
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
];
