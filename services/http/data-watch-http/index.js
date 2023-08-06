import axios from 'axios';
import queryString from 'query-string';
import cookieServices from '@/services/browser/cookie';

const dataWatchHttp = (version = 'v1') => {
  const instance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_DATA_WATCH_API_URL}/${version}`,
    paramsSerializer: params => {
      /**
       * Secara default array akan di-serialize menjadi array[]=1&array[]=2 dst.
       * dengan `queryString.stringify` kita bisa mengubahnya menjadi array=1&array=2 dst.
       */
      return queryString.stringify(params);
    },
  });

  instance.interceptors.request.use(config => {
    const sessionId = cookieServices.get('session_id');

    if (!!sessionId) {
      config.headers['session-id'] = sessionId;
    }

    return config;
  });

  return instance;
};

export default dataWatchHttp;
