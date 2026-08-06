import dataWatchHttp from '@/services/http/data-watch-http';

const exportDqReport = async ({ datasetId, format = 'json' }) => {
  const res = await dataWatchHttp().get(`/data-quality/datasets/${datasetId}/export`, {
    params: { format },
    responseType: 'blob',
  });
  return res.data;
};

export default exportDqReport;
