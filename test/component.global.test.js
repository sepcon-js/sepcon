import SepCon from '../src/index';

let expect = chai.expect;

describe('Component Global Segregation (+ Data & Modifier)', ()=> {
    let testNum = 0;
    const scope = SepCon.createScope();
    scope.createData({
        id: 'globalProps',
    }, {});
    scope.createModifier({
        id: 'globalMethods',
    }, {
        methods: {
            start() {
                const defaultData = {
                    number: 5,
                    object: {
                        prop1: 1,
                        prop2: 2,
                        object: {
                            prop1: 1,
                            prop2: 2,
                        }
                    },
                    array: [
                        {prop1: 1},
                        {prop2: 2},
                        {prop3: 3},
                    ]
                };
                this.setProps('globalProps', defaultData);
            },
            set() {
                let object = this.getProp('globalProps', 'object');
                let array = this.getProp('globalProps', 'array');
                object.object.prop1 = 5;
                array[0].prop1 = {
                    prop1: 1,
                    prop2: 2,
                    prop3: 3,
                };
                this.setProps('globalProps', {object, array});
            },
            setMainObject() {
                let object = this.getProp('globalProps', 'object');
                object.prop3 = 1;
                this.setProps('globalProps', {object});
            }
        }
    });

    beforeEach(function () {
        scope.modifier('globalMethods').start();

        testNum++;

        document.getElementById('ui-tests').innerHTML = '';
    });

    it('should execute change on bind property change', function (done) {
        const testComp = scope.createComponent({
            id: 'test' + testNum,
        }, {
            state: {
                props: {
                    global: {
                        objProp1: {
                            data: 'globalProps',
                            key: 'object.object.prop1'
                        },
                        arrProp1: {
                            data: 'globalProps',
                            key: 'array.0.prop1'
                        }
                    }
                },
                methods: {
                    global: {
                        set: {
                            modifier: 'globalMethods',
                            key: 'set'
                        }
                    }
                },
                lifecycle: {
                    mount() {
                        this.methods.global.set();
                    },
                    change(changed) {
                        expect(changed).to.have.property('objProp1');
                        expect(changed.objProp1).to.have.property('oldValue');
                        expect(changed.objProp1).to.have.property('newValue');
                        expect(changed.objProp1.oldValue).to.be.equal(1);
                        expect(changed.objProp1.newValue).to.be.equal(5);

                        expect(changed).to.have.property('arrProp1');
                        expect(changed.arrProp1).to.have.property('oldValue');
                        expect(changed.arrProp1).to.have.property('newValue');
                        expect(changed.arrProp1.oldValue).to.be.equal(1);
                        expect(changed.arrProp1.newValue).to.have.property('prop1');
                        expect(changed.arrProp1.newValue).to.have.property('prop2');
                        expect(changed.arrProp1.newValue).to.have.property('prop3');
                        expect(changed.arrProp1.newValue.prop1).to.be.equal(1);
                        expect(changed.arrProp1.newValue.prop2).to.be.equal(2);
                        expect(changed.arrProp1.newValue.prop3).to.be.equal(3);

                        done();
                    }
                }
            }
        });
        let DIV = document.createElement('div');
        DIV.innerHTML = testComp.createTag().render();
        document.getElementById('ui-tests').appendChild(DIV);
    });
    it('should pass a proper global reference to nested components', function (done) {
        const childComp = scope.createComponent({
            id: 'child' + testNum,
        }, {
            state: {
                props: {},
                methods: {
                    global: {
                        set: {
                            modifier: 'globalMethods',
                            key: 'set'
                        }
                    }
                },
                lifecycle: {
                    mount() {
                        this.methods.global.set();
                    },
                    change(changed) {
                        expect(changed).to.have.property('objProp1');
                        expect(changed.objProp1).to.have.property('oldValue');
                        expect(changed.objProp1).to.have.property('newValue');
                        expect(changed.objProp1.oldValue).to.be.equal(1);
                        expect(changed.objProp1.newValue).to.be.equal(5);

                        done();
                    }
                }
            }
        });
        const parentComp = scope.createComponent({
            id: 'parent' + testNum,
        }, {
            state: {
                props: {
                    global: {
                        objProp1: {
                            data: 'globalProps',
                            key: 'object.object'
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
                        return childComp.createTag()
                            .refProps({
                                objProp1: 'objProp1' + '.prop1'
                            }).render();
                    }
                }
            }
        });

        let DIV = document.createElement('div');
        DIV.innerHTML = parentComp.createTag().render();
        document.getElementById('ui-tests').appendChild(DIV);
    });

    it('should pass a proper global reference to nested components - 2 steps', function (done) {
        const grandChildComp = scope.createComponent({
            id: 'grandchild' + testNum,
        }, {
            state: {
                props: {},
                methods: {
                    global: {
                        set: {
                            modifier: 'globalMethods',
                            key: 'set'
                        }
                    }
                },
                lifecycle: {
                    mount() {
                        this.methods.global.set();
                    },
                    change(changed) {
                        expect(changed).to.have.property('objProp1');
                        expect(changed.objProp1).to.have.property('oldValue');
                        expect(changed.objProp1).to.have.property('newValue');
                        expect(changed.objProp1.oldValue).to.be.equal(1);
                        expect(changed.objProp1.newValue).to.be.equal(5);

                        done();
                    }
                }
            }
        });
        const childComp = scope.createComponent({
            id: 'child' + testNum,
        }, {
            state: {
                lifecycle: {
                    change() {
                        return false;
                    }
                }
            },
            view: {
                lifecycle: {
                    render() {
                        return grandChildComp.createTag()
                            .refProps({
                                objProp1: 'objProp1' + '.prop1'
                            }).render();
                    }
                }
            }
        });
        const parentComp = scope.createComponent({
            id: 'parent' + testNum,
        }, {
            state: {
                props: {
                    global: {
                        objProp1: {
                            data: 'globalProps',
                            key: 'object'
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
                        return childComp.createTag()
                            .refProps({
                                objProp1: 'objProp1' + '.object'
                            }).render();
                    }
                }
            }
        });

        let DIV = document.createElement('div');
        DIV.innerHTML = parentComp.createTag().render();
        document.getElementById('ui-tests').appendChild(DIV);
    });

    it('should be able to define new global props after declaration', function (done) {
        const parentComp = scope.createComponent({
            id: 'parent' + testNum,
        }, {
            state: {
                props: {
                    global: {
                        objProp1: {
                            data: 'globalProps',
                            key: 'object.object'
                        },
                        test2: {
                            data: 'globalProps',
                            key: 'object.prop3'
                        }
                    }
                },
                methods: {
                    global: {
                        change: {
                            modifier: 'globalMethods',
                            key: 'setMainObject'
                        }
                    }
                },
                lifecycle: {
                    mount() {
                        this.setGlobalProps({
                            test1: {
                                data: 'globalProps',
                                key: 'object'
                            }
                        });
                        this.methods.global.change();
                    },
                    change(changed) {
                        console.log(changed);
                        expect(changed).to.have.property('test1');
                        expect(changed).to.have.property('test2');
                        expect(changed.test1.newValue).to.have.property('prop3');
                        expect(changed.test1.newValue).to.have.property('object');
                        expect(changed.test2.newValue).to.be.equal(1);
                        done();
                    }
                }
            }
        });

        let DIV = document.createElement('div');
        DIV.innerHTML = parentComp.createTag().render();
        document.getElementById('ui-tests').appendChild(DIV);
    });

    it('should be able to define new global methods after declaration', function (done) {
        const parentComp = scope.createComponent({
            id: 'parent' + testNum,
        }, {
            state: {
                props: {
                    global: {
                        test1: {
                            data: 'globalProps',
                            key: 'object'
                        },
                        test2: {
                            data: 'globalProps',
                            key: 'object.prop3'
                        }
                    }
                },
                lifecycle: {
                    mount() {
                        this.setGlobalMethods({
                            change: {
                                modifier: 'globalMethods',
                                key: 'setMainObject'
                            }
                        });
                        this.methods.global.change();
                    },
                    change(changed) {
                        console.log(changed);
                        expect(changed).to.have.property('test1');
                        expect(changed).to.have.property('test2');
                        expect(changed.test1.newValue).to.have.property('prop3');
                        expect(changed.test1.newValue).to.have.property('object');
                        expect(changed.test2.newValue).to.be.equal(1);
                        done();
                    }
                }
            }
        });

        let DIV = document.createElement('div');
        DIV.innerHTML = parentComp.createTag().render();
        document.getElementById('ui-tests').appendChild(DIV);
    });
});