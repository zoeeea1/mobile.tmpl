import http from '../http';
import axios from 'axios';
const qiniu = {
    getToken() {
        return http.get(`/t=${Date.now() + Math.random(99)}`);
    },
    upload(model) {
        return axios.post(``, model, { headers: { 'Content-Types': 'multipart/form-data' } });
    }
}
export default qiniu;