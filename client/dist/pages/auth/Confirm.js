"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Divider = _interopRequireDefault(require("../../components/form/Divider.jsx"));
var _axios = _interopRequireDefault(require("axios"));
var _AuthContext = require("../../context/AuthContext.jsx");
var _reactRouterDom = require("react-router-dom");
var _reactToastify = require("react-toastify");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function Confirm() {
  const {
    user,
    setUser
  } = (0, _AuthContext.useAuthContext)();
  const [searchParams, setSearchParams] = (0, _reactRouterDom.useSearchParams)();
  const toast = (type, message) => {
    if (type) {
      _reactToastify.toast[type](message, {});
    } else {
      (0, _reactToastify.toast)(message, {});
    }
  };
  const token = searchParams.get('confirmationToken') || '';
  (0, _react.useEffect)(() => {
    if (!token) return;
    _axios.default.post("/api/v1/auth/confirm/".concat(token)).then(res => {
      toast('success', 'Email confirmed.');
      setUser(res.data.user);
    }).catch(err => {
      console.error(err.response.data.error);
      console.log(err);
      if (err.response.data.toastType === 'warning') {
        toast('warning', err.response.data.error);
      } else {
        toast('error', err.response.data.error);
      }
    });
  }, [token, setUser]);
  const resendConfirmationEmail = () => {
    _axios.default.post('/api/v1/emails/confirm', {
      userId: user._id
    });
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "flex flex-col"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "bg-[#17181A] border-[#21232A] text-white px-6 py-10 shadow-xl rounded-lg max-w-md text-center"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "flex flex-col gap-4"
  }, /*#__PURE__*/_react.default.createElement("h1", {
    className: "text-2xl font-semibold"
  }, "Confirm Your Email Address"), /*#__PURE__*/_react.default.createElement("p", {
    className: "text-white font-light opacity-80"
  }, "We've sent a confirmation email to your email address. Please click the link in the email to confirm your email address.")), /*#__PURE__*/_react.default.createElement("div", {
    className: "my-5"
  }, /*#__PURE__*/_react.default.createElement(_Divider.default, null)), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("button", {
    onClick: () => {
      resendConfirmationEmail();
    },
    className: "underline text-[#575BC7] transition-color duration-300 hover:text-[#676bcf] "
  }, "Resend confirmation email"))));
}
var _default = exports.default = Confirm;