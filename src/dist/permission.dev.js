"use strict";

var _router = _interopRequireDefault(require("./router"));

var _store = _interopRequireDefault(require("./store"));

var _nprogress = _interopRequireDefault(require("nprogress"));

require("nprogress/nprogress.css");

var _elementUi = require("element-ui");

var _auth = require("@/utils/auth");

var _user = require("@/api/user");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var whiteList = ['/login'];

_router["default"].beforeEach(function (to, from, next) {
  var hasToken = (0, _auth.getToken)('token');

  _nprogress["default"].start();

  if (hasToken) {
    //如果用户存在令牌的情况请求登录页面，就让用户直接跳转到首页，避免存在重复登录的情况
    if (to.path === '/login') {
      // 直接跳转到首页，当然取决于你的路由重定向到哪里
      next({
        path: '/'
      });

      _nprogress["default"].done();
    } else {
      //如果已经有令牌的用户请求的不是登录页，是其他页面
      //就从Vuex里拿到用户的信息，这里也证明用户不是第一次登录了
      var hasGetUserInfo = _store["default"].getters.name;

      if (hasGetUserInfo) {
        //信息拿到后，用户请求哪就跳转哪
        next();
      } else {
        try {
          (0, _user.getUserInfo)({
            token: hasToken
          }).then(function (res) {
            var userList = res.userList;

            _store["default"].commit('SET_NAME', userList.name);

            _store["default"].commit('SET_ROLES', userList.roles);
          })["catch"](function (err) {
            console.log(err);
          }); // 如果有令牌，但是没有用户信息，证明用户是第一次登录，通过Vuex设置用户信息
          // await store.dispatch('user/getInfo')
          //设置好了之后，依然可以请求哪就跳转哪

          next();
        } catch (error) {
          // 如果出错了，把令牌去掉，并让用户重新去到登录页面
          // await store.dispatch('user/resetToken')
          _elementUi.Message.error(error || 'Has Error');

          next("/login?redirect=".concat(to.path));
        }
      }
    }
  } else {
    //这里是没有令牌的情况
    //还记得上面的白名单吗，现在起作用了
    //whiteList.indexOf(to.path) !== -1)判断用户请求的路由是否在白名单里
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next('/login');
      Nprogress.done();
    }
  }
});

_router["default"].afterEach(function () {
  _nprogress["default"].done(); // 结束Progress

});