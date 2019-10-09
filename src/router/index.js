import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes';
import http from '../plus/http';
Vue.use(Router);

const router = new Router({
    // mode: 'history', scrollBehavior: function (to, from, savedPosition) {
    // return savedPosition || { x: 0,y: 0 }; },
    linkActiveClass: 'active',
    routes: routes
});

router.beforeEach(async (to, from, next) => {
    next();
})

router["_back"] = router["back"];

router.back = (ext) => {
    setTimeout(router['_back']);
}

window.routes = {};
router.afterEach((to, from) => {

    window.routes[from.name] = from.fullPath;

    // setTimeout(() => {     var i = window.scrollBehaviors[to.fullPath] || 0;
    // window.scrollTo(0, i); }, 200);

})

export default router;