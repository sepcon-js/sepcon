import common from '../shared/utils.common';

export default class {
    constructor(base, config) {
        this.base = base;
        //this.state = comp.state;
        this.config = config;
    }
    startSequence(sequence='mount', params=null) {
        const seq = this.config[sequence];

        let promise = Promise;
        return new Promise((resolve, reject) => {
            if (this.handleSequenceStep('pre', seq, params)) {
                promise.resolve().then(()=> {
                    if (this.handleSequenceStep(false, seq, params)) {
                        window.requestAnimationFrame(()=> {
                            this.handleSequenceStep('post', seq, params);
                            resolve();
                        });
                    }
                    else {
                        resolve();
                    }
                });
            }
            else {
                resolve();
            }
        });
    }
    handleSequenceStep(hook, seq, params) {
        for(let i = 0, e = seq.sequence.length; i < e; i++){
            const sequenceStep = seq.sequence[i];
            params = this.getStepParams(sequenceStep, hook, seq, params);

            let target;
            switch(sequenceStep.target) {
                default:
                    target = this.base.scoped;
                    break;
                case 'state':
                    target = this.base.state.scoped;
                    break;
            }
            //let target = sequenceStep.target === 'state' ? this.state.scoped : this.component.scoped;
            // const actionHook = common.hookString(hook, sequenceStep.action);
            const hasLifecycle = !!target.lifecycle;
            let action = false;

            if(hasLifecycle) {
                const hookKey = hook || 'on';
                const hasHook = !!target.lifecycle[hookKey];
                if(hasHook) {
                    action = target.lifecycle[hookKey][sequenceStep.action];
                }
                if(!action && !hook) {
                    action = target.lifecycle[sequenceStep.action]
                }
            }
            if(action) {
                const res = action.apply(target, params);
                if(res === false) {
                    return false;
                }
                this.handleStepResponse(sequenceStep, hook, seq, res);
            }
            else {
                this.handleStepResponse(sequenceStep, hook, seq);
            }
        }
        return true;
    }
    getStepParams(step, hook, seq, params) {
        if(seq.send) {
            return seq.send.apply(this, [step, hook, params]);
        }
        else return params;
    }
    handleStepResponse(step, hook, seq, res) {
        if(seq.retrieve) {
            return seq.retrieve.apply(this, [step, hook, res]);
        }
        else {
            return res;
        }
    }
}