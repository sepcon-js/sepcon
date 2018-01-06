import { SepCon } from '../../src/index';
import Counter from './../components/counter';

export default SepCon.createComponent({
    id: 'numbers-modifier-container',
}, {
    view: {
        lifecycle: {
            render() {
                return `<div class="sepcon sepcon-container">
                    ${Counter.createTag().render()}
                </div>`;
            }
        }
    }
});