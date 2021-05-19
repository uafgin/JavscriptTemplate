import route from '../Route';
import instanceFactory from '../../InstanceFactory/instanceFactory';
import RouteBase from '../BaseClass';

const test = (function () {
    const instance = {
        path: null,
        init: null,
        destroy:null
    };

    class Test extends RouteBase {
        constructor() {
            super('/Test/test.html');
        }
        init = () => {
            this.btn = document.getElementById('btn');
            this.eventManager.addEventListener(this.btn, 'click', (e) => {
                route.navigateTo('/');
            });
        }
    }

    return instanceFactory.getInstance('test') || instanceFactory.createInstance(Test, instance, 'test');
});

export default test;