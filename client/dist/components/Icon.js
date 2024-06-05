"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRouterDom = require("react-router-dom");
var _reactFontawesome = require("@fortawesome/react-fontawesome");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function Icon(_ref) {
  let {
    url,
    icon
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "flex items-center text-gray-500 cursor-pointer transition duration-150 hover:text-white"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: url
  }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: icon
  })));
}
var _default = exports.default = Icon;