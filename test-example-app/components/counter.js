import { SepCon } from '../../src/index';
import DescribedButton from './../elements/described-button';

export default SepCon.createComponent({
    id: 'counter',
}, {
    state: {
        props: {
            local: {count: 1,}
        },
        methods: {
            local: {
                increase() {
                    this.setProps({count: this.props.local.count + 1});
                },
            }
        },
    },
    view: {
        lifecycle: {
            render() {
                const button = DescribedButton.createTag()
                    .props({label: 'This is a simple counter button'})
                    .refMethods({onclick: 'increase'});

                return `
                    <div class="sepcon sepcon-component">
                        ${button.render('open')}
                            <div>Clicked <span class="underline">${this.props.count}</span> times</div>
                        ${button.render('close')}
                    </div>`;
            }
        }
    },
    increaseCounter(e) {
        e.preventDefault();
        e.stopPropagation();
        this.methods.increase();
    }
});