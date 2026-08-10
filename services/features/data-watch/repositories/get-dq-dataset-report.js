import dataWatchHttp from '@/services/http/data-watch-http';

const getDqDatasetReport = async datasetId => {
  const res = await dataWatchHttp().get(`/data-quality/datasets/${datasetId}/report`);
  return res.data;
};

export default getDqDatasetReport;
