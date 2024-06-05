"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _AuthContext = require("../../../context/AuthContext");
var _ApplicationShell = _interopRequireDefault(require("../../../components/ApplicationShell"));
var _axios = _interopRequireDefault(require("axios"));
var _reactToastify = require("react-toastify");
var _Input = _interopRequireDefault(require("../../../components/form/Input"));
var _SubmitButton = _interopRequireDefault(require("../../../components/form/SubmitButton"));
var _mongoose = require("mongoose");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function Profile() {
  const {
    user,
    setUser
  } = (0, _AuthContext.useAuthContext)();
  const [email, setEmail] = (0, _react.useState)('');
  const [fullName, setFullName] = (0, _react.useState)('');
  // const [image, setImage] = useState('');

  const [isSubmitting, setIsSubmitting] = (0, _react.useState)(false);
  const [lastSubmit, setLastSubmit] = (0, _react.useState)(null);
  const toast = (type, message) => {
    if (type) {
      _reactToastify.toast[type](message, {});
    } else {
      (0, _reactToastify.toast)(message, {});
    }
  };
  const uploadImage = async image => {
    const formData = new FormData();
    formData.append('image', image);
    _axios.default.post("/api/v1/settings/".concat(user._id, "/account/profile/image"), formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => {
      console.log('Heres the returned uploaded image: ', res.data);
      setUser(res.data.user);
      toast('success', 'Image uploaded successfully.');
    }).catch(err => {
      toast('error', err.response.data.error);
    });
  };
  const saveChanges = async e => {
    e.preventDefault();
    if (isSubmitting) return;
    if (lastSubmit && Date.now() - lastSubmit < 2000) return;
    setIsSubmitting(true);
    setLastSubmit(Date.now());

    // validate missing fields
    if (!email && !fullName) {
      toast('error', 'Email and Full Name cannot be empty.');
      return;
    } else if (!email) {
      toast('error', 'Email cannot be empty.');
      return;
    } else if (!fullName) {
      toast('error', 'Full Name cannot be empty.');
    }
    const group = 'account';
    const page = 'profile';
    const body = {
      profile: {
        email,
        fullName
      }
    };
    await _axios.default.put("/api/v1/settings/".concat(user._id, "/").concat(group, "/").concat(page), body).then(res => {
      toast('success', 'Profile updated successfully.');
      console.log(res.data);
      setIsSubmitting(false);
    }).catch(err => {
      toast('error', err.response.data.error);
      console.log('error: ', err);
      setIsSubmitting(false);
    });
  };
  const getImage = async () => {
    await _axios.default.get("/api/v1/settings/".concat(user._id, "/account/profile/image")).then(res => {
      setUser(res.data.user);
    }).catch(err => {
      console.log('error: ', err);
    });
  };
  (0, _react.useEffect)(() => {
    const group = 'account';
    const page = 'profile';
    const getSettings = async () => {
      await _axios.default.get("/api/v1/settings/".concat(user._id, "/").concat(group, "/").concat(page)).then(res => {
        const profile = res.data.profile;
        setEmail(profile.email);
        setFullName(profile.fullName);
      }).catch(err => {
        console.error('YOO: ', err.response.data);
      });
    };
    getSettings();
    getImage();
  }, []);

  // useEffect(() => {
  // 	getImage();
  // }, [getImage]);

  return /*#__PURE__*/_react.default.createElement(_ApplicationShell.default, {
    mode: "settings"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "flex flex-col gap-2"
  }, /*#__PURE__*/_react.default.createElement("h1", {
    className: "text-white text-2xl font-bold "
  }, "Settings for ", user.name), /*#__PURE__*/_react.default.createElement("p", {
    className: "text-neutral-400 text-sm"
  }, "Manage your Dashboard MVP profile")), /*#__PURE__*/_react.default.createElement("div", {
    className: "w-full flex justify-between items-center"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "text-white"
  }, "Profile Picture"), /*#__PURE__*/_react.default.createElement("div", {
    className: "border-solid border-2 border-neutral-500 p-2 rounded-sm"
  }, /*#__PURE__*/_react.default.createElement("img", {
    alt: "".concat(user.name),
    src: (user === null || user === void 0 ? void 0 : user.profileImage) || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    width: "50",
    height: "50"
  }), /*#__PURE__*/_react.default.createElement(_Input.default, {
    type: "file"
    // ow
    ,
    onChange: e => {
      uploadImage(e.target.files[0]);
    },
    className: "bg-transparent text-white "
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "border-solid border-2 border-neutral-500 p-4 rounded-sm flex flex-col gap-6"
  }, /*#__PURE__*/_react.default.createElement("form", {
    onSubmit: e => saveChanges(e),
    disabled: isSubmitting
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "w-full flex justify-between items-center"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "text-white"
  }, "Email"), /*#__PURE__*/_react.default.createElement("div", {
    className: "border-solid border-2 border-neutral-500 p-2 rounded-sm"
  }, /*#__PURE__*/_react.default.createElement(_Input.default, {
    type: "email",
    value: email,
    onChange: e => {
      setEmail(e.target.value);
    },
    className: "bg-transparent text-white "
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "border-t-2 border-neutral-500 my-4"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "w-full flex justify-between items-center"
  }, /*#__PURE__*/_react.default.createElement("span", {
    class: "text-white"
  }, "Full Name"), /*#__PURE__*/_react.default.createElement("div", {
    className: "border-solid border-2 border-neutral-500 p-2 rounded-sm"
  }, /*#__PURE__*/_react.default.createElement(_Input.default, {
    type: "text",
    value: fullName,
    onChange: e => {
      setFullName(e.target.value);
    },
    className: "bg-transparent text-white"
  }))), /*#__PURE__*/_react.default.createElement("input", {
    type: "submit",
    style: {
      display: 'none'
    },
    disabled: isSubmitting
  }))));
}
var _default = exports.default = Profile;