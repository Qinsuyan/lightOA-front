export default [
  {
    path: '/login',
    layout: false,
    component: './User/Login',
  },
  { path: '/welcome', name: '欢迎', icon: 'smile', component: './Welcome' },
  { path: '/doc', name: '文档', icon: 'file', component: './InConstruction' },
  {
    path: '/bug',
    name: 'Bug追踪',
    icon: 'bug',
    component: './InConstruction',
    // routes: [
    //   { path: '/bug', redirect: '/bug/list' },
    //   { path: '/bug/list', name: 'Bug列表', component: './Bug/List' },
    //   { path: '/bug/product', name: '产品管理', component: './Bug/Product' },
    // ],
  },
  { path: '/reimburse', name: '报销记录', icon: 'payCircle', component: './Reimburse' },
  // {
  //   path: '/admin',
  //   name: '系统管理',
  //   icon: 'setting',
  //   access: 'canAdmin',
  //   routes: [
  //     { path: '/admin', redirect: '/admin/sub-page' },
  //     { path: '/admin/sub-page', name: '二级管理页', component: './Admin' },
  //   ],
  // },
  {
    path: '/roles',
    name: '角色管理',
    icon: 'team',
    component: './User/Roles',
  },
  {
    path: '/departments',
    name: '部门管理',
    icon: 'apartment',
    component: './Department',
  },
  {
    path: '/users',
    name: '用户管理',
    icon: 'idcard',
    component: './User/Users',
  },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
