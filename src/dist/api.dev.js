"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var API = _axios["default"].create({
  baseURL: 'https://chatbotgemini-6kem.onrender.com/api' // Replace with your deployed backend URL

});

API.interceptors.request.use(function (req) {
  var token = localStorage.getItem('token');
  if (token) req.headers.Authorization = "Bearer ".concat(token);
  return req;
});
var _default = API;
exports["default"] = _default;
//# sourceMappingURL=api.dev.js.map
