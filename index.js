'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configure = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _configure = require('./configure');

Object.defineProperty(exports, 'configure', {
  enumerable: true,
  get: function get() {
    return _configure.set;
  }
});

var _propsParser = require('./propsParser');

var _propsParser2 = _interopRequireDefault(_propsParser);

var _tests = require('./tests');

var _tests2 = _interopRequireDefault(_tests);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jestAutoSnapshots = function jestAutoSnapshots(Component) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var config = _extends({}, (0, _configure.get)(), options);
  (0, _tests2.default)(Component, (0, _propsParser2.default)(Component.name, config));
};

exports.default = jestAutoSnapshots;
