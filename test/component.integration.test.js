import SepCon from '../src/index';

var assert = chai.assert;

describe('Component Integration', ()=>{
    let comp;
    it('should add new component under unique tag', ()=>{
        comp = SepCon.createComponent({
            id: 'test-tag'
        },
        {
            view: {
                lifecycle: {
                    on: {
                        render: function () {
                            return '<div>Test</div>';
                        }
                    }
                }
            }
        }
        );
        assert.ok(comp);
    });

    describe('render', ()=>{
        var el = document.getElementById('ui-tests');
        it('should create new instance of the component on DOM element creation', (done)=>{
            el.innerHTML = SepCon.createTag('test-tag').render();
            setTimeout(function(){
                assert.ok(el.children[0].innerHTML !== '');
                done();
            }, 0);
        });
        it('should create new different instance of the component if added again', (done)=>{
            el.innerHTML += SepCon.createTag('test-tag').render();
            setTimeout(function(){
                assert.equal(el.children.length, 2);
                done();
            }, 0);
        });
    });
});