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

/***/ "./src/document.js":
/*!*************************!*\
  !*** ./src/document.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Document; });
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

    _defineProperty(this, "listeners", {});
  }

  _createClass(Document, [{
    key: "beforeDelete",
    value: function beforeDelete(start, n) {}
  }, {
    key: "beforeInsert",
    value: function beforeInsert(start, text) {}
  }, {
    key: "getStylesAtOffset",
    value: function getStylesAtOffset(offset) {
      var styles = {};

      for (var styleName in this.styles) {
        for (var i = 0; i < this.styles[styleName].ranges.length; i++) {
          var range = this.styles[styleName].ranges[i];
          if (!(range[0] < offset && range[1] >= offset)) continue;
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
          if (!(range[0] >= start && range[0] < end || // Начало в выделении
          range[1] > start && range[1] <= end || // Конец в выделении
          range[0] <= start && range[1] >= end)) continue;
          styles.push(styleName);
        }
      }

      return styles;
    }
  }, {
    key: "insert",
    value: function insert(start, value) {
      var historyItem = {
        type: 'insert',
        value: value,
        start: start
      };
      this.history.push(historyItem);
      this.beforeInsert(start, value);
      var arr = Array.from(this.text);
      arr.splice(start, 0, value);
      this.text = arr.join('');
      this.fireUpdate(historyItem);
    }
  }, {
    key: "replace",
    value: function replace(start, end, value) {
      this["delete"](start, end - start);
      if (value) this.insert(start, value);
    }
  }, {
    key: "delete",
    value: function _delete(start, n) {
      var dir = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'back';
      var historyItem = {
        type: 'delete',
        n: n,
        start: start,
        dir: dir
      };
      this.history.push(historyItem);
      this.beforeDelete(start, n);
      var arr = Array.from(this.text);
      arr.splice(start, n);
      this.text = arr.join('');
      this.fireUpdate(historyItem);
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
      var callbacks = this.listeners['update'];
      if (!callbacks) return;
      callbacks.forEach(function (callback) {
        return callback(event);
      });
    }
  }, {
    key: "toHtml",
    value: function toHtml() {
      var _this = this;

      if (!this.text.length) return '<div class="empty">&#8203;</div>';
      var allRanges = [];
      var lines = [[]];
      var result = '';

      for (var styleName in this.styles) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.styles[styleName].ranges[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var range = _step.value;
            allRanges.push({
              style: styleName,
              range: range
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

        if (stylesEqual(currentNode.styles, styles) && ch !== '\n') {
          currentNode.end = i;
          currentNode.text += ch;
          continue;
        }

        lines[currentLine].push(currentNode);

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
      var x = 0;

      for (var _i = 0, _lines = lines; _i < _lines.length; _i++) {
        var nodes = _lines[_i];
        var lineText = '';
        var lineLength = 0;
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = nodes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var node = _step2.value;
            var start = node.styles.map(function (styleName) {
              return _this.styles[styleName].openTag;
            }).join('');
            var end = node.styles.map(function (styleName) {
              return _this.styles[styleName].closeTag;
            }).join('');
            lineText += start + node.text + end;
            if (node.text !== '\n') lineLength += node.text.length;
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

        result += "".concat(x ? '\n' : '', "<div").concat(lineText === '\n' ? ' class="empty"' : '', ">").concat(!lineLength ? '' : lineText.replace(/\n/g, ''), "</div>");
        x++;
      }

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

      var lastSelection;
      this.innerHTML = io.toHtml();

      var insertText = function insertText(text, range) {
        if (range.collapsed) {
          _this3.cursorPos = range.startOffset + text.length;
          io.insert(range.startOffset, text);
        } else {
          _this3.setCursorPos(range.startOffset + 1 + text.length);

          io.replace(range.startOffset + 1, range.endOffset, text);
        }
      };

      this.addEventListener('paste', function (e) {
        e.preventDefault();
        var clipboardData = e.clipboardData || window.clipboardData;
        var pastedData = clipboardData.getData('Text');
        var range = lastSelection && !lastSelection.collapsed ? lastSelection : _this3.getSelection();
        insertText(pastedData, range);
      });
      this.addEventListener('input', function (e) {
        if (e.inputType !== 'insertText') return;
        e.preventDefault();
        var range = lastSelection && !lastSelection.collapsed ? lastSelection : _this3.getSelection();
        range.startOffset -= e.data.length;
        insertText(e.data, range);
      });
      this.addEventListener('input', function (e) {
        if (e.inputType !== 'insertParagraph') return;

        var range = _this3.getSelection();

        if (range.collapsed) {
          _this3.cursorPos = range.startOffset;
          io.insert(range.startOffset, '\n');
          return;
        }

        _this3.cursorPos = range.startOffset;
        io.replace(range.startOffset, range.endOffset, '\n');
      });
      this.addEventListener('beforeinput', function (e) {
        if (e.inputType !== 'deleteContentBackward') return;
        e.preventDefault();

        var range = _this3.getSelection();

        if (range.startOffset < 1 && range.collapsed) return;

        if (range.collapsed) {
          _this3.cursorPos = range.startOffset - 1;
          io["delete"](range.startOffset - 1, 1);
          return;
        }

        _this3.cursorPos = range.startOffset;
        io["delete"](range.startOffset, range.endOffset - range.startOffset);
      });
      this.addEventListener('beforeinput', function (e) {
        if (e.inputType !== 'deleteContentForward') return;
        e.preventDefault();

        var range = _this3.getSelection();

        _this3.cursorPos = range.startOffset;

        if (range.collapsed) {
          io["delete"](range.startOffset, 1, 'forward');
          return;
        }

        io.replace(range.startOffset, range.endOffset, '');
      });
      this.addEventListener('keydown', function (e) {
        if (!e.ctrlKey || e.key !== 'Delete') return;
        e.preventDefault();
        var text = io.text;

        var range = _this3.getSelection();

        text = text.slice(range.startOffset, text.length);
        var ch = io.text[range.startOffset];
        var firstIndex;
        var regexp = ch.match(/\s/) !== null ? /\S/gm : /\s/gm;
        var matches = Array.from(text.matchAll(regexp));
        if (matches.length) firstIndex = matches[0].index;else firstIndex = text.length;
        io["delete"](range.startOffset, firstIndex);

        _this3.setCursorPos(range.startOffset);
      });
      this.addEventListener('keydown', function (e) {
        if (!e.ctrlKey || e.key !== 'Backspace') return;
        e.preventDefault();
        var text = io.text;

        var range = _this3.getSelection();

        text = text.slice(0, range.startOffset);
        var ch = io.text[range.startOffset - 1];
        var firstIndex;
        var regexp = ch.match(/\s/) !== null ? /\S/gm : /\s/gm;
        var matches = Array.from(text.matchAll(regexp));
        if (matches.length) firstIndex = matches[matches.length - 1].index + 1;else firstIndex = 0;

        _this3.setCursorPos(range.startOffset - text.length + firstIndex);

        io["delete"](range.startOffset - text.length + firstIndex, text.length - firstIndex);
      });
      this.addEventListener('keyup', function (e) {
        var navigationKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End', 'PageUp', 'PageDown'];
        if (navigationKeys.indexOf(e.key) < 0) return;
        _this3.cursorPos = _this3.getCursorPos();
      });
      this.addEventListener('mouseup', function () {
        var range = window.getSelection().getRangeAt(0);

        if (range.startContainer.parentElement.classList.contains('empty')) {
          _this3.setCursorPos(0);
        }

        _this3.cursorPos = _this3.getCursorPos();
      });
    }
  }, {
    key: "addCursorPosListener",
    value: function addCursorPosListener(cb) {
      this.__cursorPosListeners.push(cb);
    }
  }, {
    key: "getContainerOffset",
    value: function getContainerOffset(container) {
      var nodes = Array.from(this.childNodes);

      while (nodes.filter(function (node) {
        return node.childNodes.length;
      }).length) {
        nodes = nodes.map(function (el) {
          return el.nodeName === '#text' || el.nodeName === 'BR' ? [el] : Array.from(el.childNodes);
        }).flat(Infinity);
      }

      var offset = 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = nodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var node = _step.value;
          if (node === container) break;
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
      var nodes = Array.from(this.childNodes);

      while (nodes.filter(function (node) {
        return node.childNodes.length;
      }).length) {
        nodes = nodes.map(function (el) {
          return el.nodeName === '#text' || el.nodeName === 'BR' ? [el] : Array.from(el.childNodes);
        }).flat(Infinity);
      }

      var lastNode = undefined;
      var x = 0;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = nodes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var node = _step2.value;

          if (node.nodeName == 'BR') {
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
      var containerData = this.getContainerAtOffset(offset);
      var node = containerData.line;
      var n = containerData.n;
      if (!node) return;
      if (node.firstChild) node = node.firstChild;
      var range = window.getSelection().getRangeAt(0);
      range.setEnd(node, offset - n);
      range.setStart(node, offset - n);
      this.cursorPos = offset;
    }
  }, {
    key: "getCursorPos",
    value: function getCursorPos() {
      var caretOffset = 0;
      var range = window.getSelection().getRangeAt(0);
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
      var range = window.getSelection().getRangeAt(0);
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

    _defineProperty(_assertThisInitialized(_this), "template", "<div id=\"wrapper\">\n        <div id=\"buttons\">\n            <a href=\"#\" id=\"bold\" class=\"\">B</a>\n            <a href=\"#\" id=\"italic\" class=\"\">I</a>\n            <a href=\"#\" id=\"strike\" class=\"\">S</a>\n            <a href=\"#\" id=\"underline\" class=\"\">U</a>\n            <a href=\"#\" id=\"monospace\" class=\"\">M</a>\n        </div>\n        <div id=\"placeholder\">Type: Echo!</div>\n        <baka-editable id=\"editor\" />\n    </div>");

    _defineProperty(_assertThisInitialized(_this), "elms", {});

    _defineProperty(_assertThisInitialized(_this), "stylesOverride", {});

    _defineProperty(_assertThisInitialized(_this), "outputContainer", void 0);

    return _this;
  }

  _createClass(BakaEditor, [{
    key: "attributeChangedCallback",
    value: function attributeChangedCallback(name, oldValue, newValue) {
      switch (name) {
        case 'placeholder':
          if (!this.elms.placeholder) break;
          this.elms.placeholder.innerHTML = newValue;
          break;

        case 'output':
          this.outputContainer = document.querySelector(this.getAttribute('output'));
          break;
      }
    }
  }, {
    key: "connectedCallback",
    value: function connectedCallback() {
      this.innerHTML = this.template;
      this.outputContainer = document.querySelector(this.getAttribute('output'));
      this.elms.wrapper = this.querySelector('#wrapper');
      this.elms.editor = this.querySelector('#editor');
      this.elms.placeholder = this.querySelector('#placeholder');
      if (this.getAttribute('placeholder')) this.elms.placeholder.innerHTML = this.getAttribute('placeholder');
      this.document = new _markdown_document__WEBPACK_IMPORTED_MODULE_0__["default"]();
      this.document.addEventListener('update', this.onTextUpdate.bind(this));
      this.document.addEventListener('update', this.logger.bind(this));
      this.initEditor();
      this.initButtons();
      this.logger({
        type: 'INIT'
      });
    }
  }, {
    key: "updateButtons",
    value: function updateButtons() {
      var _this2 = this;

      var range = this.elms.editor.getSelection();
      var offset = range.startOffset;
      var styles = range.collapsed ? Object.keys(this.document.getStylesAtOffset(offset)) : this.document.getStylesAtRange(range.startOffset, range.endOffset);

      for (var styleName in this.stylesOverride) {
        if (styles.indexOf(styleName) >= 0 && !this.stylesOverride[styleName]) {
          styles.splice(styles.indexOf(styleName), 1);
        }

        if (styles.indexOf(styleName) < 0 && this.stylesOverride[styleName]) {
          styles.push(styleName);
        }
      }

      this.elms.wrapper.querySelectorAll('#buttons > a').forEach(function (el) {
        return el.classList.remove('active');
      });
      styles.forEach(function (style) {
        if (!(style in _this2.elms.buttons)) return;

        _this2.elms.buttons[style].classList.add('active');
      });
    }
  }, {
    key: "initButtons",
    value: function initButtons() {
      var _this3 = this;

      this.elms.editor.addCursorPosListener(function () {
        _this3.stylesOverride = {};

        _this3.updateButtons();
      });
      this.elms.buttons = {
        wrapper: this.elms.wrapper.querySelector('#buttons'),
        bold: this.elms.wrapper.querySelector('#buttons #bold'),
        italic: this.elms.wrapper.querySelector('#buttons #italic'),
        strike: this.elms.wrapper.querySelector('#buttons #strike'),
        underline: this.elms.wrapper.querySelector('#buttons #underline'),
        monospace: this.elms.wrapper.querySelector('#buttons #monospace')
      };

      var onButtonClick = function onButtonClick(buttonName, e) {
        e.preventDefault();

        _this3.elms.editor.focus();

        var range = _this3.elms.editor.getSelection();

        if (!range.collapsed) {
          var styles = _this3.document.getStylesAtRange(range.startOffset, range.endOffset);

          if (styles.indexOf(buttonName) >= 0) {
            _this3.document.unmark(buttonName, range.startOffset, range.endOffset);
          } else {
            _this3.document.mark(buttonName, range.startOffset, range.endOffset);
          }

          _this3.elms.editor.cursorPos = range.endOffset;

          _this3.elms.editor.setCursorPos(range.endOffset);

          return;
        }

        var button = _this3.elms.buttons[buttonName];
        var isActive = button.classList.contains('active');
        _this3.stylesOverride[buttonName] = !isActive;
      };

      var _loop = function _loop(styleName) {
        if (!(styleName in _this3.elms.buttons)) return "continue";

        _this3.elms.buttons[styleName].addEventListener('click', function (e) {
          return onButtonClick(styleName, e);
        });
      };

      for (var styleName in this.document.styles) {
        var _ret = _loop(styleName);

        if (_ret === "continue") continue;
      }

      window.document.addEventListener('click', function () {
        _this3.updateButtons();
      });
    }
  }, {
    key: "logger",
    value: function logger(historyEvent) {
      if (!this.debug) return;
      console.log('\n%cFired event %s\n%c%s\n%s\n%c%s\n%s%o\n%s%o\n', ['font-weight: bold', 'margin-bottom: 6px'].join(';'), historyEvent.type.toUpperCase(), ['color: rgba(0,0,0,1)', 'padding-bottom: 6px'].join(';'), this.document.text.slice(0, this.elms.editor.cursorPos) + '][' + this.document.text.slice(this.elms.editor.cursorPos, this.document.text.length), this.document.toHtml(), ['color: rgba(0,0,0,.9)', 'line-height: 1.4em'].join(';'), "Document length: ".concat(this.document.text.length, "; Cursor position: ").concat(this.elms.editor.cursorPos), 'Event details:', historyEvent, 'Styles:', this.document.styles);
    }
  }, {
    key: "onTextUpdate",
    value: function onTextUpdate() {
      if (this.document.text.length) {
        this.elms.placeholder.classList.add('invisible');
      } else {
        this.elms.placeholder.classList.remove('invisible');
      }

      var html = this.document.toHtml();
      this.elms.editor.innerHTML = html;
      if (this.outputContainer) this.outputContainer.value = html;
      this.elms.editor.setCursorPos(this.elms.editor.cursorPos);
    }
  }, {
    key: "initEditor",
    value: function initEditor() {
      if (this.document.text.length) {
        this.elms.placeholder.classList.add('invisible');
      } else {
        this.elms.placeholder.classList.remove('invisible');
      }

      this.elms.editor.initIO(this.document);
    }
  }], [{
    key: "observedAttributes",
    get: function get() {
      return ['placeholder', 'output'];
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
    key: "styles",
    // text = '*Привет*, **мир**!\n***Сегодня*** __я__ ~~делаю~~ `маркдаун`!'
    set: function set(value) {},
    get: function get() {
      var _this = this;

      var ranges = {
        bold: [],
        italic: [],
        underline: [],
        strike: [],
        monospace: [],
        service: []
      };

      var process = function process(styleNames, regexp, n) {
        _this.text.replace(regexp, function (fullMatch, match, index) {
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
          return match;
        });
      };

      process(['bold'], /(?<!\*|\\\*)\*{2,2}[^*\n](.+?)[^*]\*{2,2}(?!\*|\\)/gm, 2);
      process(['italic'], /((?<!\*|\\)\*[^*\n].+?[^*|\\]\*(?!\*))/gm, 1);
      process(['bold', 'italic'], /(?<!\*|\\)\*{3,3}[^*\n](.+?)[^*|\\]\*{3,3}(?!\*)/gm, 3);
      process(['underline'], /__(.+?)__/gm, 2);
      process(['strike'], /~~(.+?)~~/gm, 2);
      process(['monospace'], /`([^`]*)`/, 1);
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
        service: {
          openTag: '<span class="service">',
          closeTag: '</span>',
          ranges: ranges.service
        }
      };
    }
  }]);

  return MarkdownDocument;
}(_document__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map