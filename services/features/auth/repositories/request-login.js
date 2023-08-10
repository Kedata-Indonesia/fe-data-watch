import dataWatchHttp from '@/services/http/data-watch-http';

/**
 * @description
 * Mendapatkan login url dari server
 */
const requestLogin = async () => {
  const res = await dataWatchHttp().post('/auth/request-login');
  return res.data;
};

export default requestLogin;
