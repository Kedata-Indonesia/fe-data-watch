import { useQuery } from '@tanstack/react-query';
import dataWatchKeys from '../keys';
import getDqDatasets from '../repositories/get-dq-datasets';

const useGetDqDatasets = ({ enabled = true } = {}) => {
  return useQuery(dataWatchKeys.dqDatasets(), () => getDqDatasets(), {
    enabled,
    retry: false,
  });
};

export default useGetDqDatasets;
