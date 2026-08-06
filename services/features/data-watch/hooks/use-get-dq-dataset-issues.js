import { useQuery } from '@tanstack/react-query';
import dataWatchKeys from '../keys';
import getDqDatasetIssues from '../repositories/get-dq-dataset-issues';

/**
 * @param {object} options
 * @param {string|null} options.datasetId
 * @param {object} [options.params] page/limit/metric/dimension
 * @param {boolean} [options.enabled]
 */
const useGetDqDatasetIssues = ({ datasetId, params = {}, enabled = true } = {}) => {
  return useQuery(
    dataWatchKeys.dqDatasetIssues(datasetId, params),
    () => getDqDatasetIssues({ datasetId, ...params }),
    {
      enabled: enabled && !!datasetId,
      retry: false,
    }
  );
};

export default useGetDqDatasetIssues;
