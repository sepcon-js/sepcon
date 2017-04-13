(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.SepCon = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _root = __webpack_require__(17);
	
	var _root2 = _interopRequireDefault(_root);
	
	var _constants = __webpack_require__(1);
	
	var _utils = __webpack_require__(2);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function create(def, type, defs, cls) {
	    var definition = _utils2.default.clone(def);
	
	    if (defs[definition.id]) {
	        this.root.logs.print({
	            title: { content: 'Tried To Create A Definition With Existing Id' },
	            rows: [{ style: 'label', content: 'Object Type' }, { style: 'code', content: type }, { style: 'label', content: 'Existing Id' }, { style: 'code', content: definition.id }]
	        });
	        return false;
	    } else {
	        if (definition.extend) {
	            definition.extend = defs[definition.extend].definition;
	        }
	        if (definition.decorators) {
	            definition.decorators = definition.decorators.map(function (dec) {
	                return _utils2.default.clone(defs[dec].definition);
	            });
	        }
	        defs[definition.id] = new cls(definition, this.root);
	    }
	    return defs[definition.id];
	}
	
	var SepConClass = function () {
	    function SepConClass(options) {
	        _classCallCheck(this, SepConClass);
	
	        if (options) {
	            this.hash = options.hash;
	        }
	        this.root = new _root2.default(this, options);
	        this.classes = this.root.classes;
	        this.setConfiguration = this.root.setConfiguration.bind(this.root);
	
	        this.modify = this.root.executeModifier.bind(this.root);
	    }
	
	    _createClass(SepConClass, [{
	        key: 'createData',
	        value: function createData(def) {
	            return create.call(this, def, 'data', this.root.datas, this.root.classes.Data);
	        }
	    }, {
	        key: 'createModifier',
	        value: function createModifier(def) {
	            return create.call(this, def, 'modifier', this.root.modifiers, this.root.classes.Modifier);
	        }
	    }, {
	        key: 'createComponent',
	        value: function createComponent(def) {
	            var _this = this;
	
	            create.call(this, def, 'component', this.root.components, this.root.classes.ComponentDefinition);
	            return {
	                id: def.id,
	                createTag: function createTag() {
	                    return _this.createTag(def.id);
	                }
	            };
	        }
	    }, {
	        key: 'createTag',
	        value: function createTag(id) {
	            return new this.root.classes.ComponentTag(this, id);
	        }
	    }]);
	
	    return SepConClass;
	}();
	
	var _sepCon = function sepConHandler() {
	    var sepCon = new SepConClass();
	    sepCon.createScope = function () {
	        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	        options.hash = parseInt(Date.now() * 1000 + Math.round(Math.random() * 1000)).toString(36);
	        return new SepConClass(options);
	    };
	    return sepCon;
	}();
	
	exports.SepCon = _sepCon;
	exports.default = _sepCon;

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	//component element tag creation
	var TAG_PREFIX = exports.TAG_PREFIX = 'x-sepcon-';
	var TAG_PROPERTIES = exports.TAG_PROPERTIES = 'data-properties';
	var TAG_METHODS = exports.TAG_METHODS = 'data-methods';
	var TAG_IDENTIFIER = exports.TAG_IDENTIFIER = 'data-identifier';
	
	//web worker events
	var ADD_COMPONENT_DEFINITION = exports.ADD_COMPONENT_DEFINITION = 'add-component-definition';
	var ADD_COMPONENT = exports.ADD_COMPONENT = 'add-component';
	var DATA_CHANGED = exports.DATA_CHANGED = 'data-changed';
	var DATA_CHANGES_AFFECTING = exports.DATA_CHANGES_AFFECTING = 'data-changes-affecting';

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _constants = __webpack_require__(1);
	
	exports.default = {
	    /**
	     * get a deep cloned + extended (if 'to' argument is set) object
	     * @param from
	     * @param to
	     * @returns {object}
	     */
	    clone: function clone(from, to) {
	        if (from === null || (typeof from === 'undefined' ? 'undefined' : _typeof(from)) != "object") return from;
	        if (from.constructor != Object && from.constructor != Array) return from;
	        if (from.constructor == Date || from.constructor == RegExp || from.constructor == Function || from.constructor == String || from.constructor == Number || from.constructor == Boolean) return new from.constructor(from);
	
	        to = to || new from.constructor();
	
	        for (var name in from) {
	            to[name] = typeof to[name] == 'undefined' ? this.clone(from[name], null) : to[name];
	        }
	
	        return to;
	    },
	    extend: function extend(base, _extend) {
	        var res = this.clone(base);
	        if (!res) {
	            res = {};
	        }
	        for (var i in _extend) {
	            if (res.hasOwnProperty(i)) {
	                if (_typeof(_extend[i]) === 'object') {
	                    res[i] = this.extend(base[i], _extend[i]);
	                } else {
	                    res[i] = _extend[i];
	                }
	            } else {
	                res[i] = _extend[i];
	            }
	        }
	        return res;
	    },
	    concatMethods: function concatMethods(meth1, meth2) {
	        return function () {
	            meth1.apply(this, arguments);
	            return meth2.apply(this, arguments);
	        };
	    },
	
	
	    /**
	     * creates method names for lifecycles ("hook":"action" or "action" if not pre/post)
	     * @param hook
	     * @param action
	     * @returns {string}
	     */
	    hookString: function hookString(hook, action) {
	        return (hook ? hook + ':' : '') + action;
	    },
	    formatValueForValidJSON: function formatValueForValidJSON(obj) {
	        if (obj === 0) return 0;
	        if (obj === undefined) return null;
	        if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
	            if (obj instanceof Array) {
	                for (var i = 0, e = obj.length; i < e; i++) {
	                    obj[i] = this.formatValueForValidJSON(obj[i]);
	                }
	            } else {
	                for (var key in obj) {
	                    obj[key] = this.formatValueForValidJSON(obj[key]);
	                }
	            }
	        }
	        return obj;
	    },
	
	
	    //Component Functions
	    isInDome: function isInDome(element) {
	        var parent = element.parentNode;
	        while (parent && parent.tagName.toLowerCase() != 'body') {
	            parent = parent.parentNode;
	        }
	        if (!parent) return false;
	        return true;
	    },
	    isDeepNestedInSameComponent: function isDeepNestedInSameComponent(element) {
	        var path = this.getComponentElementsPath(element, true, true);
	        for (var i = 0, e = path.length - 1; i < e; i++) {
	            if (path[i] === element.tagName) return true;
	        }
	        return false;
	    },
	    getParentComponentElement: function getParentComponentElement(element) {
	        var child = element;
	        var parent = void 0;
	        do {
	            parent = child.parentNode;
	            if (!parent) break;
	            if (parent._componentElement || parent.tagName.toLowerCase().indexOf(_constants.TAG_PREFIX) === 0) {
	                return parent;
	            }
	            child = parent;
	        } while (parent.tagName.toLowerCase() != 'body');
	        return false;
	    },
	    getComponentElementNameForPath: function getComponentElementNameForPath(element) {
	        var id = element.getAttribute(_constants.TAG_IDENTIFIER) || null;
	        if (!id) {
	            var siblings = this.getComponentElementSiblings(element);
	            var siblingsIndex = this.getComponentElementIndex(element, siblings);
	            id = '(' + siblingsIndex + ')';
	        }
	        return element.tagName + ' ' + id;
	    },
	    getComponentElementsPath: function getComponentElementsPath(element, typesOnly, asArray) {
	        var child = element;
	        var parent = void 0;
	        var path = [];
	        do {
	            parent = this.getParentComponentElement(child);
	            if (!typesOnly && parent.tagName) {
	                path.push(this.getComponentElementNameForPath(parent));
	            } else if (parent.tagName) {
	                path.push(parent.tagName);
	            }
	            child = parent;
	        } while (parent);
	        path.reverse();
	        if (!typesOnly) {
	            path.push(this.getComponentElementNameForPath(element));
	        } else {
	            path.push(element.tagName);
	        }
	        if (asArray) return path;
	        return path.join('>');
	    },
	    getComponentElementSiblings: function getComponentElementSiblings(element) {
	        var _this = this;
	
	        var parent = this.getParentComponentElement(element);
	        var siblings = parent ? Array.from(parent.getElementsByTagName(element.tagName)) : [];
	        if (siblings.length > 1) {
	            siblings = siblings.filter(function (node) {
	                if (node._componentElement && node._componentElement.parent === parent) return true;
	                return _this.getParentComponentElement(node) === parent;
	            });
	        }
	        return siblings;
	    },
	    getComponentElementIndex: function getComponentElementIndex(element, siblings) {
	        for (var i = 0, e = siblings.length; i < e; i++) {
	            if (siblings[i] === element) return i;
	        }
	        return 0;
	    },
	    getComponent: function getComponent(list, element) {
	        if (element.component && element.component.mapItem) return element.component.mapItem;
	
	        var path = element._componentElement.path;
	
	        for (var i = 0, e = list.length; i < e; i++) {
	            var _item = list[i];
	            if (_item && (_item.element === element || _item.path === path)) {
	                element.component = _item.element.component;
	                _item.setElement(element);
	                return _item;
	            }
	        }
	        return false;
	    },
	    getLooseComponent: function getLooseComponent(list, element) {
	        var tagName = element.tagName;
	        var id = element.getAttribute(_constants.TAG_IDENTIFIER);
	        var sameTagList = list.filter(function (_item) {
	            return _item && _item.tag === tagName;
	        });
	        var item = null;
	        sameTagList.forEach(function (_item) {
	            if (!item) {
	                var isSameIdentifier = _item.id === id;
	                var isSameTag = _item.tag === tagName;
	                if (isSameTag && isSameIdentifier) {
	                    item = _item;
	                }
	            }
	        });
	
	        if (!id) {
	            item = this.getComponent(sameTagList, element);
	        }
	        return item;
	    }
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	exports.default = {
	    setChanges: function setChanges(source, map, change, isShallow, path, parent, parentKey) {
	        if (!source) {
	            source = {};
	        }
	        if (!map) {
	            map = {};
	        }
	        var changedProps = {};
	        for (var prop in map) {
	            var isSourceObject = _typeof(source[prop]) === 'object' && source[prop] !== null;
	            var isMapObject = _typeof(map[prop]) === 'object' && map[prop] !== null;
	            var isDifferent = false;
	            if (isSourceObject || isMapObject) {
	                var flatSource = source[prop] ? JSON.stringify(source[prop]) : '';
	                var flatMap = map[prop] ? JSON.stringify(map[prop]) : '';
	                isDifferent = flatSource !== flatMap;
	                if (isDifferent) {
	                    var propPath = path ? path + '.' + prop : prop;
	                    changedProps[propPath] = this.getChangedAsObject(source[prop], map[prop]);
	
	                    var changedObject = this.setChanges(source[prop], map[prop], isSourceObject && change, isShallow, propPath, source, prop);
	                    if (Object.keys(changedObject).length > 0) {
	                        Object.assign(changedProps, changedObject);
	                    }
	                }
	            } else {
	                isDifferent = source[prop] != map[prop];
	                if (isDifferent) {
	                    var _propPath = path ? path + '.' + prop : prop;
	                    var clonedNewValue = map[prop] ? JSON.parse(JSON.stringify(map[prop])) : map[prop];
	                    var clonedOldValue = source[prop] ? JSON.parse(JSON.stringify(source[prop])) : source[prop];
	                    changedProps[_propPath] = this.getChangedAsObject(clonedOldValue, clonedNewValue);
	                }
	            }
	
	            if (isDifferent && change) {
	                if (parent) {
	                    if (!parent[parentKey]) {
	                        parent[parentKey] = map;
	                    }
	                    parent[parentKey][prop] = map[prop];
	                } else {
	                    source[prop] = map[prop];
	                }
	            }
	        }
	        return changedProps;
	    },
	    getChangedAsObject: function getChangedAsObject(oldValue, newValue) {
	        return {
	            oldValue: typeof oldValue !== 'undefined' ? JSON.parse(JSON.stringify(oldValue)) : null,
	            newValue: typeof newValue !== 'undefined' ? JSON.parse(JSON.stringify(newValue)) : null
	        };
	    }
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(18);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Logs = function () {
	    function Logs(config) {
	        _classCallCheck(this, Logs);
	
	        this.active = true;
	    }
	
	    _createClass(Logs, [{
	        key: 'setActive',
	        value: function setActive(active) {
	            this.active = active;
	            return this;
	        }
	    }, {
	        key: 'print',
	        value: function print(data) {
	            var _this = this;
	
	            if (!this.active) return false;
	            if (data.content) {
	                this.executeConsole(data);
	            }
	            if (data.title) {
	                data.title.style = 'title';
	                data.title.type = 'groupCollapsed';
	                this.executeConsole(data.title);
	            }
	            data.rows.forEach(function (row) {
	                return _this.executeConsole(row);
	            });
	            if (data.title) {
	                data.title.type = 'groupEnd';
	                this.executeConsole(data.title);
	            }
	        }
	    }, {
	        key: 'getStyle',
	        value: function getStyle(stl) {
	            switch (stl) {
	                case 'title':
	                    return 'font-weight: bold; color: black; background: #f0f0f0; line-height: 1.2em; padding: .1em .2em';
	                case 'label':
	                    return 'color: white; background: #aaaaaa; border-bottom: solid 0.2em #999999; line-height: 1.4em; padding: .1em .2em';
	                case 'code':
	                    return 'font-style: italic; background: #f5f5f5; line-height: 1.2em; padding: .1em 0 .1em';
	                case 'info':
	                    return 'line-height: 1.4em; padding: .1em .2em';
	            }
	            return stl;
	        }
	    }, {
	        key: 'executeConsole',
	        value: function executeConsole(row) {
	            row.type = row.type || 'log';
	            if (_typeof(row.content) === 'object' && row.content !== null && !(row.content instanceof Element)) {
	                row.content = JSON.stringify(row.content, null, 2);
	            }
	            if (row.style) {
	                row.style = this.getStyle(row.style);
	                console[row.type]('%c%s', row.style, row.content);
	            } else {
	                console[row.type](row.content);
	            }
	        }
	    }]);
	
	    return Logs;
	}();
	
	exports.default = Logs;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(2);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var _class = function () {
	    function _class(base, config) {
	        _classCallCheck(this, _class);
	
	        this.base = base;
	        //this.state = comp.state;
	        this.config = config;
	    }
	
	    _createClass(_class, [{
	        key: 'startSequence',
	        value: function startSequence() {
	            var _this = this;
	
	            var sequence = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'mount';
	            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	
	            this.params = params;
	            this.sequence = sequence;
	            this.seq = this.config[sequence];
	
	            var promise = Promise;
	            //this.handleSequenceStep('pre') && this.handleSequenceStep(false) && this.handleSequenceStep('post');
	            if (this.handleSequenceStep('pre')) {
	                promise.resolve().then(function () {
	                    if (_this.handleSequenceStep(false)) {
	                        window.requestAnimationFrame(function () {
	                            //Promise.resolve()
	                            //    .then(()=> {
	                            //post hooks will be executed before next frame
	                            _this.handleSequenceStep('post');
	                            //});
	                        });
	                    }
	                });
	            }
	        }
	    }, {
	        key: 'handleSequenceStep',
	        value: function handleSequenceStep(hook) {
	            for (var i = 0, e = this.seq.sequence.length; i < e; i++) {
	                var sequenceStep = this.seq.sequence[i];
	                var params = this.getStepParams(sequenceStep, hook);
	
	                var target = void 0;
	                switch (sequenceStep.target) {
	                    case 'component':
	                    case 'modifier':
	                        target = this.base.scoped;
	                        break;
	                    case 'state':
	                        target = this.base.state.scoped;
	                        break;
	                }
	                //let target = sequenceStep.target === 'state' ? this.state.scoped : this.component.scoped;
	                var actionHook = _utils2.default.hookString(hook, sequenceStep.action);
	                if (target[actionHook]) {
	                    var res = target[actionHook].apply(target, params);
	                    if (res === false) {
	                        return false;
	                    }
	                    this.handleStepResponse(sequenceStep, hook, res);
	                }
	            }
	            return true;
	        }
	    }, {
	        key: 'getStepParams',
	        value: function getStepParams(step, hook) {
	            if (this.seq.send) {
	                return this.seq.send.apply(this, [step, hook]);
	            } else return this.params;
	        }
	    }, {
	        key: 'handleStepResponse',
	        value: function handleStepResponse(step, hook, res) {
	            if (this.seq.retrieve) {
	                return this.seq.retrieve.apply(this, [step, hook, res]);
	            } else {
	                return res;
	            }
	        }
	    }]);
	
	    return _class;
	}();
	
	exports.default = _class;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var references = new Map();
	var keys = {};
	
	var ReferenceMap = {
	    add: function add(val) {
	        if (references.has(val)) {
	            return references.get(val);
	        } else {
	            var key = parseInt(Date.now() * 1000 + Math.round(Math.random() * 1000)).toString(36);
	            references.set(val, key);
	            keys[key] = val;
	            return key;
	        }
	    },
	    get: function get(key) {
	        if (keys[key] !== undefined) {
	            return keys[key];
	        }
	        return null;
	    }
	};
	
	exports.default = ReferenceMap;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(2);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	__webpack_require__(19);
	
	var _constants = __webpack_require__(1);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	//defining the component and registering its element
	var ComponentDefinition = function () {
	    function ComponentDefinition(def, root) {
	        _classCallCheck(this, ComponentDefinition);
	
	        var definition = def.component;
	        if (def.extend) {
	            definition = _utils2.default.extend(def.extend, def.component);
	            definition.super = def.extend;
	            definition.state.super = def.extend.state;
	        }
	        this.definition = definition;
	        this.root = root;
	        this.tag = _constants.TAG_PREFIX + (this.root.hash ? this.root.hash + '-' : '') + def.id;
	
	        if (def.decorators && def.decorators.length && def.decorators.length > 0) {
	            def.decorators.forEach(this.addDecorator.bind(this));
	        }
	
	        this.root.addComponentDefinition(this);
	        this.registerElement();
	        return this;
	    }
	
	    _createClass(ComponentDefinition, [{
	        key: 'addDecorator',
	        value: function addDecorator(decorator) {
	            if (decorator.state) {
	                if (!this.definition.state) {
	                    this.definition.state = {};
	                }
	                this.addDecoratorToState(decorator);
	            }
	            this.addDecoratorToComponent(decorator);
	        }
	    }, {
	        key: 'addDecoratorToState',
	        value: function addDecoratorToState(decorator) {
	            var _this = this;
	
	            var segs = ['local', 'external', 'global'];
	            if (decorator.state.props) {
	                segs.forEach(function (seg) {
	                    if (decorator.state.props[seg]) {
	                        _this.addToStateSegregation(decorator.state.props[seg], 'props', seg);
	                    }
	                });
	                decorator.state.props = null;
	            }
	            if (decorator.state.methods) {
	                if (!this.definition.state.methods) {
	                    this.definition.state.methods = {};
	                }
	                segs.forEach(function (seg) {
	                    if (decorator.state.methods[seg]) {
	                        _this.addToStateSegregation(decorator.state.methods[seg], 'methods', seg);
	                    }
	                });
	                decorator.state.methods = null;
	            }
	            if (decorator.state.routes) {
	                this.addToStateRoutes(decorator.state.routes);
	                decorator.state.routes = null;
	            }
	            this.addToState(decorator.state);
	            decorator.state = null;
	        }
	    }, {
	        key: 'addToStateSegregation',
	        value: function addToStateSegregation(map, key, seg) {
	            if (!this.definition.state[key]) {
	                this.definition.state[key] = {};
	            }
	            if (!this.definition.state[key][seg]) {
	                this.definition.state[key][seg] = {};
	            }
	            for (var prop in map) {
	                if (!this.definition.state[key][seg][prop]) {
	                    this.definition.state[key][seg][prop] = map[prop];
	                } else if (key === 'methods' && (seg === 'local' || seg === 'eternal')) {
	                    this.definition.state[key][seg][prop] = _utils2.default.concatMethods(map[prop], this.definition.state[key][seg][prop]);
	                }
	            }
	        }
	    }, {
	        key: 'addToStateRoutes',
	        value: function addToStateRoutes(routes) {
	            if (!this.definition.state.routes || this.definition.state.routes.length === 0) {
	                this.definition.state.routes = routes;
	            } else {
	                this.definition.state.routes = this.definition.state.routes.concat(routes);
	            }
	        }
	    }, {
	        key: 'addToState',
	        value: function addToState(map) {
	            for (var prop in map) {
	                if (!this.definition.state[prop]) {
	                    this.definition.state[prop] = map[prop];
	                } else {
	                    if (typeof map[prop] === 'function') {
	                        this.definition.state[prop] = _utils2.default.concatMethods(map[prop], this.definition.state[prop]);
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'addDecoratorToComponent',
	        value: function addDecoratorToComponent(map) {
	            for (var prop in map) {
	                if (!this.definition[prop]) {
	                    this.definition[prop] = map[prop];
	                } else {
	                    if (typeof map[prop] === 'function') {
	                        this.definition[prop] = _utils2.default.concatMethods(map[prop], this.definition[prop]);
	                    }
	                }
	            }
	        }
	
	        //registering a new element to the DOM
	
	    }, {
	        key: 'registerElement',
	        value: function registerElement() {
	            var component = this;
	            var root = this.root;
	            //if no native support on browser
	            if (typeof HTMLElement !== 'function') {
	                var _HTMLElement = function _HTMLElement() {};
	                _HTMLElement.prototype = HTMLElement.prototype;
	                HTMLElement = _HTMLElement;
	            }
	
	            var HTMLComponent = function (_HTMLElement2) {
	                _inherits(HTMLComponent, _HTMLElement2);
	
	                function HTMLComponent() {
	                    _classCallCheck(this, HTMLComponent);
	
	                    return _possibleConstructorReturn(this, (HTMLComponent.__proto__ || Object.getPrototypeOf(HTMLComponent)).apply(this, arguments));
	                }
	
	                _createClass(HTMLComponent, [{
	                    key: 'connectedCallback',
	
	                    /**
	                     * triggered when element is placed in DOM
	                     * @constructor
	                     */
	                    value: function connectedCallback() {
	                        var _this3 = this;
	
	                        var coll = this.children;
	                        var i = coll.length;
	                        var n = i - 1 >> 0;
	                        var childrenArr = [];
	                        while (i--) {
	                            childrenArr[n--] = coll[i];
	                        }
	
	                        this.originalChildren = childrenArr;
	                        this.originalInnerHTML = this.innerHTML;
	                        this.innerHTML = '';
	
	                        Promise.resolve().then(function () {
	                            if (!_utils2.default.isInDome(_this3)) return false;
	                            if (_utils2.default.isDeepNestedInSameComponent(_this3)) {
	                                root.logs.print({
	                                    title: { content: 'Components Cannot Be Nested Inside Themselves' },
	                                    rows: [{ style: 'label', content: 'Components Path' }, { style: 'code', content: _utils2.default.getComponentElementsPath(_this3, true, true) }, { style: 'label', content: 'DOM Element' }, { content: _this3 }]
	                                });
	                                return false;
	                            }
	                            var parent = _utils2.default.getParentComponentElement(_this3);
	                            _this3._componentElement = {
	                                isInitialized: false,
	                                path: _utils2.default.getComponentElementsPath(_this3),
	
	                                /**
	                                 * initialize binding of the element to its component.
	                                 * if such exists - will bind it (if needed) and trigger its 'resume' method
	                                 * if not - will bind a new instance and trigger its 'initialize' method
	                                 */
	                                init: function init() {
	                                    if (!_utils2.default.isInDome(_this3)) {
	                                        _this3.component = false;
	                                        return;
	                                    }
	
	                                    //const parent = common.getParentComponentElement(this);
	                                    //this._componentElement.parent = parent;
	
	                                    var parentComponent = false;
	                                    if (!_this3.component && parent) {
	                                        parentComponent = _utils2.default.getComponent(root.componentElements, parent);
	                                        var thisComponent = parentComponent ? _utils2.default.getLooseComponent(parentComponent.children, _this3) : false;
	                                        if (thisComponent) {
	                                            _this3.component = thisComponent.component;
	                                        }
	                                    }
	
	                                    if (_this3.component) {
	                                        _this3.component.resume(_this3);
	                                    } else {
	                                        _this3.component = new root.classes.Component(component.definition, root, _this3, parentComponent, parent);
	                                        _this3.component.initialize();
	                                    }
	                                    _this3._componentElement.isInitialized = true;
	                                }
	                            };
	                            if (parent) {
	                                var parentHasComponentElement = parent._componentElement;
	                                var parentComponentElementIsInitialized = parentHasComponentElement ? parentHasComponentElement.isInitialized : false;
	                                if (parentHasComponentElement && parentComponentElementIsInitialized) {
	                                    _this3._componentElement.init();
	                                }
	                            } else {
	                                _this3._componentElement.init();
	                            }
	                            root.componentElementAdded(_this3);
	                        });
	                    }
	                }, {
	                    key: 'disconnectedCallback',
	                    value: function disconnectedCallback() {
	                        //root.removeComponentInstance(this.component.id);
	                        if (this.component) {
	                            this.component.onDestroy();
	                        }
	                    }
	                }, {
	                    key: 'attributeChangedCallback',
	                    value: function attributeChangedCallback() {}
	                }]);
	
	                return HTMLComponent;
	            }(HTMLElement);
	
	            customElements.define(this.tag, HTMLComponent);
	        }
	    }]);
	
	    return ComponentDefinition;
	}();
	
	exports.default = ComponentDefinition;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(2);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	var _utils3 = __webpack_require__(3);
	
	var _utils4 = _interopRequireDefault(_utils3);
	
	var _logs = __webpack_require__(4);
	
	var _logs2 = _interopRequireDefault(_logs);
	
	var _constants = __webpack_require__(1);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// will return a wrapped component with the framework's integration layer
	var Component = function () {
	    function Component(componentDefinition, root, element, parent, parentElement) {
	        _classCallCheck(this, Component);
	
	        this.root = root;
	        this.active = false;
	
	        this._eventsCallbacks = {};
	        this.scoped = _utils2.default.clone(componentDefinition);
	        this.scoped.html = element.originalInnerHTML;
	        this.scoped.children = element.originalChildren;
	        this.scoped.element = element;
	        this.scoped.id = element.getAttribute(_constants.TAG_IDENTIFIER);
	
	        delete this.scoped.state;
	        if (this.scoped.super) {
	            delete this.scoped.super.state;
	        }
	
	        this.parent = parent;
	
	        this.state = new this.root.classes.ComponentState(componentDefinition.state, this, this.root);
	        this.sequencer = new this.root.classes.Sequencer(this, this.root.sequencerConfig);
	
	        this.mapItem = this.root.addComponent(this, element, parentElement);
	    }
	
	    _createClass(Component, [{
	        key: 'bindEvents',
	        value: function bindEvents() {
	            var _this = this;
	
	            if (!this.scoped.events) return;
	            if (this.scoped.isInitiatedEvents) {
	                this.unbindEvents();
	            }
	
	            this.scoped.events.forEach(function (evObj) {
	                //getting the target - selector or the whole element
	                var _target = evObj.selector ? _this.scoped.element.querySelectorAll(evObj.selector) : _this.scoped.element;
	                if (!_this.validateEvents(_target, evObj, true)) {
	                    return;
	                }
	                //storing callbacks in a map to keep reference for later unbinding on demand
	                _this._eventsCallbacks[evObj.selector + ':' + evObj.event + ':' + evObj.callback] = _this.scoped[evObj.callback].bind(_this.scoped);
	                _target.forEach(function (trg) {
	                    trg.addEventListener(evObj.event, _this._eventsCallbacks[evObj.selector + ':' + evObj.event + ':' + evObj.callback], false);
	                });
	            });
	            this.scoped.isInitiatedEvents = true;
	        }
	    }, {
	        key: 'unbindEvents',
	        value: function unbindEvents() {
	            var _this2 = this;
	
	            if (!this.scoped.events || !this.scoped.isInitiatedEvents) return;
	
	            this.scoped.events.forEach(function (evObj) {
	                //getting the target - selector or the whole element
	                var _target = evObj.selector ? _this2.scoped.element.querySelector(evObj.selector) : _this2.scoped.element;
	                if (!_this2.validateEvents(_target, evObj)) {
	                    return;
	                }
	                //using the eventsCallback map for live reference for removing it on demand
	                _target.removeEventListener(evObj.event, _this2._eventsCallbacks[evObj.selector + ':' + evObj.event + ':' + evObj.callback], false);
	            });
	            this.scoped.isInitiatedEvents = false;
	        }
	    }, {
	        key: 'validateEvents',
	        value: function validateEvents(el, ev, bind) {
	            if (!el) {
	                this.root.logs.print({
	                    title: { content: 'Could Not Find An Element For ' + (bind ? 'Binding' : 'Unbinding') + ' An Event ' + (bind ? 'To' : 'From') },
	                    rows: [{ style: 'label', content: 'DOM element' }, { style: 'code', content: this.scoped.element }, { style: 'label', content: 'event object' }, { style: 'code', content: ev }]
	                });
	                return false;
	            }
	            if (!this.scoped[ev.callback]) {
	                this.root.logs.print({
	                    title: { content: 'Could Not Find The Specified Handler For ' + (bind ? 'Binding' : 'Unbinding') + ' ' + (bind ? 'To' : 'From') + ' An Event' },
	                    rows: [{ style: 'label', content: 'existing methods' }, { style: 'code', content: Object.keys(this.scoped.methods) }, { style: 'label', content: 'event object' }, { style: 'code', content: ev }]
	                });
	                return false;
	            }
	            return true;
	        }
	    }, {
	        key: 'initialize',
	        value: function initialize(element) {
	            // execute state mount and sync with render sequence
	            this.active = true;
	            this.setStateData();
	            this.sequencer.startSequence('mount');
	        }
	
	        //after change, the element is re-attached to the DOM so have to attach it
	
	    }, {
	        key: 'resume',
	        value: function resume(element) {
	            this.active = true;
	            this.unbindEvents();
	            this.scoped.element = element;
	            if (!this.currentHtml) {
	                this.initialize();
	                return;
	            }
	            this.setStateData();
	            this.updateState();
	            var isInitialHTMLChanged = this.scoped.html != this.scoped.element.originalInnerHTML;
	            this.scoped.html = this.scoped.element.originalInnerHTML;
	            this.scoped.children = this.scoped.element.originalChildren;
	            this.scoped.element.innerHTML = this.currentHtml;
	            this.bindEvents();
	            this.state.addRoutes();
	            var localChanged = _utils4.default.setChanges(this.componentPrevProps, this.scoped.props);
	            if (Object.keys(localChanged).length > 0 || isInitialHTMLChanged) {
	                this.sequencer.startSequence('externalChange', localChanged);
	            }
	        }
	    }, {
	        key: 'updateState',
	        value: function updateState() {
	            this.scoped.props = this.state.getProps();
	            this.scoped.methods = this.state.getMethods();
	        }
	    }, {
	        key: 'setStateData',
	        value: function setStateData() {
	            this.state.setExternals();
	            this.state.updateReferencedProps();
	            this.state.updateGlobalProps();
	            this.mapItem.updateAfterComponentInit();
	        }
	    }, {
	        key: 'onStateChange',
	        value: function onStateChange(changed) {
	            this.sequencer.startSequence('localChange', changed);
	        }
	    }, {
	        key: 'onReferenceChange',
	        value: function onReferenceChange(changed) {
	            var localChanged = this.state.getReferenceStatePropNames(changed);
	            this.sequencer.startSequence('referenceChange', localChanged);
	        }
	    }, {
	        key: 'onGlobalStateChange',
	        value: function onGlobalStateChange(changed) {
	            var localChanged = this.state.getGlobalStatePropNames(changed);
	            this.sequencer.startSequence('globalChange', localChanged);
	        }
	    }, {
	        key: 'onRender',
	        value: function onRender(html) {
	            if (!html || typeof html != 'string') {
	                return;
	            }
	            if (html != this.currentHtml) {
	                this.scoped.element.innerHTML = this.currentHtml = html;
	                this.bindEvents();
	            }
	        }
	    }, {
	        key: 'onDestroy',
	        value: function onDestroy() {
	            this.active = false;
	            this.state.removeRoutes();
	            this.unbindEvents();
	            this.componentPrevProps = _utils2.default.clone(this.scoped.props);
	            this.sequencer.startSequence('destroy');
	        }
	    }]);
	
	    return Component;
	}();
	
	exports.default = Component;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ComponentDefinitionItem = exports.ComponentItem = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _constants = __webpack_require__(1);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function formatGlobals(global) {
	    var globals = {};
	    if (!global) return globals;
	
	    for (var _prop in global) {
	        var prop = global[_prop];
	        var data = prop.data; //data
	        var key = prop.key; //key
	        globals[data] = key;
	    }
	    return globals;
	}
	function isGlobalChanged(global, data, changed) {
	    if (global && global[data]) {
	        for (var i = 0, e = changed.length; i < e; i++) {
	            if (global[data] === changed[i]) {
	                return true;
	            } else if (global[data] && changed[i].indexOf('.') > 0) {
	                var partial = changed[i];
	                do {
	                    partial = partial.substr(0, partial.lastIndexOf('.'));
	                    if (partial.indexOf(global[data]) === 0) {
	                        return true;
	                    }
	                } while (partial.indexOf('.') > -1);
	            }
	        }
	    }
	    return false;
	}
	
	var ComponentItem = function () {
	    function ComponentItem(component, element) {
	        _classCallCheck(this, ComponentItem);
	
	        this.children = [];
	        this.parent = null;
	        this.definition = null;
	        this.component = component;
	        this.setElement(element);
	        this.extractElementData();
	    }
	
	    _createClass(ComponentItem, [{
	        key: 'setParent',
	        value: function setParent(parent) {
	            this.parent = parent;
	        }
	    }, {
	        key: 'addChild',
	        value: function addChild(child) {
	            this.children.push(child);
	        }
	    }, {
	        key: 'setDefinition',
	        value: function setDefinition(definition) {
	            this.definition = definition;
	        }
	    }, {
	        key: 'setElement',
	        value: function setElement(element) {
	            this.element = element;
	            this.id = element.getAttribute(_constants.TAG_IDENTIFIER);
	            this.tag = element.tagName;
	            this.path = element._componentElement.path;
	            if (element.component) {
	                this.component = element.component;
	            }
	            this.extractElementData();
	        }
	    }, {
	        key: 'extractElementData',
	        value: function extractElementData() {
	            this.external = {
	                props: null,
	                methods: null,
	                html: this.element.originalInnerHTML,
	                children: this.element.originalChildren
	            };
	            var props = this.element.getAttribute(_constants.TAG_PROPERTIES);
	            var methods = this.element.getAttribute(_constants.TAG_METHODS);
	            this.external.props = props ? JSON.parse(props) : null;
	            this.external.methods = methods ? JSON.parse(methods) : null;
	        }
	    }, {
	        key: 'updateAfterComponentInit',
	        value: function updateAfterComponentInit() {
	            this.global = formatGlobals(this.component.state.reference.global);
	        }
	    }, {
	        key: 'checkChanged',
	        value: function checkChanged(data, changed) {
	            this.changed = false;
	            if (this.definition.changed) {
	                this.changed = true;
	            } else if (Object.keys(this.global).length > 0) {
	                this.changed = isGlobalChanged(this.global, data, changed);
	            }
	            return this.changed;
	        }
	    }]);
	
	    return ComponentItem;
	}();
	
	var ComponentDefinitionItem = function () {
	    function ComponentDefinitionItem(definition) {
	        _classCallCheck(this, ComponentDefinitionItem);
	
	        this.definition = definition;
	        if (definition.state && definition.state.props && definition.state.props.global) {
	            this.global = formatGlobals(definition.state.props.global);
	        }
	    }
	
	    _createClass(ComponentDefinitionItem, [{
	        key: 'checkChanged',
	        value: function checkChanged(data, changed) {
	            this.changed = isGlobalChanged(this.global, data, changed);
	            return this.changed;
	        }
	    }]);
	
	    return ComponentDefinitionItem;
	}();
	
	exports.ComponentItem = ComponentItem;
	exports.ComponentDefinitionItem = ComponentDefinitionItem;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(2);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	var _utils3 = __webpack_require__(3);
	
	var _utils4 = _interopRequireDefault(_utils3);
	
	var _sequencer = __webpack_require__(5);
	
	var _sequencer2 = _interopRequireDefault(_sequencer);
	
	var _referenceMap = __webpack_require__(6);
	
	var _referenceMap2 = _interopRequireDefault(_referenceMap);
	
	var _constants = __webpack_require__(1);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	var defaultSegregation = {
	    local: {},
	    external: {},
	    global: {}
	};
	
	/**
	 * gives state default values of {
	 *      methods: { local: {}, external: {}, global: {} }
	 *      props: { local: {}, external: {}, global: {} }
	 * }
	 * @param state
	 * @returns {*}
	 * @private
	 */
	var _defaultState = function _defaultState(state) {
	    var defaultAttributes = {
	        methods: {},
	        props: {}
	    };
	    var newState = Object.assign({}, defaultAttributes, state);
	    newState.methods = Object.assign({}, defaultSegregation, newState.methods);
	    newState.props = Object.assign({}, defaultSegregation, newState.props);
	    return newState;
	};
	
	/**
	 * retrieves object with values derived from global data
	 * @param globals - the props.global definition of the original state
	 * @param root - to gain access to the global data
	 * @returns {} - key-value pairs object
	 * @private
	 */
	var _buildGlobalProps = function _buildGlobalProps(globals, root) {
	    var _props = {};
	    if (!globals) return {};
	
	    //takes global from datas
	    for (var prop in globals) {
	        //will need to retrieve the relevant data from datas to the prop
	
	        //will create: arr[0] - data name, arr[1] - data property
	        var dataName = globals[prop].data;
	        var dataKey = globals[prop].key;
	
	        if (!root.datas[dataName]) {
	            root.logs.print({
	                title: { content: 'Trying To Reach An Undefined Data' },
	                rows: [{ style: 'label', content: 'Data Id' }, { style: 'code', content: dataName }]
	            });
	        } else {
	            _props[prop] = root.datas[dataName].getProp(dataKey);
	        }
	    }
	    return JSON.parse(JSON.stringify(_props));
	};
	
	/**
	 * gets a state's segregated methods and returns a given method (by its name) that holds down all chained sequence
	 * @param methods[Object] - all segregated state methods
	 * @param seg[String] - current segment - 'local'/'external'/'global'
	 * @param name[String] - current method name
	 * @returns {method}
	 */
	var chainMethods = function chainMethods(methods, seg, name) {
	    var callStack = [];
	    var hasLocal = false;
	
	    switch (seg) {
	        case 'global':
	            if (methods.global[name]) {
	                callStack.push(methods.global[name]);
	            }
	        /* falls through */
	        case 'external':
	            if (methods.external[name]) {
	                callStack.push(methods.external[name]);
	            }
	        /* falls through */
	        case 'local':
	            if (methods.local[name]) {
	                hasLocal = true;
	                callStack.push(methods.local[name]);
	            }
	        /* falls through */
	    }
	
	    var method = function method() {
	        var tempCallStack = Object.assign([], callStack);
	        var _this = this;
	        var args = [].slice.call(arguments);
	        var res = void 0;
	
	        function next() {
	            args = [].slice.call(arguments);
	            while (tempCallStack.length > 0) {
	                tempCallStack.pop().apply(_this, args);
	            }
	        }
	
	        if (hasLocal) {
	            res = tempCallStack.pop().apply(_this, [next].concat(args));
	        } else {
	            while (tempCallStack.length > 0) {
	                tempCallStack.pop().apply(_this, args);
	            }
	        }
	        return res;
	    };
	    return method;
	};
	
	var changeBindedProps = function changeBindedProps(state, props) {
	    var _loop = function _loop(prop) {
	        if (state.bindings[prop]) {
	            state.bindings[prop].forEach(function (bindedState) {
	                bindedState.component.onReferenceChange(_defineProperty({}, prop, props[prop]));
	            });
	        }
	    };
	
	    for (var prop in props) {
	        _loop(prop);
	    }
	};
	
	/**
	 *
	 * @param state (will also be used as the meta-data reference, e.g. for global properties and external methods)
	 * @param root
	 * @returns new component-instance-state{*}
	 */
	
	var ComponentState = function () {
	    function ComponentState(state, component, root) {
	        var _this2 = this;
	
	        _classCallCheck(this, ComponentState);
	
	        this.root = root;
	        this.definition = _utils2.default.clone(_defaultState(state));
	        this.scoped = _utils2.default.clone(this.definition);
	
	        for (var methodName in this.scoped.methods.local) {
	            this.scoped.methods.local[methodName].bind(this.scoped);
	        }
	
	        for (var _methodName in this.scoped.methods.external) {
	            this.scoped.methods.external[_methodName].bind(this.scoped);
	        }
	
	        var _loop2 = function _loop2(_methodName2) {
	            _this2.scoped.methods.global[_methodName2] = function () {
	                var originalArgs = [].slice.call(arguments);
	                var mergedArgs = [this.definition.methods.global[_methodName2].modifier, this.definition.methods.global[_methodName2].key];
	                if (this.definition.methods.global[_methodName2].pass) {
	                    var passedArgs = this.definition.methods.global[_methodName2].pass.apply(this.scoped, originalArgs);
	                    mergedArgs = mergedArgs.concat(passedArgs);
	                    this.root.executeModifier.apply(this.root, mergedArgs);
	                } else {
	                    mergedArgs = mergedArgs.concat(originalArgs);
	                    this.root.executeModifier.apply(this.root, mergedArgs);
	                }
	            }.bind(_this2);
	        };
	
	        for (var _methodName2 in this.definition.methods.global) {
	            _loop2(_methodName2);
	        }
	
	        this.scoped.setProps = function (props, silent) {
	            var changedProps = _utils4.default.setChanges(_this2.scoped.props.local, props, silent, true);
	            if (silent) {
	                _this2.updateLocalProps(changedProps);
	                return;
	            }
	            if (Object.keys(changedProps).length > 0) {
	                _this2.component.onStateChange(changedProps);
	            }
	        };
	
	        this.scoped.getProps = function () {
	            return _this2.getProps();
	        };
	        this.scoped.getMethods = function () {
	            return _this2.getMethods();
	        };
	
	        this.scoped.router = this.root.router;
	        this.scoped.execute = this.root.executeModifier.bind(this.root);
	        this.scoped.id = component.scoped.id;
	
	        this.component = component;
	
	        this.reference = Object.assign({}, defaultSegregation);
	        this.bindings = {};
	    }
	
	    /**
	     * pass state props to the component instance (without local-external-global segregation)
	     * @returns {*}
	     */
	
	
	    _createClass(ComponentState, [{
	        key: 'getProps',
	        value: function getProps() {
	            var props = _utils2.default.clone(this.scoped.props);
	            var flatProps = Object.assign({}, props.local, props.external, props.global);
	            return flatProps;
	        }
	
	        /**
	         * pass state methods to the component instance (without local-external-global segregation)
	         * on duplications of methodNames in different scopes, will execute all in this order:
	         * local.method(); external.method(); global.method();
	         * @returns {*}
	         */
	
	    }, {
	        key: 'getMethods',
	        value: function getMethods() {
	            var methods = _utils2.default.clone(this.scoped.methods);
	            var segs = ['global', 'external', 'local'];
	            var combinedMethods = {};
	
	            for (var i in segs) {
	                var seg = segs[i];
	                for (var methodName in methods[seg]) {
	                    if (!combinedMethods[methodName]) {
	                        combinedMethods[methodName] = chainMethods(methods, seg, methodName).bind(this.scoped);
	                    }
	                }
	            }
	            return combinedMethods;
	        }
	    }, {
	        key: 'getGlobalDef',
	        value: function getGlobalDef() {
	            var globals = {};
	            if (this.definition.props.global) {
	                Object.assign(globals, this.definition.props.global);
	            }
	            if (this.reference.global) {
	                Object.assign(globals, this.reference.global);
	            }
	            if (Object.keys(globals).length > 0) {
	                return JSON.parse(JSON.stringify(globals));
	            }
	            return null;
	        }
	    }, {
	        key: 'getGlobalStatePropName',
	        value: function getGlobalStatePropName(originalProp) {
	            var globals = this.getGlobalDef();
	            for (var prop in globals) {
	                if (globals[prop].key === originalProp) {
	                    return prop;
	                }
	            }
	        }
	    }, {
	        key: 'getGlobalStatePropNames',
	        value: function getGlobalStatePropNames(props) {
	            var localMap = {};
	            for (var prop in props) {
	                var localProp = this.getGlobalStatePropName(prop);
	                if (localProp !== undefined) localMap[localProp] = props[prop];
	            }
	            return localMap;
	        }
	    }, {
	        key: 'getReferenceStatePropName',
	        value: function getReferenceStatePropName(originalProp) {
	            var segs = ['global', 'external', 'local'];
	            for (var i in segs) {
	                var seg = segs[i];
	                for (var prop in this.reference[seg]) {
	                    if (this.reference[seg][prop].key === originalProp) {
	                        return prop;
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'getReferenceStatePropNames',
	        value: function getReferenceStatePropNames(props) {
	            var localMap = {};
	            for (var prop in props) {
	                var localProp = this.getReferenceStatePropName(prop);
	                if (localProp !== undefined) localMap[localProp] = props[prop];
	            }
	            return localMap;
	        }
	    }, {
	        key: 'updateLocalProps',
	        value: function updateLocalProps(changed) {
	            for (var prop in changed) {
	                this.scoped.props.local[prop] = changed[prop].newValue;
	                changeBindedProps(this, changed);
	            }
	        }
	    }, {
	        key: 'updateReferencedProps',
	        value: function updateReferencedProps() {
	            var _this3 = this;
	
	            if (!this.reference.parent) return;
	            var props = {
	                global: {},
	                external: {},
	                local: {}
	            };
	            props.global = _buildGlobalProps(this.reference.global, this.root);
	            for (var prop in this.reference.external) {
	                var parentStateKey = this.reference.external[prop].key;
	                props.external[prop] = this.reference.parent.props.external[parentStateKey];
	            }
	
	            var _loop3 = function _loop3(_prop) {
	                var bindToRelevantAncestor = function bindToRelevantAncestor(node, prop) {
	                    if (!node) {
	                        return null;
	                    }
	                    if (!node.reference.local[prop]) {
	                        if (node.scoped.props.local[prop]) {
	                            return node.scoped.props.local[prop];
	                        }
	                        return bindToRelevantAncestor(node.reference.parent, prop);
	                    }
	                    var parentStateKey = node.reference.local[prop].key;
	                    if (node.reference.parent.scoped.props.local[parentStateKey]) {
	                        return node.reference.parent.scoped.props.local[parentStateKey];
	                    }
	                    return bindToRelevantAncestor(node.reference.parent, parentStateKey);
	                };
	                props.local[_prop] = bindToRelevantAncestor(_this3, _prop);
	            };
	
	            for (var _prop in this.reference.local) {
	                _loop3(_prop);
	            }
	            var flatProps = Object.assign({}, props.local, props.external, props.global);
	            Object.assign(this.scoped.props.external, flatProps);
	        }
	    }, {
	        key: 'updateGlobalProps',
	        value: function updateGlobalProps() {
	            this.scoped.props.global = _buildGlobalProps(this.definition.props.global, this.root);
	            if (this.reference.parent) {
	                Object.assign(this.scoped.props.external, _buildGlobalProps(this.reference.global, this.root));
	            }
	        }
	
	        /**
	         * sets state external properties and methods
	         */
	
	    }, {
	        key: 'setExternals',
	        value: function setExternals() {
	            if (this.component.mapItem.external.props || this.component.mapItem.external.methods) {
	                //getting all external properties
	                var parentComponent = this.component.parent ? this.component.parent.component : null;
	                var parentState = parentComponent ? parentComponent.state : null;
	
	                if (this.component.mapItem.external.props) {
	                    this.setExternalProperties(this.component.mapItem.external.props, parentState);
	                }
	                if (this.component.mapItem.external.methods) {
	                    this.setExternalMethods(this.component.mapItem.external.methods, parentComponent, parentState);
	                }
	            }
	            if (this.component.mapItem.external.html) {
	                this.scoped.html = this.component.mapItem.external.html;
	            }
	            if (this.component.mapItem.external.children) {
	                this.scoped.children = this.component.mapItem.external.children;
	            }
	        }
	    }, {
	        key: 'setExternalProperties',
	        value: function setExternalProperties(props, parentState) {
	            var externalsProperties = {};
	            var externalReferences = {
	                global: {},
	                external: {},
	                local: {},
	                parent: parentState
	            };
	            for (var prop in props) {
	                var valueObject = props[prop];
	                if (valueObject.reference) {
	                    this.setExternalReferencedProperty({
	                        name: prop,
	                        value: props[prop].reference
	                    }, externalReferences, parentState);
	                } else {
	                    this.setExternalProperty({
	                        name: prop,
	                        value: props[prop].value
	                    }, externalsProperties);
	                }
	            }
	            this.scoped.props.external = externalsProperties;
	            this.reference = externalReferences;
	        }
	    }, {
	        key: 'setExternalProperty',
	        value: function setExternalProperty(item, externalProperties) {
	            externalProperties[item.name] = _referenceMap2.default.get(item.value);
	        }
	    }, {
	        key: 'setExternalReferencedProperty',
	        value: function setExternalReferencedProperty(item, externalReferences, parentState) {
	            var _this4 = this;
	
	            var key = item.name;
	            var path = item.value.split('.');
	            var stateKey = path[0]; //base property in store
	            path.shift();
	            path = path.join('.');
	
	            if (externalReferences.parent.reference.global.hasOwnProperty(stateKey)) {
	                externalReferences.global[key] = externalReferences.parent.reference.global[item.value];
	            } else if (externalReferences.parent.reference.external.hasOwnProperty(stateKey)) {
	                externalReferences.external[key] = externalReferences.parent.reference.external[item.value];
	            } else if (externalReferences.parent.reference.local.hasOwnProperty(stateKey)) {
	                (function () {
	                    externalReferences.local[key] = externalReferences.parent.reference.local[item.value];
	                    var bindToRelevantAncestor = function bindToRelevantAncestor(node, prop) {
	                        if (!node) {
	                            return null;
	                        }
	                        if (!node.reference.local[prop]) {
	                            if (node.scoped.props.local[prop]) {
	                                node.bind(prop, _this4);
	                            } else {
	                                bindToRelevantAncestor(node.reference.parent, prop);
	                            }
	                        } else {
	                            var parentStateKey = node.reference.local[prop].key;
	                            if (node.reference.parent.scoped.props.local[parentStateKey]) {
	                                node.reference.parent.bind(parentStateKey, _this4);
	                            } else {
	                                bindToRelevantAncestor(node.reference.parent, parentStateKey);
	                            }
	                        }
	                    };
	                    bindToRelevantAncestor(externalReferences.parent, stateKey);
	                })();
	            } else if (externalReferences.parent.scoped.props.global.hasOwnProperty(stateKey)) {
	                externalReferences.global[key] = parentState.getGlobalDef()[stateKey];
	                if (path) {
	                    externalReferences.global[key].key += '.' + path;
	                }
	            } else if (externalReferences.parent.scoped.props.external.hasOwnProperty(stateKey)) {
	                externalReferences.external[key] = { key: item.value };
	            } else {
	                externalReferences.local[key] = { key: item.value };
	                parentState.bind(stateKey, this);
	            }
	        }
	    }, {
	        key: 'setExternalMethods',
	        value: function setExternalMethods(methods, parentComponent, parentState) {
	            var externalMethods = {};
	
	            for (var method in methods) {
	                var valueObject = methods[method];
	                if (valueObject.reference) {
	                    this.setExternalReferenceMethod({
	                        name: method,
	                        value: methods[method]
	                    }, externalMethods, parentComponent, parentState);
	                } else {
	                    this.setExternalMethod({
	                        name: method,
	                        value: methods[method].value
	                    }, externalMethods);
	                }
	            }
	            this.scoped.methods.external = Object.assign({}, this.definition.methods.external, externalMethods);
	        }
	    }, {
	        key: 'setExternalMethod',
	        value: function setExternalMethod(item, externalMethods) {
	            externalMethods[item.name] = _referenceMap2.default.get(item.value);
	        }
	    }, {
	        key: 'setExternalReferenceMethod',
	        value: function setExternalReferenceMethod(item, externalMethods, parentComponent, parentState) {
	            var parentMethods = parentState.getMethods();
	            var methodParams = item.value;
	            if (parentMethods[methodParams.reference]) {
	                var methodName = item.name;
	                externalMethods[methodName] = function () {
	                    parentMethods[methodParams.reference].apply(parentComponent, arguments);
	                };
	            }
	        }
	    }, {
	        key: 'bind',
	        value: function bind(prop, state) {
	            if (!this.bindings[prop]) {
	                this.bindings[prop] = [];
	            }
	            this.bindings[prop].push(state);
	        }
	    }, {
	        key: 'addRoutes',
	        value: function addRoutes() {
	            var _this5 = this;
	
	            if (this.definition.routes) {
	                this.definition.routes.forEach(function (i) {
	                    return _this5.root.router.add(i, _this5.scoped);
	                });
	            }
	        }
	    }, {
	        key: 'removeRoutes',
	        value: function removeRoutes() {
	            if (this.definition.routes) {
	                this.root.router.remove(this.scoped);
	            }
	        }
	    }]);
	
	    return ComponentState;
	}();
	
	exports.default = ComponentState;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _referenceMap = __webpack_require__(6);
	
	var _referenceMap2 = _interopRequireDefault(_referenceMap);
	
	var _constants = __webpack_require__(1);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ComponentTag = function () {
	    function ComponentTag(app, tag) {
	        _classCallCheck(this, ComponentTag);
	
	        this._app = app;
	        this._tag = tag;
	        this._methods = {};
	        this._props = {};
	        this._id = null;
	        this._html = null;
	    }
	
	    _createClass(ComponentTag, [{
	        key: 'methods',
	        value: function methods(_methods) {
	            var formedMethods = {};
	            for (var key in _methods) {
	                var method = _methods[key];
	                formedMethods[key] = { value: _referenceMap2.default.add(method) };
	            }
	            Object.assign(this._methods, formedMethods);
	            return this;
	        }
	    }, {
	        key: 'refMethods',
	        value: function refMethods(methods) {
	            var formedMethods = {};
	            for (var key in methods) {
	                var method = methods[key];
	                formedMethods[key] = { reference: method };
	            }
	            Object.assign(this._methods, formedMethods);
	            return this;
	        }
	    }, {
	        key: 'props',
	        value: function props(properties) {
	            var formedProperties = {};
	            for (var key in properties) {
	                var prop = properties[key];
	                formedProperties[key] = { value: _referenceMap2.default.add(prop) };
	            }
	            Object.assign(this._props, formedProperties);
	            return this;
	        }
	    }, {
	        key: 'refProps',
	        value: function refProps(properties) {
	            var formedProperties = {};
	            for (var key in properties) {
	                var prop = properties[key];
	                formedProperties[key] = { reference: prop };
	            }
	            Object.assign(this._props, formedProperties);
	            return this;
	        }
	    }, {
	        key: 'id',
	        value: function id(_id) {
	            this._id = _id;
	            return this;
	        }
	    }, {
	        key: 'render',
	        value: function render(part) {
	            var html = '';
	            if (!part || part === 'open') {
	                //forming the opening tag
	                var htmlArray = [];
	                htmlArray.push('' + _constants.TAG_PREFIX + (this._app.hash ? this._app.hash + '-' : '') + this._tag);
	                if (Object.keys(this._props).length > 0) {
	                    htmlArray.push(_constants.TAG_PROPERTIES + '=\'' + JSON.stringify(this._props) + '\'');
	                }
	                if (Object.keys(this._methods).length > 0) {
	                    htmlArray.push(_constants.TAG_METHODS + '=\'' + JSON.stringify(this._methods) + '\'');
	                }
	                if (this._id) {
	                    htmlArray.push(_constants.TAG_IDENTIFIER + '="' + this._id + '"');
	                }
	                html = '<' + htmlArray.join(' ') + '>';
	            }
	            if (!part) {
	                //forming the initial innerHTML
	                if (this._html) {
	                    html += this._html;
	                }
	            }
	            if (!part || part === 'close') {
	                //forming the closing tag
	                html += '</' + _constants.TAG_PREFIX + (this._app.hash ? this._app.hash + '-' : '') + this._tag + '>';
	            }
	            return html;
	        }
	    }]);
	
	    return ComponentTag;
	}();
	
	exports.default = ComponentTag;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(2);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	var _utils3 = __webpack_require__(3);
	
	var _utils4 = _interopRequireDefault(_utils3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Data = function () {
	    function Data(def, root) {
	        _classCallCheck(this, Data);
	
	        this.root = root;
	
	        var definition = def.data;
	        if (def.extend) {
	            definition = _utils2.default.extend(def.extend.data, def.data);
	        }
	        this.definition = _utils2.default.clone(def);
	        this.data = definition;
	    }
	
	    _createClass(Data, [{
	        key: 'setProps',
	        value: function setProps(props) {
	            props = _utils2.default.formatValueForValidJSON(props);
	            return _utils4.default.setChanges(this.data, props, true);
	        }
	    }, {
	        key: 'resetProps',
	        value: function resetProps() {
	            var props = _utils2.default.formatValueForValidJSON(this.definition.data);
	            return _utils4.default.setChanges(this.data, props, true);
	        }
	        /**
	         * gets an array of keys and returns an object of these keys, populated by corresponding values
	         * @param props[Array]
	         * @returns {{}} key-value map
	         */
	
	    }, {
	        key: 'getProps',
	        value: function getProps(props) {
	            var map = {};
	            if (!props) {
	                map = _utils2.default.clone(this.data);
	            } else {
	                for (var i = 0, e = props.length; i < e; i++) {
	                    map[props[i]] = _typeof(props[i]) === 'object' ? this.getProp(props[i].key, props[i].index) : this.getProp(props[i]);
	                }
	            }
	            return map;
	        }
	    }, {
	        key: 'getProp',
	        value: function getProp(prop) {
	            var props = prop.split('.');
	            var value = this.data;
	            for (var i = 0, e = props.length; i < e; i++) {
	                if (value[props[i]] === undefined) {
	                    this.root.logs.print({
	                        title: { content: 'Could Not Find a Requested Data Property' },
	                        rows: [{ style: 'label', content: 'Data Id' }, { style: 'code', content: this.definition.id }, { style: 'label', content: 'Properties Path' }, { style: 'code', content: prop }, { style: 'label', content: 'Data (snapshot)' }, { style: 'code', content: _utils2.default.clone(this.data) }]
	                    });
	                    return undefined;
	                }
	                value = value[props[i]];
	            }
	            switch (typeof value === 'undefined' ? 'undefined' : _typeof(value)) {
	                case 'string':case 'number':
	                    return value;
	            }
	            return JSON.parse(JSON.stringify(value)); //fast clone of an object
	        }
	    }]);
	
	    return Data;
	}();
	
	exports.default = Data;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(2);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Modifier = function () {
	    function Modifier(def, root) {
	        var _this = this;
	
	        _classCallCheck(this, Modifier);
	
	        var definition = def.modifier;
	        if (def.extend) {
	            definition = _utils2.default.extend(def.extend, def.modifier);
	            definition.super = def.extend;
	        }
	        this.definition = definition;
	        this.root = root;
	        this.scoped = _utils2.default.clone(definition);
	        this.debounced = {};
	
	        for (var methodName in this.scoped.methods) {
	            this.scoped.methods[methodName] = this.scoped.methods[methodName].bind(this.scoped);
	        }
	
	        this.scoped.resetProps = function (data) {
	            _this.root.changedData(data, _this.root.datas[data].resetProps());
	        };
	        this.scoped.setProps = function (data, propsMap) {
	            var props = _utils2.default.clone(propsMap);
	            _this.root.changedData(data, _this.root.datas[data].setProps(props));
	        };
	        this.scoped.getProp = function (data, prop) {
	            return _this.root.datas[data].getProp(prop);
	        };
	        this.scoped.getProps = function (data, propsMap) {
	            return _this.root.datas[data].getProps(propsMap);
	        };
	
	        this.scoped.router = this.root.router;
	
	        this.sequencer = new root.classes.Sequencer(this, root.sequencerConfig);
	        this.sequencer.startSequence('mountModifier');
	    }
	
	    //stacking all modifier requests to debounce them
	
	
	    _createClass(Modifier, [{
	        key: 'stack',
	        value: function stack(method, params) {
	            this.debounced[method] = params;
	        }
	        //execution will iterate over all stacked calls
	
	    }, {
	        key: 'execute',
	        value: function execute() {
	            for (var method in this.debounced) {
	                this.scoped.methods[method].apply(this.scoped, this.debounced[method]);
	            }
	            this.debounced = {};
	        }
	    }, {
	        key: 'has',
	        value: function has(id) {
	            return !!this.scoped.methods[id];
	        }
	    }, {
	        key: 'addRoutes',
	        value: function addRoutes() {
	            var _this2 = this;
	
	            if (this.definition.routes) {
	                this.definition.routes.forEach(function (i) {
	                    return _this2.root.router.add(i, _this2.scoped);
	                });
	            }
	        }
	    }]);
	
	    return Modifier;
	}();
	
	exports.default = Modifier;

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Router = function () {
	    function Router(config) {
	        _classCallCheck(this, Router);
	
	        this.routes = [];
	        if (config) {
	            this.config(config);
	        }
	    }
	
	    _createClass(Router, [{
	        key: 'config',
	        value: function config(options) {
	            if (options.mode && options.mode === 'history' && !!history.pushState) {
	                this.mode = 'history';
	            } else {
	                this.mode = 'hash';
	            }
	            if (options.root) {
	                this.root = this.clearSlashes(options.root) + '/';
	            } else {
	                this.root = '/';
	            }
	            return this;
	        }
	    }, {
	        key: 'getFragment',
	        value: function getFragment() {
	            var fragment = '';
	            if (this.mode === 'history') {
	                fragment = this.clearSlashes(decodeURI(location.pathname + location.search));
	                fragment = fragment.replace(/\?(.*)$/, '');
	                fragment = this.root != '/' ? fragment.replace(this.root, '') : fragment;
	            } else {
	                var match = window.location.href.match(/#(.*)$/);
	                fragment = match ? match[1] : '';
	            }
	            return this.clearSlashes(fragment);
	        }
	    }, {
	        key: 'clearSlashes',
	        value: function clearSlashes(path) {
	            return path.toString().replace(/\/$/, '').replace(/^\//, '');
	        }
	    }, {
	        key: 'add',
	        value: function add(route, state) {
	            route.state = state;
	            this.routes.push(route);
	            var execute = this.check(null, route);
	            this.executeHandlers(execute);
	            return this;
	        }
	    }, {
	        key: 'remove',
	        value: function remove(state) {
	            for (var i = 0; i < this.routes.length; i++) {
	                var r = this.routes[i];
	                if (r.state === state) {
	                    this.routes.splice(i, 1);
	                    return this;
	                }
	            }
	            return this;
	        }
	    }, {
	        key: 'flush',
	        value: function flush() {
	            this.routes = [];
	            this.mode = null;
	            this.root = '/';
	            return this;
	        }
	    }, {
	        key: 'check',
	        value: function check(f, route) {
	            function checkRoute(route) {
	                var match = fragment.match(route.match);
	                if (match) {
	                    return true;
	                }
	            }
	            var fragment = f || this.getFragment();
	            var handlers = [];
	            if (route) {
	                if (checkRoute(route)) {
	                    handlers.push(route);
	                }
	            } else {
	                for (var i = 0; i < this.routes.length; i++) {
	                    if (checkRoute(this.routes[i])) {
	                        handlers.push(this.routes[i]);
	                    }
	                }
	            }
	            return handlers;
	        }
	    }, {
	        key: 'executeHandlers',
	        value: function executeHandlers(matches) {
	            if (matches.length === 0) return;
	            for (var i = 0, e = matches.length; i < e; i++) {
	                matches[i].handler.call(matches[i].state);
	            }
	        }
	    }, {
	        key: 'listen',
	        value: function listen() {
	            var self = this;
	            var current = self.getFragment();
	            var fn = function fn() {
	                if (current !== self.getFragment()) {
	                    current = self.getFragment();
	                    var handlers = self.check(current);
	                    self.executeHandlers(handlers);
	                }
	            };
	            clearInterval(this.interval);
	            this.interval = setInterval(fn, 50);
	            return this;
	        }
	    }, {
	        key: 'navigate',
	        value: function navigate(path) {
	            path = path ? path : '';
	            if (this.mode === 'history') {
	                history.pushState(null, null, this.root + this.clearSlashes(path));
	            } else {
	                window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
	            }
	            return this;
	        }
	    }]);
	
	    return Router;
	}();
	
	exports.default = Router;

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    mode: 'history',
	    root: '/'
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    mount: {
	        send: function send(step, hook) {
	            if (step.target === 'state') {
	                if (hook === 'pre') {
	                    this.base.state.addRoutes();
	                }
	            } else {
	                this.base.updateState();
	            }
	            return [this.params];
	        },
	        retrieve: function retrieve(step, hook, res) {
	            if (step.target === 'component') {
	                this.base.onRender(res);
	            }
	        },
	        sequence: [{
	            target: 'state',
	            action: 'mount'
	        }, {
	            target: 'component',
	            action: 'render'
	        }]
	    },
	    localChange: {
	        send: function send(step, hook) {
	            if (step.target === 'state') {
	                if (hook === false) {
	                    this.base.state.updateLocalProps(this.params);
	                    this.base.updateState();
	                }
	            } else {
	                this.base.updateState();
	            }
	            return [this.params];
	        },
	        retrieve: function retrieve(step, hook, res) {
	            if (step.target === 'component') {
	                this.base.onRender(res);
	            }
	        },
	        sequence: [{
	            target: 'state',
	            action: 'change'
	        }, {
	            target: 'component',
	            action: 'render'
	        }]
	    },
	    externalChange: {
	        send: function send(step, hook) {
	            if (step.target === 'component') {
	                this.base.updateState();
	            }
	            return [this.params];
	        },
	        retrieve: function retrieve(step, hook, res) {
	            if (step.target === 'component') {
	                this.base.onRender(res);
	            }
	        },
	        sequence: [{
	            target: 'state',
	            action: 'change'
	        }, {
	            target: 'component',
	            action: 'render'
	        }]
	    },
	    globalChange: {
	        send: function send(step, hook) {
	            if (step.target === 'state') {
	                if (hook === false) {
	                    this.base.state.updateGlobalProps();
	                    this.base.updateState();
	                }
	            } else {
	                this.base.updateState();
	            }
	            return [this.params];
	        },
	        retrieve: function retrieve(step, hook, res) {
	            if (step.target === 'component') {
	                this.base.onRender(res);
	            }
	        },
	        sequence: [{
	            target: 'state',
	            action: 'change'
	        }, {
	            target: 'component',
	            action: 'render'
	        }]
	    },
	    referenceChange: {
	        send: function send(step, hook) {
	            if (step.target === 'state') {
	                if (hook === false) {
	                    this.base.state.updateReferencedProps();
	                }
	            } else {
	                this.base.updateState();
	            }
	            return [this.params];
	        },
	        retrieve: function retrieve(step, hook, res) {
	            if (step.target === 'component') {
	                this.base.onRender(res);
	            }
	        },
	        sequence: [{
	            target: 'state',
	            action: 'change'
	        }, {
	            target: 'component',
	            action: 'render'
	        }]
	    },
	
	    destroy: {
	        send: function send(step, hook) {
	            return [];
	        },
	        retrieve: function retrieve(step, hook, res) {},
	        sequence: [{
	            target: 'state',
	            action: 'destroy'
	        }, {
	            target: 'component',
	            action: 'destroy'
	        }]
	    },
	
	    mountModifier: {
	        send: function send(step, hook) {
	            if (hook === 'pre') {
	                this.base.addRoutes();
	            }
	            return [this.params];
	        },
	        sequence: [{
	            target: 'modifier',
	            action: 'mount'
	        }]
	    }
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _componentDefinition = __webpack_require__(7);
	
	var _componentDefinition2 = _interopRequireDefault(_componentDefinition);
	
	var _component = __webpack_require__(8);
	
	var _component2 = _interopRequireDefault(_component);
	
	var _componentState = __webpack_require__(10);
	
	var _componentState2 = _interopRequireDefault(_componentState);
	
	var _modifier2 = __webpack_require__(13);
	
	var _modifier3 = _interopRequireDefault(_modifier2);
	
	var _data = __webpack_require__(12);
	
	var _data2 = _interopRequireDefault(_data);
	
	var _componentTag = __webpack_require__(11);
	
	var _componentTag2 = _interopRequireDefault(_componentTag);
	
	var _sequencer = __webpack_require__(5);
	
	var _sequencer2 = _interopRequireDefault(_sequencer);
	
	var _router = __webpack_require__(14);
	
	var _router2 = _interopRequireDefault(_router);
	
	var _logs = __webpack_require__(4);
	
	var _logs2 = _interopRequireDefault(_logs);
	
	var _utils = __webpack_require__(2);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	var _componentMapping = __webpack_require__(9);
	
	var _constants = __webpack_require__(1);
	
	var _sequencerConfig = __webpack_require__(16);
	
	var _sequencerConfig2 = _interopRequireDefault(_sequencerConfig);
	
	var _routerConfig = __webpack_require__(15);
	
	var _routerConfig2 = _interopRequireDefault(_routerConfig);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var router = new _router2.default();
	
	var Root = function () {
	    function Root(app, options) {
	        _classCallCheck(this, Root);
	
	        this.classes = {
	            ComponentDefinition: _componentDefinition2.default,
	            Component: _component2.default,
	            ComponentState: _componentState2.default,
	            Modifier: _modifier3.default,
	            Data: _data2.default,
	            ComponentTag: _componentTag2.default,
	            Sequencer: _sequencer2.default,
	            Logs: _logs2.default
	        };
	
	        //globals
	        this.components = [];
	        this.componentsDefinition = [];
	        this.componentElements = [];
	        this.router = router;
	        this.logs = new _logs2.default();
	
	        //scoped
	        this.datas = {};
	        this.modifiers = {};
	        this.modifiers = {};
	
	        //application closure
	        if (app.hash) {
	            this.hash = app.hash;
	        }
	
	        this.sequencerConfig = _utils2.default.clone(_sequencerConfig2.default);
	        this.routerConfig = _utils2.default.clone(_routerConfig2.default);
	
	        this.setConfiguration(options);
	
	        this.router.config(this.routerConfig);
	        this.router.listen();
	    }
	
	    _createClass(Root, [{
	        key: 'setConfiguration',
	        value: function setConfiguration(config) {
	            if (config) {
	                if (config.sequencer) {
	                    this.sequencerConfig = Object.assign(this.sequencerConfig, config.sequencer);
	                }
	                if (config.router) {
	                    this.routerConfig = Object.assign(this.routerConfig, config.router);
	                    this.router.config(this.routerConfig);
	                }
	                if (config.logs !== undefined) {
	                    this.logs.setActive(config.logs);
	                }
	            }
	        }
	
	        /* application's global functionality */
	
	    }, {
	        key: 'executeModifier',
	        value: function executeModifier(modifier, key) {
	            var _this = this;
	
	            var originalArgs = [].slice.call(arguments);
	            var passedArgs = originalArgs.slice(2);
	            if (this.modifiers[modifier] && this.modifiers[modifier].has(key)) {
	                this.modifiers[modifier].stack(key, passedArgs);
	            }
	            //should execute after current runtime for cases of multiple changes of the same data
	            Promise.resolve().then(function () {
	                for (var _modifier in _this.modifiers) {
	                    _this.modifiers[_modifier].execute();
	                }
	            });
	        }
	    }, {
	        key: 'changedData',
	        value: function changedData(data, changed) {
	            if (Object.keys(changed).length === 0) return;
	
	            for (var definition in this.componentsDefinition) {
	                this.componentsDefinition[definition].checkChanged(data, Object.keys(changed));
	            }
	            this.componentElements.forEach(function (item) {
	                if (item.element.component.active) {
	                    if (item.checkChanged(data, Object.keys(changed))) {
	                        item.element.component.onGlobalStateChange(changed);
	                    }
	                }
	            });
	        }
	    }, {
	        key: 'addComponentDefinition',
	        value: function addComponentDefinition(component) {
	            this.componentsDefinition[component.tag] = new _componentMapping.ComponentDefinitionItem(component.definition);
	        }
	
	        /**
	         * adding new component elements to global array
	         * after debounce will itterate
	         * @param element
	         */
	
	    }, {
	        key: 'componentElementAdded',
	        value: function componentElementAdded() {
	            this.componentElements.forEach(function (componentItem) {
	                if (!componentItem.element._componentElement.isInitialized) {
	                    if (componentItem.parent === null) {
	                        componentItem.element._componentElement.init();
	                    } else if (componentItem.parent._componentElement && componentItem.parent._componentElement.isInitialized) {
	                        componentItem.element._componentElement.init();
	                    }
	                }
	            });
	        }
	
	        /**
	         * informs the framework about a new component-instance
	         * creates unique ID (component-instances array's length)
	         * @param component
	         * @param element - the component's actual DOM element
	         * @param parent - the DOM element's component-parent's DOM element
	         * @returns {}
	         */
	
	    }, {
	        key: 'addComponent',
	        value: function addComponent(component, element, parent) {
	            var componentItem = new _componentMapping.ComponentItem(component, element);
	            this.componentElements.push(componentItem);
	
	            this.componentElements.forEach(function (item) {
	                if (componentItem.parent === null && item.element === parent) {
	                    componentItem.setParent(item);
	                }
	            });
	            if (componentItem.parent !== null) {
	                componentItem.parent.addChild(componentItem);
	            }
	            componentItem.setDefinition(this.componentsDefinition[componentItem.tag.toLowerCase()]);
	            return componentItem;
	        }
	    }]);
	
	    return Root;
	}();
	
	exports.default = Root;

/***/ },
/* 18 */
/***/ function(module, exports) {

	// Console-polyfill. MIT license.
	// https://github.com/paulmillr/console-polyfill
	// Make it safe to do console.log() always.
	(function(global) {
	  'use strict';
	  if (!global.console) {
	    global.console = {};
	  }
	  var con = global.console;
	  var prop, method;
	  var dummy = function() {};
	  var properties = ['memory'];
	  var methods = ('assert,clear,count,debug,dir,dirxml,error,exception,group,' +
	     'groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,' +
	     'show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn').split(',');
	  while (prop = properties.pop()) if (!con[prop]) con[prop] = {};
	  while (method = methods.pop()) if (typeof con[method] !== 'function') con[method] = dummy;
	  // Using `this` for web workers & supports Browserify / Webpack.
	})(typeof window === 'undefined' ? this : window);


/***/ },
/* 19 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/*!
	
	Copyright (C) 2014-2016 by Andrea Giammarchi - @WebReflection
	
	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:
	
	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.
	
	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.
	
	*/
	// global window Object
	// optional polyfill info
	//    'auto' used by default, everything is feature detected
	//    'force' use the polyfill even if not fully needed
	function installCustomElements(window, polyfill) {'use strict';
	
	  // DO NOT USE THIS FILE DIRECTLY, IT WON'T WORK
	  // THIS IS A PROJECT BASED ON A BUILD SYSTEM
	  // THIS FILE IS JUST WRAPPED UP RESULTING IN
	  // build/document-register-element.node.js
	
	  var
	    document = window.document,
	    Object = window.Object
	  ;
	
	  var htmlClass = (function (info) {
	    // (C) Andrea Giammarchi - @WebReflection - MIT Style
	    var
	      catchClass = /^[A-Z]+[a-z]/,
	      filterBy = function (re) {
	        var arr = [], tag;
	        for (tag in register) {
	          if (re.test(tag)) arr.push(tag);
	        }
	        return arr;
	      },
	      add = function (Class, tag) {
	        tag = tag.toLowerCase();
	        if (!(tag in register)) {
	          register[Class] = (register[Class] || []).concat(tag);
	          register[tag] = (register[tag.toUpperCase()] = Class);
	        }
	      },
	      register = (Object.create || Object)(null),
	      htmlClass = {},
	      i, section, tags, Class
	    ;
	    for (section in info) {
	      for (Class in info[section]) {
	        tags = info[section][Class];
	        register[Class] = tags;
	        for (i = 0; i < tags.length; i++) {
	          register[tags[i].toLowerCase()] =
	          register[tags[i].toUpperCase()] = Class;
	        }
	      }
	    }
	    htmlClass.get = function get(tagOrClass) {
	      return typeof tagOrClass === 'string' ?
	        (register[tagOrClass] || (catchClass.test(tagOrClass) ? [] : '')) :
	        filterBy(tagOrClass);
	    };
	    htmlClass.set = function set(tag, Class) {
	      return (catchClass.test(tag) ?
	        add(tag, Class) :
	        add(Class, tag)
	      ), htmlClass;
	    };
	    return htmlClass;
	  }({
	    "collections": {
	      "HTMLAllCollection": [
	        "all"
	      ],
	      "HTMLCollection": [
	        "forms"
	      ],
	      "HTMLFormControlsCollection": [
	        "elements"
	      ],
	      "HTMLOptionsCollection": [
	        "options"
	      ]
	    },
	    "elements": {
	      "Element": [
	        "element"
	      ],
	      "HTMLAnchorElement": [
	        "a"
	      ],
	      "HTMLAppletElement": [
	        "applet"
	      ],
	      "HTMLAreaElement": [
	        "area"
	      ],
	      "HTMLAttachmentElement": [
	        "attachment"
	      ],
	      "HTMLAudioElement": [
	        "audio"
	      ],
	      "HTMLBRElement": [
	        "br"
	      ],
	      "HTMLBaseElement": [
	        "base"
	      ],
	      "HTMLBodyElement": [
	        "body"
	      ],
	      "HTMLButtonElement": [
	        "button"
	      ],
	      "HTMLCanvasElement": [
	        "canvas"
	      ],
	      "HTMLContentElement": [
	        "content"
	      ],
	      "HTMLDListElement": [
	        "dl"
	      ],
	      "HTMLDataElement": [
	        "data"
	      ],
	      "HTMLDataListElement": [
	        "datalist"
	      ],
	      "HTMLDetailsElement": [
	        "details"
	      ],
	      "HTMLDialogElement": [
	        "dialog"
	      ],
	      "HTMLDirectoryElement": [
	        "dir"
	      ],
	      "HTMLDivElement": [
	        "div"
	      ],
	      "HTMLDocument": [
	        "document"
	      ],
	      "HTMLElement": [
	        "element",
	        "abbr",
	        "address",
	        "article",
	        "aside",
	        "b",
	        "bdi",
	        "bdo",
	        "cite",
	        "code",
	        "command",
	        "dd",
	        "dfn",
	        "dt",
	        "em",
	        "figcaption",
	        "figure",
	        "footer",
	        "header",
	        "i",
	        "kbd",
	        "mark",
	        "nav",
	        "noscript",
	        "rp",
	        "rt",
	        "ruby",
	        "s",
	        "samp",
	        "section",
	        "small",
	        "strong",
	        "sub",
	        "summary",
	        "sup",
	        "u",
	        "var",
	        "wbr"
	      ],
	      "HTMLEmbedElement": [
	        "embed"
	      ],
	      "HTMLFieldSetElement": [
	        "fieldset"
	      ],
	      "HTMLFontElement": [
	        "font"
	      ],
	      "HTMLFormElement": [
	        "form"
	      ],
	      "HTMLFrameElement": [
	        "frame"
	      ],
	      "HTMLFrameSetElement": [
	        "frameset"
	      ],
	      "HTMLHRElement": [
	        "hr"
	      ],
	      "HTMLHeadElement": [
	        "head"
	      ],
	      "HTMLHeadingElement": [
	        "h1",
	        "h2",
	        "h3",
	        "h4",
	        "h5",
	        "h6"
	      ],
	      "HTMLHtmlElement": [
	        "html"
	      ],
	      "HTMLIFrameElement": [
	        "iframe"
	      ],
	      "HTMLImageElement": [
	        "img"
	      ],
	      "HTMLInputElement": [
	        "input"
	      ],
	      "HTMLKeygenElement": [
	        "keygen"
	      ],
	      "HTMLLIElement": [
	        "li"
	      ],
	      "HTMLLabelElement": [
	        "label"
	      ],
	      "HTMLLegendElement": [
	        "legend"
	      ],
	      "HTMLLinkElement": [
	        "link"
	      ],
	      "HTMLMapElement": [
	        "map"
	      ],
	      "HTMLMarqueeElement": [
	        "marquee"
	      ],
	      "HTMLMediaElement": [
	        "media"
	      ],
	      "HTMLMenuElement": [
	        "menu"
	      ],
	      "HTMLMenuItemElement": [
	        "menuitem"
	      ],
	      "HTMLMetaElement": [
	        "meta"
	      ],
	      "HTMLMeterElement": [
	        "meter"
	      ],
	      "HTMLModElement": [
	        "del",
	        "ins"
	      ],
	      "HTMLOListElement": [
	        "ol"
	      ],
	      "HTMLObjectElement": [
	        "object"
	      ],
	      "HTMLOptGroupElement": [
	        "optgroup"
	      ],
	      "HTMLOptionElement": [
	        "option"
	      ],
	      "HTMLOutputElement": [
	        "output"
	      ],
	      "HTMLParagraphElement": [
	        "p"
	      ],
	      "HTMLParamElement": [
	        "param"
	      ],
	      "HTMLPictureElement": [
	        "picture"
	      ],
	      "HTMLPreElement": [
	        "pre"
	      ],
	      "HTMLProgressElement": [
	        "progress"
	      ],
	      "HTMLQuoteElement": [
	        "blockquote",
	        "q",
	        "quote"
	      ],
	      "HTMLScriptElement": [
	        "script"
	      ],
	      "HTMLSelectElement": [
	        "select"
	      ],
	      "HTMLShadowElement": [
	        "shadow"
	      ],
	      "HTMLSlotElement": [
	        "slot"
	      ],
	      "HTMLSourceElement": [
	        "source"
	      ],
	      "HTMLSpanElement": [
	        "span"
	      ],
	      "HTMLStyleElement": [
	        "style"
	      ],
	      "HTMLTableCaptionElement": [
	        "caption"
	      ],
	      "HTMLTableCellElement": [
	        "td",
	        "th"
	      ],
	      "HTMLTableColElement": [
	        "col",
	        "colgroup"
	      ],
	      "HTMLTableElement": [
	        "table"
	      ],
	      "HTMLTableRowElement": [
	        "tr"
	      ],
	      "HTMLTableSectionElement": [
	        "thead",
	        "tbody",
	        "tfoot"
	      ],
	      "HTMLTemplateElement": [
	        "template"
	      ],
	      "HTMLTextAreaElement": [
	        "textarea"
	      ],
	      "HTMLTimeElement": [
	        "time"
	      ],
	      "HTMLTitleElement": [
	        "title"
	      ],
	      "HTMLTrackElement": [
	        "track"
	      ],
	      "HTMLUListElement": [
	        "ul"
	      ],
	      "HTMLUnknownElement": [
	        "unknown",
	        "vhgroupv",
	        "vkeygen"
	      ],
	      "HTMLVideoElement": [
	        "video"
	      ]
	    },
	    "nodes": {
	      "Attr": [
	        "node"
	      ],
	      "Audio": [
	        "audio"
	      ],
	      "CDATASection": [
	        "node"
	      ],
	      "CharacterData": [
	        "node"
	      ],
	      "Comment": [
	        "#comment"
	      ],
	      "Document": [
	        "#document"
	      ],
	      "DocumentFragment": [
	        "#document-fragment"
	      ],
	      "DocumentType": [
	        "node"
	      ],
	      "HTMLDocument": [
	        "#document"
	      ],
	      "Image": [
	        "img"
	      ],
	      "Option": [
	        "option"
	      ],
	      "ProcessingInstruction": [
	        "node"
	      ],
	      "ShadowRoot": [
	        "#shadow-root"
	      ],
	      "Text": [
	        "#text"
	      ],
	      "XMLDocument": [
	        "xml"
	      ]
	    }
	  }));
	  
	  
	    
	  // passed at runtime, configurable
	  // via nodejs module
	  if (!polyfill) polyfill = 'auto';
	  
	  var
	    // V0 polyfill entry
	    REGISTER_ELEMENT = 'registerElement',
	  
	    // IE < 11 only + old WebKit for attributes + feature detection
	    EXPANDO_UID = '__' + REGISTER_ELEMENT + (window.Math.random() * 10e4 >> 0),
	  
	    // shortcuts and costants
	    ADD_EVENT_LISTENER = 'addEventListener',
	    ATTACHED = 'attached',
	    CALLBACK = 'Callback',
	    DETACHED = 'detached',
	    EXTENDS = 'extends',
	  
	    ATTRIBUTE_CHANGED_CALLBACK = 'attributeChanged' + CALLBACK,
	    ATTACHED_CALLBACK = ATTACHED + CALLBACK,
	    CONNECTED_CALLBACK = 'connected' + CALLBACK,
	    DISCONNECTED_CALLBACK = 'disconnected' + CALLBACK,
	    CREATED_CALLBACK = 'created' + CALLBACK,
	    DETACHED_CALLBACK = DETACHED + CALLBACK,
	  
	    ADDITION = 'ADDITION',
	    MODIFICATION = 'MODIFICATION',
	    REMOVAL = 'REMOVAL',
	  
	    DOM_ATTR_MODIFIED = 'DOMAttrModified',
	    DOM_CONTENT_LOADED = 'DOMContentLoaded',
	    DOM_SUBTREE_MODIFIED = 'DOMSubtreeModified',
	  
	    PREFIX_TAG = '<',
	    PREFIX_IS = '=',
	  
	    // valid and invalid node names
	    validName = /^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+$/,
	    invalidNames = [
	      'ANNOTATION-XML',
	      'COLOR-PROFILE',
	      'FONT-FACE',
	      'FONT-FACE-SRC',
	      'FONT-FACE-URI',
	      'FONT-FACE-FORMAT',
	      'FONT-FACE-NAME',
	      'MISSING-GLYPH'
	    ],
	  
	    // registered types and their prototypes
	    types = [],
	    protos = [],
	  
	    // to query subnodes
	    query = '',
	  
	    // html shortcut used to feature detect
	    documentElement = document.documentElement,
	  
	    // ES5 inline helpers || basic patches
	    indexOf = types.indexOf || function (v) {
	      for(var i = this.length; i-- && this[i] !== v;){}
	      return i;
	    },
	  
	    // other helpers / shortcuts
	    OP = Object.prototype,
	    hOP = OP.hasOwnProperty,
	    iPO = OP.isPrototypeOf,
	  
	    defineProperty = Object.defineProperty,
	    empty = [],
	    gOPD = Object.getOwnPropertyDescriptor,
	    gOPN = Object.getOwnPropertyNames,
	    gPO = Object.getPrototypeOf,
	    sPO = Object.setPrototypeOf,
	  
	    // jshint proto: true
	    hasProto = !!Object.__proto__,
	  
	    // V1 helpers
	    fixGetClass = false,
	    DRECEV1 = '__dreCEv1',
	    customElements = window.customElements,
	    usableCustomElements = polyfill !== 'force' && !!(
	      customElements &&
	      customElements.define &&
	      customElements.get &&
	      customElements.whenDefined
	    ),
	    Dict = Object.create || Object,
	    Map = window.Map || function Map() {
	      var K = [], V = [], i;
	      return {
	        get: function (k) {
	          return V[indexOf.call(K, k)];
	        },
	        set: function (k, v) {
	          i = indexOf.call(K, k);
	          if (i < 0) V[K.push(k) - 1] = v;
	          else V[i] = v;
	        }
	      };
	    },
	    Promise = window.Promise || function (fn) {
	      var
	        notify = [],
	        done = false,
	        p = {
	          'catch': function () {
	            return p;
	          },
	          'then': function (cb) {
	            notify.push(cb);
	            if (done) setTimeout(resolve, 1);
	            return p;
	          }
	        }
	      ;
	      function resolve(value) {
	        done = true;
	        while (notify.length) notify.shift()(value);
	      }
	      fn(resolve);
	      return p;
	    },
	    justCreated = false,
	    constructors = Dict(null),
	    waitingList = Dict(null),
	    nodeNames = new Map(),
	    secondArgument = String,
	  
	    // used to create unique instances
	    create = Object.create || function Bridge(proto) {
	      // silly broken polyfill probably ever used but short enough to work
	      return proto ? ((Bridge.prototype = proto), new Bridge()) : this;
	    },
	  
	    // will set the prototype if possible
	    // or copy over all properties
	    setPrototype = sPO || (
	      hasProto ?
	        function (o, p) {
	          o.__proto__ = p;
	          return o;
	        } : (
	      (gOPN && gOPD) ?
	        (function(){
	          function setProperties(o, p) {
	            for (var
	              key,
	              names = gOPN(p),
	              i = 0, length = names.length;
	              i < length; i++
	            ) {
	              key = names[i];
	              if (!hOP.call(o, key)) {
	                defineProperty(o, key, gOPD(p, key));
	              }
	            }
	          }
	          return function (o, p) {
	            do {
	              setProperties(o, p);
	            } while ((p = gPO(p)) && !iPO.call(p, o));
	            return o;
	          };
	        }()) :
	        function (o, p) {
	          for (var key in p) {
	            o[key] = p[key];
	          }
	          return o;
	        }
	    )),
	  
	    // DOM shortcuts and helpers, if any
	  
	    MutationObserver = window.MutationObserver ||
	                       window.WebKitMutationObserver,
	  
	    HTMLElementPrototype = (
	      window.HTMLElement ||
	      window.Element ||
	      window.Node
	    ).prototype,
	  
	    IE8 = !iPO.call(HTMLElementPrototype, documentElement),
	  
	    safeProperty = IE8 ? function (o, k, d) {
	      o[k] = d.value;
	      return o;
	    } : defineProperty,
	  
	    isValidNode = IE8 ?
	      function (node) {
	        return node.nodeType === 1;
	      } :
	      function (node) {
	        return iPO.call(HTMLElementPrototype, node);
	      },
	  
	    targets = IE8 && [],
	  
	    attachShadow = HTMLElementPrototype.attachShadow,
	    cloneNode = HTMLElementPrototype.cloneNode,
	    dispatchEvent = HTMLElementPrototype.dispatchEvent,
	    getAttribute = HTMLElementPrototype.getAttribute,
	    hasAttribute = HTMLElementPrototype.hasAttribute,
	    removeAttribute = HTMLElementPrototype.removeAttribute,
	    setAttribute = HTMLElementPrototype.setAttribute,
	  
	    // replaced later on
	    createElement = document.createElement,
	    patchedCreateElement = createElement,
	  
	    // shared observer for all attributes
	    attributesObserver = MutationObserver && {
	      attributes: true,
	      characterData: true,
	      attributeOldValue: true
	    },
	  
	    // useful to detect only if there's no MutationObserver
	    DOMAttrModified = MutationObserver || function(e) {
	      doesNotSupportDOMAttrModified = false;
	      documentElement.removeEventListener(
	        DOM_ATTR_MODIFIED,
	        DOMAttrModified
	      );
	    },
	  
	    // will both be used to make DOMNodeInserted asynchronous
	    asapQueue,
	    asapTimer = 0,
	  
	    // internal flags
	    setListener = false,
	    doesNotSupportDOMAttrModified = true,
	    dropDomContentLoaded = true,
	  
	    // needed for the innerHTML helper
	    notFromInnerHTMLHelper = true,
	  
	    // optionally defined later on
	    onSubtreeModified,
	    callDOMAttrModified,
	    getAttributesMirror,
	    observer,
	    observe,
	  
	    // based on setting prototype capability
	    // will check proto or the expando attribute
	    // in order to setup the node once
	    patchIfNotAlready,
	    patch
	  ;
	  
	  // only if needed
	  if (!(REGISTER_ELEMENT in document)) {
	  
	    if (sPO || hasProto) {
	        patchIfNotAlready = function (node, proto) {
	          if (!iPO.call(proto, node)) {
	            setupNode(node, proto);
	          }
	        };
	        patch = setupNode;
	    } else {
	        patchIfNotAlready = function (node, proto) {
	          if (!node[EXPANDO_UID]) {
	            node[EXPANDO_UID] = Object(true);
	            setupNode(node, proto);
	          }
	        };
	        patch = patchIfNotAlready;
	    }
	  
	    if (IE8) {
	      doesNotSupportDOMAttrModified = false;
	      (function (){
	        var
	          descriptor = gOPD(HTMLElementPrototype, ADD_EVENT_LISTENER),
	          addEventListener = descriptor.value,
	          patchedRemoveAttribute = function (name) {
	            var e = new CustomEvent(DOM_ATTR_MODIFIED, {bubbles: true});
	            e.attrName = name;
	            e.prevValue = getAttribute.call(this, name);
	            e.newValue = null;
	            e[REMOVAL] = e.attrChange = 2;
	            removeAttribute.call(this, name);
	            dispatchEvent.call(this, e);
	          },
	          patchedSetAttribute = function (name, value) {
	            var
	              had = hasAttribute.call(this, name),
	              old = had && getAttribute.call(this, name),
	              e = new CustomEvent(DOM_ATTR_MODIFIED, {bubbles: true})
	            ;
	            setAttribute.call(this, name, value);
	            e.attrName = name;
	            e.prevValue = had ? old : null;
	            e.newValue = value;
	            if (had) {
	              e[MODIFICATION] = e.attrChange = 1;
	            } else {
	              e[ADDITION] = e.attrChange = 0;
	            }
	            dispatchEvent.call(this, e);
	          },
	          onPropertyChange = function (e) {
	            // jshint eqnull:true
	            var
	              node = e.currentTarget,
	              superSecret = node[EXPANDO_UID],
	              propertyName = e.propertyName,
	              event
	            ;
	            if (superSecret.hasOwnProperty(propertyName)) {
	              superSecret = superSecret[propertyName];
	              event = new CustomEvent(DOM_ATTR_MODIFIED, {bubbles: true});
	              event.attrName = superSecret.name;
	              event.prevValue = superSecret.value || null;
	              event.newValue = (superSecret.value = node[propertyName] || null);
	              if (event.prevValue == null) {
	                event[ADDITION] = event.attrChange = 0;
	              } else {
	                event[MODIFICATION] = event.attrChange = 1;
	              }
	              dispatchEvent.call(node, event);
	            }
	          }
	        ;
	        descriptor.value = function (type, handler, capture) {
	          if (
	            type === DOM_ATTR_MODIFIED &&
	            this[ATTRIBUTE_CHANGED_CALLBACK] &&
	            this.setAttribute !== patchedSetAttribute
	          ) {
	            this[EXPANDO_UID] = {
	              className: {
	                name: 'class',
	                value: this.className
	              }
	            };
	            this.setAttribute = patchedSetAttribute;
	            this.removeAttribute = patchedRemoveAttribute;
	            addEventListener.call(this, 'propertychange', onPropertyChange);
	          }
	          addEventListener.call(this, type, handler, capture);
	        };
	        defineProperty(HTMLElementPrototype, ADD_EVENT_LISTENER, descriptor);
	      }());
	    } else if (!MutationObserver) {
	      documentElement[ADD_EVENT_LISTENER](DOM_ATTR_MODIFIED, DOMAttrModified);
	      documentElement.setAttribute(EXPANDO_UID, 1);
	      documentElement.removeAttribute(EXPANDO_UID);
	      if (doesNotSupportDOMAttrModified) {
	        onSubtreeModified = function (e) {
	          var
	            node = this,
	            oldAttributes,
	            newAttributes,
	            key
	          ;
	          if (node === e.target) {
	            oldAttributes = node[EXPANDO_UID];
	            node[EXPANDO_UID] = (newAttributes = getAttributesMirror(node));
	            for (key in newAttributes) {
	              if (!(key in oldAttributes)) {
	                // attribute was added
	                return callDOMAttrModified(
	                  0,
	                  node,
	                  key,
	                  oldAttributes[key],
	                  newAttributes[key],
	                  ADDITION
	                );
	              } else if (newAttributes[key] !== oldAttributes[key]) {
	                // attribute was changed
	                return callDOMAttrModified(
	                  1,
	                  node,
	                  key,
	                  oldAttributes[key],
	                  newAttributes[key],
	                  MODIFICATION
	                );
	              }
	            }
	            // checking if it has been removed
	            for (key in oldAttributes) {
	              if (!(key in newAttributes)) {
	                // attribute removed
	                return callDOMAttrModified(
	                  2,
	                  node,
	                  key,
	                  oldAttributes[key],
	                  newAttributes[key],
	                  REMOVAL
	                );
	              }
	            }
	          }
	        };
	        callDOMAttrModified = function (
	          attrChange,
	          currentTarget,
	          attrName,
	          prevValue,
	          newValue,
	          action
	        ) {
	          var e = {
	            attrChange: attrChange,
	            currentTarget: currentTarget,
	            attrName: attrName,
	            prevValue: prevValue,
	            newValue: newValue
	          };
	          e[action] = attrChange;
	          onDOMAttrModified(e);
	        };
	        getAttributesMirror = function (node) {
	          for (var
	            attr, name,
	            result = {},
	            attributes = node.attributes,
	            i = 0, length = attributes.length;
	            i < length; i++
	          ) {
	            attr = attributes[i];
	            name = attr.name;
	            if (name !== 'setAttribute') {
	              result[name] = attr.value;
	            }
	          }
	          return result;
	        };
	      }
	    }
	  
	    // set as enumerable, writable and configurable
	    document[REGISTER_ELEMENT] = function registerElement(type, options) {
	      upperType = type.toUpperCase();
	      if (!setListener) {
	        // only first time document.registerElement is used
	        // we need to set this listener
	        // setting it by default might slow down for no reason
	        setListener = true;
	        if (MutationObserver) {
	          observer = (function(attached, detached){
	            function checkEmAll(list, callback) {
	              for (var i = 0, length = list.length; i < length; callback(list[i++])){}
	            }
	            return new MutationObserver(function (records) {
	              for (var
	                current, node, newValue,
	                i = 0, length = records.length; i < length; i++
	              ) {
	                current = records[i];
	                if (current.type === 'childList') {
	                  checkEmAll(current.addedNodes, attached);
	                  checkEmAll(current.removedNodes, detached);
	                } else {
	                  node = current.target;
	                  if (notFromInnerHTMLHelper &&
	                      node[ATTRIBUTE_CHANGED_CALLBACK] &&
	                      current.attributeName !== 'style') {
	                    newValue = getAttribute.call(node, current.attributeName);
	                    if (newValue !== current.oldValue) {
	                      node[ATTRIBUTE_CHANGED_CALLBACK](
	                        current.attributeName,
	                        current.oldValue,
	                        newValue
	                      );
	                    }
	                  }
	                }
	              }
	            });
	          }(executeAction(ATTACHED), executeAction(DETACHED)));
	          observe = function (node) {
	            observer.observe(
	              node,
	              {
	                childList: true,
	                subtree: true
	              }
	            );
	            return node;
	          };
	          observe(document);
	          if (attachShadow) {
	            HTMLElementPrototype.attachShadow = function () {
	              return observe(attachShadow.apply(this, arguments));
	            };
	          }
	        } else {
	          asapQueue = [];
	          document[ADD_EVENT_LISTENER]('DOMNodeInserted', onDOMNode(ATTACHED));
	          document[ADD_EVENT_LISTENER]('DOMNodeRemoved', onDOMNode(DETACHED));
	        }
	  
	        document[ADD_EVENT_LISTENER](DOM_CONTENT_LOADED, onReadyStateChange);
	        document[ADD_EVENT_LISTENER]('readystatechange', onReadyStateChange);
	  
	        HTMLElementPrototype.cloneNode = function (deep) {
	          var
	            node = cloneNode.call(this, !!deep),
	            i = getTypeIndex(node)
	          ;
	          if (-1 < i) patch(node, protos[i]);
	          if (deep) loopAndSetup(node.querySelectorAll(query));
	          return node;
	        };
	      }
	  
	      if (-2 < (
	        indexOf.call(types, PREFIX_IS + upperType) +
	        indexOf.call(types, PREFIX_TAG + upperType)
	      )) {
	        throwTypeError(type);
	      }
	  
	      if (!validName.test(upperType) || -1 < indexOf.call(invalidNames, upperType)) {
	        throw new Error('The type ' + type + ' is invalid');
	      }
	  
	      var
	        constructor = function () {
	          return extending ?
	            document.createElement(nodeName, upperType) :
	            document.createElement(nodeName);
	        },
	        opt = options || OP,
	        extending = hOP.call(opt, EXTENDS),
	        nodeName = extending ? options[EXTENDS].toUpperCase() : upperType,
	        upperType,
	        i
	      ;
	  
	      if (extending && -1 < (
	        indexOf.call(types, PREFIX_TAG + nodeName)
	      )) {
	        throwTypeError(nodeName);
	      }
	  
	      i = types.push((extending ? PREFIX_IS : PREFIX_TAG) + upperType) - 1;
	  
	      query = query.concat(
	        query.length ? ',' : '',
	        extending ? nodeName + '[is="' + type.toLowerCase() + '"]' : nodeName
	      );
	  
	      constructor.prototype = (
	        protos[i] = hOP.call(opt, 'prototype') ?
	          opt.prototype :
	          create(HTMLElementPrototype)
	      );
	  
	      loopAndVerify(
	        document.querySelectorAll(query),
	        ATTACHED
	      );
	  
	      return constructor;
	    };
	  
	    document.createElement = (patchedCreateElement = function (localName, typeExtension) {
	      var
	        is = getIs(typeExtension),
	        node = is ?
	          createElement.call(document, localName, secondArgument(is)) :
	          createElement.call(document, localName),
	        name = '' + localName,
	        i = indexOf.call(
	          types,
	          (is ? PREFIX_IS : PREFIX_TAG) +
	          (is || name).toUpperCase()
	        ),
	        setup = -1 < i
	      ;
	      if (is) {
	        node.setAttribute('is', is = is.toLowerCase());
	        if (setup) {
	          setup = isInQSA(name.toUpperCase(), is);
	        }
	      }
	      notFromInnerHTMLHelper = !document.createElement.innerHTMLHelper;
	      if (setup) patch(node, protos[i]);
	      return node;
	    });
	  
	  }
	  
	  function ASAP() {
	    var queue = asapQueue.splice(0, asapQueue.length);
	    asapTimer = 0;
	    while (queue.length) {
	      queue.shift().call(
	        null, queue.shift()
	      );
	    }
	  }
	  
	  function loopAndVerify(list, action) {
	    for (var i = 0, length = list.length; i < length; i++) {
	      verifyAndSetupAndAction(list[i], action);
	    }
	  }
	  
	  function loopAndSetup(list) {
	    for (var i = 0, length = list.length, node; i < length; i++) {
	      node = list[i];
	      patch(node, protos[getTypeIndex(node)]);
	    }
	  }
	  
	  function executeAction(action) {
	    return function (node) {
	      if (isValidNode(node)) {
	        verifyAndSetupAndAction(node, action);
	        loopAndVerify(
	          node.querySelectorAll(query),
	          action
	        );
	      }
	    };
	  }
	  
	  function getTypeIndex(target) {
	    var
	      is = getAttribute.call(target, 'is'),
	      nodeName = target.nodeName.toUpperCase(),
	      i = indexOf.call(
	        types,
	        is ?
	            PREFIX_IS + is.toUpperCase() :
	            PREFIX_TAG + nodeName
	      )
	    ;
	    return is && -1 < i && !isInQSA(nodeName, is) ? -1 : i;
	  }
	  
	  function isInQSA(name, type) {
	    return -1 < query.indexOf(name + '[is="' + type + '"]');
	  }
	  
	  function onDOMAttrModified(e) {
	    var
	      node = e.currentTarget,
	      attrChange = e.attrChange,
	      attrName = e.attrName,
	      target = e.target,
	      addition = e[ADDITION] || 2,
	      removal = e[REMOVAL] || 3
	    ;
	    if (notFromInnerHTMLHelper &&
	        (!target || target === node) &&
	        node[ATTRIBUTE_CHANGED_CALLBACK] &&
	        attrName !== 'style' && (
	          e.prevValue !== e.newValue ||
	          // IE9, IE10, and Opera 12 gotcha
	          e.newValue === '' && (
	            attrChange === addition ||
	            attrChange === removal
	          )
	    )) {
	      node[ATTRIBUTE_CHANGED_CALLBACK](
	        attrName,
	        attrChange === addition ? null : e.prevValue,
	        attrChange === removal ? null : e.newValue
	      );
	    }
	  }
	  
	  function onDOMNode(action) {
	    var executor = executeAction(action);
	    return function (e) {
	      asapQueue.push(executor, e.target);
	      if (asapTimer) clearTimeout(asapTimer);
	      asapTimer = setTimeout(ASAP, 1);
	    };
	  }
	  
	  function onReadyStateChange(e) {
	    if (dropDomContentLoaded) {
	      dropDomContentLoaded = false;
	      e.currentTarget.removeEventListener(DOM_CONTENT_LOADED, onReadyStateChange);
	    }
	    loopAndVerify(
	      (e.target || document).querySelectorAll(query),
	      e.detail === DETACHED ? DETACHED : ATTACHED
	    );
	    if (IE8) purge();
	  }
	  
	  function patchedSetAttribute(name, value) {
	    // jshint validthis:true
	    var self = this;
	    setAttribute.call(self, name, value);
	    onSubtreeModified.call(self, {target: self});
	  }
	  
	  function setupNode(node, proto) {
	    setPrototype(node, proto);
	    if (observer) {
	      observer.observe(node, attributesObserver);
	    } else {
	      if (doesNotSupportDOMAttrModified) {
	        node.setAttribute = patchedSetAttribute;
	        node[EXPANDO_UID] = getAttributesMirror(node);
	        node[ADD_EVENT_LISTENER](DOM_SUBTREE_MODIFIED, onSubtreeModified);
	      }
	      node[ADD_EVENT_LISTENER](DOM_ATTR_MODIFIED, onDOMAttrModified);
	    }
	    if (node[CREATED_CALLBACK] && notFromInnerHTMLHelper) {
	      node.created = true;
	      node[CREATED_CALLBACK]();
	      node.created = false;
	    }
	  }
	  
	  function purge() {
	    for (var
	      node,
	      i = 0,
	      length = targets.length;
	      i < length; i++
	    ) {
	      node = targets[i];
	      if (!documentElement.contains(node)) {
	        length--;
	        targets.splice(i--, 1);
	        verifyAndSetupAndAction(node, DETACHED);
	      }
	    }
	  }
	  
	  function throwTypeError(type) {
	    throw new Error('A ' + type + ' type is already registered');
	  }
	  
	  function verifyAndSetupAndAction(node, action) {
	    var
	      fn,
	      i = getTypeIndex(node)
	    ;
	    if (-1 < i) {
	      patchIfNotAlready(node, protos[i]);
	      i = 0;
	      if (action === ATTACHED && !node[ATTACHED]) {
	        node[DETACHED] = false;
	        node[ATTACHED] = true;
	        i = 1;
	        if (IE8 && indexOf.call(targets, node) < 0) {
	          targets.push(node);
	        }
	      } else if (action === DETACHED && !node[DETACHED]) {
	        node[ATTACHED] = false;
	        node[DETACHED] = true;
	        i = 1;
	      }
	      if (i && (fn = node[action + CALLBACK])) fn.call(node);
	    }
	  }
	  
	  
	  
	  // V1 in da House!
	  function CustomElementRegistry() {}
	  
	  CustomElementRegistry.prototype = {
	    constructor: CustomElementRegistry,
	    // a workaround for the stubborn WebKit
	    define: usableCustomElements ?
	      function (name, Class, options) {
	        if (options) {
	          CERDefine(name, Class, options);
	        } else {
	          var NAME = name.toUpperCase();
	          constructors[NAME] = {
	            constructor: Class,
	            create: [NAME]
	          };
	          nodeNames.set(Class, NAME);
	          customElements.define(name, Class);
	        }
	      } :
	      CERDefine,
	    get: usableCustomElements ?
	      function (name) {
	        return customElements.get(name) || get(name);
	      } :
	      get,
	    whenDefined: usableCustomElements ?
	      function (name) {
	        return Promise.race([
	          customElements.whenDefined(name),
	          whenDefined(name)
	        ]);
	      } :
	      whenDefined
	  };
	  
	  function CERDefine(name, Class, options) {
	    var
	      is = options && options[EXTENDS] || '',
	      CProto = Class.prototype,
	      proto = create(CProto),
	      attributes = Class.observedAttributes || empty,
	      definition = {prototype: proto}
	    ;
	    // TODO: is this needed at all since it's inherited?
	    // defineProperty(proto, 'constructor', {value: Class});
	    safeProperty(proto, CREATED_CALLBACK, {
	        value: function () {
	          if (justCreated) justCreated = false;
	          else if (!this[DRECEV1]) {
	            this[DRECEV1] = true;
	            new Class(this);
	            if (CProto[CREATED_CALLBACK])
	              CProto[CREATED_CALLBACK].call(this);
	            var info = constructors[nodeNames.get(Class)];
	            if (!usableCustomElements || info.create.length > 1) {
	              notifyAttributes(this);
	            }
	          }
	      }
	    });
	    safeProperty(proto, ATTRIBUTE_CHANGED_CALLBACK, {
	      value: function (name) {
	        if (-1 < indexOf.call(attributes, name))
	          CProto[ATTRIBUTE_CHANGED_CALLBACK].apply(this, arguments);
	      }
	    });
	    if (CProto[CONNECTED_CALLBACK]) {
	      safeProperty(proto, ATTACHED_CALLBACK, {
	        value: CProto[CONNECTED_CALLBACK]
	      });
	    }
	    if (CProto[DISCONNECTED_CALLBACK]) {
	      safeProperty(proto, DETACHED_CALLBACK, {
	        value: CProto[DISCONNECTED_CALLBACK]
	      });
	    }
	    if (is) definition[EXTENDS] = is;
	    name = name.toUpperCase();
	    constructors[name] = {
	      constructor: Class,
	      create: is ? [is, secondArgument(name)] : [name]
	    };
	    nodeNames.set(Class, name);
	    document[REGISTER_ELEMENT](name.toLowerCase(), definition);
	    whenDefined(name);
	    waitingList[name].r();
	  }
	  
	  function get(name) {
	    var info = constructors[name.toUpperCase()];
	    return info && info.constructor;
	  }
	  
	  function getIs(options) {
	    return typeof options === 'string' ?
	        options : (options && options.is || '');
	  }
	  
	  function notifyAttributes(self) {
	    var
	      callback = self[ATTRIBUTE_CHANGED_CALLBACK],
	      attributes = callback ? self.attributes : empty,
	      i = attributes.length,
	      attribute
	    ;
	    while (i--) {
	      attribute =  attributes[i]; // || attributes.item(i);
	      callback.call(
	        self,
	        attribute.name || attribute.nodeName,
	        null,
	        attribute.value || attribute.nodeValue
	      );
	    }
	  }
	  
	  function whenDefined(name) {
	    name = name.toUpperCase();
	    if (!(name in waitingList)) {
	      waitingList[name] = {};
	      waitingList[name].p = new Promise(function (resolve) {
	        waitingList[name].r = resolve;
	      });
	    }
	    return waitingList[name].p;
	  }
	  
	  function polyfillV1() {
	    if (customElements) delete window.customElements;
	    defineProperty(window, 'customElements', {
	      configurable: true,
	      value: new CustomElementRegistry()
	    });
	    defineProperty(window, 'CustomElementRegistry', {
	      configurable: true,
	      value: CustomElementRegistry
	    });
	    for (var
	      patchClass = function (name) {
	        var Class = window[name];
	        if (Class) {
	          window[name] = function CustomElementsV1(self) {
	            var info, isNative;
	            if (!self) self = this;
	            if (!self[DRECEV1]) {
	              justCreated = true;
	              info = constructors[nodeNames.get(self.constructor)];
	              isNative = usableCustomElements && info.create.length === 1;
	              self = isNative ?
	                Reflect.construct(Class, empty, info.constructor) :
	                document.createElement.apply(document, info.create);
	              self[DRECEV1] = true;
	              justCreated = false;
	              if (!isNative) notifyAttributes(self);
	            }
	            return self;
	          };
	          window[name].prototype = Class.prototype;
	          try {
	            Class.prototype.constructor = window[name];
	          } catch(WebKit) {
	            fixGetClass = true;
	            defineProperty(Class, DRECEV1, {value: window[name]});
	          }
	        }
	      },
	      Classes = htmlClass.get(/^HTML[A-Z]*[a-z]/),
	      i = Classes.length;
	      i--;
	      patchClass(Classes[i])
	    ) {}
	    (document.createElement = function (name, options) {
	      var is = getIs(options);
	      return is ?
	        patchedCreateElement.call(this, name, secondArgument(is)) :
	        patchedCreateElement.call(this, name);
	    });
	  }
	  
	  // if customElements is not there at all
	  if (!customElements || polyfill === 'force') polyfillV1();
	  else {
	    // if available test extends work as expected
	    try {
	      (function (DRE, options, name) {
	        options[EXTENDS] = 'a';
	        DRE.prototype = create(HTMLAnchorElement.prototype);
	        DRE.prototype.constructor = DRE;
	        window.customElements.define(name, DRE, options);
	        if (
	          getAttribute.call(document.createElement('a', {is: name}), 'is') !== name ||
	          (usableCustomElements && getAttribute.call(new DRE(), 'is') !== name)
	        ) {
	          throw options;
	        }
	      }(
	        function DRE() {
	          return Reflect.construct(HTMLAnchorElement, [], DRE);
	        },
	        {},
	        'document-register-element-a'
	      ));
	    } catch(o_O) {
	      // or force the polyfill if not
	      // and keep internal original reference
	      polyfillV1();
	    }
	  }
	  
	  try {
	    createElement.call(document, 'a', 'a');
	  } catch(FireFox) {
	    secondArgument = function (is) {
	      return {is: is};
	    };
	  }
	  
	}
	
	module.exports = installCustomElements;
	installCustomElements(global);
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }
/******/ ])
});
;
//# sourceMappingURL=sepcon.js.map