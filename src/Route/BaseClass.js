import eventManager from '../Extentions/extentions';

export default class RouteBase {
    constructor(_path) {
        if (!_path)
            throw console.error('Route must have path!');
        this.path = _path;
        this.eventManager = new eventManager();
    }
    init = () => {}
    destroy() {
        this.eventManager.destroy();
    } 
}