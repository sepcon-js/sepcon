import SepCon from '../src/index';

let expect = chai.expect;

describe('Service Lifecycle', () => {
    let testNum = 0;
    const scope = SepCon.createScope();

    beforeEach(function () {
        testNum++;
    });

    it('should execute the request lifecycle when a request is being made', function (done) {
        let count = 0;
        scope.createService({
            id: 'testService' + testNum,
        }, {
            requests: {
                testArgs(resolve, reject) {
                }
            },
            lifecycle: {
                pre: {
                    request() {
                        expect(count).to.be.equal(0);
                        count++;
                    }
                },
                on: {
                    request() {
                        expect(count).to.be.equal(1);
                        count++;
                    }
                },
                post: {
                    request() {
                        expect(count).to.be.equal(2);
                        done();
                    }
                }
            }
        });

        scope.service('testService' + testNum).requests.testArgs();
    });
    it('should have the name and arguments on request lifecycle', done => {
        scope.createService({
            id: 'test' + testNum,
        }, {
            requests: {
                someRequest(resolve, reject) {
                }
            },
            lifecycle: {
                request(name, args) {
                    expect(name).to.be.equal('someRequest');
                    expect(args).to.be.an('array');
                    expect(args[0]).to.be.equal(5);
                    done();
                }
            }
        });
        scope.service('test' + testNum).requests.someRequest(5);
    });

    it('should disable response if returns false', done => {
        let wentThroughLifecycle = false;
        let killDoneTimer = setTimeout(() => {
            expect(wentThroughLifecycle).to.equal(true);
            done();
        }, 100);

        scope.createService({
            id: 'test' + testNum,
        }, {
            requests: {
                giveMeNow(resolve, reject) {
                    clearTimeout(killDoneTimer);
                    resolve('ok don\'t hurt me');
                }
            },
            lifecycle: {
                pre: {
                    request(name) {
                        wentThroughLifecycle = true;
                        if (name === 'giveMeNow') {
                            return false;
                        }
                    }
                }
            }
        });
        scope.service('test' + testNum).requests.giveMeNow();
    });

    it('should have lifecycle event for channels', done => {
        let isOk = true;
        scope.createService({
            id: 'testService' + testNum,
        }, {
            channels: {
                testArgs() {
                    return 'testing';
                }
            },
            requests: {
                clickMe() {
                    this.channels.testArgs();
                }
            },
            lifecycle: {
                pre: {
                    channel() {
                        setTimeout(() => isOk && done(), 100);
                        return false;
                    }
                }
            }
        });

        scope.service('testService' + testNum).channels.testArgs('test'+testNum, (value) => {
            isOk = false;
            expect(false);
        });
        scope.service('testService' + testNum).requests.clickMe().then(() => {
            scope.service('testService' + testNum).channels.testArgs('test'+testNum, null);
        });
    });
});