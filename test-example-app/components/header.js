import { SepCon } from '../../src/index';
import TextHolder from './../elements/text-holder';


SepCon.createComponent({
    id: 'decorator-test',
}, {
    state: {
        methods: {
            local: {
                debug() {
                    console.log('the decorator "debug"', this);
                }
            }
        },
        lifecycle: {
            mount() {
                console.log('the decorator "mount"', this);
                this.methods.local.debug.call(this);
            }
        }
    },
    view: {
        lifecycle: {
            render() {
                console.log('the decorator "render"', this);
                this.debugComponent();
            }
        },
        debugComponent() {
            console.log('the decorator "debugComponent', this);
        }
    }
});

export default SepCon.createComponent({
    id: 'header',
    decorators: ['decorator-test'],
}, {
    state: {
        props: {
            local: {
                currentPage: {
                    title: 'MIAU',
                    description: 'MIAU MIAU'
                }
            },
            global: {
                currentPage: {
                    data: 'site',
                    key: 'currentPage'
                },
                testWrong: {
                    data: 'site',
                    key: 'currentPage.fgsdfg'
                },
                testWrong2: {
                    data: 'miauuuu',
                    key: 'dsfgsdfg'
                }
            }
        },
        methods: {
            local: {
                debug() {
                    console.log('the actual component "debug"', this);
                }
            }
        }
    },
    view: {
        events: [
            {event: 'click', selector: 'div#dfgdfg', handler: 'dfsgdfgs'},
            {event: 'click', selector: 'div#dfg5e3dfg', handler: 'dfsgdfgs'},
            {event: 'click', selector: 'div', handler: 'dfsgdfgs'},
        ],
        lifecycle: {
            render() {
                console.log('the actual component "render"', this);
                this.methods.debug();
                if (!this.props.currentPage) {
                    return '';
                }
                const title = TextHolder.createTag()
                    .props({value: this.props.currentPage.title});
                const description = TextHolder.createTag()
                    .props({value: this.props.currentPage.description});
                return `
                    <div class="sepcon sepcon-component">
                        ${title.render()}
                        ${description.render()}
                    </div>`;
            }
        },
        debugComponent() {
            console.log('the actual component "debugComponent', this);
        }
    }
});