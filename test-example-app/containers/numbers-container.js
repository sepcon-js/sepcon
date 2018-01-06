import { SepCon } from '../../src/index';
import OneNumberChanger from './../components/one-number-changer';
import NumbersPresentor from './../components/numbers-presentor';
import NumbersModifier from './../modifiers/numbers';

export default SepCon.createComponent({
    id: 'numbers-container',
}, {
    view: {
        lifecycle: {
            render() {
                const oneNumberChanger = OneNumberChanger.createTag();
                const numbersPresentor = NumbersPresentor.createTag();
                return `<div class="sepcon sepcon-container flex-container">
                    <div>
                        ${numbersPresentor.render()}
                    </div>
                    <div>
                        ${oneNumberChanger.render()}
                    </div>
                </div>`;
            }
        }
    }
});