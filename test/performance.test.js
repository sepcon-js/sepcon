import SepCon from '../src/index';

let expect = chai.expect;

describe('Component Performance', ()=> {
    const doneCaller = (function () {
        let cb = null;

        return {
            setDoneCb(done) {
                cb = done;
            },
            callDone() {
                cb();
            }
        };
    })();

    const scope = SepCon.createScope();
    scope.createData({
        id: 'globals',
    }, {
        number: 0,
        propToChange: null
    });
    scope.createModifier({
        id: 'globals',
    }, {
        methods: {
            updateNumber() {
                this.setProps('globals', {
                    number: Math.round(Math.random() * 1000)
                });
            }
        }
    });
    const row = scope.createComponent({
        id: 'row',
    }, {
        state: {
            props: {
                local: {
                    number: 0,
                    text: ''
                },
                global: {
                    num: {
                        data: 'globals',
                        key: 'number'
                    }
                }
            },
            methods: {
                external: {
                    firstRenderCb() {
                    },
                    changeCb() {
                    }
                }
            },
            lifecycle: {
                on: {
                    mount() {
                        this.setProps({
                            number: Math.round(Math.random() * 1000),
                            text: parseInt(Date.now() * 1000 + Math.round(Math.random() * 1000)).toString(36)
                        }, true);
                    },
                    change() {
                        this.methods.external.changeCb();
                    }
                },
                post: {
                    mount() {
                        this.methods.external.firstRenderCb();

                    }
                }
            },
        },
        view: {
            lifecycle: {
                render() {
                    return `${this.props.text} ${this.props.number} ${this.props.num}<br />`;
                }
            }
        }
    });

    const rows = scope.createComponent({
        id: 'rows',
    }, {
        state: {
            props: {
                global: {
                    propToChange: {
                        data: 'globals',
                        key: 'propToChange'
                    }
                }
            },
            methods: {
                external: {
                    createDone() {
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
                    const max = 1000;
                    let rows = [];
                    for (let i = 0; i < max; i++) {
                        const current = row.createTag();
                        current.id(i);
                        if (i === max - 1) {
                            current
                                .refMethods({
                                    firstRenderCb: 'createDone'
                                });
                        }
                        rows.push(current.render());
                    }
                    return rows.join('');
                }
            }
        }
    });

    it('render 1000 rows', (done) => {
        const max = 1000;
        let rows = [];
        for (let i = 0; i < max; i++) {
            const current = row.createTag();
            current.id(i);
            if (i === max - 1) {
                current
                    .methods({
                        changeCb: doneCaller.callDone,
                        firstRenderCb: done
                    });
            }
            rows.push(current.render());
        }
        let DIV = document.createElement('div');
        DIV.innerHTML = rows.join('');
        document.getElementById('ui-tests').appendChild(DIV);
    }).timeout(5000);

    it('render 1000 rows in container', (done) => {
        let rowsHtml = rows.createTag()
            .methods({
                createDone: function () {
                    done();
                }
            })
            .render();
        let DIV = document.createElement('div');
        DIV.innerHTML = rowsHtml;
        document.getElementById('ui-tests').appendChild(DIV);
    }).timeout(5000);

    it('update all 2000 rows with global change', (done) => {
        doneCaller.setDoneCb(done);
        scope.modifier('globals').updateNumber();
    }).timeout(5000);
});