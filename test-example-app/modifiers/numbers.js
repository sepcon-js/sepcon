import { SepCon } from '../../src/index';

export default SepCon.createModifier({
    id: 'numbers',
}, {
    methods: {
        init() {
            this.setProps('numbers', {numbers: {1: 10, 2: 20, 3: 30, 4: 40, 5: 50}});
        },
        updateOneNumber(number, value) {
            let numbers = this.getProp('numbers', 'numbers');
            numbers[number] = parseInt(value) || 0;
            this.setProps('numbers', {numbers});
        },
    },
    lifecycle: {
        mount() {
            setTimeout(() => {
                this.methods.init();
                setTimeout(() => {
                    //setInterval(()=>{
                    this.methods.updateOneNumber(1, Math.round(Math.random() * 1000));
                    //}, 100);
                    setTimeout(() => {
                        this.methods.updateOneNumber('B', Math.round(Math.random() * 1000));
                    }, 5000);
                }, 500);
            }, 500);
        }
    }
});