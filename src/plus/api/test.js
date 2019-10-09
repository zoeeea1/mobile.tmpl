'use strict';
import http from '../http';

const test = {
    list(filters) {
        return http.get(`/aa?page=${filters.page}`);
    },
    creatList(model) {
        return http.post(`/aa`, model);
    },
    putList(model) {
        return http.put(`/aa`, model);
    },
};
export default test;