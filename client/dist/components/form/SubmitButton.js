"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function OAuthButton(_ref) {
  let {
    text
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("input", {
    type: "submit",
    className: "cursor-pointer bg-[#1E2025] text-[#FEFEFF] py-3 flex justify-center items-center font-light text-base rounded-md transition-opacity duration-300 hover:opacity-80",
    value: text
  });
}
var _default = exports.default = OAuthButton;