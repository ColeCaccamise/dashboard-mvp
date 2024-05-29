"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
var _Input = _interopRequireDefault(require("../../components/form/Input.jsx"));
var _SubmitButton = _interopRequireDefault(require("../../components/form/SubmitButton.jsx"));
var _OAuthButton = _interopRequireDefault(require("../../components/form/OAuthButton.jsx"));
var _Divider = _interopRequireDefault(require("../../components/form/Divider.jsx"));
var _axios = _interopRequireDefault(require("axios"));
var _reactToastify = require("react-toastify");
var _mongoose = require("mongoose");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function Register() {
  const [nameError, setNameError] = (0, _react.useState)(false);
  const [emailError, setEmailError] = (0, _react.useState)(false);
  const [passwordError, setPasswordError] = (0, _react.useState)(false);
  const [name, setName] = (0, _react.useState)('');
  const [email, setEmail] = (0, _react.useState)('');
  const [password, setPassword] = (0, _react.useState)('');
  const navigate = (0, _reactRouterDom.useNavigate)();
  const toast = (type, message) => {
    if (type) {
      _reactToastify.toast[type](message, {});
    } else {
      (0, _reactToastify.toast)(message, {});
    }
  };
  const resetErrors = () => {
    setEmailError(false);
    setPasswordError(false);
    setNameError(false);
  };
  const submitForm = async e => {
    e.preventDefault();
    const registeredUser = await _axios.default.post('/api/v1/auth/register', {
      name,
      email,
      password
    }).then(res => {
      toast('success', 'Account created successfully!');
      navigate('/dashboard');
    }).catch(err => {
      resetErrors();
      toast('error', err.response.data.error);
      if (err.response.data.missingFields) {
        err.response.data.missingFields.forEach(field => {
          if (field === 'email') {
            setEmailError(true);
          } else if (field === 'password') {
            setPasswordError(true);
          } else if (field === 'name') {
            setNameError(true);
          }
        });
      }
      return err.response.data;
    });
    console.log('response: ', registeredUser);
  };
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "bg-[#17181A] border-[#21232A] text-white px-6 py-10 shadow-xl rounded-lg max-w-md text-center"
  }, /*#__PURE__*/_react.default.createElement("form", {
    className: "flex flex-col gap-8",
    onSubmit: e => submitForm(e)
  }, /*#__PURE__*/_react.default.createElement("h1", {
    className: "text-2xl font-semibold"
  }, "Create your Dashboard MVP account"), /*#__PURE__*/_react.default.createElement("div", {
    className: "flex flex-col gap-4"
  }, /*#__PURE__*/_react.default.createElement(_Input.default, {
    type: "text",
    placeholder: "Name",
    error: nameError,
    onChange: e => {
      setName(e.target.value);
      setNameError(false);
    },
    value: name,
    autoFocus: true
  }), /*#__PURE__*/_react.default.createElement(_Input.default, {
    type: "email",
    placeholder: "Email",
    error: emailError,
    onChange: e => {
      setEmail(e.target.value);
      setEmailError(false);
    },
    value: email
  }), /*#__PURE__*/_react.default.createElement(_Input.default, {
    type: "password",
    placeholder: "Password",
    error: passwordError,
    onChange: e => {
      setPassword(e.target.value);
      setPasswordError(false);
    },
    value: password
  })), /*#__PURE__*/_react.default.createElement(_SubmitButton.default, {
    text: "Register"
  }), /*#__PURE__*/_react.default.createElement("div", null, "Already have an account?", ' ', /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: "/login",
    className: "underline text-[#575BC7] transition-color duration-300 hover:text-[#676bcf] "
  }, "Log in")), /*#__PURE__*/_react.default.createElement(_Divider.default, null), /*#__PURE__*/_react.default.createElement(_OAuthButton.default, null)));
}
var _default = exports.default = Register;