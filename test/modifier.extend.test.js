import SepCon from '../src/index';

let expect = chai.expect;

describe('Modifier Extension', ()=> {
    let testNum = 0;
    const scope = SepCon.createScope();
    scope.createData({
        id: 'globals',
    }, {
        number: 5
    });

    beforeEach(function () {
        testNum++;
    });

    it('should remain parent methods', function (done) {
        const parent = scope.createModifier({
            id: 'parent' + testNum,
        }, {
            methods: {
                updateNumber(number) {
                    if (!number) {
                        this.setProps('globals', {
                            number: Math.round(Math.random() * 1000)
                        });
                    }
                    else {
                        this.setProps('globals', {
                            number
                        });
                    }
                    done();
                }
            }
        });
        scope.createModifier({
            id: 'child' + testNum,
            extend: parent,
        }, {
            methods: {
                updateNumber() {
                    parent.proto.methods.updateNumber.apply(this, arguments);
                }
            }
        });
        const testComp = scope.createComponent({
            id: 'test' + testNum,
        }, {
            state: {
                methods: {
                    global: {
                        updateNum: {
                            modifier: 'child' + testNum,
                            key: 'updateNumber'
                        }
                    }
                },
                lifecycle: {
                    mount() {
                        this.methods.global.updateNum();
                    }
                }
            }
        });
        let DIV = document.createElement('div');
        DIV.innerHTML = testComp.createTag().render();
        document.getElementById('ui-tests').appendChild(DIV);
    });


    it('should add new methods to inherited ones', function (done) {
        const testParent = scope.createModifier({
            id: 'parent' + testNum,
        }, {
            methods: {
                updateNumber() {
                    this.setProps('globals', {
                        number: 1000
                    });
                },
                resetNumber() {
                    this.setProps('globals', {
                        number: 0
                    });
                    const number = this.getProp('globals', 'number');
                    expect(number).to.be.equal(0);
                    done();
                }
            }
        });
        scope.createModifier({
            id: 'child' + testNum,
            extend: testParent,
        }, {
            methods: {
                setNumber() {
                    this.methods.updateNumber();
                    const number = this.getProp('globals', 'number');
                    expect(number).to.be.equal(1000);
                }
            }
        });
        const testComp = scope.createComponent({
            id: 'test' + testNum,
        }, {
            state: {
                methods: {
                    global: {
                        setNum: {
                            modifier: 'child' + testNum,
                            key: 'setNumber'
                        },
                        resetNum: {
                            modifier: 'child' + testNum,
                            key: 'resetNumber'
                        }
                    }
                },
                lifecycle: {
                    mount() {
                        this.methods.global.setNum();
                        this.methods.global.resetNum();
                    }
                }
            }
        });
        let DIV = document.createElement('div');
        DIV.innerHTML = testComp.createTag().render();
        document.getElementById('ui-tests').appendChild(DIV);
    });
});