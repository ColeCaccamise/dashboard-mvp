"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _axios = _interopRequireDefault(require("axios"));
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
var _Register = _interopRequireDefault(require("./pages/auth/Register"));
var _Login = _interopRequireDefault(require("./pages/auth/Login"));
var _Dashboard = _interopRequireDefault(require("./pages/Dashboard"));
var _Support = _interopRequireDefault(require("./pages/Support"));
var _Profile = _interopRequireDefault(require("./pages/settings/account/Profile.jsx"));
var _AuthContext = require("./context/AuthContext");
var _reactToastify = require("react-toastify");
require("react-toastify/dist/ReactToastify.css");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// const contextClass = {
// 	success: 'bg-blue-600',
// 	error: 'bg-red-600',
// 	info: 'bg-gray-600',
// 	warning: 'bg-orange-400',
// 	default: 'bg-indigo-600',
// 	dark: 'bg-white-600 font-gray-300',
// };

function App() {
  const {
    user,
    setUser
  } = (0, _AuthContext.useAuthContext)();
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactToastify.ToastContainer, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: true,
    newestOnTop: true,
    closeOnClick: true,
    rtl: false,
    pauseOnFocusLoss: false,
    draggable: true,
    pauseOnHover: true,
    theme: "dark",
    transition: _reactToastify.Slide
  }), /*#__PURE__*/_react.default.createElement(_react.default.StrictMode, null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.BrowserRouter, null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Routes, null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: "/register",
    element: !user ? /*#__PURE__*/_react.default.createElement(_Register.default, null) : /*#__PURE__*/_react.default.createElement(_reactRouterDom.Navigate, {
      to: "/dashboard"
    })
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: "/login",
    element: !user ? /*#__PURE__*/_react.default.createElement(_Login.default, null) : /*#__PURE__*/_react.default.createElement(_reactRouterDom.Navigate, {
      to: "/dashboard"
    })
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: "/",
    element: user ? /*#__PURE__*/_react.default.createElement(_reactRouterDom.Navigate, {
      to: "/dashboard"
    }) : /*#__PURE__*/_react.default.createElement(_reactRouterDom.Navigate, {
      to: "/register"
    })
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: "/dashboard",
    element: user ? /*#__PURE__*/_react.default.createElement(_Dashboard.default, null) : /*#__PURE__*/_react.default.createElement(_reactRouterDom.Navigate, {
      to: "/login"
    })
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: "/support",
    element: user ? /*#__PURE__*/_react.default.createElement(_Support.default, null) : /*#__PURE__*/_react.default.createElement(_reactRouterDom.Navigate, {
      to: "/login"
    })
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: "/settings/account/profile",
    element: user ? /*#__PURE__*/_react.default.createElement(_Profile.default, null) : /*#__PURE__*/_react.default.createElement(_reactRouterDom.Navigate, {
      to: "/login"
    })
  }), "console.log('user: ', user);", /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: "*",
    element: /*#__PURE__*/_react.default.createElement(_reactRouterDom.Navigate, {
      to: "/login"
    })
  })))));
}
var _default = exports.default = App;