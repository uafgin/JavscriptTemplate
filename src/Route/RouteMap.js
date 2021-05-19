import main from './Main/main';
import test from './Test/test';

const routeMap = [
    {
        path: '/',
        component: main()
    },
    {
        path: '/test/',
        component: test()
    }
];

export default routeMap;