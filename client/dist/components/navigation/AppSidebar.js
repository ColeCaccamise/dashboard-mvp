"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _SidebarLink = _interopRequireDefault(require("./SidebarLink"));
var _reactFontawesome = require("@fortawesome/react-fontawesome");
var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");
var _AuthContext = require("../../context/AuthContext");
var _reactRouterDom = require("react-router-dom");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function AppSidebar() {
  const {
    user,
    setUser
  } = (0, _AuthContext.useAuthContext)();
  return /*#__PURE__*/_react.default.createElement("aside", {
    className: "w-1/5 p-4 flex flex-col justify-between"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "flex flex-col gap-4"
  }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h2", {
    className: "text-white font-bold"
  }, "Dashboard MVP")), /*#__PURE__*/_react.default.createElement("div", {
    className: "flex justify-between"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "flex items-center gap-4"
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: (user === null || user === void 0 ? void 0 : user.profileImage) || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    alt: "".concat(user.name),
    className: "w-10 h-10 rounded-full object-cover"
  }), /*#__PURE__*/_react.default.createElement("p", {
    className: "text-white font-light"
  }, user.name)), /*#__PURE__*/_react.default.createElement("div", {
    className: "flex items-center text-gray-500 cursor-pointer transition duration-150 hover:text-white"
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: "/settings/account/profile"
  }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeSolidSvgIcons.faGear
  })))), /*#__PURE__*/_react.default.createElement("nav", null, /*#__PURE__*/_react.default.createElement(_SidebarLink.default, {
    link: "/dashboard",
    text: "Dashboard",
    icon: _freeSolidSvgIcons.faChartBar
  }))), /*#__PURE__*/_react.default.createElement(_SidebarLink.default, {
    link: "/support",
    text: "Help & Support",
    icon: _freeSolidSvgIcons.faLifeRing
  }));
}
var _default = exports.default = AppSidebar;