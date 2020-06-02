"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.asyncRouterMap = exports.constantRouterMap = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _index = require("../layout/index");

var _topRouter = require("./topRouter.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_vue["default"].use(_vueRouter["default"]);

var Login = function Login() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('@/views/Login.vue'));
  });
};

var Index = function Index() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('@/views/index/index.vue'));
  });
};

var UserList = function UserList() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('@/views/userList/userList.vue'));
  });
};

var Computed = function Computed() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('@/views/computed/computedList.vue'));
  });
}; // const { Layout } = () => import('@/layout/index.js')


var Error404 = function Error404() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('@/views/errorPage/404.vue'));
  });
};

var userList = function userList() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('@/views/userList/userList.vue'));
  });
};

var Bmap = function Bmap() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('@/views/map/bmap.vue'));
  });
};

var Amap = function Amap() {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('@/views/map/amap.vue'));
  });
}; // const Infomation = () => import('@/views/infoManage/information')
// const EditInfo = () => import('@/views/infoManage/editInfo')


function filterTopRouterMap(name) {
  var router = _topRouter.topRouterMap.filter(function (item) {
    return item.parentName === name;
  });

  return router[0].data;
}

var constantRouterMap = [{
  path: '/',
  component: _index.Layout,
  redirect: '/index/index'
}, {
  path: '/index',
  name: 'index',
  meta: {
    title: '首页'
  },
  noDropdown: true,
  component: _index.Layout,
  children: [{
    path: 'index',
    component: Index
  }]
}, {
  path: '/map',
  name: 'map',
  meta: {
    title: '地图控件'
  },
  component: _index.Layout,
  children: [{
    path: 'bmap',
    meta: {
      title: '百度地图'
    },
    component: Bmap,
    name: 'bmap'
  }, {
    path: 'amap',
    meta: {
      title: '高德地图'
    },
    component: Amap,
    name: 'amap'
  }]
}, {
  path: '/login',
  name: 'Login',
  component: Login
}, {
  path: '/404',
  meta: {
    title: '404页面'
  },
  name: 'error404',
  component: _index.Layout,
  noDropdown: true,
  children: [{
    path: '404',
    meta: {
      title: '404错误'
    },
    component: Error404,
    name: 'error'
  }]
}, {
  path: '/userManager',
  component: _index.Layout,
  meta: {
    title: '用户管理'
  },
  name: 'userManager',
  children: [{
    path: 'userList',
    meta: {
      title: '用户列表'
    },
    component: UserList,
    name: 'userList'
  }]
}, {
  path: '/computed',
  component: _index.Layout,
  meta: {
    title: '数据统计'
  },
  name: 'computed',
  children: [{
    path: 'computedList',
    meta: {
      title: '统计图'
    },
    component: Computed,
    name: 'computedList'
  }]
}, {
  path: '/infoManage',
  component: _index.Layout,
  meta: {
    title: '信息管理'
  },
  name: 'infoManage',
  children: [{
    path: 'infoShow',
    meta: {
      title: '个人信息',
      titleList: [{
        path: 'infoShow1',
        title: '个人信息1'
      }, {
        path: 'infoShow2',
        title: '个人信息2'
      }, {
        path: 'infoShow3',
        title: '个人信息3'
      }, {
        path: 'infoShow4',
        title: '个人信息4'
      }]
    },
    component: _index.content,
    name: 'infoShow',
    children: filterTopRouterMap('infoShow')
  }, {
    path: 'infoModify',
    meta: {
      title: '修改信息',
      titleList: [{
        path: 'infoModify1',
        title: '修改信息子菜单1'
      }, {
        path: 'infoModify2',
        title: '修改信息子菜单2'
      }, {
        path: 'infoModify3',
        title: '修改信息子菜单3'
      }]
    },
    component: _index.content,
    name: 'infoModify',
    children: filterTopRouterMap('infoModify')
  }]
}];
exports.constantRouterMap = constantRouterMap;
var router = new _vueRouter["default"]({
  routes: constantRouterMap
});
var asyncRouterMap = [{
  path: '/userManager',
  name: 'userManage',
  component: userList,
  roles: ['admin'],
  meta: {
    title: '用户管理',
    icon: 'iconuser'
  }
}];
exports.asyncRouterMap = asyncRouterMap;
var _default = router;
exports["default"] = _default;