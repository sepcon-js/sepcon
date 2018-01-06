import { SepCon } from '../../src/index';
import PropsPasser from './../components/props-passer';

export default SepCon.createComponent({
    id: 'passing-props-container',
}, {
    view: {
        lifecycle: {
            render() {
                const propsPasser = PropsPasser.createTag();
                return `<div class="sepcon sepcon-container">
                    <div class="presentors">
                        ${propsPasser.render()}
                    </div>
                </div>`;
            }
        }
    }
});