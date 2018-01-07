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
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.SepCon = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _root = __webpack_require__(21);
	
	var _root2 = _interopRequireDefault(_root);
	
	var _constants = __webpack_require__(2);
	
	var _utils = __webpack_require__(1);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var formatShorthand = function formatShorthand(def) {
	    if (def && def.lifecycle) {
	        var segments = ['pre', 'on', 'post'];
	        def.lifecycle = Object.assign({
	            pre: {},
	            on: {},
	            post: {}
	        }, def.lifecycle);
	        Object.keys(def.lifecycle).forEach(function (key) {
	            if (segments.indexOf(key) === -1) {
	                def.lifecycle.on[key] = def.lifecycle[key];
	            }
	        });
	        Object.keys(def.lifecycle.on).forEach(function (key) {
	            def.lifecycle[key] = def.lifecycle.on[key];
	        });
	    }
	};
	
	function create(meta, def, type, defs, cls) {
	    var _this = this;
	
	    switch (type) {
	        case 'component':
	            formatShorthand(def.state);
	            formatShorthand(def.view);
	            break;
	        default:
	            formatShorthand(def);
	    }
	    var definition = _utils2.default.clone(def);
	    if (defs[meta.id]) {
	        this.root.logs.print({
	            title: { content: 'Tried To Create A Definition With Existing Id' },
	            rows: [{ style: 'label', content: 'Object Type' }, { style: 'code', content: type }, { style: 'label', content: 'Definition Id' }, { style: 'code', content: meta.id }]
	        });
	        return false;
	    } else {
	        if (meta.extend) {
	            if (!meta.extend.proto) {
	                this.root.logs.print({
	                    title: { content: 'Tried To Extend A Non-Existing Definition' },
	                    rows: [{ style: 'label', content: 'Object Type' }, { style: 'code', content: type }, { style: 'label', content: 'Definition Id' }, { style: 'code', content: meta.id }, { style: 'label', content: 'Extended Id' }, { style: 'code', content: meta.extend }]
	                });
	            } else {
	                meta.extend = _utils2.default.clone(meta.extend.proto);
	            }
	        }
	        if (meta.decorators) {
	            meta.decorators = meta.decorators.filter(function (dec) {
	                if (!defs[dec]) {
	                    _this.root.logs.print({
	                        title: { content: 'Tried To Decorate A Definition With a Non-Existing One' },
	                        rows: [{ style: 'label', content: 'Object Type' }, { style: 'code', content: type }, { style: 'label', content: 'Definition Id' }, { style: 'code', content: meta.id }, { style: 'label', content: 'Decorator Id' }, { style: 'code', content: dec }]
	                    });
	                    return false;
	                }
	                return true;
	            });
	            meta.decorators = meta.decorators.map(function (dec) {
	                return _utils2.default.clone(defs[dec].definition);
	            });
	        }
	        defs[meta.id] = new cls(meta, definition, this.root);
	    }
	    return {
	        id: meta.id,
	        proto: defs[meta.id].definition
	    };
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
	    }
	
	    _createClass(SepConClass, [{
	        key: 'modifier',
	        value: function modifier(_modifier) {
	            if (this.root.modifiers[_modifier]) {
	                return this.root.modifiers[_modifier].scoped.methods;
	            }
	        }
	    }, {
	        key: 'service',
	        value: function service(_service) {
	            var provider = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
	
	            var services = void 0;
	            provider = provider || this.root.defaultProvider;
	            if (provider && this.root.providers[provider] && this.root.providers[provider].services[_service]) {
	                services = this.root.providers[provider].services;
	            } else {
	                services = this.root.services;
	            }
	            if (services[_service]) {
	                return services[_service].api;
	            }
	            return null;
	        }
	    }, {
	        key: 'createData',
	        value: function createData(meta) {
	            var def = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	            return create.call(this, meta, def, 'data', this.root.datas, this.root.classes.Data);
	        }
	    }, {
	        key: 'createModifier',
	        value: function createModifier(meta) {
	            var def = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	            return create.call(this, meta, def, 'modifier', this.root.modifiers, this.root.classes.Modifier);
	        }
	    }, {
	        key: 'createProvider',
	        value: function createProvider(meta) {
	            var def = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	            return create.call(this, meta, def, 'provider', this.root.providers, this.root.classes.Provider);
	        }
	    }, {
	        key: 'createService',
	        value: function createService(meta) {
	            var def = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	            if (meta.provider && !this.root.providers[meta.provider]) {
	                this.root.logs.print({
	                    title: { content: 'Reference to Non-Existing Service Provider' },
	                    rows: [{ style: 'label', content: 'Service Id' }, { style: 'code', content: meta.id }, { style: 'label', content: 'Provider Id' }, { style: 'code', content: meta.provider }]
	                });
	                return false;
	            }
	            return create.call(this, meta, def, 'service', meta.provider ? this.root.providers[meta.provider].services : this.root.services, this.root.classes.Service);
	        }
	    }, {
	        key: 'createComponent',
	        value: function createComponent(meta) {
	            var _this2 = this;
	
	            var def = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	            var created = create.call(this, meta, def, 'component', this.root.components, this.root.classes.ComponentDefinition);
	            return Object.assign(created, {
	                createTag: function createTag() {
	                    return _this2.createTag(meta.id);
	                },
	                toString: function toString() {
	                    return _this2.createTag(meta.id).render();
	                }
	            });
	        }
	    }, {
	        key: 'createTag',
	        value: function createTag(id) {
	            return new this.root.classes.ComponentTag(this, id);
	        }
	    }, {
	        key: 'createUid',
	        value: function createUid() {
	            return _utils2.default.buildUid();
	        }
	    }]);
	
	    return SepConClass;
	}();
	
	var _sepCon = function sepConHandler() {
	    var sepCon = new SepConClass();
	    sepCon.createScope = function () {
	        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	        options.hash = options.hash || _utils2.default.buildUid();
	        return new SepConClass(options);
	    };
	    return sepCon;
	}();
	
	exports.SepCon = _sepCon;
	exports.default = _sepCon;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _constants = __webpack_require__(2);
	
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
	    buildUid: function buildUid() {
	        return parseInt(Date.now() * 1000 + Math.round(Math.random() * 1000)).toString(36);
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
	    isInDOM: function isInDOM(element) {
	        if (!element) return false;
	        return document.body.contains(element);
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
	    },
	    getCookie: function getCookie(key) {
	        return document.cookie.split(';').forEach(function (cookie) {
	            var cookiePair = cookie.split('=');
	            if (cookiePair[0] === key) {
	                return cookiePair[1];
	            }
	        });
	    },
	    setCookie: function setCookie(key, value) {
	        document.cookie = key + '=' + value + ';path=/';
	    }
	};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

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

