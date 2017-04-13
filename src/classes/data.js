import common from '../shared/utils.common';
import changes from '../shared/utils.changes';

export default class Data {
    constructor(def, root) {
        this.root = root;

        let definition = def.data;
        if(def.extend) {
            definition = common.extend(def.extend.data, def.data);
        }
        this.definition = common.clone(def);
        this.data = definition;
    }
    setProps(props) {
        props = common.formatValueForValidJSON(props);
        return changes.setChanges(this.data, props, true);
    }
    resetProps() {
        let props = common.formatValueForValidJSON(this.definition.data);
        return changes.setChanges(this.data, props, true);
    }
    /**
     * gets an array of keys and returns an object of these keys, populated by corresponding values
     * @param props[Array]
     * @returns {{}} key-value map
     */
    getProps(props) {
        let map = {};
        if(!props) {
            map = common.clone(this.data);
        }
        else {
            for (let i = 0, e = props.length; i < e; i++) {
                map[props[i]] = typeof props[i] === 'object' ? this.getProp(props[i].key, props[i].index) : this.getProp(props[i]);
            }
        }
        return map;
    }
    getProp(prop) {
        const props = prop.split('.');
        let value = this.data;
        for(let i=0,e=props.length;i<e;i++){
            if(value[props[i]] === undefined) {
                this.root.logs.print({
                    title: { content: `Could Not Find a Requested Data Property` },
                    rows: [
                        { style: 'label', content: 'Data Id' },
                        { style: 'code', content: this.definition.id },
                        { style: 'label', content: 'Properties Path' },
                        { style: 'code', content: prop },
                        { style: 'label', content: 'Data (snapshot)' },
                        { style: 'code', content: common.clone(this.data) },
                    ]
                });
                return undefined;
            }
            value = value[props[i]];
        }
        switch(typeof value) {
            case 'string': case 'number': return value;
        }
        return JSON.parse(JSON.stringify(value)); //fast clone of an object
    }
}