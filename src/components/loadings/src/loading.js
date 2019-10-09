import Vue from 'vue';
import tmp from './loading.vue';
const ToastConstructor = Vue.extend(tmp);
let toastPool = [];

let getAnInstance = () => {
    if (toastPool.length > 0) {
        let instance = toastPool[0];
        toastPool.splice(0, 1);
        return instance;
    }
    return new ToastConstructor({
        el: document.createElement('div')
    });
};

let returnAnInstance = instance => {
    if (instance) {
        toastPool.push(instance);
    }
};

let removeDom = event => {
    if (event.target.parentNode) {
        event.target.parentNode.removeChild(event.target);
    }
};

ToastConstructor.prototype.close = function () {
    this.visible = false;
    this.$el.addEventListener('transitionend', removeDom);
    this.closed = true;
    returnAnInstance(this);
};

let show = (options = {}) => {
    let duration = options.duration || 3000;
    let instance = getAnInstance();
    instance.closed = false;
    clearTimeout(instance.timer);
    instance.message = typeof options === 'string' ? options : options.message;
    instance.position = options.position || 'middle';
    instance.className = options.className || '';
    instance.iconClass = options.iconClass || '';
    instance.zIndex = options.zIndex || 999999;
    instance.$el.style.display = 'flex';
    if (document.querySelector('.loading-toast')) return;
    document.body.appendChild(instance.$el);
    return instance;
};
let hide = (options = {}) => {
    var loadings = document.querySelector('.loading-toast');
    document.body.removeChild(loadings);
};
export default {
    show,
    hide
};
