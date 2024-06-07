"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.useAuthContext = useAuthContext;
var _react = _interopRequireWildcard(require("react"));
var _axios = _interopRequireDefault(require("axios"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const AuthContext = /*#__PURE__*/(0, _react.createContext)(null);
async function checkUser() {
  const userData = await _axios.default.get('/api/v1/auth/verify', {
    withCredentials: true
  }).then(res => {
    return res.data;
  }).catch(err => {
    console.error('Error verifying user: ', err.response.data);
    return null;
  });
  return userData;
}
function AuthContextProvider(_ref) {
  let {
    children
  } = _ref;
  const [user, setUser] = (0, _react.useState)(null);
  (0, _react.useEffect)(() => {
    checkUser().then(data => {
      setUser(data === null || data === void 0 ? void 0 : data.user);
    }).catch(err => {
      console.error('Error verifying user: ', err);
    });
  }, []);
  return /*#__PURE__*/_react.default.createElement(AuthContext.Provider, {
    value: {
      user,
      setUser
    }
  }, children);
}
function useAuthContext() {
  const context = (0, _react.useContext)(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthContextProvider');
  }
  return context;
}
var _default = exports.default = AuthContextProvider;