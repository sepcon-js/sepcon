import { TAG_PREFIX, TAG_IDENTIFIER } from './constants';

export default {
    /**
     * get a deep cloned + extended (if 'to' argument is set) object
     * @param from
     * @param to
     * @returns {object}
     */
    clone(from, to) {
        if (from === null || typeof from != "object") return from;
        if (from.constructor != Object && from.constructor != Array) return from;
        if (from.constructor == Date || from.constructor == RegExp || from.constructor == Function ||
            from.constructor == String || from.constructor == Number || from.constructor == Boolean)
            return new from.constructor(from);

        to = to || new from.constructor();

        for (let name in from)
        {
            to[name] = typeof to[name] == 'undefined' ? this.clone(from[name], null) : to[name];
        }

        return to;
    },

    extend(base, extend) {
        let res = this.clone(base);
        if(!res) {
            res = {};
        }
        for (let i in extend) {
            if (res.hasOwnProperty(i)) {
                if(typeof extend[i] === 'object') {
                    res[i] = this.extend(base[i], extend[i]);
                }
                else {
                    res[i] = extend[i];
                }
            }
            else {
                res[i] = extend[i];
            }
        }
        return res;
    },

    concatMethods(meth1, meth2) {
        return function() {
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
    hookString(hook, action){
        return (hook ? `${hook}:` : '') + action;
    },

    formatValueForValidJSON(obj) {
        if(obj === 0) return 0;
        if(obj === undefined) return null;
        if(typeof obj === 'object') {
            if(obj instanceof Array) {
                for(let i = 0, e = obj.length; i < e; i++) {
                    obj[i] = this.formatValueForValidJSON(obj[i]);
                }
            }
            else {
                for (let key in obj) {
                    obj[key] = this.formatValueForValidJSON(obj[key]);
                }
            }
        }
        return obj;
    },

    //Component Functions
    isInDome(element) {
        let parent = element.parentNode;
        while(parent && parent.tagName.toLowerCase() != 'body') {
            parent = parent.parentNode;
        }
        if(!parent) return false;
        return true;
    },
    isDeepNestedInSameComponent(element) {
        const path = this.getComponentElementsPath(element, true, true);
        for(let i=0, e=path.length-1; i< e; i++) {
            if(path[i] === element.tagName) return true;
        }
        return false;
    },
    getParentComponentElement(element) {
        let child = element;
        let parent;
        do {
            parent = child.parentNode;
            if(!parent) break;
            if(parent._componentElement || parent.tagName.toLowerCase().indexOf(TAG_PREFIX) === 0) {
                return parent;
            }
            child = parent;
        }
        while(parent.tagName.toLowerCase() != 'body');
        return false;
    },
    getComponentElementNameForPath(element) {
        let id = element.getAttribute(TAG_IDENTIFIER) || null;
        if(!id) {
            const siblings = this.getComponentElementSiblings(element);
            const siblingsIndex = this.getComponentElementIndex(element, siblings);
            id = '(' + siblingsIndex + ')';

        }
        return element.tagName + ' ' + id;
    },
    getComponentElementsPath(element, typesOnly, asArray) {
        let child = element;
        let parent;
        let path = [];
        do {
            parent = this.getParentComponentElement(child);
            if(!typesOnly && parent.tagName) {
                 path.push(this.getComponentElementNameForPath(parent));
            }
            else if(parent.tagName) {
                path.push(parent.tagName);
            }
            child = parent;
        }
        while(parent);
        path.reverse();
        if(!typesOnly) {
            path.push(this.getComponentElementNameForPath(element));
        }
        else {
            path.push(element.tagName);
        }
        if(asArray) return path;
        return path.join('>');
    },
    getComponentElementSiblings(element) {
        const parent = this.getParentComponentElement(element);
        let siblings = parent ? Array.from(parent.getElementsByTagName(element.tagName)) : [];
        if(siblings.length > 1) {
            siblings = siblings.filter((node)=> {
                if (node._componentElement && node._componentElement.parent === parent) return true;
                return this.getParentComponentElement(node) === parent;
            });
        }
        return siblings;
    },
    getComponentElementIndex(element, siblings) {
        for(let i=0,e=siblings.length;i<e;i++){
            if(siblings[i]===element) return i;
        }
        return 0;
    },

    getComponent(list, element) {
        if(element.component && element.component.mapItem) return element.component.mapItem;

        const path = element._componentElement.path;

        for(let i=0, e=list.length; i<e; i++) {
            let _item = list[i];
            if(_item &&
                (_item.element === element || _item.path === path)) {
                element.component = _item.element.component;
                _item.setElement(element);
                return _item;
            }
        }
        return false;
    },
    getLooseComponent(list, element) {
        const tagName = element.tagName;
        const id = element.getAttribute(TAG_IDENTIFIER);
        let sameTagList = list.filter((_item)=>_item && _item.tag === tagName);
        let item = null;
        sameTagList.forEach((_item)=>{
            if(!item) {
                const isSameIdentifier = _item.id === id;
                const isSameTag = _item.tag === tagName;
                if (isSameTag && isSameIdentifier) {
                    item = _item;
                }
            }
        });

        if(!id) {
            item = this.getComponent(sameTagList, element);
        }
        return item;
    }
};