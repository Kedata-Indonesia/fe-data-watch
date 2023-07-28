import dataWatchHttp from '@/services/http/data-watch-http';

const getAllExploration = async dto => {
  const res = await dataWatchHttp().get('/eda/details');

  return res.data;
};

export default getAllExploration;
