import { SepCon } from '../../src/index';
import DescribedButton from './../elements/described-button';
import TextHolder from './../elements/text-holder';

const OneStepPass = SepCon.createComponent({
    id: 'props-passer-1-step-pass',
}, {
    state: {
        methods: {
            local: {
                onclick1(next) {
                    console.log('onclick 1');
                    next();
                },
                onclickCb(next, res) {
                    console.log('this is the loca onclickCb @ oneStepsPass', res);
                    next(res + 5);
                }
            },
            external: {
                onclickCb() {
                    console.log('no external defined!!!', this);
                }
            }
        },
        lifecycle: {
            change() {
                return false;
            }
        }
    },
    view: {
        lifecycle: {
            render() {
                const button = DescribedButton.createTag()
                    .props({label: 'Change'})
                    .refMethods({onclick: 'onclick1'});

                let button2 = null;

                const text = TextHolder.createTag()
                    .props({value: 'Current scope (static value): ' + this.props['one-step-value']});
                const textHolder = TextHolder.createTag()
                    .refProps({value: 'one-step-value'});

                if (this.methods.onclickCb) {
                    button2 = DescribedButton.createTag()
                        .props({label: 'Trigger Anonymous Function'})
                        .refMethods({onclick: 'onclickCb'});
                }
                return `<div class="sepcon sepcon-element flex-container">
                    <div>
                        ${text.render()}
                    </div>
                    <div>
                        ${textHolder.render()}
                    </div>
                    <div>
                        ${button.render()}
                    </div>
                    ${ button2 ? '<div>' + button2.render() + '</div>' : '' }
                </div>`;
            }
        }
    }
});

const TwoStepsPass = SepCon.createComponent({
    id: 'props-passer-2-steps-pass',
}, {
    state: {
        methods: {
            local: {
                onclick2(next) {
                    console.log('onclick 2');
                    next();
                },
            },
        },
        lifecycle: {
            change() {
                return false;
            }
        }
    },
    view: {
        lifecycle: {
            render() {
                const text = TextHolder.createTag()
                    .props({value: 'Current scope (static value): ' + this.props['two-steps-value']});
                const oneStepPass = OneStepPass.createTag()
                    .refProps({'one-step-value': 'two-steps-value'})
                    .refMethods({
                        onclick1: 'onclick2',
                        onclickCb: 'onclickCb'
                    });

                let button = null;
                if (this.methods.onclickCb) {
                    button = DescribedButton.createTag()
                        .props({label: 'Trigger Anonymous Function By Reference'})
                        .refMethods({onclick: 'onclickCb'});
                }

                return `<div class="sepcon sepcon-element flex-container">
                        <div>${text.render()}</div>
                        <div>${oneStepPass.render()}</div>
                        <div>${button ? button.render() : ''}</div>
                    </div>`;
            }
        }
    }
});

const ThreeStepsPass = SepCon.createComponent({
    id: 'props-passer-3-steps-pass',
}, {
    state: {
        methods: {
            local: {
                onclick3(next) {
                    console.log('onclick 3');
                    next();
                }
            }
        }
    },
    view: {
        lifecycle: {
            render() {
                const text = TextHolder.createTag()
                    .props({value: 'Current scope (\'change\' is enabled): ' + this.props['three-steps-value']});
                const twoStepsPass = TwoStepsPass.createTag()
                    .refProps({'two-steps-value': 'three-steps-value'})
                    .refMethods({onclick2: 'onclick3'});
                return `<div class="sepcon sepcon-element flex-container">
                    <div>${text.render()}</div>
                    <div>${twoStepsPass.render()}</div>
                </div>`;
            }
        }
    }
});

export default SepCon.createComponent({
    id: 'props-passer',
}, {
    state: {
        props: {
            local: {number: Math.round(Math.random() * 1000),}
        },
        methods: {
            local: {
                change() {
                    this.setProps({'number': Math.round(Math.random() * 1000)});
                },
            }
        },
        lifecycle: {
            change() {
                return false;
            }
        }
    },
    view: {
        lifecycle: {
            render() {
                const text = TextHolder.createTag()
                    .props({value: this.props.number});

                const textReference = TextHolder.createTag()
                    .refProps({value: 'number'});

                const oneStepPass = OneStepPass.createTag()
                    .refProps({'one-step-value': 'number'})
                    .refMethods({onclick1: 'change'});

                const twoStepsPass = TwoStepsPass.createTag()
                    .refProps({'two-steps-value': 'number'})
                    .methods({
                        onclickCb: function (res) {
                            console.log('click anonymous function', this, res);
                        }.bind(this)
                    })
                    .refMethods({
                        onclick2: 'change'
                    });


                const threeStepsPass = ThreeStepsPass.createTag()
                    .refProps({'three-steps-value': 'number'})
                    .refMethods({
                        onclick3: 'change'
                    });

                const button = DescribedButton.createTag()
                    .props({label: 'Change'})
                    .refMethods({onclick: 'change'});

                return `<div class="sepcon sepcon-component">
                    <h3>Original Number - External (static)</h3>
                    ${text.render()}
                    <h3>Original Number - Referenced</h3>
                    ${textReference.render()}
                    <h3>Original change button</h3>
                    ${button.render()}
                    <h3>One-Step Passed Number</h3>
                    ${oneStepPass.render()}
                    <h3>Two-Steps Passed Number</h3>
                    ${twoStepsPass.render()}
                    <h3>Three-Steps Passed Number</h3>
                    ${threeStepsPass.render()}
                </div>`;
            },
            change(e) {
                e.preventDefault();
                e.stopPropagation();
                this.methods.change();
            }
        }
    }
});