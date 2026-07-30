import dataWatchHttp from '@/services/http/data-watch-http';

const getAllExploration = async ({ signal }) => {
  const res = await dataWatchHttp().get('/eda/details', {
    signal,
  });

  return res.data;
};

export default getAllExploration;
