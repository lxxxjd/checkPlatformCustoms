
export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './User/Login' },
      { path: '/user/register', name: 'register', component: './User/Register' },
      {
        path: '/user/register-result',
        name: 'register.result',
        component: './User/RegisterResult',
      },
      {
        component: '404',
      },
    ],
  },

  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      { path: '/', redirect: '/Main/MainQuery',authority: ['admin', 'user']},
      {
        path: '/Main',
        icon: 'profile',
        name: 'Main',
        routes: [
          {
            path: '/Main/MainQuery',
            name: 'MainQuery',
            component: './Main/MainQuery',
          },
          {
            path: '/Main/DetailForEnturstment',
            name: 'DetailForEnturstment',
            component: './Main/DetailForEnturstment',
            hideInMenu:'true'
          },
          {
            path: '/Main/UserInfo',
            name: 'UserInfo',
            component: './Main/UserInfo',
            hideInMenu:'true'
          },
          {
            path: '/Main/UserManage',
            name: 'UserManage',
            component: './Main/UserManage',
            hideInMenu:'true'
          },

          {
            path: '/Main/ManDetail',
            name: 'ManDetail',
            component: './Main/ManDetail',
            hideInMenu:'true'
          },

          {
            path: '/Main/PreCustomsReceive',
            name: 'PreCustomsReceive',
            component: './Main/PreCustomsReceive',
          },
          {
            path: '/Main/CompanyUserManage',
            name: 'CompanyUserManage',
            component: './Main/CompanyUserManage',
            hideInMenu:'true'
          },
          {
            path: '/Main/Intrusment',
            name: 'Intrusment',
            component: './Main/Intrusment',
            hideInMenu:'true'
          },
          {
            path: '/Main/CompanyInfo',
            name: 'CompanyInfo',
            component: './Main/CompanyInfo',
            hideInMenu:'true'
          },


        ],
      },
      {
        component: '404',
      },
    ],
  },
];
