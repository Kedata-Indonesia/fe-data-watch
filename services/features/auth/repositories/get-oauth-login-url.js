import dataWatchHttp from '@/services/http/data-watch-http';

/**
 * Request the provider authorization URL for a social login.
 * Returns { payload: { login_url } }. Throws (503) when the provider is not
 * configured on the backend.
 */
const getOauthLoginUrl = async provider => {
  const res = await dataWatchHttp().get(`/auth/oauth/login/${provider}`);
  return res.data;
};

export default getOauthLoginUrl;
