import { SepCon } from '../../src/index';
import Select from './../elements/select';
import TextInput from './../elements/text-input';
import DescribedButton from './../elements/described-button';
import NumbersModifier from './../modifiers/numbers';

export default SepCon.createComponent({
    id: 'one-number-changer',
}, {
    state: {
        props: {
            local: {listForChange: {}, indexes: [], selected: 0, value: ''},
            global: {
                listForChange: {
                    data: 'numbers',
                    key: 'numbers',
                }
            }
        },
        methods: {
            local: {
                setNewValue(next, value) {
                    this.setProps({value});
                    next();
                },
                setNewIndex(next, selected) {
                    this.setProps({
                        selected
                    });
                    next();
                },
                textIsFocused() {
                    this.setProps({isFocused: true}, true);
                },
                textIsNotFocused() {
                    this.setProps({isFocused: false}, true);
                }
            },
            global: {
                update: {
                    modifier: 'numbers',
                    key: 'updateOneNumber',
                    pass() {
                        console.log('change from one-number-changer', this.props.local.selected, this.props.local.value);
                        return [this.props.local.selected, this.props.local.value];
                    }
                },
                resetNumber: {
                    modifier: 'numbers',
                    key: 'updateOneNumber',
                    pass() {
                        return this.props.local.selected;
                    }
                }
            }
        },
        lifecycle: {
            mount() {
                this.updateProps();
            },
            change(changed) {
                if (this.props.local.isFocused) {
                    if (changed.value) {
                        this.methods.global.update();
                    }
                    if (changed.listForChange && Object.keys(this.props.global.listForChange).length > this.props.local.indexes.length) {
                        this.updateProps();
                        return true;
                    }
                    return false;
                }
                this.updateProps();
                return true;
            }
        },
        updateProps() {
            if (!Object.keys(this.props.global.listForChange).length) return;
            let selected;
            let value;
            if (this.props.local.selected) {
                selected = this.props.local.selected;
            }
            else {
                selected = Object.keys(this.props.global.listForChange)[0];
            }
            value = this.props.global.listForChange[selected];


            this.setProps({
                indexes: Object.keys(this.props.global.listForChange),
                selected,
                value
            }, true);
        }
    },
    view: {
        lifecycle: {
            on: {
                render() {
                    let indexOptions = [];
                    for (let i = 0, e = this.props.indexes.length; i < e; i++) {
                        indexOptions[i] = {
                            value: this.props.indexes[i],
                            label: this.props.indexes[i],
                        };
                    }
                    const select = Select.createTag()
                        .props({
                            name: 'changeIndex',
                            options: indexOptions,
                            selected: this.props.selected,
                        })
                        .refMethods({
                            onchange: 'setNewIndex',
                        });

                    const text = TextInput.createTag()
                        .props({
                            name: 'changeNumber',
                            value: this.props.value,
                        })
                        .refMethods({
                            onchange: 'setNewValue',
                            onfocus: 'textIsFocused',
                            onblur: 'textIsNotFocused',
                        });

                    const button = DescribedButton.createTag()
                        .props({
                            label: 'Reset Number ' + this.props.selected,
                        })
                        .refMethods({
                            onclick: 'resetNumber',
                        });

                    return `
                    <div class="sepcon sepcon-component">
                        ${select.render()}
                        ${text.render()}
                        ${button.render()}
                    </div>`;
                }
            },
            post: {
                render(changed) {
                    if (changed && changed.selected) {
                        this.element.querySelector('input[name="changeNumber"]').focus();
                    }
                }
            }
        }
    }
});