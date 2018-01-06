import { SepCon } from '../../src/index';

export default SepCon.createModifier({
    id: 'pages',
}, {
    methods: {
        setCurrentPage(url) {
            const pages = this.getProp('site', 'pages');
            for (var page in pages) {
                if (pages[page].url === url) {
                    this.setProps('site', {currentPage: Object.assign({id: page}, pages[page])});
                    return;
                }
            }
        },
    },
    routes: [
        {
            match: '',
            handler: function () {
                this.methods.setCurrentPage(this.router.getFragment());
            }
        }
    ],
    lifecycle: {
        mount() {
            console.log('mount modifier');
        }
    }
});