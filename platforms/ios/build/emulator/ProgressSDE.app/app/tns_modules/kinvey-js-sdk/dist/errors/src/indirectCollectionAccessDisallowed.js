'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IndirectCollectionAccessDisallowedError = function (_BaseError) {
  _inherits(IndirectCollectionAccessDisallowedError, _BaseError);

  function IndirectCollectionAccessDisallowedError() {
    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Please use the appropriate API to access this' + ' collection for this app backend.';
    var debug = arguments[1];
    var code = arguments[2];
    var kinveyRequestId = arguments[3];

    _classCallCheck(this, IndirectCollectionAccessDisallowedError);

    return _possibleConstructorReturn(this, (IndirectCollectionAccessDisallowedError.__proto__ || Object.getPrototypeOf(IndirectCollectionAccessDisallowedError)).call(this, 'IndirectCollectionAccessDisallowedError', message, debug, code, kinveyRequestId));
  }

  return IndirectCollectionAccessDisallowedError;
}(_base2.default);

exports.default = IndirectCollectionAccessDisallowedError;