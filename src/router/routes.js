'use strict';

import index from '../views/index';

const routes = [
    {
        path: '*',
        component: index,
    },
    {
        name: 'home',
        path: '/',
        component: index,
    },
];
export default routes;