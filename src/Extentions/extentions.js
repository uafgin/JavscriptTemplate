export default class eventManager {
    constructor() {
        this.eventList = [];
    }

    addEventListener = (target, eventType, callback) => {
        this.removeEventListener(target, eventType);
        this.eventList.push({
            target,
            eventType,
            callback
        });
        target.addEventListener(eventType, callback);
    }

    removeEventListener = (target, eventType) => {
        this.eventList.forEach((item, index) => {
            if (item.target === target)  {
                 target.removeEventListener(eventType,item.callback);
                 return this.eventList.splice(index,1);
            }   
        })
    };

    destroy = () => {
        this.eventList.forEach((item) => {
            item.target.removeEventListener(item.eventType,item.callback);
        });
        this.eventList.length = 0;
    }
}