import { useQuery } from '@tanstack/react-query';
import dataWatchKeys from '../keys';
import getDqReport from '../repositories/get-dq-report';

const useGetDqReport = ({ enabled = true } = {}) => {
  return useQuery(dataWatchKeys.dqReport(), () => getDqReport(), {
    enabled,
    retry: false,
  });
};

export default useGetDqReport;