/***/ }),
/* 3 */
/***/ (function(module, exports) {

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
	                    if (isShallow) {
	                        changedProps[prop] = this.getChangedAsObject(source[prop], map[prop]);
	                    } else {
	                        var propPath = path ? path + '.' + prop : prop;
	                        changedProps[propPath] = this.getChangedAsObject(source[prop], map[prop]);
	
	                        var changedObject = this.setChanges(source[prop], map[prop], isSourceObject && change, isShallow, propPath, source, prop);
	                        if (Object.keys(changedObject).length > 0) {
	                            Object.assign(changedProps, changedObject);
	                        }
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

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(22);
	
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

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(1);
	
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
	
	            var seq = this.config[sequence];
	
	            var promise = Promise;
	            return new Promise(function (resolve, reject) {
	                if (_this.handleSequenceStep('pre', seq, params)) {
	                    promise.resolve().then(function () {
	                        if (_this.handleSequenceStep(false, seq, params)) {
	                            window.requestAnimationFrame(function () {
	                                _this.handleSequenceStep('post', seq, params);
	                                resolve();
	                            });
	                        } else {
	                            resolve();
	                        }
	                    });
	                } else {
	                    resolve();
	                }
	            });
	        }
	    }, {
	        key: 'handleSequenceStep',
	        value: function handleSequenceStep(hook, seq, params) {
	            for (var i = 0, e = seq.sequence.length; i < e; i++) {
	                var sequenceStep = seq.sequence[i];
	                params = this.getStepParams(sequenceStep, hook, seq, params);
	
	                var target = void 0;
	                switch (sequenceStep.target) {
	                    default:
	                        target = this.base.scoped;
	                        break;
	                    case 'state':
	                        target = this.base.state.scoped;
	                        break;
	                }
	                //let target = sequenceStep.target === 'state' ? this.state.scoped : this.component.scoped;
	                // const actionHook = common.hookString(hook, sequenceStep.action);
	                var hasLifecycle = !!target.lifecycle;
	                var action = false;
	
	                if (hasLifecycle) {
	                    var hookKey = hook || 'on';
	                    var hasHook = !!target.lifecycle[hookKey];
	                    if (hasHook) {
	                        action = target.lifecycle[hookKey][sequenceStep.action];
	                    }
	                    if (!action && !hook) {
	                        action = target.lifecycle[sequenceStep.action];
	                    }
	                }
	                if (action) {
	                    var res = action.apply(target, params);
	                    if (res === false) {
	                        return false;
	                    }
	                    this.handleStepResponse(sequenceStep, hook, seq, res);
	                } else {
	                    this.handleStepResponse(sequenceStep, hook, seq);
	                }
	            }
	            return true;
	        }
	    }, {
	        key: 'getStepParams',
	        value: function getStepParams(step, hook, seq, params) {
	            if (seq.send) {
	                return seq.send.apply(this, [step, hook, params]);
	            } else return params;
	        }
	    }, {
	        key: 'handleStepResponse',
	        value: function handleStepResponse(step, hook, seq, res) {
	            if (seq.retrieve) {
	                return seq.retrieve.apply(this, [step, hook, res]);
	            } else {
	                return res;
	            }
	        }
	    }]);
	
	    return _class;
	}();
	
	exports.default = _class;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

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

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    formatGlobals: function formatGlobals(global) {
	        var globals = {};
	        if (!global) return globals;
	
	        for (var _prop in global) {
	            var prop = global[_prop];
	            var data = prop.data; //data
	            var key = prop.key || true; //key
	            if (!globals[data]) {
	                globals[data] = [];
	            }
	            globals[data].push(key);
	        }
	        return globals;
	    },
	    isGlobalChanged: function isGlobalChanged(global, data, changed) {
	        if (global && global[data]) {
	            if (global[data].indexOf(true) >= 0) {
	                return true;
	            }
	            for (var i = 0, e = changed.length; i < e; i++) {
	                if (global[data].indexOf(changed[i]) >= 0) {
	                    return true;
	                }
	            }
	        }
	        return false;
	    }
	};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(1);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	__webpack_require__(23);
	
	var _constants = __webpack_require__(2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	//defining the component and registering its element
	var ComponentDefinition = function () {
	    function ComponentDefinition(meta, def, root) {
	        _classCallCheck(this, ComponentDefinition);
	
	        var definition = {
	            state: def.state || {},
	            view: def.view || {}
	        };
	        if (meta.extend) {
	            definition = _utils2.default.extend(meta.extend, definition);
	        }
	        this.definition = definition;
	        this.id = meta.id;
	        this.root = root;
	        this.tag = _constants.TAG_PREFIX + (this.root.hash ? this.root.hash + '-' : '') + meta.id;
	
	        if (meta.decorators && meta.decorators.length && meta.decorators.length > 0) {
	            meta.decorators.forEach(this.addDecorator.bind(this));
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
	
	                        var startComponentFromElement = function startComponentFromElement() {
	                            //if(!common.isInDOM(this)) return false;
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
	                                    if (!_utils2.default.isInDOM(_this3)) {
	                                        //this.component = false;
	                                        return;
	                                    }
	
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
	                        };
	
	                        Promise.resolve().then(startComponentFromElement);
	                    }
	                }, {
	                    key: 'disconnectedCallback',
	                    value: function disconnectedCallback() {
	                        if (this.component) {
	                            this.component.onDestroy();
	                        }
	                    }
	                }]);
	
	                return HTMLComponent;
	            }(HTMLElement);
	
	            customElements.define(this.tag, HTMLComponent);
	        }
	    }]);
	
	    return ComponentDefinition;
	}();
	
	exports.default = ComponentDefinition;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(1);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	var _utils3 = __webpack_require__(3);
	
	var _utils4 = _interopRequireDefault(_utils3);
	
	var _logs = __webpack_require__(4);
	
	var _logs2 = _interopRequireDefault(_logs);
	
	var _constants = __webpack_require__(2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// will return a wrapped component with the framework's integration layer
	var Component = function () {
	    function Component(componentDefinition, root, element, parent, parentElement) {
	        var _this = this;
	
	        _classCallCheck(this, Component);
	
	        this.root = root;
	        this.active = false;
	
	        this._eventsCallbacks = {};
	        this.scoped = _utils2.default.clone(componentDefinition.view || {});
	        this.scoped.html = element.originalInnerHTML;
	        this.scoped.children = element.originalChildren;
	        this.scoped.element = element;
	        this.scoped.id = element.getAttribute(_constants.TAG_IDENTIFIER);
	        this.scoped.bindEvents = function () {
	            return _this.bindEvents();
	        };
	
	        this.scoped.update = function () {
	            _this.onDescendantChange(_this);
	        };
	
	        delete this.scoped.state;
	
	        this.parent = parent;
	
	        this.state = new this.root.classes.ComponentState(componentDefinition.state, this, this.root);
	        this.sequencer = new this.root.classes.Sequencer(this, this.root.sequencerConfig);
	
	        this.collectedDataChanges = {};
	        this.timer = null;
	
	        this.mapItem = this.root.addComponent(this, element, parentElement);
	    }
	
	    _createClass(Component, [{
	        key: 'bindEvents',
	        value: function bindEvents() {
	            var _this2 = this;
	
	            if (!this.scoped.events) return;
	            if (this.scoped.isInitiatedEvents) {
	                this.unbindEvents();
	            }
	
	            this.scoped.events.forEach(function (evObj) {
	                //getting the target - selector or the whole element
	                var _target = evObj.selector ? _this2.scoped.element.querySelectorAll(evObj.selector) : _this2.scoped.element;
	                if (!_this2.validateEvents(_target, evObj, true)) {
	                    return;
	                }
	                //storing callbacks in a map to keep reference for later unbinding on demand
	                _this2._eventsCallbacks[evObj.selector + ':' + evObj.event + ':' + evObj.callback] = _this2.scoped[evObj.callback].bind(_this2.scoped);
	                for (var i in _target) {
	                    var trg = _target[i];
	                    if ((typeof trg === 'undefined' ? 'undefined' : _typeof(trg)) === 'object' && trg !== null) {
	                        trg.addEventListener(evObj.event, _this2._eventsCallbacks[evObj.selector + ':' + evObj.event + ':' + evObj.callback], false);
	                    }
	                }
	            });
	            this.scoped.isInitiatedEvents = true;
	        }
	    }, {
	        key: 'unbindEvents',
	        value: function unbindEvents() {
	            var _this3 = this;
	
	            if (!this.scoped.events || !this.scoped.isInitiatedEvents) return;
	
	            this.scoped.events.forEach(function (evObj) {
	                //getting the target - selector or the whole element
	                var _target = evObj.selector ? _this3.scoped.element.querySelector(evObj.selector) : _this3.scoped.element;
	                if (!_this3.validateEvents(_target, evObj)) {
	                    return;
	                }
	                //using the eventsCallback map for live reference for removing it on demand
	                _target.removeEventListener(evObj.event, _this3._eventsCallbacks[evObj.selector + ':' + evObj.event + ':' + evObj.callback], false);
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
	            var _this4 = this;
	
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
	            //this.scoped.element.innerHTML = this.currentHtml;
	            this.bindEvents();
	            this.state.addRoutes();
	            var localChanged = _utils4.default.setChanges(this.componentPrevProps, this.scoped.props);
	            if (Object.keys(localChanged).length > 0 || isInitialHTMLChanged) {
	                this.sequencer.startSequence('externalChange', [localChanged]).then(function () {
	                    _this4.preventEmptyHtml();
	                });
	            } else {
	                this.sequencer.startSequence('resume').then(function () {
	                    _this4.preventEmptyHtml();
	                });
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
	            this.mapItem.setRefGlobal();
	        }
	    }, {
	        key: 'onStateChange',
	        value: function onStateChange(changed) {
	            var _this5 = this;
	
	            this.sequencer.startSequence('localChange', [changed]).then(function () {
	                _this5.preventEmptyHtml();
	            });
	        }
	    }, {
	        key: 'onReferenceChange',
	        value: function onReferenceChange(changed) {
	            var _this6 = this;
	
	            var localChanged = this.state.getReferenceStatePropNames(changed);
	            this.sequencer.startSequence('referenceChange', [localChanged]).then(function () {
	                _this6.preventEmptyHtml();
	            });
	        }
	    }, {
	        key: 'onGlobalStateChange',
	        value: function onGlobalStateChange(data, changed) {
	            var _this7 = this;
	
	            var localChanged = this.state.getGlobalStatePropNames(data, changed);
	            Object.assign(this.collectedDataChanges, localChanged);
	            clearTimeout(this.timer);
	            this.timer = setTimeout(function () {
	                _this7.debounceGlobalStateChange();
	            }, 10);
	        }
	    }, {
	        key: 'debounceGlobalStateChange',
	        value: function debounceGlobalStateChange() {
	            var _this8 = this;
	
	            this.sequencer.startSequence('globalChange', [this.collectedDataChanges]).then(function () {
	                _this8.preventEmptyHtml();
	            });
	            this.timer = null;
	            this.collectedDataChanges = {};
	        }
	    }, {
	        key: 'onDescendantChange',
	        value: function onDescendantChange(component) {
	            var comp = component || this;
	            if (component) {
	                this.sequencer.startSequence('descendantChange', [component.scoped]);
	            }
	            if (this.mapItem.parent) {
	                this.mapItem.parent.component.onDescendantChange(comp);
	            }
	        }
	    }, {
	        key: 'onRender',
	        value: function onRender(html) {
	            var isValid = typeof html === 'string';
	            var isDifferent = html != this.currentHtml;
	            if (isValid && isDifferent) {
	                this.scoped.element.innerHTML = this.currentHtml = html;
	                this.bindEvents();
	                this.onDescendantChange();
	            } else {
	                this.preventEmptyHtml();
	            }
	        }
	    }, {
	        key: 'preventEmptyHtml',
	        value: function preventEmptyHtml() {
	            if (!this.scoped.element.innerHTML && this.currentHtml) {
	                this.scoped.element.innerHTML = this.currentHtml;
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

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ComponentDefinitionItem = exports.ComponentItem = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _constants = __webpack_require__(2);
	
	var _utilsMapping = __webpack_require__(7);
	
	var _utilsMapping2 = _interopRequireDefault(_utilsMapping);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ComponentItem = function () {
	    function ComponentItem(component, element) {
	        _classCallCheck(this, ComponentItem);
	
	        this.children = [];
	        this.parent = null;
	        this.definition = null;
	        this.component = component;
	        this.selfGlobal = {};
	        this.refGlobal = {};
	
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
	        key: 'setSelfGlobal',
	        value: function setSelfGlobal(globals) {
	            this.selfGlobal = _utilsMapping2.default.formatGlobals(globals);
	        }
	    }, {
	        key: 'setRefGlobal',
	        value: function setRefGlobal() {
	            this.refGlobal = _utilsMapping2.default.formatGlobals(this.component.state.reference.global);
	        }
	    }, {
	        key: 'checkChanged',
	        value: function checkChanged(data, changed) {
	            this.changed = false;
	            if (this.definition.changed) {
	                this.changed = true;
	            } else if (Object.keys(this.refGlobal).length > 0 || Object.keys(this.selfGlobal).length > 0) {
	                var globalsToCheck = Object.assign({}, this.selfGlobal, this.refGlobal);
	                this.changed = _utilsMapping2.default.isGlobalChanged(globalsToCheck, data, changed);
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
	            this.global = _utilsMapping2.default.formatGlobals(definition.state.props.global);
	        }
	    }
	
	    _createClass(ComponentDefinitionItem, [{
	        key: 'checkChanged',
	        value: function checkChanged(data, changed) {
	            this.changed = _utilsMapping2.default.isGlobalChanged(this.global, data, changed);
	            return this.changed;
	        }
	    }]);
	
	    return ComponentDefinitionItem;
	}();
	
	exports.ComponentItem = ComponentItem;
	exports.ComponentDefinitionItem = ComponentDefinitionItem;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(1);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	var _utils3 = __webpack_require__(3);
	
	var _utils4 = _interopRequireDefault(_utils3);
	
	var _sequencer = __webpack_require__(5);
	
	var _sequencer2 = _interopRequireDefault(_sequencer);
	
	var _referenceMap = __webpack_require__(6);
	
	var _referenceMap2 = _interopRequireDefault(_referenceMap);
	
	var _constants = __webpack_require__(2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
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
	            _props[prop] = null;
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
	
	var changeBindedProps = function changeBindedProps(state, source, props, changed) {
	    var states = [];
	    var statesData = [];
	    var changesFullPath = _utils4.default.setChanges(source, props);
	
	    var _loop = function _loop(prop) {
	        if (state.bindings[prop]) {
	            state.bindings[prop].forEach(function (bindedState) {
	                var stateIndex = states.indexOf(bindedState);
	                if (stateIndex === -1) {
	                    states.push(bindedState);
	                    stateIndex = states.length - 1;
	                    statesData[stateIndex] = {};
	                }
	                statesData[stateIndex][prop] = changesFullPath[prop];
	            });
	        }
	    };
	
	    for (var prop in changesFullPath) {
	        _loop(prop);
	    }
	    states.forEach(function (state, index) {
	        state.component.onReferenceChange(statesData[index]);
	    });
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
	        this.component = component;
	        this.scoped = _utils2.default.clone(this.definition);
	
	        this.buildGlobalMethods();
	
	        this.scoped.setProps = function (props, silent) {
	            var originalProps = _utils2.default.clone(_this2.scoped.props.local);
	            var changedProps = _utils4.default.setChanges(_this2.scoped.props.local, props, silent, true);
	
	            if (Object.keys(changedProps).length > 0) {
	                if (silent) {
	                    changeBindedProps(_this2, originalProps, _this2.scoped.props.local, changedProps);
	                    _this2.component.updateState();
	                    return;
	                }
	                _this2.component.onStateChange(changedProps);
	            }
	        };
	        this.scoped.setGlobalProps = function (props) {
	            var newGlobalProps = {};
	            for (var prop in props) {
	                var globalDef = props[prop];
	                var isPreviouslyDefined = _this2.definition.props.global[prop];
	                var isInvalidDefinition = globalDef === null || (typeof globalDef === 'undefined' ? 'undefined' : _typeof(globalDef)) !== 'object';
	                if (isInvalidDefinition && isPreviouslyDefined) {
	                    delete _this2.definition.props.global[prop];
	                } else if (!isInvalidDefinition) {
	                    _this2.definition.props.global[prop] = newGlobalProps[prop] = props[prop];
	                }
	            }
	            _this2.component.mapItem.setSelfGlobal(newGlobalProps);
	            _this2.updateGlobalProps();
	            _this2.component.updateState();
	        };
	        this.scoped.setGlobalMethods = function (props) {
	            for (var prop in props) {
	                var globalDef = props[prop];
	                var isPreviouslyDefined = _this2.definition.methods.global[prop];
	                var isInvalidDefinition = globalDef === null || (typeof globalDef === 'undefined' ? 'undefined' : _typeof(globalDef)) !== 'object';
	                if (isInvalidDefinition && isPreviouslyDefined) {
	                    delete _this2.definition.methods.global[prop];
	                } else if (!isInvalidDefinition) {
	                    _this2.definition.methods.global[prop] = props[prop];
	                }
	                _this2.buildGlobalMethods();
	            }
	        };
	
	        this.scoped.getProps = function () {
	            return _this2.getProps();
	        };
	        this.scoped.getMethods = function () {
	            return _this2.getMethods();
	        };
	
	        this.scoped.router = this.root.router;
	        this.scoped.id = this.component.scoped.id;
	
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
	        value: function getGlobalStatePropName(data, originalProp) {
	            var globals = this.getGlobalDef();
	            for (var prop in globals) {
	                if ((!globals[prop].key || globals[prop].key === originalProp) && globals[prop].data === data) {
	                    return prop;
	                }
	            }
	        }
	    }, {
	        key: 'getGlobalStatePropNames',
	        value: function getGlobalStatePropNames(data, props) {
	            var localMap = {};
	            for (var prop in props) {
	                var localProp = this.getGlobalStatePropName(data, prop);
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
	            var originalProps = _utils2.default.clone(this.scoped.props.local);
	            for (var prop in changed) {
	                this.scoped.props.local[prop] = changed[prop].newValue;
	            }
	            changeBindedProps(this, originalProps, this.scoped.props.local, changed);
	        }
	    }, {
	        key: 'updateReferencedProps',
	        value: function updateReferencedProps() {
	            if (!this.reference.parent) return;
	            var extractRelevantValue = function extractRelevantValue(refProp) {
	                var parentStateKey = refProp.key;
	                var path = void 0;
	                if (parentStateKey.indexOf('.') >= 0) {
	                    path = parentStateKey.split('.');
	                }
	                var state = refProp.state;
	                if (path) {
	                    var statePosition = state;
	                    while (path.length) {
	                        var position = path[0];
	                        statePosition = statePosition[position];
	                        path.shift();
	                    }
	                    return statePosition;
	                } else {
	                    return state[parentStateKey];
	                }
	            };
	            var props = {
	                global: {},
	                external: {},
	                local: {}
	            };
	            props.global = _buildGlobalProps(this.reference.global, this.root);
	            for (var prop in this.reference.external) {
	                props.external[prop] = extractRelevantValue(this.reference.external[prop]);
	            }
	            for (var _prop in this.reference.local) {
	                props.local[_prop] = extractRelevantValue(this.reference.local[_prop]);
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
	    }, {
	        key: 'buildGlobalMethods',
	        value: function buildGlobalMethods() {
	            var _this3 = this;
	
	            var _loop2 = function _loop2(methodName) {
	                _this3.scoped.methods.global[methodName] = function () {
	                    var originalArgs = [].slice.call(arguments);
	                    var mergedArgs = [this.definition.methods.global[methodName].modifier, this.definition.methods.global[methodName].key];
	                    if (this.definition.methods.global[methodName].pass) {
	                        var passedArgs = this.definition.methods.global[methodName].pass.apply(this.scoped, originalArgs);
	                        mergedArgs = mergedArgs.concat(passedArgs);
	                        this.root.executeModifier.apply(this.root, mergedArgs);
	                    } else {
	                        mergedArgs = mergedArgs.concat(originalArgs);
	                        this.root.executeModifier.apply(this.root, mergedArgs);
	                    }
	                }.bind(_this3);
	            };
	
	            for (var methodName in this.definition.methods.global) {
	                _loop2(methodName);
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
	
	            var passedExternalReference = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
	
	            var key = item.name;
	            var path = item.value.split('.');
	            var stateKey = path[0]; //base property in store
	            path.shift();
	            path = path.join('.');
	
	            if (!passedExternalReference) {
	                passedExternalReference = externalReferences;
	            }
	            if (!passedExternalReference.parent) {
	                return false;
	            }
	
	            if (passedExternalReference.parent.reference.global.hasOwnProperty(stateKey)) {
	                externalReferences.global[key] = passedExternalReference.parent.reference.global[stateKey];
	                if (path) {
	                    externalReferences.global[key].key += '.' + path;
	                }
	            } else if (passedExternalReference.parent.reference.external.hasOwnProperty(stateKey)) {
	                externalReferences.external[key] = passedExternalReference.parent.reference.external[item.value];
	            } else if (passedExternalReference.parent.reference.local.hasOwnProperty(stateKey)) {
	                externalReferences.local[key] = passedExternalReference.parent.reference.local[item.value];
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
	                        var parentPath = node.reference.local[prop].key.split('.');
	                        var parentStateKey = parentPath[0];
	                        parentPath = parentPath.join('.');
	                        if (node.reference.parent.scoped.props.local[parentStateKey]) {
	                            node.reference.parent.bind(parentPath, _this4);
	                        } else {
	                            bindToRelevantAncestor(node.reference.parent, parentStateKey);
	                        }
	                    }
	                };
	                bindToRelevantAncestor(passedExternalReference.parent, stateKey);
	            } else if (passedExternalReference.parent.scoped.props.global.hasOwnProperty(stateKey)) {
	                externalReferences.global[key] = parentState.getGlobalDef()[stateKey];
	                if (path) {
	                    externalReferences.global[key].key += '.' + path;
	                }
	            } else if (passedExternalReference.parent.scoped.props.external.hasOwnProperty(stateKey)) {
	                externalReferences.external[key] = {
	                    key: item.value,
	                    state: passedExternalReference.parent.scoped.props.external
	                };
	            } else if (passedExternalReference.parent.scoped.props.local.hasOwnProperty(stateKey)) {
	                externalReferences.local[key] = {
	                    key: item.value,
	                    state: passedExternalReference.parent.scoped.props.local
	                };
	                if (path) {
	                    parentState.bind(stateKey + '.' + path, this);
	                } else {
	                    parentState.bind(stateKey, this);
	                }
	            } else {
	                this.setExternalReferencedProperty(item, externalReferences, parentState.component.parent.component.state, passedExternalReference.parent.reference);
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

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _referenceMap = __webpack_require__(6);
	
	var _referenceMap2 = _interopRequireDefault(_referenceMap);
	
	var _constants = __webpack_require__(2);
	
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
	        key: 'toString',
	        value: function toString() {
	            return this.render();
	        }
	    }, {
	        key: 'html',
	        value: function html(_html) {
	            this._html = _html;
	            return this;
	        }
	    }, {
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
	                htmlArray.push('data-sepcon-component="true"');
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

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(1);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	var _utils3 = __webpack_require__(3);
	
	var _utils4 = _interopRequireDefault(_utils3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Data = function () {
	    function Data(meta, def, root) {
	        _classCallCheck(this, Data);
	
	        var definition = def;
	        if (meta.extend) {
	            definition = _utils2.default.extend(meta.extend, definition);
	        }
	        this.definition = _utils2.default.clone(definition);
	        this.id = meta.id;
	        this.root = root;
	        this.data = _utils2.default.clone(definition);
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
	            var props = _utils2.default.formatValueForValidJSON(this.definition);
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
	            var value = this.data;
	            if (prop) {
	                var props = prop.split('.');
	                for (var i = 0, e = props.length; i < e; i++) {
	                    if (!value || value[props[i]] === undefined) {
	                        this.root.logs.print({
	                            title: { content: 'Could Not Find a Requested Data Property' },
	                            rows: [{ style: 'label', content: 'Data Id' }, { style: 'code', content: this.id }, { style: 'label', content: 'Properties Path' }, { style: 'code', content: prop }, { style: 'label', content: 'Data (snapshot)' }, { style: 'code', content: _utils2.default.clone(this.data) }]
	                        });
	                        return null;
	                    }
	                    value = value[props[i]];
	                }
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

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(1);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Modifier = function () {
	    function Modifier(meta, def, root) {
	        var _this = this;
	
	        _classCallCheck(this, Modifier);
	
	        var definition = def;
	        //if(!definition.methods) definition.methods = {};
	        if (meta.extend) {
	            definition = _utils2.default.extend(meta.extend, definition);
	        }
	        this.definition = definition;
	        this.id = meta.id;
	        this.root = root;
	        this.scoped = _utils2.default.clone(definition);
	
	        this.timer = null;
	        this.collectedDataChanges = {};
	
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
	
	        this.scoped.modify = this.root.executeModifier.bind(this.root);
	
	        this.scoped.router = this.root.router;
	
	        this.mapItem = this.root.addModifier(this);
	
	        this.sequencer = new root.classes.Sequencer(this, root.sequencerConfig);
	        this.sequencer.startSequence('mountBase');
	    }
	
	    _createClass(Modifier, [{
	        key: 'execute',
	        value: function execute(method, params) {
	            return this.scoped.methods[method].apply(this.scoped, params);
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
	    }, {
	        key: 'getGlobalStatePropName',
	        value: function getGlobalStatePropName(data, originalProp) {
	            var globals = this.definition.props;
	            for (var prop in globals) {
	                if (globals[prop].key === originalProp && globals[prop].data === data) {
	                    return prop;
	                }
	            }
	            return false;
	        }
	    }, {
	        key: 'getGlobalStatePropNames',
	        value: function getGlobalStatePropNames(data, props) {
	            var localMap = {};
	            for (var prop in props) {
	                var localProp = this.getGlobalStatePropName(data, prop);
	                if (localProp) {
	                    localMap[localProp] = props[prop];
	                }
	            }
	            return localMap;
	        }
	    }, {
	        key: 'onGlobalStateChange',
	        value: function onGlobalStateChange(data, changed) {
	            var _this3 = this;
	
	            var localChanged = this.getGlobalStatePropNames(data, changed);
	            Object.assign(this.collectedDataChanges, localChanged);
	            clearTimeout(this.timer);
	            this.timer = setTimeout(function () {
	                _this3.debounceGlobalStateChange();
	            }, 10);
	        }
	    }, {
	        key: 'debounceGlobalStateChange',
	        value: function debounceGlobalStateChange() {
	            this.timer = null;
	            this.sequencer.startSequence('globalChangeModifier', [this.collectedDataChanges]);
	            this.collectedDataChanges = {};
	        }
	    }]);
	
	    return Modifier;
	}();
	
	exports.default = Modifier;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.ModifierItem = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _constants = __webpack_require__(2);
	
	var _utilsMapping = __webpack_require__(7);
	
	var _utilsMapping2 = _interopRequireDefault(_utilsMapping);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ModifierItem = function () {
	    function ModifierItem(modifier) {
	        _classCallCheck(this, ModifierItem);
	
	        this.modifier = modifier;
	        this.definition = modifier.definition;
	        if (this.definition.props) {
	            this.global = _utilsMapping2.default.formatGlobals(this.definition.props);
	        }
	    }
	
	    _createClass(ModifierItem, [{
	        key: 'checkChanged',
	        value: function checkChanged(data, changed) {
	            this.changed = _utilsMapping2.default.isGlobalChanged(this.global, data, changed);
	            return this.changed;
	        }
	    }]);
	
	    return ModifierItem;
	}();
	
	exports.ModifierItem = ModifierItem;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(1);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Provider = function () {
	    function Provider(meta, def, root) {
	        _classCallCheck(this, Provider);
	
	        var definition = def;
	        if (meta.extend) {
	            definition = _utils2.default.extend(meta.extend, definition);
	        }
	        this.definition = definition;
	        this.id = def.id;
	        this.root = root;
	        this.scoped = _utils2.default.clone(definition);
	
	        this.services = {};
	
	        this.scoped.router = this.root.router;
	
	        this.sequencer = new root.classes.Sequencer(this, root.sequencerConfig);
	        this.sequencer.startSequence('mountBase');
	    }
	
	    _createClass(Provider, [{
	        key: 'addRoutes',
	        value: function addRoutes() {
	            var _this = this;
	
	            if (this.definition.routes) {
	                this.definition.routes.forEach(function (i) {
	                    return _this.root.router.add(i, _this.scoped);
	                });
	            }
	        }
	    }]);
	
	    return Provider;
	}();
	
	exports.default = Provider;

/***/ }),
/* 17 */
/***/ (function(module, exports) {

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

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _utils = __webpack_require__(1);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Service = function () {
	    function Service(meta, def, root) {
	        var _this = this;
	
	        _classCallCheck(this, Service);
	
	        var definition = def;
	        if (meta.extend) {
	            definition = _utils2.default.extend(meta.extend, definition);
	        }
	        definition = Object.assign({
	            requests: {},
	            channels: {}
	        }, definition);
	        definition.cache = Object.assign({
	            requests: {},
	            channels: {}
	        }, definition.cache);
	
	        this.definition = definition;
	        this.id = meta.id;
	        this.root = root;
	        this.scoped = _utils2.default.clone(definition);
	        this.promises = {};
	        this.subscribes = [];
	        this.channelsLastCache = {};
	        this.cache = {
	            requests: {},
	            channels: {}
	        };
	
	        Object.keys(this.definition.requests).forEach(function (key) {
	            _this.scoped.requests[key] = _this.buildRequest.bind(_this, key);
	            _this.promises[key] = {};
	            _this.cache.requests[key] = {};
	        });
	
	        Object.keys(this.definition.channels).forEach(function (key) {
	            _this.scoped.channels[key] = _this.buildChannel.bind(_this, key);
	            _this.cache.channels[key] = {};
	        });
	
	        this.scoped.clearCache = function (type, key, args) {
	            if (!_this.definition.cache[type] || !_this.definition.cache[type][key]) {
	                return;
	            }
	            _this.clearCache(_this.definition.cache[type][key], type, key, args);
	        };
	
	        this.api = {};
	        this.api.requests = this.scoped.requests;
	        this.api.channels = {};
	        Object.keys(this.scoped.channels).forEach(function (key) {
	            _this.api.channels[key] = function (id, callback) {
	                var channel = _this.getValidSubscribers(key, id, false)[0];
	                if (!channel) {
	                    channel = { id: id, callback: callback, key: key };
	                    _this.subscribes.push(channel);
	                } else {
	                    channel.callback = callback;
	                }
	
	                //on subscribe - will have a callback invoked if that channel was active prior to the subscribe
	                Promise.resolve().then(function () {
	                    var lastMessageFromChannel = _this.channelsLastCache[key];
	                    if (lastMessageFromChannel && channel.callback && typeof channel.callback === 'function') {
	                        channel.callback(lastMessageFromChannel);
	                    }
	                });
	            };
	        });
	
	        this.scoped.router = this.root.router;
	
	        if (meta.provider) {
	            this.scoped.provider = this.root.providers[meta.provider].scoped;
	        }
	
	        this.sequencer = new root.classes.Sequencer(this, root.sequencerConfig);
	        this.sequencer.startSequence('mountBase');
	    }
	
	    _createClass(Service, [{
	        key: 'buildRequest',
	        value: function buildRequest(name) {
	            var _this2 = this;
	
	            var args = [].slice.call(arguments).slice(1);
	            var promise = this.promises[name][this.getArgumentsAsIndex(args)] = new Promise(function (resolve, reject) {
	                var _args = [resolve, reject].concat(args);
	                _this2.sequencer.startSequence('serviceRequest', [name, args, _args]);
	            });
	            return promise;
	        }
	    }, {
	        key: 'request',
	        value: function request(name, args) {
	            var cache = this.getRequestCache(name, args.slice(2)); //need to slice resolve and reject arguments
	            if (cache === undefined) {
	                this.definition.requests[name].apply(this.scoped, args);
	                var _args = args.slice(2);
	                this.promises[name][this.getArgumentsAsIndex(_args)].then(function () {
	                    this.setRequestCache(name, _args, [].slice.call(arguments));
	                }.bind(this));
	            } else {
	                args[0].apply(null, cache);
	            }
	        }
	    }, {
	        key: 'checkIfRequestCacheValid',
	        value: function checkIfRequestCacheValid(key) {
	            if (!this.definition.cache.requests[key]) {
	                return false;
	            }
	            return true;
	        }
	    }, {
	        key: 'getRequestCache',
	        value: function getRequestCache(key, args) {
	            if (this.checkIfRequestCacheValid(key)) {
	                var config = this.definition.cache.requests[key];
	                return this.readCache(config, 'requests', key, args);
	            }
	            return undefined;
	        }
	    }, {
	        key: 'setRequestCache',
	        value: function setRequestCache(key, args, value) {
	            if (this.checkIfRequestCacheValid(key)) {
	                var config = this.definition.cache.requests[key];
	                this.writeCache(config, 'requests', key, args, value);
	            }
	        }
	    }, {
	        key: 'buildChannel',
	        value: function buildChannel(key) {
	            var args = [].slice.call(arguments).slice(1);
	            this.sequencer.startSequence('serviceChannel', [key, args]);
	        }
	    }, {
	        key: 'channel',
	        value: function channel(key, args) {
	            var value = this.getChannelCache(key, args); //need to slice resolve and reject arguments
	            var subscribers = this.getValidSubscribers(key);
	            if (value === undefined) {
	                value = this.definition.channels[key].apply(this.scoped, args);
	                this.setChannelCache(key, args, value);
	            }
	            subscribers.forEach(function (sub) {
	                sub.callback(value);
	            });
	        }
	    }, {
	        key: 'getValidSubscribers',
	        value: function getValidSubscribers(key) {
	            var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	            var isType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
	
	            return this.subscribes.filter(function (channel) {
	                var sameKey = key === channel.key;
	                var sameId = id ? id === channel.id : true;
	                var isCallbackFunction = isType ? typeof channel.callback === 'function' : true;
	                return sameKey && sameId && isCallbackFunction;
	            });
	        }
	    }, {
	        key: 'checkIfChannelCacheValid',
	        value: function checkIfChannelCacheValid(key) {
	            if (!this.definition.cache.channels[key]) {
	                return false;
	            }
	            return true;
	        }
	    }, {
	        key: 'getChannelCache',
	        value: function getChannelCache(key, args) {
	            if (this.checkIfChannelCacheValid(key)) {
	                var config = this.definition.cache.channels[key];
	                return this.readCache(config, 'channels', key, args);
	            }
	            return undefined;
	        }
	    }, {
	        key: 'setChannelCache',
	        value: function setChannelCache(key, args, value) {
	            if (this.checkIfChannelCacheValid(key)) {
	                var config = this.definition.cache.channels[key];
	                this.writeCache(config, 'channels', key, args, value);
	            }
	            this.channelsLastCache[key] = value;
	        }
	    }, {
	        key: 'writeCache',
	        value: function writeCache(config, type, key, args, value) {
	            var updateRecord = function updateRecord(json, args, record) {
	                var records = json ? JSON.parse(json) : {};
	                records[args] = record;
	                return JSON.stringify(records);
	            };
	            var argsStr = this.getArgumentsAsIndex(args);
	            var duration = config.duration || false;
	            var storage = config.storage;
	            var record = {
	                value: value,
	                ts: Date.now()
	            };
	            var storageKey = this.getStorageKey(type, key);
	            var recordsJson = void 0;
	            switch (storage) {
	                default:
	                case 'local':
	                    recordsJson = localStorage.getItem(storageKey);
	                    recordsJson = updateRecord(recordsJson, argsStr, record);
	                    localStorage.setItem(storageKey, recordsJson);
	                    break;
	                case 'session':
	                    recordsJson = sessionStorage.getItem(storageKey);
	                    recordsJson = updateRecord(recordsJson, argsStr, record);
	                    sessionStorage.setItem(storageKey, recordsJson);
	                    break;
	                case 'cookie':
	                    recordsJson = _utils2.default.getCookie(storageKey);
	                    recordsJson = updateRecord(recordsJson, argsStr, record);
	                    _utils2.default.setCookie(storageKey, recordsJson);
	                    document.cookie = storageKey + '=' + value + ';path=/';
	                    break;
	                case false:
	                    this.cache[type][key][argsStr] = record;
	                    break;
	            }
	        }
	    }, {
	        key: 'readCache',
	        value: function readCache(config, type, key, args) {
	            var argsStr = this.getArgumentsAsIndex(args);
	            var minTime = config.duration ? Date.now() - parseInt(config.duration) : 0;
	            var storageKey = this.getStorageKey(type, key);
	            var records = void 0;
	            var record = void 0;
	            var recordsJson = void 0;
	
	            switch (config.storage) {
	                default:
	                case 'local':
	                    records = JSON.parse(localStorage.getItem(storageKey));
	                    break;
	                case 'session':
	                    records = JSON.parse(sessionStorage.getItem(storageKey));
	                    break;
	                case 'cookie':
	                    records = JSON.parse(_utils2.default.getCookie(storageKey));
	                    break;
	                case false:
	                    records = this.cache[type][key];
	                    break;
	            }
	            if (!records) {
	                return undefined;
	            }
	
	            record = records[argsStr];
	            if (!record) {
	                return undefined;
	            }
	            if (record.ts > minTime) {
	                return record.value;
	            } else {
	                delete records[argsStr];
	                recordsJson = JSON.stringify(records);
	                switch (config.storage) {
	                    case 'local':
	                        localStorage.setItem(storageKey, recordsJson);
	                        break;
	                    case 'session':
	                        sessionStorage.setItem(storageKey, recordsJson);
	                        break;
	                    case 'cookie':
	                        _utils2.default.setCookie(storageKey, recordsJson);
	                        break;
	                    case false:
	                        this.cache[type][key][argsStr] = false;
	                        break;
	                }
	            }
	            return undefined;
	        }
	    }, {
	        key: 'clearCache',
	        value: function clearCache(config, type, key, args) {
	            var records = void 0;
	            var recordsJson = void 0;
	            var storageKey = this.getStorageKey(type, key);
	
	            switch (config.storage) {
	                default:
	                case 'local':
	                    records = JSON.parse(localStorage.getItem(storageKey));
	                    break;
	                case 'session':
	                    records = JSON.parse(sessionStorage.getItem(storageKey));
	                    break;
	                case 'cookie':
	                    records = JSON.parse(_utils2.default.getCookie(storageKey));
	                    break;
	                case false:
	                    records = this.cache[type][key];
	                    break;
	            }
	            if (args) {
	                var argsStr = this.getArgumentsAsIndex(args);
	                delete records[argsStr];
	            } else {
	                records = {};
	            }
	            recordsJson = JSON.stringify(records);
	            switch (config.storage) {
	                case 'local':
	                    localStorage.setItem(storageKey, recordsJson);
	                    break;
	                case 'session':
	                    sessionStorage.setItem(storageKey, recordsJson);
	                    break;
	                case 'cookie':
	                    _utils2.default.setCookie(storageKey, recordsJson);
	                    break;
	                case false:
	                    this.cache[type][key] = records;
	                    break;
	            }
	        }
	    }, {
	        key: 'getStorageKey',
	        value: function getStorageKey(type, key) {
	            return (this.root.hash || '') + ':' + this.id + '|' + type + '|' + key;
	        }
	    }, {
	        key: 'getArgumentsAsIndex',
	        value: function getArgumentsAsIndex(args) {
	            return args.map(function (arg) {
	                return arg && (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object' ? JSON.stringify(arg) : arg ? arg.toString() : '';
	            }).filter(function (arg) {
	                return !!arg;
	            }).join(',');
	        }
	    }, {
	        key: 'addRoutes',
	        value: function addRoutes() {
	            var _this3 = this;
	
	            if (this.definition.routes) {
	                this.definition.routes.forEach(function (i) {
	                    return _this3.root.router.add(i, _this3.scoped);
	                });
	            }
	        }
	    }]);
	
	    return Service;
	}();
	
	exports.default = Service;

/***/ }),
/* 19 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    mode: 'history',
	    root: '/'
	};

/***/ }),
/* 20 */
/***/ (function(module, exports) {

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
	            return [true];
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
	            target: 'state',
	            action: 'attach'
	        }, {
	            target: 'component',
	            action: 'render'
	        }]
	    },
	    resume: {
	        send: function send(step, hook) {
	            if (step.target === 'component') {
	                this.base.updateState();
	            }
	            return [true];
	        },
	        retrieve: function retrieve(step, hook, res) {
	            if (step.target === 'component') {
	                this.base.onRender(res);
	            }
	        },
	        sequence: [{
	            target: 'state',
	            action: 'attach'
	        }, {
	            target: 'component',
	            action: 'render'
	        }]
	    },
	    localChange: {
	        send: function send(step, hook, params) {
	            if (step.target === 'state') {
	                if (hook === false) {
	                    this.base.state.updateLocalProps(params[0]);
	                    this.base.updateState();
	                }
	            } else {
	                this.base.updateState();
	            }
	            return params;
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
	        send: function send(step, hook, params) {
	            if (step.target === 'component') {
	                this.base.updateState();
	            }
	            return params;
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
	        send: function send(step, hook, params) {
	            if (step.target === 'state') {
	                if (hook === false) {
	                    this.base.state.updateGlobalProps();
	                    this.base.updateState();
	                }
	            } else {
	                this.base.updateState();
	            }
	            return params;
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
	        send: function send(step, hook, params) {
	            if (step.target === 'state') {
	                if (hook === false) {
	                    this.base.state.updateReferencedProps();
	                }
	            } else {
	                this.base.updateState();
	            }
	            return params;
	        },
	        retrieve: function retrieve(step, hook, res) {
	            if (step.target === 'component') {
	                this.base.onRender(res);
	                if (hook === 'post') {
	                    this.base.onDescendantChange();
	                }
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
	    descendantChange: {
	        sequence: [{
	            target: 'component',
	            action: 'descendantChange'
	        }]
	    },
	
	    destroy: {
	        sequence: [{
	            target: 'state',
	            action: 'destroy'
	        }, {
	            target: 'component',
	            action: 'destroy'
	        }]
	    },
	
	    mountBase: {
	        send: function send(step, hook, params) {
	            if (hook === 'pre') {
	                this.base.addRoutes();
	            }
	            return params;
	        },
	        sequence: [{
	            target: 'modifier',
	            action: 'mount'
	        }]
	    },
	    globalChangeModifier: {
	        sequence: [{
	            target: 'modifier',
	            action: 'change'
	        }]
	    },
	    serviceRequest: {
	        send: function send(step, hook, params) {
	            if (hook === false) {
	                this.base.request(params[0], params[2]);
	            }
	            return params;
	        },
	        sequence: [{
	            target: 'base',
	            action: 'request'
	        }]
	    },
	    serviceChannel: {
	        send: function send(step, hook, params) {
	            if (hook === false) {
	                this.base.channel(params[0], params[1]);
	            }
	            return params;
	        },
	        sequence: [{
	            target: 'base',
	            action: 'channel'
	        }]
	    }
	};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _componentDefinition = __webpack_require__(8);
	
	var _componentDefinition2 = _interopRequireDefault(_componentDefinition);
	
	var _component = __webpack_require__(9);
	
	var _component2 = _interopRequireDefault(_component);
	
	var _componentState = __webpack_require__(11);
	
	var _componentState2 = _interopRequireDefault(_componentState);
	
	var _modifier = __webpack_require__(14);
	
	var _modifier2 = _interopRequireDefault(_modifier);
	
	var _data = __webpack_require__(13);
	
	var _data2 = _interopRequireDefault(_data);
	
	var _provider = __webpack_require__(16);
	
	var _provider2 = _interopRequireDefault(_provider);
	
	var _service = __webpack_require__(18);
	
	var _service2 = _interopRequireDefault(_service);
	
	var _componentTag = __webpack_require__(12);
	
	var _componentTag2 = _interopRequireDefault(_componentTag);
	
	var _sequencer = __webpack_require__(5);
	
	var _sequencer2 = _interopRequireDefault(_sequencer);
	
	var _router = __webpack_require__(17);
	
	var _router2 = _interopRequireDefault(_router);
	
	var _logs = __webpack_require__(4);
	
	var _logs2 = _interopRequireDefault(_logs);
	
	var _utils = __webpack_require__(1);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	var _componentMapping = __webpack_require__(10);
	
	var _modifierMapping = __webpack_require__(15);
	
	var _constants = __webpack_require__(2);
	
	var _sequencerConfig = __webpack_require__(20);
	
	var _sequencerConfig2 = _interopRequireDefault(_sequencerConfig);
	
	var _routerConfig = __webpack_require__(19);
	
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
	            Modifier: _modifier2.default,
	            Data: _data2.default,
	            Provider: _provider2.default,
	            Service: _service2.default,
	            ComponentTag: _componentTag2.default,
	            Sequencer: _sequencer2.default,
	            Logs: _logs2.default
	        };
	
	        //globals
	        this.components = [];
	        this.componentsDefinition = [];
	        this.componentElements = [];
	        this.newComponentElements = [];
	        this.modifiersDefinition = [];
	        this.router = router;
	        this.logs = new _logs2.default();
	
	        //scoped
	        this.datas = {};
	        this.modifiers = {};
	        this.providers = {};
	        this.services = {}; //will be used if no provider supplied to service definition
	
	        this.defaultProvider = null;
	
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
	                if (config.provider) {
	                    this.defaultProvider = config.provider;
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
	            var originalArgs = [].slice.call(arguments);
	            var passedArgs = originalArgs.slice(2);
	            if (this.modifiers[modifier] && this.modifiers[modifier].has(key)) {
	                return this.modifiers[modifier].execute(key, passedArgs);
	            }
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
	                        item.element.component.onGlobalStateChange(data, changed);
	                    }
	                }
	            });
	
	            this.modifiersDefinition.forEach(function (item) {
	                if (item.checkChanged(data, Object.keys(changed))) {
	                    item.modifier.onGlobalStateChange(data, changed);
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
	            this.newComponentElements = this.newComponentElements.filter(function (componentItem) {
	                if (!componentItem.element._componentElement.isInitialized) {
	                    if (componentItem.parent === null) {
	                        componentItem.element._componentElement.init();
	                        return false;
	                    } else if (componentItem.parent._componentElement && componentItem.parent._componentElement.isInitialized) {
	                        componentItem.element._componentElement.init();
	                        return false;
	                    }
	                    return true;
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
	            this.newComponentElements.push(componentItem);
	
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
	    }, {
	        key: 'addModifier',
	        value: function addModifier(modifier) {
	            this.modifiersDefinition.push(new _modifierMapping.ModifierItem(modifier));
	        }
	    }]);
	
	    return Root;
	}();
	
	exports.default = Root;

/***/ }),
/* 22 */
/***/ (function(module, exports) {

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


/***/ }),
/* 23 */
/***/ (function(module, exports) {

	/*! (C) Andrea Giammarchi - @WebReflection - Mit Style License */
	(function(e,t){"use strict";function Ht(){var e=wt.splice(0,wt.length);Et=0;while(e.length)e.shift().call(null,e.shift())}function Bt(e,t){for(var n=0,r=e.length;n<r;n++)Jt(e[n],t)}function jt(e){for(var t=0,n=e.length,r;t<n;t++)r=e[t],Pt(r,A[It(r)])}function Ft(e){return function(t){ut(t)&&(Jt(t,e),O.length&&Bt(t.querySelectorAll(O),e))}}function It(e){var t=ht.call(e,"is"),n=e.nodeName.toUpperCase(),r=_.call(L,t?N+t.toUpperCase():T+n);return t&&-1<r&&!qt(n,t)?-1:r}function qt(e,t){return-1<O.indexOf(e+'[is="'+t+'"]')}function Rt(e){var t=e.currentTarget,n=e.attrChange,r=e.attrName,i=e.target,s=e[y]||2,o=e[w]||3;kt&&(!i||i===t)&&t[h]&&r!=="style"&&(e.prevValue!==e.newValue||e.newValue===""&&(n===s||n===o))&&t[h](r,n===s?null:e.prevValue,n===o?null:e.newValue)}function Ut(e){var t=Ft(e);return function(e){wt.push(t,e.target),Et&&clearTimeout(Et),Et=setTimeout(Ht,1)}}function zt(e){Ct&&(Ct=!1,e.currentTarget.removeEventListener(S,zt)),O.length&&Bt((e.target||n).querySelectorAll(O),e.detail===l?l:a),st&&Vt()}function Wt(e,t){var n=this;vt.call(n,e,t),Lt.call(n,{target:n})}function Xt(e,t){nt(e,t),Mt?Mt.observe(e,yt):(Nt&&(e.setAttribute=Wt,e[o]=Ot(e),e[u](x,Lt)),e[u](E,Rt)),e[m]&&kt&&(e.created=!0,e[m](),e.created=!1)}function Vt(){for(var e,t=0,n=at.length;t<n;t++)e=at[t],M.contains(e)||(n--,at.splice(t--,1),Jt(e,l))}function $t(e){throw new Error("A "+e+" type is already registered")}function Jt(e,t){var n,r=It(e),i;-1<r&&(Dt(e,A[r]),r=0,t===a&&!e[a]?(e[l]=!1,e[a]=!0,i="connected",r=1,st&&_.call(at,e)<0&&at.push(e)):t===l&&!e[l]&&(e[a]=!1,e[l]=!0,i="disconnected",r=1),r&&(n=e[t+f]||e[i+f])&&n.call(e))}function Kt(){}function Qt(e,t,r){var i=r&&r[c]||"",o=t.prototype,u=tt(o),a=t.observedAttributes||j,f={prototype:u};ot(u,m,{value:function(){if(Q)Q=!1;else if(!this[W]){this[W]=!0,new t(this),o[m]&&o[m].call(this);var e=G[Z.get(t)];(!V||e.create.length>1)&&Zt(this)}}}),ot(u,h,{value:function(e){-1<_.call(a,e)&&o[h].apply(this,arguments)}}),o[d]&&ot(u,p,{value:o[d]}),o[v]&&ot(u,g,{value:o[v]}),i&&(f[c]=i),e=e.toUpperCase(),G[e]={constructor:t,create:i?[i,et(e)]:[e]},Z.set(t,e),n[s](e.toLowerCase(),f),en(e),Y[e].r()}function Gt(e){var t=G[e.toUpperCase()];return t&&t.constructor}function Yt(e){return typeof e=="string"?e:e&&e.is||""}function Zt(e){var t=e[h],n=t?e.attributes:j,r=n.length,i;while(r--)i=n[r],t.call(e,i.name||i.nodeName,null,i.value||i.nodeValue)}function en(e){return e=e.toUpperCase(),e in Y||(Y[e]={},Y[e].p=new K(function(t){Y[e].r=t})),Y[e].p}function tn(){X&&delete e.customElements,B(e,"customElements",{configurable:!0,value:new Kt}),B(e,"CustomElementRegistry",{configurable:!0,value:Kt});for(var t=function(t){var r=e[t];if(r){e[t]=function(t){var i,s;return t||(t=this),t[W]||(Q=!0,i=G[Z.get(t.constructor)],s=V&&i.create.length===1,t=s?Reflect.construct(r,j,i.constructor):n.createElement.apply(n,i.create),t[W]=!0,Q=!1,s||Zt(t)),t},e[t].prototype=r.prototype;try{r.prototype.constructor=e[t]}catch(i){z=!0,B(r,W,{value:e[t]})}}},r=i.get(/^HTML[A-Z]*[a-z]/),o=r.length;o--;t(r[o]));n.createElement=function(e,t){var n=Yt(t);return n?gt.call(this,e,et(n)):gt.call(this,e)},St||(Tt=!0,n[s](""))}var n=e.document,r=e.Object,i=function(e){var t=/^[A-Z]+[a-z]/,n=function(e){var t=[],n;for(n in s)e.test(n)&&t.push(n);return t},i=function(e,t){t=t.toLowerCase(),t in s||(s[e]=(s[e]||[]).concat(t),s[t]=s[t.toUpperCase()]=e)},s=(r.create||r)(null),o={},u,a,f,l;for(a in e)for(l in e[a]){f=e[a][l],s[l]=f;for(u=0;u<f.length;u++)s[f[u].toLowerCase()]=s[f[u].toUpperCase()]=l}return o.get=function(r){return typeof r=="string"?s[r]||(t.test(r)?[]:""):n(r)},o.set=function(n,r){return t.test(n)?i(n,r):i(r,n),o},o}({collections:{HTMLAllCollection:["all"],HTMLCollection:["forms"],HTMLFormControlsCollection:["elements"],HTMLOptionsCollection:["options"]},elements:{Element:["element"],HTMLAnchorElement:["a"],HTMLAppletElement:["applet"],HTMLAreaElement:["area"],HTMLAttachmentElement:["attachment"],HTMLAudioElement:["audio"],HTMLBRElement:["br"],HTMLBaseElement:["base"],HTMLBodyElement:["body"],HTMLButtonElement:["button"],HTMLCanvasElement:["canvas"],HTMLContentElement:["content"],HTMLDListElement:["dl"],HTMLDataElement:["data"],HTMLDataListElement:["datalist"],HTMLDetailsElement:["details"],HTMLDialogElement:["dialog"],HTMLDirectoryElement:["dir"],HTMLDivElement:["div"],HTMLDocument:["document"],HTMLElement:["element","abbr","address","article","aside","b","bdi","bdo","cite","code","command","dd","dfn","dt","em","figcaption","figure","footer","header","i","kbd","mark","nav","noscript","rp","rt","ruby","s","samp","section","small","strong","sub","summary","sup","u","var","wbr"],HTMLEmbedElement:["embed"],HTMLFieldSetElement:["fieldset"],HTMLFontElement:["font"],HTMLFormElement:["form"],HTMLFrameElement:["frame"],HTMLFrameSetElement:["frameset"],HTMLHRElement:["hr"],HTMLHeadElement:["head"],HTMLHeadingElement:["h1","h2","h3","h4","h5","h6"],HTMLHtmlElement:["html"],HTMLIFrameElement:["iframe"],HTMLImageElement:["img"],HTMLInputElement:["input"],HTMLKeygenElement:["keygen"],HTMLLIElement:["li"],HTMLLabelElement:["label"],HTMLLegendElement:["legend"],HTMLLinkElement:["link"],HTMLMapElement:["map"],HTMLMarqueeElement:["marquee"],HTMLMediaElement:["media"],HTMLMenuElement:["menu"],HTMLMenuItemElement:["menuitem"],HTMLMetaElement:["meta"],HTMLMeterElement:["meter"],HTMLModElement:["del","ins"],HTMLOListElement:["ol"],HTMLObjectElement:["object"],HTMLOptGroupElement:["optgroup"],HTMLOptionElement:["option"],HTMLOutputElement:["output"],HTMLParagraphElement:["p"],HTMLParamElement:["param"],HTMLPictureElement:["picture"],HTMLPreElement:["pre"],HTMLProgressElement:["progress"],HTMLQuoteElement:["blockquote","q","quote"],HTMLScriptElement:["script"],HTMLSelectElement:["select"],HTMLShadowElement:["shadow"],HTMLSlotElement:["slot"],HTMLSourceElement:["source"],HTMLSpanElement:["span"],HTMLStyleElement:["style"],HTMLTableCaptionElement:["caption"],HTMLTableCellElement:["td","th"],HTMLTableColElement:["col","colgroup"],HTMLTableElement:["table"],HTMLTableRowElement:["tr"],HTMLTableSectionElement:["thead","tbody","tfoot"],HTMLTemplateElement:["template"],HTMLTextAreaElement:["textarea"],HTMLTimeElement:["time"],HTMLTitleElement:["title"],HTMLTrackElement:["track"],HTMLUListElement:["ul"],HTMLUnknownElement:["unknown","vhgroupv","vkeygen"],HTMLVideoElement:["video"]},nodes:{Attr:["node"],Audio:["audio"],CDATASection:["node"],CharacterData:["node"],Comment:["#comment"],Document:["#document"],DocumentFragment:["#document-fragment"],DocumentType:["node"],HTMLDocument:["#document"],Image:["img"],Option:["option"],ProcessingInstruction:["node"],ShadowRoot:["#shadow-root"],Text:["#text"],XMLDocument:["xml"]}});typeof t!="object"&&(t={type:t||"auto"});var s="registerElement",o="__"+s+(e.Math.random()*1e5>>0),u="addEventListener",a="attached",f="Callback",l="detached",c="extends",h="attributeChanged"+f,p=a+f,d="connected"+f,v="disconnected"+f,m="created"+f,g=l+f,y="ADDITION",b="MODIFICATION",w="REMOVAL",E="DOMAttrModified",S="DOMContentLoaded",x="DOMSubtreeModified",T="<",N="=",C=/^[A-Z][A-Z0-9]*(?:-[A-Z0-9]+)+$/,k=["ANNOTATION-XML","COLOR-PROFILE","FONT-FACE","FONT-FACE-SRC","FONT-FACE-URI","FONT-FACE-FORMAT","FONT-FACE-NAME","MISSING-GLYPH"],L=[],A=[],O="",M=n.documentElement,_=L.indexOf||function(e){for(var t=this.length;t--&&this[t]!==e;);return t},D=r.prototype,P=D.hasOwnProperty,H=D.isPrototypeOf,B=r.defineProperty,j=[],F=r.getOwnPropertyDescriptor,I=r.getOwnPropertyNames,q=r.getPrototypeOf,R=r.setPrototypeOf,U=!!r.__proto__,z=!1,W="__dreCEv1",X=e.customElements,V=!/^force/.test(t.type)&&!!(X&&X.define&&X.get&&X.whenDefined),$=r.create||r,J=e.Map||function(){var t=[],n=[],r;return{get:function(e){return n[_.call(t,e)]},set:function(e,i){r=_.call(t,e),r<0?n[t.push(e)-1]=i:n[r]=i}}},K=e.Promise||function(e){function i(e){n=!0;while(t.length)t.shift()(e)}var t=[],n=!1,r={"catch":function(){return r},then:function(e){return t.push(e),n&&setTimeout(i,1),r}};return e(i),r},Q=!1,G=$(null),Y=$(null),Z=new J,et=function(e){return e.toLowerCase()},tt=r.create||function sn(e){return e?(sn.prototype=e,new sn):this},nt=R||(U?function(e,t){return e.__proto__=t,e}:I&&F?function(){function e(e,t){for(var n,r=I(t),i=0,s=r.length;i<s;i++)n=r[i],P.call(e,n)||B(e,n,F(t,n))}return function(t,n){do e(t,n);while((n=q(n))&&!H.call(n,t));return t}}():function(e,t){for(var n in t)e[n]=t[n];return e}),rt=e.MutationObserver||e.WebKitMutationObserver,it=(e.HTMLElement||e.Element||e.Node).prototype,st=!H.call(it,M),ot=st?function(e,t,n){return e[t]=n.value,e}:B,ut=st?function(e){return e.nodeType===1}:function(e){return H.call(it,e)},at=st&&[],ft=it.attachShadow,lt=it.cloneNode,ct=it.dispatchEvent,ht=it.getAttribute,pt=it.hasAttribute,dt=it.removeAttribute,vt=it.setAttribute,mt=n.createElement,gt=mt,yt=rt&&{attributes:!0,characterData:!0,attributeOldValue:!0},bt=rt||function(e){Nt=!1,M.removeEventListener(E,bt)},wt,Et=0,St=s in n&&!/^force-all/.test(t.type),xt=!0,Tt=!1,Nt=!0,Ct=!0,kt=!0,Lt,At,Ot,Mt,_t,Dt,Pt;St||(R||U?(Dt=function(e,t){H.call(t,e)||Xt(e,t)},Pt=Xt):(Dt=function(e,t){e[o]||(e[o]=r(!0),Xt(e,t))},Pt=Dt),st?(Nt=!1,function(){var e=F(it,u),t=e.value,n=function(e){var t=new CustomEvent(E,{bubbles:!0});t.attrName=e,t.prevValue=ht.call(this,e),t.newValue=null,t[w]=t.attrChange=2,dt.call(this,e),ct.call(this,t)},r=function(e,t){var n=pt.call(this,e),r=n&&ht.call(this,e),i=new CustomEvent(E,{bubbles:!0});vt.call(this,e,t),i.attrName=e,i.prevValue=n?r:null,i.newValue=t,n?i[b]=i.attrChange=1:i[y]=i.attrChange=0,ct.call(this,i)},i=function(e){var t=e.currentTarget,n=t[o],r=e.propertyName,i;n.hasOwnProperty(r)&&(n=n[r],i=new CustomEvent(E,{bubbles:!0}),i.attrName=n.name,i.prevValue=n.value||null,i.newValue=n.value=t[r]||null,i.prevValue==null?i[y]=i.attrChange=0:i[b]=i.attrChange=1,ct.call(t,i))};e.value=function(e,s,u){e===E&&this[h]&&this.setAttribute!==r&&(this[o]={className:{name:"class",value:this.className}},this.setAttribute=r,this.removeAttribute=n,t.call(this,"propertychange",i)),t.call(this,e,s,u)},B(it,u,e)}()):rt||(M[u](E,bt),M.setAttribute(o,1),M.removeAttribute(o),Nt&&(Lt=function(e){var t=this,n,r,i;if(t===e.target){n=t[o],t[o]=r=Ot(t);for(i in r){if(!(i in n))return At(0,t,i,n[i],r[i],y);if(r[i]!==n[i])return At(1,t,i,n[i],r[i],b)}for(i in n)if(!(i in r))return At(2,t,i,n[i],r[i],w)}},At=function(e,t,n,r,i,s){var o={attrChange:e,currentTarget:t,attrName:n,prevValue:r,newValue:i};o[s]=e,Rt(o)},Ot=function(e){for(var t,n,r={},i=e.attributes,s=0,o=i.length;s<o;s++)t=i[s],n=t.name,n!=="setAttribute"&&(r[n]=t.value);return r})),n[s]=function(t,r){p=t.toUpperCase(),xt&&(xt=!1,rt?(Mt=function(e,t){function n(e,t){for(var n=0,r=e.length;n<r;t(e[n++]));}return new rt(function(r){for(var i,s,o,u=0,a=r.length;u<a;u++)i=r[u],i.type==="childList"?(n(i.addedNodes,e),n(i.removedNodes,t)):(s=i.target,kt&&s[h]&&i.attributeName!=="style"&&(o=ht.call(s,i.attributeName),o!==i.oldValue&&s[h](i.attributeName,i.oldValue,o)))})}(Ft(a),Ft(l)),_t=function(e){return Mt.observe(e,{childList:!0,subtree:!0}),e},_t(n),ft&&(it.attachShadow=function(){return _t(ft.apply(this,arguments))})):(wt=[],n[u]("DOMNodeInserted",Ut(a)),n[u]("DOMNodeRemoved",Ut(l))),n[u](S,zt),n[u]("readystatechange",zt),it.cloneNode=function(e){var t=lt.call(this,!!e),n=It(t);return-1<n&&Pt(t,A[n]),e&&O.length&&jt(t.querySelectorAll(O)),t});if(Tt)return Tt=!1;-2<_.call(L,N+p)+_.call(L,T+p)&&$t(t);if(!C.test(p)||-1<_.call(k,p))throw new Error("The type "+t+" is invalid");var i=function(){return o?n.createElement(f,p):n.createElement(f)},s=r||D,o=P.call(s,c),f=o?r[c].toUpperCase():p,p,d;return o&&-1<_.call(L,T+f)&&$t(f),d=L.push((o?N:T)+p)-1,O=O.concat(O.length?",":"",o?f+'[is="'+t.toLowerCase()+'"]':f),i.prototype=A[d]=P.call(s,"prototype")?s.prototype:tt(it),O.length&&Bt(n.querySelectorAll(O),a),i},n.createElement=gt=function(e,t){var r=Yt(t),i=r?mt.call(n,e,et(r)):mt.call(n,e),s=""+e,o=_.call(L,(r?N:T)+(r||s).toUpperCase()),u=-1<o;return r&&(i.setAttribute("is",r=r.toLowerCase()),u&&(u=qt(s.toUpperCase(),r))),kt=!n.createElement.innerHTMLHelper,u&&Pt(i,A[o]),i}),Kt.prototype={constructor:Kt,define:V?function(e,t,n){if(n)Qt(e,t,n);else{var r=e.toUpperCase();G[r]={constructor:t,create:[r]},Z.set(t,r),X.define(e,t)}}:Qt,get:V?function(e){return X.get(e)||Gt(e)}:Gt,whenDefined:V?function(e){return K.race([X.whenDefined(e),en(e)])}:en};if(!X||/^force/.test(t.type))tn();else if(!t.noBuiltIn)try{(function(t,r,i){r[c]="a",t.prototype=tt(HTMLAnchorElement.prototype),t.prototype.constructor=t,e.customElements.define(i,t,r);if(ht.call(n.createElement("a",{is:i}),"is")!==i||V&&ht.call(new t,"is")!==i)throw r})(function on(){return Reflect.construct(HTMLAnchorElement,[],on)},{},"document-register-element-a")}catch(nn){tn()}if(!t.noBuiltIn)try{mt.call(n,"a","a")}catch(rn){et=function(e){return{is:e.toLowerCase()}}}})(window);

/***/ })
/******/ ])
});
;
//# sourceMappingURL=sepcon.js.map