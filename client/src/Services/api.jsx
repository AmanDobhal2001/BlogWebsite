import axios from 'axios';

const api = axios.create({
    baseURL: 'http://blogwebsitebackened.up.railway.app/api/',
});

export default api;