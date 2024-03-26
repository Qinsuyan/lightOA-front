export default [
  {
    path: '/user',
    layout: false,
    routes: [{ name: '登录', path: '/user/login', component: './User/Login' }],
  },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  { path: '/doc', name: '文档', icon: 'file', component: './Doc' },
  {
    path: '/bug',
    name: 'Bug追踪',
    icon: 'bug',
    routes: [
      { path: '/bug', redirect: '/bug/list' },
      { path: '/bug/list', name: 'Bug列表', component: './Bug/List' },
      { path: '/bug/product', name: '产品管理', component: './Bug/Product' },
    ],
  },
  { path: '/reimburse', name: '报销记录', icon: 'payCircle', component: './Reimburse' },
  // {
  //   path: '/admin',
  //   name: '管理页',
  //   icon: 'crown',
  //   access: 'canAdmin',
  //   routes: [
  //     { path: '/admin', redirect: '/admin/sub-page' },
  //     { path: '/admin/sub-page', name: '二级管理页', component: './Admin' },
  //   ],
  // },
  // { name: '查询表格', icon: 'table', path: '/list', component: './TableList' },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
