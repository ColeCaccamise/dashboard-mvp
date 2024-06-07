"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _AppSidebar = _interopRequireDefault(require("./navigation/AppSidebar"));
var _SettingsSidebar = _interopRequireDefault(require("./navigation/SettingsSidebar"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ApplicationShell(_ref) {
  let {
    mode,
    children
  } = _ref;
  switch (mode) {
    case 'settings':
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "flex justify-between w-full h-full "
      }, /*#__PURE__*/_react.default.createElement(_SettingsSidebar.default, null), /*#__PURE__*/_react.default.createElement("main", {
        className: "flex flex-col items-center flex-grow h-full bg-neutral-900"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "w-full text-left p-16"
      }, children)));
    default:
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "flex justify-between w-full h-full "
      }, /*#__PURE__*/_react.default.createElement(_AppSidebar.default, null), /*#__PURE__*/_react.default.createElement("main", {
        className: "flex flex-col items-center flex-grow h-full bg-neutral-900"
      }, children));
  }
}
var _default = exports.default = ApplicationShell;