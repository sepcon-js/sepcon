import { SepCon } from '../../src/index';
import Button from '../elements/described-button';

export default SepCon.createComponent({
    id: 'navbar-container',
}, {
    state: {
        props: {
            global: {
                pages: {
                    data: 'site',
                    key: 'pages'
                },
                currentPage: {
                    data: 'site',
                    key: 'currentPage'
                }
            }
        },
        methods: {
            local: {
                navigate(next, url) {
                    this.router.navigate(url);
                }
            }
        }
    },
    view: {
        lifecycle: {
            render() {
                let buttons = [];
                for (let key in this.props.pages) {
                    const page = this.props.pages[key];
                    buttons.push(Button.createTag()
                        .props({
                            label: page.title,
                            isActive: this.props.currentPage.id === key
                        })
                        .methods({
                            onclick: this.methods.navigate.bind(this, page.url)
                        })
                        .render());
                }
                return `
                    <div class="sepcon sepcon-container flex-container">
                        ${buttons.join('')}
                    </div>`;
            }
        }
    }
});