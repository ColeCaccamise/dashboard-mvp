"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRouterDom = require("react-router-dom");
var _reactFontawesome = require("@fortawesome/react-fontawesome");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function SidebarLink(_ref) {
  let {
    link,
    text,
    active = false,
    icon
  } = _ref;
  return /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: link
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "group flex gap-4 p-2 rounded-md hover:bg-neutral-800 transition duration-150"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "text-gray-500 group-hover:text-white transition duration-150"
  }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: icon
  })), /*#__PURE__*/_react.default.createElement("span", {
    className: "text-white"
  }, text)));
}
var _default = exports.default = SidebarLink;