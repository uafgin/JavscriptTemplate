const instanceFactory = (function () {
    const instances = {};
    function createInstance(object, instance, name) {
        if (instances[name])
            throw console.error('instance already exist');
        const newInstance = new object();
        return instances[name] = Object.keys(instance).reduce((a,b) => {
            a[b] = typeof(newInstance[b]) === 'function' ? newInstance[b].bind(newInstance) : newInstance[b];
            return a;
        }, {});
    }
    function getInstance(name) {
        if (!instances[name])
            return null;
        return instances[name];
    }
    return {
        createInstance: createInstance,
        getInstance: getInstance
    };
}());

export default instanceFactory;