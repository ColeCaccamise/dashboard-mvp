"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _components = require("@react-email/components");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function Confirm(_ref) {
  let {
    name
  } = _ref;
  return /*#__PURE__*/React.createElement(_components.Html, {
    lang: "en"
  }, /*#__PURE__*/React.createElement(_components.Text, null, "Confirm your email."), /*#__PURE__*/React.createElement("p", null, name ? "Hi, ".concat(name, ".") : 'Hi.'), /*#__PURE__*/React.createElement("p", null, "Please confirm your Dashboard MVP account by clicking the button below. We're excited to have you."), /*#__PURE__*/React.createElement(_components.Hr, null), /*#__PURE__*/React.createElement(_components.Button, {
    href: "http://localhost:3000"
  }, "Click me"));
}
var _default = exports.default = Confirm;