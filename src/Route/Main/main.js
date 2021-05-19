import router from '../Route';
import instanceFactory from '../../InstanceFactory/instanceFactory';
import RouteBase from '../BaseClass';

const main = (function () {
    const instance = {
        path: null,
        init: null,
        destroy:null
    };
    class Main extends RouteBase {
        constructor() {
            super('/Main/main.html');
        }
        init = () => {
            this.button = document.getElementById('btn');
            this.eventManager.addEventListener(this.button, 'click', (e) => {
                router.navigateTo('/test/');
            });
        }
    }

    return instanceFactory.getInstance('main') || instanceFactory.createInstance(Main, instance, 'main');
});

export default main;
