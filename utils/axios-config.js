import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3333/api/v1.0';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default axios;