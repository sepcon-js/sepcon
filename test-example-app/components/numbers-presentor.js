import { SepCon } from '../../src/index';
import OneNumberChanger from './one-number-changer';
import TextHolder from './../elements/text-holder';

const numberPresentor = SepCon.createComponent({
    id: 'number-presentor',
}, {
    state: {
        props: {
            local: {
                index: null,
                number: null,
            },
        },
        lifecycle: {
            change(changed) {
                if (this.props.external.index === '1') {
                    console.log('do not render change for number index 1 - referenced value should still get updated');
                    return false;
                }
            }
        }
    },
    view: {
        lifecycle: {
            render() {
                const text = TextHolder.createTag()
                    .refProps({
                        value: 'number'
                    });
                return `
                    <div class="sepcon sepcon-component">
                        ${this.props.index === '1' ? `<div class="redText">Do not re-render on change</div>` : ''}
                        Index: ${this.props.index} -
                        Number: ${this.props.number}
                        <div class="redText">
                            <h5>Referenced</h5>
                            ${text.render()}
                        </div>
                    </div>`;
            }
        }
    }
});

export default SepCon.createComponent({
    id: 'numbers-presentor',
}, {
    state: {
        props: {
            local: {
                changes: 0
            },
            global: {
                list: {
                    data: 'numbers',
                    key: 'numbers',
                }
            }
        },
        lifecycle: {
            change(changed) {
                this.setProps({
                    changes: this.props.local.changes + 1
                }, true);
                if (changed.list && Object.keys(changed.list.newValue).length != Object.keys(changed.list.oldValue).length) {
                    return true;
                }
                return false;
            }
        }
    },
    view: {
        lifecycle: {
            render() {
                const text = TextHolder.createTag()
                    .refProps({
                        value: 'changes'
                    });
                let numbers = [];
                for (let index in this.props.list) {
                    numbers.push(numberPresentor.createTag()
                        .id(index)
                        .props({
                            index
                        })
                        .refProps({
                            number: 'list.' + index
                        }));
                }
                return `
                    <div class="sepcon sepcon-container">
                        <div class="flex-container">
                            ${numbers.map((item)=>item.render()).join('')}
                        </div>
                        <h5>Numbers data have been changed: </h5>
                        ${text.render()}
                    </div>`;
            }
        }
    }
});