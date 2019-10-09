import Vue from 'vue';
import Vuex from 'vuex';
import 'babel-polyfill';
import VueClipboard from 'vue-clipboard2';
import http from './plus/http';
import auth from './plus/auth';
import shaJs from './plus/sha';
import base64Js from './plus/base64';
import app from './app';
import router from './router';
import './components';
import filters from './filters';
import lazyload from 'vue-lazyload';
import mixins from './mixins';
import './plus/extends';

import Calendar from 'vue2-datepick';
Vue.use(Calendar);
Vue.use(VueClipboard);
Vue.use(auth);
Vue.use(Vuex);
Vue.use(lazyload);
Vue.mixin(mixins);

for (var key in filters) {
    Vue.filter(key, filters[key])
}

function getUUid() {
    return new Promise(async function(resolve, reject) {
        let uuid = localStorage.getItem("uuid");

        if (uuid) return resolve(uuid);
        if (!uuid || uuid == '') {
            let s = [];
            let hexDigits = "0123456789abcdef";
            for (let i = 0; i < 36; i++) {
                s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
            }
            s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
            s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
            s[8] = s[13] = s[18] = s[23] = "-";

            uuid = s.join("");

            localStorage.setItem('uuid', uuid);
            return resolve(uuid);
        }
    })
}

const defaultHeaders = async() => {
    let headers = {
        "deviceId": await getUUid(),
    };
    if (auth.token) headers["token"] = auth.token;
    return headers
};

http
    .interceptors
    .request
    .use(async request => {
        request.headers = Object.assign(request.headers, await defaultHeaders());
        return request;
    });

http
    .interceptors
    .response
    .use(response => {
        return response;
    }, error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    router.push({ name: 'signIn' })
            }
        }
        return Promise.reject(error.response.data) // 返回接口返回的错误信息
    });

router
    .beforeHooks
    .unshift((to, from, next) => {

        if (!to.matched.some(q => q.meta.auth)) {
            return next();
        }
        var authRoutes = to
            .matched
            .filter(function(route) {
                return route
                    .meta
                    .hasOwnProperty('auth');
            });

        let roles = authRoutes[authRoutes.length - 1].meta.auth;

        if (roles && (roles === true || roles.constructor === Array)) {

            if (!auth.isAuthenticated) {
                next({
                    name: 'signIn',
                    query: {
                        returnUrl: from.path,
                    }
                });
            } else if (roles.constructor === Array) {
                //TODO:权限点处理
            } else {
                next();
            }
        } else {
            next();
        }
    });

new Vue({
    el: '#app',
    router,
    render: h => h(app),
    data: {
        eventHub: new Vue()
    }
});