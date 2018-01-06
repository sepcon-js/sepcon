import { SepCon } from '../../src/index';
import OneNumberChanger from './../components/one-number-changer';


export default SepCon.createComponent({
    id: 'text-input',
}, {
    state: {
        props: {
            local: {
                currentValue: '',
                name: 'text-input',
            }
        },
        methods: {
            local: {
                onchange(next, currentValue) {
                    console.log('text-input changed', currentValue);
                    this.setProps({
                        currentValue
                    }, true);
                    next(currentValue);
                },
                onfocus(next) {
                    next();
                },
                onblur(next) {
                    next();
                }
            },
        },
        lifecycle: {
            mount() {
                if (this.props.external.value) {
                    this.updateCurrentValueWithExternal();
                }
            },
            change(changed) {
                if (changed.value) {
                    this.updateCurrentValueWithExternal();
                }
            }
        },
        updateCurrentValueWithExternal() {
            this.setProps({currentValue: this.props.external.value}, true);
        }
    },
    view: {
        events: [
            {event: 'keyup', selector: 'input', callback: 'handleChange'},
            {event: 'focus', selector: 'input', callback: 'handleFocus'},
            {event: 'blur', selector: 'input', callback: 'handleBlur'},
        ],
        lifecycle: {
            render() {
                return `<div class="sepcon sepcon-element">
                <input name="${this.props.name}" value="${this.props.currentValue}"/>
            </div>`;
            }
        },
        handleChange(e) {
            this.methods.onchange(e.target.value);
        },
        handleFocus(e) {
            this.methods.onfocus();
        },
        handleBlur(e) {
            this.methods.onblur();
        }
    }
});