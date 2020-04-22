/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/baka_link.js":
/*!**************************!*\
  !*** ./src/baka_link.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BakaLink; });
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _createSuper(Derived) {
  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  return function () {
    var Super = _getPrototypeOf(Derived),
        result;

    if (isNativeReflectConstruct()) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var BakaLink =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(BakaLink, _HTMLElement);

  var _super = _createSuper(BakaLink);

  function BakaLink() {
    _classCallCheck(this, BakaLink);

    return _super.apply(this, arguments);
  }

  _createClass(BakaLink, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this = this;

      var observer = new MutationObserver(function (mutations) {
        if (_this.querySelector('a')) return;

        _this.update();
      });
      observer.observe(this, {
        childList: true
      });
      this.update();
    }
  }, {
    key: "update",
    value: function update() {
      var el = document.createElement('a');
      el.href = this.innerText;
      el.target = '_blank';
      el.innerText = this.innerText;
      this.innerHTML = '';
      this.appendChild(el);
    }
  }]);

  return BakaLink;
}(
/*#__PURE__*/
_wrapNativeSuper(HTMLElement));


customElements.define('baka-link', BakaLink);

/***/ }),

/***/ "./src/document.js":
/*!*************************!*\
  !*** ./src/document.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Document; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var Document =
/*#__PURE__*/
function () {
  function Document() {
    _classCallCheck(this, Document);

    _defineProperty(this, "text", '');

    _defineProperty(this, "history", []);

    _defineProperty(this, "historyOffset", -1);

    _defineProperty(this, "listeners", {});
  }

  _createClass(Document, [{
    key: "undo",
    value: function undo() {
      if (this.historyOffset === this.history.length - 1 || this.history[this.history.length - this.historyOffset - 2].type === 'set text') return;
      this.historyOffset += 1;
      var item = this.history[this.history.length - this.historyOffset - 1];

      switch (item.type) {
        case 'insert':
          this["delete"](item.start, item.value.length, 'back', false);
          break;

        case 'delete':
          this.insert(item.start, item.value, false);
          break;

        case 'replace':
          this.replace(item.start, item.start + item.from.length, item.from, false);
          break;
      }

      this.fireUpdate(item, 'undo');
    }
  }, {
    key: "redo",
    value: function redo() {
      if (this.historyOffset === -1) return;
      var item = this.history[this.history.length - this.historyOffset - 1];
      this.historyOffset -= 1;

      switch (item.type) {
        case 'insert':
          this.insert(item.start, item.value, false);
          break;

        case 'delete':
          this["delete"](item.start, item.n, item.dir, false);
          break;

        case 'replace':
          this.replace(item.start, item.end, item.value);
          break;
      }

      this.fireUpdate(item, 'redo');
    }
  }, {
    key: "beforeDelete",
    value: function beforeDelete(start, n) {}
  }, {
    key: "beforeInsert",
    value: function beforeInsert(start, text) {}
  }, {
    key: "mark",
    value: function mark(styleName, range) {}
  }, {
    key: "getStylesAtOffset",
    value: function getStylesAtOffset(offset) {
      var styles = {};

      for (var _styleName in this.styles) {
        for (var i = 0; i < this.styles[_styleName].ranges.length; i++) {
          var _range = this.styles[_styleName].ranges[i];
          if (!(_range[0] < offset && _range[1] >= offset)) continue;
          styles[_styleName] = _range;
        }
      }

      return styles;
    }
  }, {
    key: "getStylesAtRange",
    value: function getStylesAtRange(start, end) {
      var styles = [];

      for (var _styleName2 in this.styles) {
        for (var i = 0; i < this.styles[_styleName2].ranges.length; i++) {
          var _range2 = this.styles[_styleName2].ranges[i];
          if (!(_range2[0] >= start && _range2[0] < end || // Начало в выделении
          _range2[1] > start && _range2[1] <= end || // Конец в выделении
          _range2[0] <= start && _range2[1] >= end)) continue;
          styles.push(_styleName2);
        }
      }

      return styles;
    }
  }, {
    key: "setText",
    value: function setText(text) {
      var historyItem = {
        type: 'set text',
        text: text
      };
      this.history = [historyItem];
      this.text = text;
      this.fireUpdate(historyItem);
    }
  }, {
    key: "insert",
    value: function insert(start, value) {
      var save = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var update = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      var historyItem = {
        type: 'insert',
        value: value,
        start: start
      };

      if (save) {
        this.history.push(historyItem);
        this.historyOffset = -1;
      }

      this.beforeInsert(start, value);
      var arr = Array.from(this.text);
      arr.splice(start, 0, value);
      this.text = arr.join('');
      if (update) this.fireUpdate(historyItem);
    }
  }, {
    key: "replace",
    value: function replace(start, end, value) {
      var save = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      var update = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
      var historyItem = {
        type: 'replace',
        start: start,
        end: end,
        from: this.text.slice(start, end),
        to: value
      };

      if (save) {
        this.history.push(historyItem);
        this.historyOffset = -1;
      }

      this["delete"](start, end - start, 'back', false, false);
      if (value) this.insert(start, value, false, false);
      if (update) this.fireUpdate(historyItem);
    }
  }, {
    key: "delete",
    value: function _delete(start, n) {
      var dir = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'back';
      var save = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
      var update = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
      var historyItem = {
        type: 'delete',
        n: n,
        start: start,
        dir: dir,
        value: this.text.slice(start, start + n)
      };

      if (save) {
        this.history.push(historyItem);
        this.historyOffset = -1;
      }

      this.beforeDelete(start, n);
      var arr = Array.from(this.text);
      arr.splice(start, n);
      this.text = arr.join('');
      if (update) this.fireUpdate(historyItem);
    }
  }, {
    key: "addEventListener",
    value: function addEventListener(event, callback) {
      if (this.listeners[event]) {
        this.listeners[event].push(callback);
      } else {
        this.listeners[event] = [callback];
      }
    }
  }, {
    key: "fireUpdate",
    value: function fireUpdate(event) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'update';
      var callbacks = this.listeners[type];
      if (!callbacks) return;
      callbacks.forEach(function (callback) {
        return callback(event);
      });
    }
  }, {
    key: "toHtml",
    value: function toHtml() {
      var _this = this;

      if (!this.text.length) return '';
      var allRanges = [];
      var lines = [[]];
      var nodes = [];
      var result = '';

      for (var _styleName3 in this.styles) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.styles[_styleName3].ranges[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _range3 = _step.value;
            allRanges.push({
              style: _styleName3,
              range: _range3
            });
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }

      var getStylesAtOffset = function getStylesAtOffset(offset) {
        return allRanges.filter(function (rangeData) {
          var range = rangeData.range;
          return range[0] <= offset && range[1] > offset;
        }).map(function (rangeData) {
          return rangeData.style;
        });
      };

      var stylesEqual = function stylesEqual(a, b) {
        if (a.length !== b.length) return false;
        return !a.filter(function (el) {
          return b.indexOf(el) < 0;
        }).length;
      };

      var currentNode = {
        styles: getStylesAtOffset(0),
        text: this.text[0],
        start: 0,
        end: 1
      };
      var currentLine = 0;

      for (var i = 1; i < this.text.length; i++) {
        var ch = this.text[i];
        var styles = getStylesAtOffset(i);

        if (stylesEqual(currentNode.styles, styles)) {
          currentNode.end = i;
          currentNode.text += ch;
          continue;
        }

        lines[currentLine].push(currentNode);
        nodes.push(currentNode);

        if (ch === '\n') {
          currentLine++;
          lines.push([]); // continue
        }

        currentNode = {
          styles: styles,
          text: ch,
          start: i,
          end: i + 1
        };
      }

      lines[currentLine].push(currentNode);
      nodes.push(currentNode);

      var subtractArray = function subtractArray(x, y) {
        return x.filter(function (el) {
          return y.indexOf(el) < 0;
        });
      };

      var reversed = function reversed(arr) {
        var myArr = _toConsumableArray(arr);

        myArr.reverse();
        return myArr;
      };

      var sortedByPriority = function sortedByPriority(arr) {
        var asc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        var newArr = _toConsumableArray(arr);

        newArr.sort(function (a, b) {
          var aPriority = _this.styles[a].priority;
          var bPriority = _this.styles[b].priority;
          if (aPriority === undefined) aPriority = 0;
          if (bPriority === undefined) bPriority = 0;
          return asc ? aPriority - bPriority : bPriority - aPriority;
        });
        return newArr;
      };

      var activeStyles = new Set();

      for (var _i = 0, _nodes = nodes; _i < _nodes.length; _i++) {
        var node = _nodes[_i];
        var diff = subtractArray(_toConsumableArray(activeStyles), node.styles);
        var minIndex = diff.reduce(function (accumulator, styleName) {
          var index = _toConsumableArray(activeStyles).indexOf(styleName);

          if (index < accumulator) return index;
        }, activeStyles.size);
        var stylesToClose = reversed(_toConsumableArray(activeStyles).slice(minIndex, activeStyles.size));
        stylesToClose.forEach(function (styleName) {
          return activeStyles["delete"](styleName);
        });
        var stylesToOpen = sortedByPriority(subtractArray(node.styles, _toConsumableArray(activeStyles)));
        stylesToOpen.forEach(function (styleName) {
          return activeStyles.add(styleName);
        });

        var _start = stylesToOpen.map(function (styleName) {
          return _this.styles[styleName].openTag;
        }).join('');

        var prevEnd = stylesToClose.map(function (styleName) {
          return _this.styles[styleName].closeTag;
        }).join('');
        result += prevEnd + _start + Object(_utils__WEBPACK_IMPORTED_MODULE_0__["escapeHtml"])(node.text);
      }

      result += reversed(_toConsumableArray(activeStyles)).map(function (styleName) {
        return _this.styles[styleName].closeTag;
      }).join('');
      if (result.endsWith('\n') || result.endsWith('<br/>')) result += '&#8203;';
      result = result.replace(/\r/gm, ''); // console.log(result)

      return result;
    }
  }]);

  return Document;
}();



