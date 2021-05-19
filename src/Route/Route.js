
import routeMap from './RouteMap';

const route = (function (routeMap) {
    
    class Route {
        constructor(_route) {
            this.RouteMap = _route.reduce((a,b) => { a[b.path] = b; return a; }, {});
            this.app = document.getElementById('app');
            this.init();
            this.popstate();
        }
        init = () => {
            window.addEventListener('popstate',this.popstate);
        }
        popstate = () => {
            const { pathname } = window.location;
            if (this.RouteMap[pathname]) 
                fetch(this.RouteMap[pathname].component.path)
                    .then(res => res.text())
                    .then(this.renderPage)
                    .then(() => this.RouteMap[pathname].component.init());
        }
        renderPage = (html) => {
            return new Promise((res, rej) => {
                this.app.innerHTML = '';
                this.app.insertAdjacentHTML('beforeend', html);
                res();
            })
        }
        navigateTo = (hash) => {
            const { pathname } = window.location;
            if (this.RouteMap[pathname]) 
                this.RouteMap[pathname].component.destroy();
            window.history.pushState({},'',hash);
            const navEvent = new PopStateEvent('popstate');
            window.dispatchEvent(navEvent);
        }
    }
    const Router = new Route(routeMap);
    const instance = {
        navigateTo: Router.navigateTo
    }
    return instance;
}(routeMap));

export default route;