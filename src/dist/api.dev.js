"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.forgotPassword = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var API = _axios["default"].create({
  baseURL: 'https://chatbotgemini-6kem.onrender.com/api' // Replace with your deployed backend URL

}); // Request interceptor to add Authorization header with token


API.interceptors.request.use(function (req) {
  var token = localStorage.getItem('token');
  if (token) req.headers.Authorization = "Bearer ".concat(token);
  return req;
}); // Forgot Password API Call

var forgotPassword = function forgotPassword(email) {
  var response;
  return regeneratorRuntime.async(function forgotPassword$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(API.post('/auth/forgot-password', {
            email: email
          }));

        case 3:
          response = _context.sent;
          return _context.abrupt("return", response.data);

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          throw _context.t0;

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.forgotPassword = forgotPassword;
var _default = API;
exports["default"] = _default;
//# sourceMappingURL=api.dev.js.map
