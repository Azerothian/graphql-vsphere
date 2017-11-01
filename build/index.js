"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _soap = require("soap");

var _soap2 = _interopRequireDefault(_soap);

var _logger = require("./logger");

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const log = (0, _logger2.default)("graphql-vsphere:");

exports.default = (() => {
  var _ref = _asyncToGenerator(function* (options) {
    const { username, password, host, proto = "https", disableSSLValidation } = options;
    if (disableSSLValidation) {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    }
    const client = yield _soap2.default.createClientAsync(`${proto}://${host}/sdk/vimService.wsdl`, {});
    // console.log("client", Object.keys(client).filter((k) => k.startsWith("List")));

    const clientKeys = Object.keys(client).sort().filter(function (k) {
      return k.toLowerCase().indexOf("content".toLowerCase()) > -1 &&
      // k.toLowerCase().indexOf("query".toLowerCase()) > -1 &&
      k.toLowerCase().indexOf("async") > -1;
    });
    clientKeys.forEach(function (k) {
      log.info(k);
    });
    return true;
  });

  function createSchema(_x) {
    return _ref.apply(this, arguments);
  }

  return createSchema;
})();
//# sourceMappingURL=index.js.map