/***/ }),

/***/ "./src/editable.js":
/*!*************************!*\
  !*** ./src/editable.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _createSuper(Derived) {
  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  return function () {
    var Super = _getPrototypeOf(Derived),
        result;

    if (isNativeReflectConstruct()) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Editable =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(Editable, _HTMLElement);

  var _super = _createSuper(Editable);

  function Editable() {
    var _this;

    _classCallCheck(this, Editable);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "updated", false);

    _defineProperty(_assertThisInitialized(_this), "range", {});

    _defineProperty(_assertThisInitialized(_this), "lastSelection", {});

    _defineProperty(_assertThisInitialized(_this), "__cursorPos", 0);

    _defineProperty(_assertThisInitialized(_this), "__cursorPosListeners", []);

    return _this;
  }

  _createClass(Editable, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      var _this2 = this;

      this.setAttribute('contenteditable', 'true');
      this.addEventListener('click', function () {
        return _this2.focus();
      });
    }
  }, {
    key: "initIO",
    value: function initIO(io) {
      var _this3 = this;

      this.innerHTML = io.toHtml();
      io.addEventListener('update', function (data) {
        console.log(data);
        _this3.innerHTML = io.toHtml();
        _this3.lastSelection = _this3.getSelection();
        if (_this3.innerText) _this3.updated = true;
      });
      io.addEventListener('undo', function (revertedItem) {
        console.log('Undo', revertedItem);

        if (revertedItem.type === 'insert') {
          _this3.setCursorPos(revertedItem.start);
        }

        if (revertedItem.type === 'delete') {
          _this3.setCursorPos(revertedItem.start + revertedItem.n);
        }
      });
      io.addEventListener('redo', function (revertedItem) {
        console.log('Redo', revertedItem);

        if (revertedItem.type === 'insert') {
          _this3.setCursorPos(revertedItem.start + revertedItem.value.length);
        }

        if (revertedItem.type === 'delete') {
          _this3.setCursorPos(revertedItem.start);
        }
      });

      var saveSelection = function saveSelection() {
        _this3.lastSelection = _this3.getSelection();
      };

      this.addEventListener('keyup', saveSelection);
      this.addEventListener('keydown', saveSelection);
      this.addEventListener('click', saveSelection);
      this.addEventListener('keydown', function (e) {
        // e.keyCode 90 = 'z'
        if (!e.ctrlKey || e.shiftKey || e.keyCode !== 90) return;
        e.preventDefault();
        io.undo();
        _this3.updated = true;
      });
      this.addEventListener('keydown', function (e) {
        // e.keyCode 90 = 'z'
        if (!e.ctrlKey || !e.shiftKey || e.keyCode !== 90) return;
        e.preventDefault();
        io.redo();
        _this3.updated = true;
      });
      this.addEventListener('keydown', function (e) {
        // e.keyCode 89 = 'y'
        if (!e.ctrlKey || e.shiftKey || e.keyCode !== 89) return;
        e.preventDefault();
        io.redo();
        _this3.updated = true;
      });

      var callback = function callback(m) {
        console.log(m);
        var before = io.text;
        var after = _this3.innerText;

        var range = _this3.getSelection();

        if (_this3.updated) {
          console.log('IGNORED');

          _this3.setCursorPos(_this3.cursorPos);

          _this3.updated = false;
          return;
        }

        console.log('USED');

        if (_this3.lastSelection.collapsed) {
          if (before.length < after.length) {
            var start = _this3.lastSelection.startOffset;
            var end = start + (after.length - before.length);

            var change = _this3.innerText.slice(start, end);

            if (change === '\n\n') change = '\n';
            io.insert(start, change);
            _this3.cursorPos = start + change.length;
          } else {
            var _start = range.startOffset;
            var _end = _this3.lastSelection.startOffset;

            if (_end - _start < 0) {
              _end = _this3.lastSelection.startOffset;
              _start = _this3.lastSelection.startOffset - 1;
            }

            io["delete"](_start, _end - _start);
            _this3.cursorPos = _start;
          }
        } else {
          console.log(_this3.lastSelection);
          var _start2 = _this3.lastSelection.startOffset;
          var _end2 = _this3.lastSelection.endOffset;

          var value = _this3.innerText.slice(_start2, range.startOffset);

          io.replace(_start2, _end2, value);
          _this3.cursorPos = range.startOffset;
        }

        _this3.setCursorPos(_this3.cursorPos);

        saveSelection();
      };

      var observer = new MutationObserver(callback);
      observer.observe(this, {
        childList: true,
        subtree: true,
        characterData: true
      });
    }
  }, {
    key: "getFlatNodes",
    value: function getFlatNodes() {
      var nodes = Array.from(this.childNodes);

      while (nodes.filter(function (node) {
        return node.childNodes.length;
      }).length) {
        nodes = nodes.map(function (el) {
          return el.nodeName === '#text' || el.nodeName === 'BR' ? [el] : Array.from(el.childNodes);
        }).flat(Infinity);
      }

      return nodes;
    }
  }, {
    key: "getContainerOffset",
    value: function getContainerOffset(container) {
      while (container.nodeName !== '#text' && container.firstChild !== null) {
        container = container.firstChild;
      }

      var nodes = this.getFlatNodes();
      var offset = 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = nodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var node = _step.value;

          if (node === container) {
            break;
          }

          offset += node.length || 1;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return offset;
    }
  }, {
    key: "getContainerAtOffset",
    value: function getContainerAtOffset(offset) {
      var nodes = this.getFlatNodes();
      var lastNode = undefined;
      var x = 0;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = nodes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var node = _step2.value;

          if (node.nodeName === 'BR') {
            x += 1;
            continue;
          }

          if (node.nodeName !== '#text') {
            if (!node.firstChild) continue;
            node = node.firstChild;
          }

          lastNode = node;
          if (x + (node.length || 1) >= offset) break;
          x += node.length || 1;
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return {
        line: lastNode || nodes[0],
        n: x
      };
    }
  }, {
    key: "setCursorPos",
    value: function setCursorPos(offset) {
      if (document.activeElement !== this) return;
      var containerData = this.getContainerAtOffset(offset);
      var node = containerData.line;
      var n = containerData.n;
      if (!node) return;
      if (node.firstChild) node = node.firstChild;
      var range;

      try {
        range = window.getSelection().getRangeAt(0);
      } catch (err) {
        return;
      } // console.log(offset - n, offset, n)


      range.setEnd(node, offset - n);
      range.setStart(node, offset - n);
      this.cursorPos = offset;
    }
  }, {
    key: "getCursorPos",
    value: function getCursorPos() {
      var caretOffset = 0;
      var range;

      try {
        range = window.getSelection().getRangeAt(0);
      } catch (err) {
        return 0;
      }

      var selected = range.toString().length;
      var preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(this);
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      caretOffset = preCaretRange.toString().length - selected;
      var brCount = Array.from(preCaretRange.cloneContents().childNodes).map(function (el) {
        return el.nodeName === '#text' ? [] : Array.from(el.querySelectorAll('*'));
      }).flat(Infinity).filter(function (el) {
        return el.nodeName === 'BR';
      }).length;
      caretOffset += brCount;
      return caretOffset;
    }
  }, {
    key: "getSelection",
    value: function getSelection() {
      var range;

      try {
        range = window.getSelection().getRangeAt(0);
      } catch (err) {
        return {
          startOffset: 0,
          endOffset: 0,
          startContainer: this,
          endContainer: this,
          collapsed: true,
          toString: function toString() {
            return '';
          }
        };
      }

      var result = {};
      var firstOffset = this.getContainerOffset(range.startContainer);
      var secondOffset = this.getContainerOffset(range.endContainer);

      result.toString = function () {
        return range.toString();
      };

      result.collapsed = range.collapsed;
      result.startContainer = range.startContainer;
      result.startOffset = range.startOffset + firstOffset;
      result.endContainer = range.endContainer;
      result.endOffset = range.endOffset + secondOffset;

      if (range.startContainer === this && range.endContainer === this && range.startOffset === 0 && range.endOffset === 1) {
        result.startOffset = 0;
        result.endOffset = this.innerText.length;
      }

      return result;
    }
  }, {
    key: "cursorPos",
    get: function get() {
      return this.__cursorPos;
    },
    set: function set(val) {
      this.__cursorPos = val;

      this.__cursorPosListeners.forEach(function (cb) {
        return setTimeout(function () {
          return cb(val);
        }, 1);
      });
    }
  }]);

  return Editable;
}(
/*#__PURE__*/
_wrapNativeSuper(HTMLElement));

