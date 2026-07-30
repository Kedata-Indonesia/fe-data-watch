import dataWatchHttp from '@/services/http/data-watch-http';

const getDqRules = async () => {
  const res = await dataWatchHttp().get('/data-quality/rules');
  return res.data;
};

export default getDqRules;
