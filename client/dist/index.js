"use strict";

var _react = _interopRequireDefault(require("react"));
var _client = _interopRequireDefault(require("react-dom/client"));
var _App = _interopRequireDefault(require("./App"));
require("./styles/index.css");
var _AuthContext = _interopRequireDefault(require("./context/AuthContext"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const root = _client.default.createRoot(document.getElementById('root'));
root.render( /*#__PURE__*/_react.default.createElement(_AuthContext.default, null, /*#__PURE__*/_react.default.createElement(_App.default, null)));