import dataWatchHttp from '@/services/http/data-watch-http';

const rerunDqDataset = async datasetId => {
  const res = await dataWatchHttp().post(`/data-quality/datasets/${datasetId}/rerun`);
  return res.data;
};

export default rerunDqDataset;
