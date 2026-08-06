import { useQuery } from '@tanstack/react-query';
import dataWatchKeys from '../keys';
import getDqDatasetReport from '../repositories/get-dq-dataset-report';

/**
 * @param {object} options
 * @param {string|null} options.datasetId
 * @param {boolean} [options.enabled]
 * @param {number|(() => number)|false} [options.refetchInterval] poll interval; pass 0/false to stop
 */
const useGetDqDatasetReport = ({ datasetId, enabled = true, refetchInterval = false } = {}) => {
  return useQuery(dataWatchKeys.dqDatasetReport(datasetId), () => getDqDatasetReport(datasetId), {
    enabled: enabled && !!datasetId,
    retry: false,
    refetchInterval: refetchInterval || false,
  });
};

export default useGetDqDatasetReport;
