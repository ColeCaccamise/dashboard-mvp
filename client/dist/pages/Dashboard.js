"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _AuthContext = require("../context/AuthContext");
var _Logout = _interopRequireDefault(require("./auth/Logout"));
var _ApplicationShell = _interopRequireDefault(require("../components/ApplicationShell"));
var _axios = _interopRequireDefault(require("axios"));
var _reactToastify = require("react-toastify");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function Dashboard() {
  const {
    user,
    setUser
  } = (0, _AuthContext.useAuthContext)();
  const toast = (type, message) => {
    if (type) {
      _reactToastify.toast[type](message, {});
    } else {
      (0, _reactToastify.toast)(message, {});
    }
  };
  return /*#__PURE__*/_react.default.createElement(_ApplicationShell.default, null, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h1", {
    className: "text-white text-lg font-bold"
  }, "Welcome back, ", user.name), /*#__PURE__*/_react.default.createElement(_Logout.default, null), /*#__PURE__*/_react.default.createElement("button", {
    className: "text-white",
    onClick: async () => {
      console.log('starting up...');
      try {
        await _axios.default.post('/api/v1/emails/confirm').then(res => {
          toast('success', 'Email sent');
          console.log('email sent', res.data);
        }).catch(error => {
          toast('error', error.response.data.error);
          console.error('error sending email', error);
        });
      } catch (error) {
        console.error(error);
      }
    }
  }, "Send email")));
}
var _default = exports.default = Dashboard;