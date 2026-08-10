import dataWatchHttp from '@/services/http/data-watch-http';

const getDqDatasetIssues = async ({ datasetId, page = 1, limit = 50, metric, dimension }) => {
  const res = await dataWatchHttp().get(`/data-quality/datasets/${datasetId}/issues`, {
    params: {
      page,
      limit,
      metric: metric ?? undefined,
      dimension: dimension ?? undefined,
    },
  });
  return res.data;
};

export default getDqDatasetIssues;
