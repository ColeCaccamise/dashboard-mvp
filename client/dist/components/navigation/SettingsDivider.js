"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactFontawesome = require("@fortawesome/react-fontawesome");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function SettingsDivider(_ref) {
  let {
    icon,
    text
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "flex gap-2 text-gray-400 mb-2"
  }, /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: icon
  })), /*#__PURE__*/_react.default.createElement("span", null, text));
}
var _default = exports.default = SettingsDivider;