import { useQuery } from '@tanstack/react-query';
import dataWatchKeys from '../keys';
import getDqDatasetRules from '../repositories/get-dq-dataset-rules';

const useGetDqDatasetRules = ({ datasetId, enabled = true } = {}) => {
  return useQuery(dataWatchKeys.dqDatasetRules(datasetId), () => getDqDatasetRules(datasetId), {
    enabled: enabled && !!datasetId,
    retry: false,
  });
};

export default useGetDqDatasetRules;
