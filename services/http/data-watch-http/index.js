import axios from 'axios';
import queryString from 'query-string';
import cookieServices from '@/services/browser/cookie';
import { toast } from 'react-hot-toast';

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

  instance.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      toast.error(error?.response?.data?.message);
      return Promise.reject(error);
    }
  );

  return instance;
};

export default dataWatchHttp;
