"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRouterDom = require("react-router-dom");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function SettingsLink(_ref) {
  let {
    text,
    group,
    page
  } = _ref;
  const active = window.location.pathname === "/settings/".concat(group, "/").concat(page) ? 'bg-neutral-800 hover:bg-neutral-800' : '';
  return /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: "/settings/".concat(group, "/").concat(page)
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "p-1 rounded-sm hover:bg-neutral-900 ".concat(active)
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "text-white"
  }, text)));
}
var _default = exports.default = SettingsLink;