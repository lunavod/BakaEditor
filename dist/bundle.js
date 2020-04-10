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

    _defineProperty(this, "historyOffset", -1);

    _defineProperty(this, "listeners", {});
  }

  _createClass(Document, [{
    key: "undo",
    value: function undo() {
      if (this.historyOffset === this.history.length - 1) return;
      this.historyOffset += 1;
      var item = this.history[this.history.length - this.historyOffset - 1];
      console.log(this.history, this.historyOffset, item);

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
      if (this.historyOffset === 0) return;
      this.historyOffset -= 1;
      var item = this.history[this.history.length - this.historyOffset - 1];
      console.log(this.history, this.historyOffset, item);

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
      this.fireUpdate(historyItem);
    }
  }, {
    key: "replace",
    value: function replace(start, end, value) {
      var save = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
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

      this["delete"](start, end - start, 'back', false);
      if (value) this.insert(start, value, false);
      this.fireUpdate(historyItem);
    }
  }, {
    key: "delete",
    value: function _delete(start, n) {
      var dir = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'back';
      var save = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
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

      if (!this.text.length) return '<div class="empty">&#8203;</div>';
      var allRanges = [];
      var lines = [[]];
      var nodes = [];
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

        if (stylesEqual(currentNode.styles, styles) && (ch !== '\n' || currentNode.styles.indexOf('code') >= 0)) {
          currentNode.end = i;
          currentNode.text += ch === '\n' ? '<br/>' : ch;
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

      for (var _i = 0, _nodes = nodes; _i < _nodes.length; _i++) {
        var node = _nodes[_i];

        var _start = node.styles.map(function (styleName) {
          return _this.styles[styleName].openTag;
        }).join('');

        var _end = node.styles.map(function (styleName) {
          return _this.styles[styleName].closeTag;
        }).join('');

        result += _start + node.text + _end; // if (node.text !== '\n') lineLength += node.text.length
      }

      if (result.endsWith('\n')) result += '&#8203;';
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
      io.addEventListener('undo', function (revertedItem) {
        if (revertedItem.type === 'insert') {
          _this3.setCursorPos(revertedItem.start);
        }

        if (revertedItem.type === 'delete') {
          _this3.setCursorPos(revertedItem.start + revertedItem.n);
        }
      });
      io.addEventListener('redo', function (revertedItem) {
        if (revertedItem.type === 'insert') {
          _this3.setCursorPos(revertedItem.start + revertedItem.value.length);
        }

        if (revertedItem.type === 'delete') {
          _this3.setCursorPos(revertedItem.start);
        }
      });

      var insertText = function insertText(text, range) {
        console.log(range);

        if (range.collapsed) {
          _this3.cursorPos = range.startOffset + text.length;
          io.insert(range.startOffset, text);
        } else {
          _this3.setCursorPos(range.startOffset + text.length + text.length);

          io.replace(range.startOffset, range.endOffset, text);
        }
      };

      this.addEventListener('beforepaste', function (e) {
        e.preventDefault();
        var clipboardData = e.clipboardData || window.clipboardData;
        var pastedData = clipboardData.getData('Text');
        var range = lastSelection && !lastSelection.collapsed ? lastSelection : _this3.getSelection();
        insertText(pastedData, range);
      });
      this.addEventListener('beforeinput', function (e) {
        if (e.inputType !== 'insertText') return;
        e.preventDefault();
        console.log('Last vs new:');
        console.log(lastSelection, _this3.getSelection());
        var range = lastSelection && !lastSelection.collapsed ? lastSelection : _this3.getSelection();
        insertText(e.data, range);
      });
      this.addEventListener('beforeinput', function (e) {
        if (e.inputType !== 'insertParagraph') return;
        e.preventDefault();

        var range = _this3.getSelection();

        console.log(range.startOffset);

        if (range.collapsed) {
          _this3.cursorPos = range.startOffset + 1;

          _this3.setCursorPos(range.startOffset + 1);

          io.insert(range.startOffset, '\n');
          return;
        }

        _this3.cursorPos = range.startOffset + 1;
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
      this.addEventListener('keydown', function (e) {
        if (!e.ctrlKey || e.key !== 'z' || e.shiftKey) return;
        io.undo();
      });
      this.addEventListener('keydown', function (e) {
        if (!e.ctrlKey || e.key !== 'Z' || !e.shiftKey) return;
        console.log('redo');
        io.redo();
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
      if (document.activeElement !== this) return;
      var containerData = this.getContainerAtOffset(offset);
      var node = containerData.line;
      var n = containerData.n;
      if (!node) return;
      if (node.firstChild) node = node.firstChild;

      try {
        var range = window.getSelection().getRangeAt(0);
      } catch (err) {
        return;
      }

      range.setEnd(node, offset - n);
      range.setStart(node, offset - n);
      this.cursorPos = offset;
    }
  }, {
    key: "getCursorPos",
    value: function getCursorPos() {
      var caretOffset = 0;

      try {
        var range = window.getSelection().getRangeAt(0);
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
        range = window.getSelection().getRangeAt(0); // console.log('Original range:', range)
        // return range
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
      var secondOffset = this.getContainerOffset(range.endContainer); // console.log('Offsets:', firstOffset, secondOffset)

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

    _defineProperty(_assertThisInitialized(_this), "template", "<div id=\"wrapper\">\n        <div id=\"buttons\">\n            <a href=\"#\" id=\"bold\" tabindex=\"-1\" class=\"\">B</a>\n            <a href=\"#\" id=\"italic\" tabindex=\"-1\" class=\"\">I</a>\n            <a href=\"#\" id=\"strike\" tabindex=\"-1\" class=\"\">S</a>\n            <a href=\"#\" id=\"underline\" tabindex=\"-1\" class=\"\">U</a>\n            <a href=\"#\" id=\"monospace\" tabindex=\"-1\" class=\"\">M</a>\n        </div>\n        <div id=\"placeholder\">Type: Echo!</div>\n        <baka-editable id=\"editor\" />\n    </div>");

    _defineProperty(_assertThisInitialized(_this), "debug", true);

    _defineProperty(_assertThisInitialized(_this), "elms", {});

    _defineProperty(_assertThisInitialized(_this), "stylesOverride", {});

    _defineProperty(_assertThisInitialized(_this), "outputContainer", void 0);

    _defineProperty(_assertThisInitialized(_this), "originalOutputContainer", void 0);

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

        case 'originaloutput':
          this.originalOutputContainer = document.querySelector(this.getAttribute('originaloutput'));
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
    key: "setText",
    value: function setText(text) {
      this.elms.editor.cursorPos = 0;
      this.document.setText(text);
    }
  }, {
    key: "onTextUpdate",
    value: function onTextUpdate() {
      if (this.document.text.length) {
        this.elms.placeholder.classList.add('invisible');
      } else {
        this.elms.placeholder.classList.remove('invisible');
      }

      this.elms.editor.innerHTML = this.document.toHtml();
      if (this.outputContainer) this.outputContainer.value = this.document.getFinalHtml();
      if (this.originalOutputContainer) this.originalOutputContainer.value = this.document.text;
      this.elms.editor.setCursorPos(this.elms.editor.cursorPos);
      this.dispatchEvent(new CustomEvent('change', {
        detail: {
          original: this.document.text,
          html: this.document.getFinalHtml()
        }
      }));
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
      return ['placeholder', 'output', 'originaloutput'];
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
    key: "getFinalHtml",
    value: function getFinalHtml() {
      var html = this.toHtml();
      html = html.replace(/\n/gm, '<br/>\n');
      return html.replace(/<span class="service">(.+?)<\/span>/gm, '');
    }
  }, {
    key: "styles",
    // text = '```Hello, world!\nIts me, Dio!\n```'
    // text = '*Привет*, **мир**!\n\n***Сегодня*** __я__ ~~делаю~~ `маркдаун`!'
    // text = 'as\ndf'
    set: function set(value) {},
    get: function get() {
      var _this = this;

      var ranges = {
        bold: [],
        italic: [],
        underline: [],
        strike: [],
        monospace: [],
        code: [],
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

      process(['bold'], /(?<!\*|\\\*)\*{2,2}[^*\n]([\s\S]+?)[^*]\*{2,2}(?!\*|\\)/gm, 2);
      process(['italic'], /((?<!\*|\\)\*[^*\n][\s\S]+?[^*|\\]\*(?!\*))/gm, 1);
      process(['bold', 'italic'], /(?<!\*|\\)\*{3,3}[^*\n]([\s\S]+?)[^*|\\]\*{3,3}(?!\*)/gm, 3);
      process(['code'], /(?<!`|\\)`{3,3}[^`]([\s\S]+?)[^`|\\]`{3,3}(?!`)/gm, 3);
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
        code: {
          openTag: '<span class="code">',
          closeTag: '</span>',
          ranges: ranges.code
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