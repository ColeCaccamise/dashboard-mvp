"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _SidebarLink = _interopRequireDefault(require("./SidebarLink"));
var _reactFontawesome = require("@fortawesome/react-fontawesome");
var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");
var _Icon = _interopRequireDefault(require("../Icon"));
var _SettingsDivider = _interopRequireDefault(require("./SettingsDivider"));
var _SettingsLink = _interopRequireDefault(require("./SettingsLink"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function SettingsSidebar() {
  return /*#__PURE__*/_react.default.createElement("aside", {
    className: "w-1/5 p-4 flex flex-col justify-between max-w-xs"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "flex flex-col gap-4"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "flex gap-4 items-center"
  }, /*#__PURE__*/_react.default.createElement(_Icon.default, {
    url: "/dashboard",
    icon: _freeSolidSvgIcons.faChevronLeft
  }), /*#__PURE__*/_react.default.createElement("h2", {
    className: "text-white font-bold"
  }, "Settings")), /*#__PURE__*/_react.default.createElement("nav", null, /*#__PURE__*/_react.default.createElement(_SettingsDivider.default, {
    icon: _freeSolidSvgIcons.faUserCircle,
    text: "My Account"
  }), /*#__PURE__*/_react.default.createElement(_SettingsLink.default, {
    text: "Profile",
    group: "account",
    page: "profile"
  }))), /*#__PURE__*/_react.default.createElement(_SidebarLink.default, {
    link: "/support",
    text: "Help & Support",
    icon: _freeSolidSvgIcons.faLifeRing
  }));
}
var _default = exports.default = SettingsSidebar;