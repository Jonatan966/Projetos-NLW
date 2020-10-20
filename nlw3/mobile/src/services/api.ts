import axios from 'axios';

const api = axios.create({
    baseURL: 'http://26.26.81.16:3333'
});

export default api;