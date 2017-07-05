import common from '../shared/utils.common';
import changes from '../shared/utils.changes';
import logs from './logs';
import { TAG_IDENTIFIER } from './../shared/constants';

// will return a wrapped component with the framework's integration layer
export default class Component {

    constructor(componentDefinition, root, element, parent, parentElement) {
        this.root = root;
        this.active = false;

        this._eventsCallbacks = {};
        this.scoped = common.clone(componentDefinition);
        this.scoped.html = element.originalInnerHTML;
        this.scoped.children = element.originalChildren;
        this.scoped.element = element;
        this.scoped.id = element.getAttribute(TAG_IDENTIFIER);
        this.scoped.bindEvents = () => this.bindEvents();

        delete this.scoped.state;
        if(this.scoped.super) {
            delete this.scoped.super.state;
        }

        this.parent = parent;

        this.state = new this.root.classes.ComponentState(componentDefinition.state, this, this.root);
        this.sequencer = new this.root.classes.Sequencer(this, this.root.sequencerConfig);

        this.collectedDataChanges = {};
        this.timer = null;

        this.mapItem = this.root.addComponent(this, element, parentElement);
    }

    bindEvents() {
        if (!this.scoped.events) return;
        if(this.scoped.isInitiatedEvents) {
            this.unbindEvents();
        }

        this.scoped.events.forEach((evObj)=> {
            //getting the target - selector or the whole element
            const _target = evObj.selector ? this.scoped.element.querySelectorAll(evObj.selector) : this.scoped.element;
            if(!this.validateEvents(_target, evObj, true)) {
                return;
            }
            //storing callbacks in a map to keep reference for later unbinding on demand
            this._eventsCallbacks[evObj.selector + ':' + evObj.event + ':' + evObj.callback] = this.scoped[evObj.callback].bind(this.scoped);
            for(let i in _target) {
                let trg = _target[i];
                if(typeof trg === 'object' && trg !== null) {
                    trg.addEventListener(evObj.event, this._eventsCallbacks[evObj.selector + ':' + evObj.event + ':' + evObj.callback], false);
                }
            }
        });
        this.scoped.isInitiatedEvents = true;
    }
    unbindEvents() {
        if (!this.scoped.events || !this.scoped.isInitiatedEvents) return;

        this.scoped.events.forEach((evObj)=> {
            //getting the target - selector or the whole element
            const _target = evObj.selector ? this.scoped.element.querySelector(evObj.selector) : this.scoped.element;
            if(!this.validateEvents(_target, evObj)) {
                return;
            }
            //using the eventsCallback map for live reference for removing it on demand
            _target.removeEventListener(evObj.event, this._eventsCallbacks[evObj.selector + ':' + evObj.event + ':' + evObj.callback], false);
        });
        this.scoped.isInitiatedEvents = false;
    }
    validateEvents(el, ev, bind) {
        if(!el) {
            this.root.logs.print({
                title: { content: `Could Not Find An Element For ${bind ? 'Binding' : 'Unbinding'} An Event ${bind ? 'To' : 'From'}` },
                rows: [
                    { style: 'label', content: 'DOM element' },
                    { style: 'code', content: this.scoped.element },
                    { style: 'label', content: 'event object' },
                    { style: 'code', content: ev },
                ]
            });
            return false;
        }
        if(!this.scoped[ev.callback]) {
            this.root.logs.print({
                title: { content: `Could Not Find The Specified Handler For ${bind ? 'Binding' : 'Unbinding'} ${bind ? 'To' : 'From'} An Event` },
                rows: [
                    { style: 'label', content: 'existing methods' },
                    { style: 'code', content: Object.keys(this.scoped.methods) },
                    { style: 'label', content: 'event object' },
                    { style: 'code', content: ev },
                ]
            });
            return false;
        }
        return true;
    }

    initialize(element) {
        // execute state mount and sync with render sequence
        this.active = true;
        this.setStateData();
        this.sequencer.startSequence('mount');
    }

    //after change, the element is re-attached to the DOM so have to attach it
    resume(element) {
        this.active = true;
        this.unbindEvents();
        this.scoped.element = element;
        if (!this.currentHtml) {
            this.initialize();
            return;
        }
        this.setStateData();
        this.updateState();
        let isInitialHTMLChanged = this.scoped.html != this.scoped.element.originalInnerHTML;
        this.scoped.html = this.scoped.element.originalInnerHTML;
        this.scoped.children = this.scoped.element.originalChildren;
        //this.scoped.element.innerHTML = this.currentHtml;
        this.bindEvents();
        this.state.addRoutes();
        const localChanged = changes.setChanges(this.componentPrevProps, this.scoped.props);
        if (Object.keys(localChanged).length > 0 || isInitialHTMLChanged) {
            this.sequencer.startSequence('externalChange', [localChanged]).then(() => {
                this.preventEmptyHtml();
            });
        }
        else {
            this.sequencer.startSequence('resume').then(() => {
                this.preventEmptyHtml();
            });
        }
    }

    updateState() {
        this.scoped.props = this.state.getProps();
        this.scoped.methods = this.state.getMethods();
    }

    setStateData() {
        this.state.setExternals();
        this.state.updateReferencedProps();
        this.state.updateGlobalProps();
        this.mapItem.setRefGlobal();
    }

    onStateChange(changed) {
        this.sequencer.startSequence('localChange', [changed]).then(() => {
            this.preventEmptyHtml();
        });
    }

    onReferenceChange(changed) {
        const localChanged = this.state.getReferenceStatePropNames(changed);
        this.sequencer.startSequence('referenceChange', [localChanged]).then(() => {
            this.preventEmptyHtml();
        });
    }

    onGlobalStateChange(data, changed) {
        const localChanged = this.state.getGlobalStatePropNames(data, changed);
        Object.assign(this.collectedDataChanges, localChanged);
        clearTimeout(this.timer);
        this.timer = setTimeout(()=>{
            this.debounceGlobalStateChange();
        }, 10);
    }
    debounceGlobalStateChange() {
        this.sequencer.startSequence('globalChange', [this.collectedDataChanges]).then(() => {
            this.preventEmptyHtml();
        });
        this.timer = null;
        this.collectedDataChanges = {};
    }

    onDescendantChange(component) {
        let comp = component || this;
        if(component) {
            this.sequencer.startSequence('descendantChange', [component.scoped]);
        }
        if(this.mapItem.parent) {
            this.mapItem.parent.component.onDescendantChange(comp);
        }
    }

    onRender(html) {
        const isValid = html && typeof html === 'string';
        const isDifferent = html != this.currentHtml;
        if(isValid && isDifferent) {
            this.scoped.element.innerHTML = this.currentHtml = html;
            this.bindEvents();
            this.onDescendantChange();
        }
        else {
            this.preventEmptyHtml();
        }
    }

    preventEmptyHtml() {
        if(!this.scoped.element.innerHTML && this.currentHtml) {
            this.scoped.element.innerHTML = this.currentHtml;
            this.bindEvents();
        }
    }

    onDestroy() {
        this.active = false;
        this.state.removeRoutes();
        this.unbindEvents();
        this.componentPrevProps = common.clone(this.scoped.props);
        this.sequencer.startSequence('destroy');
    }
}