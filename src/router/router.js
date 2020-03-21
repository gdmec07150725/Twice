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
        icon: 'icon-gongzuotai1',
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
        icon: 'icon-tixingshixiang',
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
        icon: 'icon-fabugonggao',
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
    icon: 'icon-wendangguanli',
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
    icon: 'icon-fanqie-',
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
    icon: 'icon-cz-wztj',
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
        icon: 'icon-xiangmuguanli',
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
        icon: 'icon-baoxiaoguanli',
        meta: {
          title: '报销管理',
          permissions: [],
        },
        component: () => import('@/views/reimburseManage'),
      },
    ],
  },
  {
    path: '/category',
    name: 'category',
    icon: 'icon-zhuanlan-',
    component: Layouts,
    hidden: false,
    meta: {
      title: '分类管理',
      permissions: [],
    },
    children: [
      {
        path: 'columnManage',
        name: 'columnManage',
        meta: {
          title: '专栏管理',
          permissions: [],
        },
        component: () => import('@/views/columnManage'),
      },
      {
        path: 'columnManage/child',
        name: 'childColumn',
        type: 'item',
        hidden: true,
        meta: {
          noCache: true,
          activeMenu: 'columnManage',
          permissions: [],
        },
        component: () =>
          import(
            '@/views/businessComponent/columnManage/childrenColumnList.vue'
          ),
      },
    ],
  },
  {
    path: '/staffManage',
    component: Layouts,
    redirect: '/staffManage/index',
    hidden: false,
    meta: {
      permission: [],
    },
    children: [
      {
        path: 'index',
        name: 'staffManage',
        icon: 'icon-renyuan',
        meta: {
          title: '人员管理',
          permission: [],
        },
        component: () => import('@/views/staffManage'),
      },
    ],
  },
  {
    path: '/companyManage',
    component: Layouts,
    redirect: '/companyManage/index',
    hidden: false,
    meta: {
      permission: [],
    },
    children: [
      {
        path: 'index',
        name: 'companyManage',
        icon: 'icon-gongsiguanli',
        meta: {
          title: '公司管理',
          permission: [],
        },
        component: () => import('@/views/companyManage'),
      },
    ],
  },
  {
    path: '/',
    name: 'settings',
    component: Layouts,
    hidden: false,
    icon: 'icon-cz-wztj',
    alwaysShow: true,
    meta: {
      title: '系统配置',
      permissions: [],
    },
    children: [
      {
        path: 'constant',
        name: 'constant',
        meta: {
          title: '字典管理',
          permissions: [],
        },
        component: () => import('@/views/settings/constant/parentConstant.vue'),
      },
      {
        path: 'constant/child',
        name: 'childConstant',
        type: 'item',
        hidden: true,
        meta: {
          noCache: true,
          activeMenu: 'constant',
          permissions: [],
        },
        component: () =>
          import(
            '@/views/businessComponent/settings/constant/childConstantList.vue'
          ),
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
