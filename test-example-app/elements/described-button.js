import { SepCon } from '../../src/index';

export default SepCon.createComponent({
    id: 'described-button',
}, {
    state: {
        props: {
            local: {label: 'Button', description: 'Button\'s Description', isActive: false}
        },
        methods: {
            local: {
                onclick(next, num) {
                    num += 5;
                    console.log('described-button clicked');
                    next(num);
                },
            }
        },
        routes: [
            {
                match: /^\s*$/,
                handler: function () {
                    console.log('THIS IS HOME PAGE');
                }
            }
        ]
    },
    view: {
        events: [
            {event: 'click', selector: '.clickable', callback: 'handleClick'}
        ],
        lifecycle: {
            render() {
                let classes = ['button', 'raised', 'clickable'];
                if (this.props.isActive) {
                    classes.push('is-active');
                }
                return `<div class="sepcon sepcon-element">
                <div class="${classes.join(' ')}">
                    <h5>${this.props.label}</h5>
                </div>
                ${this.children.length ? this.children.map(el => el.outerHTML).join('') : ''}
            </div>`;
            }
        },
        handleClick(e) {
            e.preventDefault();
            e.stopPropagation();
            this.methods.onclick(123);
        }
    }
});