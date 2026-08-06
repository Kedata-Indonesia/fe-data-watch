import dataWatchHttp from '@/services/http/data-watch-http';

const getDqDatasetRules = async datasetId => {
  const res = await dataWatchHttp().get(`/data-quality/datasets/${datasetId}/rules`);
  return res.data;
};

export default getDqDatasetRules;