customElements.define('baka-editable', Editable);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _markdown_document__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./markdown_document */ "./src/markdown_document.js");
/* harmony import */ var _editable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./editable */ "./src/editable.js");
/* harmony import */ var _editable__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_editable__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _baka_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./baka_link */ "./src/baka_link.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _createSuper(Derived) {
  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  return function () {
    var Super = _getPrototypeOf(Derived),
        result;

    if (isNativeReflectConstruct()) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var BakaEditor =
/*#__PURE__*/
function (_HTMLElement) {
  _inherits(BakaEditor, _HTMLElement);

  var _super = _createSuper(BakaEditor);

  function BakaEditor() {
    var _this;

    _classCallCheck(this, BakaEditor);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "template", "<div id=\"wrapper\">\n        <div id=\"buttons\">\n            <a href=\"#\" id=\"bold\" tabindex=\"-1\">B</a>\n            <a href=\"#\" id=\"italic\" tabindex=\"-1\">I</a>\n            <a href=\"#\" id=\"strike\" tabindex=\"-1\">S</a>\n            <a href=\"#\" id=\"underline\" tabindex=\"-1\">U</a>\n            <a href=\"#\" id=\"monospace\" tabindex=\"-1\">M</a>\n            <a href=\"#\" id=\"quote\" tabindex=\"-1\">&laquo;&raquo;</a>\n            <a href=\"#\" id=\"code\" tabindex=\"-1\">&lt;/&gt;</a>\n            <a href=\"#\" id=\"header_first\" tabindex=\"-1\">H1</a>\n            <a href=\"#\" id=\"header_second\" tabindex=\"-1\">H2</a>\n            <div class=\"delimiter\"></div>\n            <a href=\"#\" id=\"link\" tabindex=\"-1\">\n                <svg aria-hidden=\"true\" focusable=\"false\" data-prefix=\"fas\" data-icon=\"link\" class=\"svg-inline--fa fa-link fa-w-16\" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path fill=\"rgba(0, 0, 255, 0.3)\" d=\"M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z\"></path></svg>\n                <div class=\"popup\" id=\"link_popup\">\n                    <input type=\"text\" placeholder=\"URL\" class=\"url\" />\n                    <input type=\"text\" placeholder=\"Title\" class=\"title\" />\n                </div>\n            </a>\n            <a href=\"#\" id=\"image\" tabindex=\"-1\">\n                <svg aria-hidden=\"true\" focusable=\"false\" data-prefix=\"far\" data-icon=\"image\" class=\"svg-inline--fa fa-image fa-w-16\" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><path fill=\"rgba(0, 0, 255, 0.3)\" d=\"M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm-6 336H54a6 6 0 0 1-6-6V118a6 6 0 0 1 6-6h404a6 6 0 0 1 6 6v276a6 6 0 0 1-6 6zM128 152c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zM96 352h320v-80l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L192 304l-39.515-39.515c-4.686-4.686-12.284-4.686-16.971 0L96 304v48z\"></path></svg>\n                <div class=\"popup\" id=\"link_popup\">\n                    <input type=\"text\" placeholder=\"URL\" class=\"url\" />\n                    <input type=\"text\" placeholder=\"Title\" class=\"title\" />\n                </div>\n            </a>\n            \n        </div>\n        <div id=\"placeholder\">Type: Echo!</div>\n        <baka-editable id=\"editor\" />\n    </div>");

    _defineProperty(_assertThisInitialized(_this), "debug", false);

    _defineProperty(_assertThisInitialized(_this), "elms", {});

    _defineProperty(_assertThisInitialized(_this), "outputContainer", void 0);

    _defineProperty(_assertThisInitialized(_this), "originalOutputContainer", void 0);

    return _this;
  }

  _createClass(BakaEditor, [{
    key: "attributeChangedCallback",
    value: function attributeChangedCallback(name, oldValue, newValue) {
      switch (name) {
        case 'debug':
          this.debug = this.getAttribute('debug') !== null;

        case 'placeholder':
          if (!this.elms.placeholder) break;
          this.elms.placeholder.innerHTML = newValue;
          break;

        case 'output':
          this.outputContainer = document.querySelector(this.getAttribute('output'));
          break;

        case 'originaloutput':
          this.originalOutputContainer = document.querySelector(this.getAttribute('originaloutput'));
          break;
      }
    }
  }, {
    key: "connectedCallback",
    value: function connectedCallback() {
      this.innerHTML = this.template;
      this.debug = this.getAttribute('debug') !== null;
      this.outputContainer = document.querySelector(this.getAttribute('output'));
      this.elms.wrapper = this.querySelector('#wrapper');
      this.elms.editor = this.querySelector('#editor');
      this.elms.placeholder = this.querySelector('#placeholder');
      if (this.getAttribute('placeholder')) this.elms.placeholder.innerHTML = this.getAttribute('placeholder');
      this.document = new _markdown_document__WEBPACK_IMPORTED_MODULE_0__["default"]();
      this.document.addEventListener('update', this.onTextUpdate.bind(this));
      this.document.addEventListener('update', this.logger.bind(this));
      this.updatePlaceholder();
      this.initEditor();
      this.initButtons();
      this.logger({
        type: 'INIT'
      });
    }
  }, {
    key: "initButtons",
    value: function initButtons() {
      var _this2 = this;

      this.elms.buttons = {
        wrapper: this.elms.wrapper.querySelector('#buttons'),
        bold: this.elms.wrapper.querySelector('#buttons #bold'),
        italic: this.elms.wrapper.querySelector('#buttons #italic'),
        strike: this.elms.wrapper.querySelector('#buttons #strike'),
        underline: this.elms.wrapper.querySelector('#buttons #underline'),
        monospace: this.elms.wrapper.querySelector('#buttons #monospace'),
        quote: this.elms.wrapper.querySelector('#buttons #quote'),
        code: this.elms.wrapper.querySelector('#buttons #code'),
        header_first: this.elms.wrapper.querySelector('#buttons #header_first'),
        header_second: this.elms.wrapper.querySelector('#buttons #header_second')
      };
      this.elms.popupButtons = {
        link: this.elms.wrapper.querySelector('#buttons #link'),
        image: this.elms.wrapper.querySelector('#buttons #image')
      };

      var onPopupButtonClick = function onPopupButtonClick(styleName, e) {
        var button = _this2.elms.popupButtons[styleName];
        var popup = button.querySelector('.popup');
        var urlInput = popup.querySelector('input.url');
        var titleInput = popup.querySelector('input.title');

        if ([popup, urlInput, titleInput].indexOf(e.target) >= 0) {
          e.preventDefault();
          return;
        }

        var closePopup = function closePopup(keydownListener) {
          urlInput.value = '';
          titleInput.value = '';
          button.classList.remove('active');

          if (keydownListener) {
            urlInput.removeEventListener('keydown', keydownListener);
            titleInput.removeEventListener('keydown', keydownListener);
          }
        };

        var getMarkup = function getMarkup(styleName) {
          if (styleName === 'link') {
            return "[".concat(titleInput.value, "](").concat(urlInput.value, ")");
          }

          return "![".concat(titleInput.value, "](").concat(urlInput.value, ")");
        };

        var onKeydown = function onKeydown(e) {
          if (e.key === 'Escape') {
            e.preventDefault();
            closePopup();
            return;
          }

          if (e.key !== 'Enter') {
            return;
          }

          e.preventDefault();
          var markup = getMarkup(styleName);

          _this2.document.insert(_this2.elms.editor.cursorPos, markup);

          _this2.elms.editor.focus();

          _this2.elms.editor.setCursorPos(_this2.elms.editor.cursorPos + markup.length);

          closePopup(onKeydown);
        };

        var onDocumentClick = function onDocumentClick(e) {
          document.removeEventListener('click', onDocumentClick);
          if ([button, _toConsumableArray(button.querySelectorAll('*'))].flat(Infinity).indexOf(e.target) >= 0) return;
          closePopup(onKeydown);
        };

        document.addEventListener('click', onDocumentClick);
        button.classList.toggle('active');

        if (!button.classList.contains('active')) {
          urlInput.value = '';
          titleInput.value = '';
          return;
        }

        urlInput.focus();
        urlInput.addEventListener('keydown', onKeydown);
        titleInput.addEventListener('keydown', onKeydown);
      };

      this.elms.popupButtons['link'].addEventListener('click', function (e) {
        return onPopupButtonClick('link', e);
      });
      this.elms.popupButtons['image'].addEventListener('click', function (e) {
        return onPopupButtonClick('image', e);
      });

      var onButtonClick = function onButtonClick(styleName, e) {
        e.preventDefault();

        _this2.elms.editor.focus();

        var range = _this2.elms.editor.getSelection();

        _this2.elms.editor.setCursorPos(_this2.document.mark(styleName, [range.startOffset, range.endOffset]));
      };

      var _loop = function _loop(styleName) {
        if (!(styleName in _this2.elms.buttons)) return "continue";

        _this2.elms.buttons[styleName].addEventListener('click', function (e) {
          return onButtonClick(styleName, e);
        });
      };

      for (var styleName in this.document.styles) {
        var _ret = _loop(styleName);

        if (_ret === "continue") continue;
      }
    }
  }, {
    key: "logger",
    value: function logger(historyEvent) {
      if (!this.debug) return;
      console.log('\n%cFired event %s\n%c%s\n%s\n%c%s\n%s%o\n%s%o\n', ['font-weight: bold', 'margin-bottom: 6px'].join(';'), historyEvent.type.toUpperCase(), ['color: rgba(0,0,0,1)', 'padding-bottom: 6px'].join(';'), this.document.text.slice(0, this.elms.editor.cursorPos) + '][' + this.document.text.slice(this.elms.editor.cursorPos, this.document.text.length), this.document.toHtml(), ['color: rgba(0,0,0,.9)', 'line-height: 1.4em'].join(';'), "Document length: ".concat(this.document.text.length, "; Cursor position: ").concat(this.elms.editor.cursorPos), 'Event details:', historyEvent, 'Styles:', this.document.styles);
    }
  }, {
    key: "setText",
    value: function setText(text) {
      this.elms.editor.cursorPos = 0;
      this.document.setText(text);
    }
  }, {
    key: "onTextUpdate",
    value: function onTextUpdate() {
      this.updatePlaceholder(); // this.elms.editor.innerHTML = this.document.toHtml()

      if (this.outputContainer) this.outputContainer.value = this.document.getFinalHtml();
      if (this.originalOutputContainer) this.originalOutputContainer.value = this.document.text; // this.elms.editor.setCursorPos(this.elms.editor.cursorPos)

      this.dispatchEvent(new CustomEvent('change', {
        detail: {
          original: this.document.text,
          html: this.document.getFinalHtml()
        }
      }));
    }
  }, {
    key: "updatePlaceholder",
    value: function updatePlaceholder() {
      if (this.document.text.length) {
        this.elms.placeholder.classList.add('invisible');
      } else {
        this.elms.placeholder.classList.remove('invisible');
      }
    }
  }, {
    key: "initEditor",
    value: function initEditor() {
      this.elms.editor.initIO(this.document);
    }
  }], [{
    key: "observedAttributes",
    get: function get() {
      return ['placeholder', 'output', 'originaloutput', 'debug'];
    }
  }]);

  return BakaEditor;
}(
/*#__PURE__*/
_wrapNativeSuper(HTMLElement));

