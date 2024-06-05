"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactFontawesome = require("@fortawesome/react-fontawesome");
var _freeBrandsSvgIcons = require("@fortawesome/free-brands-svg-icons");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function OAuthButton(_ref) {
  let {
    mode = 'register'
  } = _ref;
  const modeText = mode === 'register' ? 'Register' : 'Login';
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "cursor-wait bg-[#575BC7] text-[#FEFEFF] py-4 flex justify-center items-center font-light text-base rounded-md transition-opacity duration-300 hover:opacity-80"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "flex gap-4"
  }, /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeBrandsSvgIcons.faGoogle
  })), /*#__PURE__*/_react.default.createElement("span", null, modeText, " with Google (coming soon)")));
}
var _default = exports.default = OAuthButton;