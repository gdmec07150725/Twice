import Layouts from '@/views/layouts';

// define need permission router
export const permissionRouter = [
  {
    path: '/',
    component: Layouts,
    redirect: '/workplace',
    hidden: false, // 是否在菜单中隐藏
    children: [
      {
        path: 'workplace',
        name: 'workplace',
        icon: 'icon-dashboard',
        component: () => import('@/views/workplace'),
        meta: {
          title: '工作台',
        },
      },
    ],
  },
  {
    path: '/reminders',
    component: Layouts,
    hidden: false,
    redirect: '/reminders/index',
    meta: {
      permissions: [],
    },
    children: [
      {
        path: 'index',
        name: 'reminders',
        icon: '',
        meta: {
          title: '提醒事项',
          permissions: [],
        },
        component: () => import('@/views/reminders'),
      },
    ],
  },
  {
    path: '/publishInfo',
    component: Layouts,
    hidden: false,
    redirect: '/publishInfo/index',
    meta: {
      permissions: [],
    },
    children: [
      {
        path: 'index',
        name: 'publishInfo',
        icon: '',
        meta: {
          title: '发布公告',
          permissions: [],
        },
        component: () => import('@/views/publishInfo'),
      },
    ],
  },
  {
    path: '/documentation',
    name: 'documentation',
    component: Layouts,
    hidden: false,
    icon: '',
    alwaysShow: true, // 显示一级menu
    meta: {
      title: '文档管理',
      permissions: [],
    },
    children: [
      {
        path: 'folder',
        name: 'folder',
        meta: {
          title: '文件夹管理',
          permissions: [],
        },
        component: () => import('@/views/documentation/folder.vue'),
      },
      {
        path: 'file',
        name: 'file',
        meta: {
          title: '文件管理',
          permissions: [],
        },
        component: () => import('@/views/documentation/file.vue'),
      },
    ],
  },
  {
    path: '/tomatoMethod',
    name: 'tomatoMethod',
    component: Layouts,
    hidden: false,
    icon: '',
    alwaysShow: true,
    meta: {
      title: '番茄工作法',
      permissions: [],
    },
    children: [
      {
        path: 'activityList',
        name: 'activityList',
        meta: {
          title: '活动清单',
          permissions: [],
        },
        component: () => import('@/views/tomatoMethod/activityList.vue'),
      },
      {
        path: 'todoList',
        name: 'todoList',
        meta: {
          title: '今日待办',
          permissions: [],
        },
        component: () => import('@/views/tomatoMethod/todoList.vue'),
      },
    ],
  },
  {
    path: '/materialStatistics',
    name: 'materialStatistics',
    component: Layouts,
    hidden: false,
    icon: '',
    alwaysShow: true,
    meta: {
      title: '物资统计',
      permissions: [],
    },
    children: [
      {
        path: 'materialManage',
        name: 'materialManage',
        meta: {
          title: '物资管理',
          permissions: [],
        },
        component: () =>
          import('@/views/materialStatistics/materialManage.vue'),
      },
      {
        path: 'materialConsume',
        name: 'materialConsume',
        meta: {
          title: '物资消耗',
          permissions: [],
        },
        component: () =>
          import('@/views/materialStatistics/materialConsume.vue'),
      },
    ],
  },
  {
    path: '/projectManage',
    component: Layouts,
    redirect: '/projectManage/index',
    hidden: false,
    meta: {
      permissions: [],
    },
    children: [
      {
        path: 'index',
        name: 'projectManage',
        icon: '',
        meta: {
          title: '项目管理',
          permissions: [],
        },
        component: () => import('@/views/projectManage'),
      },
    ],
  },
  {
    path: '/reimburseManage',
    component: Layouts,
    redirect: '/reimburseManage/index',
    hidden: false,
    meta: {
      permissions: [],
    },
    children: [
      {
        path: 'index',
        name: 'reimburseManage',
        icon: '',
        meta: {
          title: '报销管理',
          permissions: [],
        },
        component: () => import('@/views/reimburseManage'),
      },
    ],
  },
  {
    path: '/columnManage',
    component: Layouts,
    redirect: '/columnManage/index',
    hidden: false,
    meta: {
      permissions: [],
    },
    children: [
      {
        path: 'index',
        name: 'columnManage',
        icon: '',
        meta: {
          title: '专栏管理',
          permissions: [],
        },
        component: () => import('@/views/columnManage'),
      },
    ],
  },
  {
    path: '*',
    component: Layouts,
    redirect: '/404',
    hidden: true, // 是否在菜单中隐藏
    children: [
      {
        path: '/404',
        type: 'item',
        component: () => import('@/views/error/error_404.vue'),
        meta: {
          title: '404',
        },
      },
    ],
  },
];

export const routes = [
  {
    path: '/login',
    name: 'login',
    hidden: true,
    component: () => import('@/views/login'),
    meta: {
      title: '登录',
    },
  },
];
