import dataWatchHttp from '@/services/http/data-watch-http';

/**
 * @description
 * Mendapatkan data profile user
 */
const getProfile = async () => {
  const res = await dataWatchHttp().get('/auth/profile');
  return res.data;
};

export default getProfile;
