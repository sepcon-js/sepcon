import { SepCon } from '../../src/index';
import Header from './../components/header';
import Navbar from './../containers/navbar';
import NumbersModifierContainer from './../containers/numbers-modifier-container';
import NumbersContainer from './../containers/numbers-container';
import PassingPropsContainer from './../containers/passing-props-container';

export default SepCon.createComponent({
    id: 'container',
}, {
    state: {
        props: {
            global: {
                page: {
                    data: 'site',
                    key: 'currentPage'
                }
            }
        }
    },
    view: {
        lifecycle: {
            render() {
                if (!this.props.page) {
                    return false;
                }
                let header = Header.createTag();
                let navbar = Navbar.createTag();
                let html = '';
                switch (this.props.page.id) {
                    case 'home':
                        html = `<div class="sepcon sepcon-container">
                    ${NumbersModifierContainer.createTag().render()}
                </div>`;
                        break;
                    case 'flux':
                        html = `<div class="sepcon sepcon-container">
                    ${NumbersContainer.createTag().render()}
                </div>`;
                        break;
                    case 'externals':
                        html = `<div class="sepcon sepcon-container">
                    ${PassingPropsContainer.createTag().render()}
                </div>`;
                        break;
                }
                return `${header.render()}${navbar.render()}${html}`;
            }
        },
        descendantChange(component) {
            console.log('layout descendantChange', component);
        }
    }
});