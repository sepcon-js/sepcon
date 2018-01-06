import SepCon from '../src/index';

let expect = chai.expect;

describe('Service Requests', ()=> {
    let testNum = 0;
    const scope = SepCon.createScope();
    scope.createProvider({
        id: 'testProvider',
    }, {
        lifecycle: {
            mount() {
                console.log('mount provider');
            }
        }
    });

    scope.createService({
        id: 'testService',
    }, {
        requests: {
            addNumbers(resolve, reject, num1, num2) {
                if (num1 && num2) {
                    resolve(num1 + num2);
                }
                else {
                    reject('need two numbers');
                }
            }
        }
    });

    beforeEach(function () {
        testNum++;
    });

    it('should have resolve and reject as arguments at service requests', function (done) {
        scope.createService({
            id: 'testService' + testNum,
        }, {
            requests: {
                testArgs(resolve, reject) {
                    expect(resolve).to.be.a('function');
                    expect(reject).to.be.a('function');
                    done();
                }
            }
        });

        scope.service('testService' + testNum).requests.testArgs();
    });
    it('should return result to .then()', function (done) {
        scope.service('testService').requests.addNumbers(1, 2).then((res) => {
            expect(res).to.be.equal(3);
            done();
        });
    });
    it('should return failure result to .then() to second function', function (done) {
        scope.service('testService').requests.addNumbers(1).then((res) => {
            expect(false);
        }, (res) => {
            expect(res).to.be.equal('need two numbers');
            done();
        });
    });
    it('should fail if provider is not defined', function () {
        const res = scope.createService({
            id: 'testService',
            provider: 'nonExistingProvider',
        }, {});
        expect(res).to.be.equal(false);
    });
    it('should fail if service id exists', function () {
        const res = scope.createService({
            id: 'testService',
        }, {});
        expect(res).to.be.equal(false);
    });
    it('should pass if service id not exists in a given provider', function () {
        const res = scope.createService({
            id: 'testService',
            provider: 'testProvider',
        }, {});
        expect(res).to.be.an('object');
    });
    it('should get service from default provider', function (done) {
        scope.createProvider({
            id: 'testProvider' + testNum,
        }, {
            lifecycle: {
                pre: {
                    mount() {
                        this.someProp = 100;

                    }
                }
            }
        });
        scope.createService({
            id: 'testService',
            provider: 'testProvider' + testNum,
        }, {
            requests: {
                someMethod() {
                    expect(this.provider.someProp).to.be.equal(100);
                    done();
                }
            }
        });
        scope.setConfiguration({
            provider: 'testProvider' + testNum
        });
        //setTimeout(() => {
        scope.service('testService').requests.someMethod();

        //}, 500);
    });
});