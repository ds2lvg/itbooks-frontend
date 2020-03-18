import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3333/api/v1.0';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
instance.defaults.timeout = 2500;

axios.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
});

/*
// 커스텀한 axios 인스턴스에 인터셉터 추가도 가능
const instance = axios.create({
  baseURL: 'https://api.example.com',
  timeout = 2500,
  headers: {
    Accept: "application/json"
  }
});

// 인터셉트를 활용해서 인스턴스마다 조건에 따라 다르게 토큰을 설정 할 수 있음
instance.interceptors.request.use(() => {
  if(localStorage.token) {
    instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;
  }
});
*/

export default axios;