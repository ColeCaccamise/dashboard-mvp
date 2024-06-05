"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
var _axios = _interopRequireDefault(require("axios"));
var _AuthContext = require("../../context/AuthContext");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function Logout() {
  const {
    user,
    setUser
  } = (0, _AuthContext.useAuthContext)();
  const navigate = (0, _reactRouterDom.useNavigate)();
  const handleLogout = async () => {
    console.log('hellooo');
    await _axios.default.post('/api/v1/auth/logout').then(() => {
      // set user in context
      setUser(null);
      // redirect to login
      navigate('/login');
    }).catch(err => {
      console.error('Error logging out: ', err.response.data);
      return err.response.data;
    });
  };
  return /*#__PURE__*/_react.default.createElement("button", {
    onClick: () => handleLogout(),
    className: "text-white"
  }, "Logout");
}
var _default = exports.default = Logout;