customElements.define('baka-editor', BakaEditor);

/***/ }),

/***/ "./src/markdown_document.js":
/*!**********************************!*\
  !*** ./src/markdown_document.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MarkdownDocument; });
/* harmony import */ var _document__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./document */ "./src/document.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _createSuper(Derived) {
  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  return function () {
    var Super = _getPrototypeOf(Derived),
        result;

    if (isNativeReflectConstruct()) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



var MarkdownDocument =
/*#__PURE__*/
function (_Document) {
  _inherits(MarkdownDocument, _Document);

  var _super = _createSuper(MarkdownDocument);

  function MarkdownDocument() {
    _classCallCheck(this, MarkdownDocument);

    return _super.apply(this, arguments);
  }

  _createClass(MarkdownDocument, [{
    key: "mark",
    value: function mark(styleName, range) {
      var before = '',
          start = '',
          end = '';
      if (range[0] > 0 && this.text[range[0] - 1] !== '\n') before = '\n';

      switch (styleName) {
        case 'bold':
          start = '**';
          end = '**';
          break;

        case 'italic':
          start = '*';
          end = '*';
          break;

        case 'underline':
          start = '__';
          end = '__';
          break;

        case 'strike':
          start = '~~';
          end = '~~';
          break;

        case 'monospace':
          start = '`';
          end = '`';
          break;

        case 'quote':
          start = before + '``\n';
          end = '\n``\n';
          break;

        case 'code':
          start = before + '```\n';
          end = '\n```\n';
          break;

        case 'header_first':
          start = before + '# ';
          end = '\n';
          break;

        case 'header_second':
          start = before + '## ';
          end = '\n';
          break;
      }

      this.insert(range[0], start);
      this.insert(range[1] + start.length, end);
      return range[1] + start.length;
    }
  }, {
    key: "getStylesAtOffset",
    value: function getStylesAtOffset(offset) {
      var styles = {};

      for (var styleName in this.styles) {
        for (var i = 0; i < this.styles[styleName].ranges.length; i++) {
          var range = this.styles[styleName].ranges[i];
          if (!(range[0] <= offset && range[1] >= offset)) continue;
          styles[styleName] = range;
        }
      }

      return styles;
    }
  }, {
    key: "getStylesAtRange",
    value: function getStylesAtRange(start, end) {
      var styles = [];

      for (var styleName in this.styles) {
        for (var i = 0; i < this.styles[styleName].ranges.length; i++) {
          var range = this.styles[styleName].ranges[i];
          if (!(range[0] >= start && range[0] <= end || // Начало в выделении
          range[1] >= start && range[1] <= end || // Конец в выделении
          range[0] <= start && range[1] >= end)) continue;
          styles.push(styleName);
        }
      }

      return styles;
    }
  }, {
    key: "getFinalHtml",
    value: function getFinalHtml() {
      var _this = this;

      var html = this.toHtml(); // html = html.replace(
      //     /(?<!<span class="service">\]\(<\/span>)<baka-link class="link">(.+)<\/baka-link>/gm,
      //     (fullMatch, link) => `<a href="${link}" target="_blank">${link}</a>`
      // )

      var link_titles = []; // this.text.replace(
      //     /(?<!!)\[([^\n\r\]\[]*?)\]\(([^\n\r\(\)]+?)\)/gm,
      //     (full, title, link) => {
      //         console.log(title, link)
      //         link_titles.push(title ? title : link)
      //     }
      // )

      var linkCounter = -1;
      html = html.replace(/<baka-link class="link">(.+?)<\/baka-link>/gm, function (full, link) {
        console.log(full, link);
        linkCounter++;
        return "<a href=\"".concat(link, "\" target=\"_blank\">").concat(link_titles[linkCounter], "</a>");
      });
      var image_titles = [];
      this.text.replace(/!\[([^\n\r\[\]]*?)\]\(([^\n\r\(\)]+?)\)/gm, function (full, title, link) {
        console.log(title, link);
        image_titles.push(title ? title : '');
      });
      var imageCounter = -1;
      html = html.replace(/<baka-link class="image_link">(.+)<\/baka-link>/gm, function (full, link) {
        console.log(full, link);
        imageCounter++;
        return "<img src=\"".concat(link, "\" title=\"").concat(image_titles[imageCounter], "\" />");
      });
      html = html.replace(/\\\*/gm, '*');
      html = html.replace(/\\`/gm, '`');
      html = html.replace(/\\_/gm, '_');
      html = html.replace(/\\#/gm, '#');
      html = html.replace(/\\~/gm, '~');
      html = html.replace(/\n/gm, '<br/>').replace(/\r/gm, '');
      html = html.replace(/<span class=["']service[_]*.*?["']>(.+?)<\/span>/gm, '');
      Object.keys(this.styles).forEach(function (styleName) {
        var style = _this.styles[styleName];
        if (!style.block) return;
        html = html.replace(new RegExp("".concat(style.openTag, "(.+)").concat(style.closeTag.replace('/', '\\/'), "<br\\/>")), "".concat(style.openTag, "$1").concat(style.closeTag));
      });
      return html;
    }
  }, {
    key: "styles",
    set: function set(value) {},
    get: function get() {
      var ranges = {
        bold: [],
        italic: [],
        underline: [],
        strike: [],
        monospace: [],
        header_first: [],
        header_second: [],
        code: [],
        quote: [],
        service: [],
        link: [],
        image: [],
        image_title: [],
        link_title: []
      };
      var text = this.text;

      var process = function process(styleNames, regexp, trigger) {
        var n = trigger.length;
        text = text.replace(regexp, function (fullMatch, match, index) {
          var start = index + n;
          var end = index + fullMatch.length - n;
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = styleNames[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var styleName = _step.value;
              ranges[styleName].push([start, end]);
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          ranges.service.push([start - n, start]);
          ranges.service.push([end, end + n]);
          var escapedTrigger = Array(n + 1).join('Ɇ'); // console.log(trigger, n, escapedTrigger)

          return escapedTrigger + match + escapedTrigger;
        }); // console.log(text)
      };

      var processOneLine = function processOneLine(styleNames, regexp, n) {
        text.replace(regexp, function (fullMatch, match, index) {
          var start = index;
          var end = index + fullMatch.length;
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = styleNames[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var styleName = _step2.value;
              ranges[styleName].push([start, end]);
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                _iterator2["return"]();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }

          ranges.service.push([start, start + n]);
          return match;
        });
      };

      var processLinks = function processLinks() {// text.replace(
        //     /(?<!!)\[([^\n\r\[\]\\]*?)\]\(([^\n\r]+?)\)/gm,
        //     (fullMatch, title, link, index) => {
        //         ranges['service'].push([index, index + 1])
        //         ranges['service'].push([
        //             index + 1 + title.length,
        //             index + 1 + title.length + 1,
        //         ])
        //         ranges['link_title'].push([
        //             index + 1,
        //             index + 1 + title.length,
        //         ])
        //
        //         let linkStart = index + 1 + title.length + 2
        //         let linkEnd = linkStart + link.length
        //         ranges['service'].push([linkStart - 1, linkStart])
        //         ranges['service'].push([linkEnd, linkEnd + 1])
        //         ranges['link'].push([linkStart, linkEnd])
        //     }
        // )
      };

      var processImages = function processImages() {
        text.replace(/\!\[([^\n\r\]\[\\]*?)\]\(([^\n\r]+?)\)/gm, function (fullMatch, title, link, index) {
          ranges['service'].push([index, index + 2]);
          ranges['service'].push([index + 2 + title.length, index + 2 + title.length + 1]);
          ranges['image_title'].push([index + 2, index + 2 + title.length]);
          var linkStart = index + 2 + title.length + 2;
          var linkEnd = linkStart + link.length;
          ranges['service'].push([linkStart - 1, linkStart]);
          ranges['service'].push([linkEnd, linkEnd + 1]);
          ranges['image'].push([linkStart, linkEnd]);
        });
      };

      var replaced_occurrences = [];

      var escapeMarkup = function escapeMarkup(regexp, n) {
        text = text.replace(regexp, function (full, match) {
          return full.slice(0, n) + match.replace(/[*`_#~]/gm, function (unsafe, index) {
            replaced_occurrences.push(unsafe, index);
            return 'Ɇ';
          }) + full.slice(full.length - n, full.length);
        });
      };

      escapeMarkup(/```\n([^`]+?)\n```/gm, 4);
      escapeMarkup(/(https?:\/\/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b[-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/gm, 0);
      escapeMarkup(/\\(\*)/, 0); // escapeMarkup(/(?<!`|\\)`([^`\n\r]+?)`/gm, 1)

      processLinks();
      processImages(); // process(
      //     ['link'],
      //     /(?<!\]\()(https?:\/\/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b[-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/gm,
      //     0
      // )
      //

      process(['bold', 'italic'], /(?!\\)\*{3}([^\*]+)\*{3}/gm, '***');
      process(['bold'], /(?!\\)\*{2}(?!\*)([^\*]+)\*{2}(?!\*|\\)/gm, '**');
      process(['italic'], /(?!\\)\*(?!\*)([^\*]+)\*/gm, '*'); //
      // process(['underline'], /__(.+?)__/gm, 2)
      // process(['strike'], /~~(.+?)~~/gm, 2)
      //
      // process(['quote'], /(?<!`|\\)``\n([^`]+?)\n``/gm, 3)
      // process(['monospace'], /(?<!`|\\)`([^`\n\r]+?)`/gm, 1)
      // process(['code'], /```\n([^`]+?)\n```/gm, 4)
      //
      // processOneLine(['header_first'], /(?<!#|[^\n])# ([^\r\n]+)/gm, 2)
      // processOneLine(['header_second'], /(?<![^\n])## ([^\r\n#]+)/gm, 3)

      return {
        bold: {
          openTag: '<b>',
          closeTag: '</b>',
          ranges: ranges.bold
        },
        italic: {
          openTag: '<i>',
          closeTag: '</i>',
          ranges: ranges.italic
        },
        underline: {
          openTag: '<u>',
          closeTag: '</u>',
          ranges: ranges.underline
        },
        strike: {
          openTag: '<s>',
          closeTag: '</s>',
          ranges: ranges.strike
        },
        monospace: {
          openTag: '<span class="monospace">',
          closeTag: '</span>',
          ranges: ranges.monospace
        },
        code: {
          openTag: '<span class="code">',
          closeTag: '</span>',
          ranges: ranges.code,
          block: true
        },
        header_first: {
          openTag: '<h1>',
          closeTag: '</h1>',
          ranges: ranges.header_first,
          block: true
        },
        header_second: {
          openTag: '<h2>',
          closeTag: '</h2>',
          ranges: ranges.header_second,
          block: true
        },
        quote: {
          openTag: '<blockquote>',
          closeTag: '</blockquote>',
          ranges: ranges.quote,
          priority: 10,
          block: true
        },
        link: {
          openTag: '<baka-link class="link">',
          closeTag: '</baka-link>',
          ranges: ranges.link
        },
        link_title: {
          openTag: '<span class="service_link_title">',
          closeTag: '</span>',
          ranges: ranges.link_title
        },
        image: {
          openTag: '<baka-link class="image_link">',
          closeTag: '</baka-link>',
          ranges: ranges.image
        },
        image_title: {
          openTag: '<span class="service_image_title">',
          closeTag: '</span>',
          ranges: ranges.image_title
        },
        service: {
          openTag: '<span class="service">',
          closeTag: '</span>',
          ranges: ranges.service,
          priority: 150
        }
      };
    }
  }]);

  return MarkdownDocument;
}(_document__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: escapeHtml */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "escapeHtml", function() { return escapeHtml; });
function escapeHtml(unsafe) {
  return unsafe.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map