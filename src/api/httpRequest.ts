import { message } from 'antd';
import axios from 'axios';

const request = axios.create({
  baseURL: '/back/admin',
  // baseURL: '/back',
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json',
  },
});

request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (config.url?.includes('login')) {
      return config;
    }
    if (token) {
      config.headers['Authorization'] = token;
    } else {
      message.error('请先登录');
      window.location.href = '/#/login';
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

request.interceptors.response.use(
  (response) => {
    console.log(response);
    if (response.data.code !== '000000') {
      message.error(response.data.message);
      if (response.data.code === '000004') {
        window.location.href = '/#/login';
      }
      return Promise.reject(response.data.message);
    }
    return Promise.resolve(response.data);
  },
  (error) => {
    console.log('---err', error);
    if (error.response.status === 401) {
      window.location.href = '/#/login';
    }
    return Promise.reject(error);
  },
);

export default request;
