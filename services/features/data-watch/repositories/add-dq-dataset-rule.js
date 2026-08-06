import dataWatchHttp from '@/services/http/data-watch-http';

const addDqDatasetRule = async ({ datasetId, rule_key, columns, parameters, severity }) => {
  const res = await dataWatchHttp().post(`/data-quality/datasets/${datasetId}/rules`, {
    rule_key,
    columns,
    parameters,
    severity,
  });
  return res.data;
};

export default addDqDatasetRule;
