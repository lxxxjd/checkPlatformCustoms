
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
      { path: '/', redirect: '/Main/MainQuery'},
      {
        path: '/Main',
        icon: 'profile',
        name: 'Main',
        routes: [
          {
            path: '/Main/MainQuery',
            name: 'MainQuery',
            component: './Main/MainQuery',
            authority: ["审查员","管理员"],
          },

          {
            path: '/Main/Supervision',
            name: 'Supervision',
            component: './Main/Supervision',
            authority: ["管理员"],
          },

          {
            path: '/Main/CustomsReceive',
            name: 'CustomsReceive',
            component: './Main/CustomsReceive',
            authority: ["审查员"],
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
            authority: ["管理员"],
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

          {
            path: '/Main/CustomsUser',
            name: 'CustomsUser',
            component: './Main/CustomsUser',
            authority: ["管理员"],
          },



        ],
      },

      {
        path: '/Personal',
        icon: 'profile',
        name: 'Personal',
        routes: [
          {
            path: '/Personal/UserInfo',
            name: 'UserInfo',
            component: './Main/UserInfo',
          },

        ],
      },

      {
        component: '404',
      },
    ],
  },
];
