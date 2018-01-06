import SepCon from '../src/index';

let expect = chai.expect;

describe('Data Extension', ()=> {
    let testNum = 0;
    const scope = SepCon.createScope();
    const parent = scope.createData({
        id: 'parent',
    }, {
        number: 5
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
                done();
            }
        }
    });

    beforeEach(function () {
        testNum++;
    });

    it('should remain parent props', function (done) {
        scope.createData({
            id: 'child' + testNum,
            extend: parent,
        }, {
            text: 'hello'
        });
        const testComp = scope.createComponent({
            id: 'test' + testNum,
        }, {
            state: {
                props: {
                    global: {
                        num: {
                            data: 'child' + testNum,
                            key: 'number'
                        },
                        txt: {
                            data: 'child' + testNum,
                            key: 'text'
                        }
                    }
                }
            },
            view: {
                lifecycle: {
                    render() {
                        expect(this.props.num).to.be.equal(5);
                        expect(this.props.txt).to.be.equal('hello');
                        done();
                    }
                }
            }
        });
        let DIV = document.createElement('div');
        DIV.innerHTML = testComp.createTag().render();
        document.getElementById('ui-tests').appendChild(DIV);
    });
});