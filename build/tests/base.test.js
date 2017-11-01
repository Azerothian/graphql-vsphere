"use strict";

var _expect = require("expect");

var _expect2 = _interopRequireDefault(_expect);

var _index = require("../index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const dotenv = require("dotenv");

it("env to eq root", _asyncToGenerator(function* () {
  const schema = yield (0, _index2.default)({
    username: process.env.VS_USERNAME,
    password: process.env.VS_PASSWORD,
    host: process.env.VS_HOST,
    disableSSLValidation: true
  });
  (0, _expect2.default)(process.env.VS_USERNAME).toBe("root");
}));
//# sourceMappingURL=base.test.js.map
