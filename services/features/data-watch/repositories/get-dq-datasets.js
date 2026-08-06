import dataWatchHttp from '@/services/http/data-watch-http';

const getDqDatasets = async () => {
  const res = await dataWatchHttp().get('/data-quality/datasets');
  return res.data;
};

export default getDqDatasets;
