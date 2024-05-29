"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _ApplicationShell = _interopRequireDefault(require("../components/ApplicationShell"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function Support() {
  return /*#__PURE__*/_react.default.createElement(_ApplicationShell.default, null, /*#__PURE__*/_react.default.createElement("h1", {
    className: "text-white text-lg font-bold"
  }, "Support Center"));
}
var _default = exports.default = Support;