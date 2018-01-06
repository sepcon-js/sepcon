import SepCon from '../src/index';

let expect = chai.expect;

describe('Modifier Properties', ()=> {
    let testNum = 0;
    const scope = SepCon.createScope();
    scope.createData({
        id: 'globals',
    }, {
        number: 5
    });

    scope.createData({
        id: 'globals2',
    }, {
        number: 4,
        object: {
            prop1: 1,
            prop2: 'b',
            prop3: [3, 3, 3],
        }
    });

    scope.createModifier({
        id: 'globals',
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
            },
            updateTwoDatas() {
                this.setProps('globals', {
                    number: 1
                });
                this.setProps('globals2', {
                    number: 1
                });
            }
        }
    });

    beforeEach(function () {
        testNum++;
    });

    it('should bind modifier to data changes if defined such a connection via props', function (done) {
        scope.createModifier({
            id: 'globals' + testNum,
        }, {
            props: {
                globals2number: {
                    data: 'globals',
                    key: 'number'
                }
            },
            lifecycle: {
                change(changed) {
                    expect(changed).to.have.property('globals2number');
                    expect(changed.globals2number.newValue).to.be.equal(7);
                    expect(changed.globals2number.oldValue).to.be.equal(5);
                    done();
                },
                mount() {
                    //this.modify('globals', 'updateNumber', 7);
                    scope.modifier('globals').updateNumber(7);
                }
            }
        });
    });

    it('should bind modifier to data changes and even if two datas changed - get both together', function (done) {
        scope.createModifier({
            id: 'globals' + testNum,
        }, {
            props: {
                globals_number: {
                    data: 'globals',
                    key: 'number'
                },
                globals2_number: {
                    data: 'globals2',
                    key: 'number'
                }
            },
            lifecycle: {
                change(changed) {
                    expect(changed).to.have.property('globals_number');
                    expect(changed).to.have.property('globals2_number');
                    expect(changed.globals_number.newValue).to.be.equal(1);
                    expect(changed.globals2_number.newValue).to.be.equal(1);
                    done();
                },
                mount() {
                    scope.modifier('globals').updateTwoDatas();
                }
            }
        });
    });
});