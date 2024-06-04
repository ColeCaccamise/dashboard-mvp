"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function Input(_ref) {
  let {
    type = 'text',
    placeholder = '',
    error = false,
    onChange,
    autoFocus = false,
    onKeyUp,
    className,
    value
  } = _ref;
  if (type === 'image') {
    return /*#__PURE__*/_react.default.createElement("input", {
      className: className ? className : "w-full p-2 rounded-sm bg-[#09090a] border-2 text-white ".concat(error ? 'border-[#a53636]' : 'border-[#1E2025]', " focus:border-[#2b2d61] focus:outline-none transition duration-150 ease-in-out"),
      onChange: onChange,
      onKeyUp: onKeyUp,
      type: "file",
      accept: "image/jpeg image/png image/gif image/webp",
      placeholder: placeholder,
      autoFocus: autoFocus,
      value: value
    });
  }
  return /*#__PURE__*/_react.default.createElement("input", {
    className: className ? className : "w-full p-2 rounded-sm bg-[#09090a] border-2 text-white ".concat(error ? 'border-[#a53636]' : 'border-[#1E2025]', " focus:border-[#2b2d61] focus:outline-none transition duration-150 ease-in-out"),
    onChange: onChange,
    onKeyUp: onKeyUp,
    type: type,
    placeholder: placeholder,
    autoFocus: autoFocus,
    value: value
  });
}
var _default = exports.default = Input;