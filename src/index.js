import Root from './root';
import { DATA_CHANGES_AFFECTING } from './shared/constants';
import common from './shared/utils.common';

const formatShorthand = (def) => {
    if(def && def.lifecycle) {
        const segments = ['pre', 'on', 'post'];
        def.lifecycle = Object.assign({
            pre: {},
            on: {},
            post: {}
        }, def.lifecycle);
        Object.keys(def.lifecycle).forEach(key => {
            if(segments.indexOf(key) === -1) {
                def.lifecycle.on[key] = def.lifecycle[key];
            }
        });
        Object.keys(def.lifecycle.on).forEach(key => {
            def.lifecycle[key] = def.lifecycle.on[key];
        });
    }
};

function create(meta, def, type, defs, cls) {
    switch(type) {
        case 'component':
            formatShorthand(def.state);
            formatShorthand(def.view);
            break;
        default:
            formatShorthand(def);
    }
    let definition = common.clone(def);
    if(defs[meta.id]) {
        this.root.logs.print({
            title: { content: `Tried To Create A Definition With Existing Id`},
            rows: [
                { style: 'label', content: 'Object Type' },
                { style: 'code', content: type },
                { style: 'label', content: 'Definition Id' },
                { style: 'code', content: meta.id },
            ]
        });
        return false;
    }
    else {
        if(meta.extend) {
            if(!meta.extend.proto) {
                this.root.logs.print({
                    title: { content: `Tried To Extend A Non-Existing Definition`},
                    rows: [
                        { style: 'label', content: 'Object Type' },
                        { style: 'code', content: type},
                        { style: 'label', content: 'Definition Id' },
                        { style: 'code', content: meta.id },
                        { style: 'label', content: 'Extended Id' },
                        { style: 'code', content: meta.extend },
                    ]
                });
            }
            else {
                meta.extend = common.clone(meta.extend.proto);
            }
        }
        if(meta.decorators) {
            meta.decorators = meta.decorators.filter(dec => {
                if(!defs[dec]) {
                    this.root.logs.print({
                        title: { content: `Tried To Decorate A Definition With a Non-Existing One`},
                        rows: [
                            { style: 'label', content: 'Object Type' },
                            { style: 'code', content: type },
                            { style: 'label', content: 'Definition Id' },
                            { style: 'code', content: meta.id },
                            { style: 'label', content: 'Decorator Id' },
                            { style: 'code', content: dec },
                        ]
                    });
                    return false;
                }
                return true;
            });
            meta.decorators = meta.decorators.map(dec => common.clone(defs[dec].definition));
        }
        defs[meta.id] = new cls(meta, definition, this.root);
    }
    return {
        id: meta.id,
        proto: defs[meta.id].definition
    };
}

class SepConClass {
    constructor(options) {
        if(options) {
            this.hash = options.hash;
        }
        this.root = new Root(this, options);
        this.classes = this.root.classes;
        this.setConfiguration = this.root.setConfiguration.bind(this.root);
    }
    modifier(modifier) {
        if (this.root.modifiers[modifier]) {
            return this.root.modifiers[modifier].scoped.methods;
        }
    }
    service(service, provider = null) {
        let services;
        provider = provider || this.root.defaultProvider;
        if(provider && this.root.providers[provider] && this.root.providers[provider].services[service]) {
            services = this.root.providers[provider].services;
        }
        else {
            services = this.root.services;
        }
        if(services[service]) {
            return services[service].api;
        }
        return null;
    }
    createData(meta, def = {}) {
        return create.call(this, meta, def, 'data', this.root.datas, this.root.classes.Data);
    }
    createModifier(meta, def = {}) {
        return create.call(this, meta, def, 'modifier', this.root.modifiers, this.root.classes.Modifier);
    }
    createProvider(meta, def = {}) {
        return create.call(this, meta, def, 'provider', this.root.providers, this.root.classes.Provider);
    }
    createService(meta, def = {}) {
        if(meta.provider && !this.root.providers[meta.provider]) {
            this.root.logs.print({
                title: { content: `Reference to Non-Existing Service Provider`},
                rows: [
                    { style: 'label', content: 'Service Id' },
                    { style: 'code', content: meta.id },
                    { style: 'label', content: 'Provider Id' },
                    { style: 'code', content: meta.provider },
                ]
            });
            return false;
        }
        return create.call(this, meta, def, 'service', meta.provider ? this.root.providers[meta.provider].services : this.root.services, this.root.classes.Service);
    }
    createComponent(meta, def = {}) {
        let created = create.call(this, meta, def, 'component', this.root.components, this.root.classes.ComponentDefinition);
        return Object.assign(created, {
            createTag: () => this.createTag(meta.id),
            toString: () => this.createTag(meta.id).render()
        });
    }
    createTag(id) {
        return new this.root.classes.ComponentTag(this, id);
    }
    createUid() {
        return common.buildUid();
    }
}

const _sepCon = (function sepConHandler() {
    let sepCon = new SepConClass();
    sepCon.createScope = (options = {}) => {
        options.hash = options.hash || common.buildUid();
        return new SepConClass(options);
    };
    return sepCon;
})();

export { _sepCon as SepCon };
export default _sepCon;