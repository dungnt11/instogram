import axios from 'axios';

const instance = axios.create();

instance.interceptors.request.use(async (config) => {
  config.baseURL = "https://insta.ehandytech.com/";
  return config;
});

export { instance as axios };
