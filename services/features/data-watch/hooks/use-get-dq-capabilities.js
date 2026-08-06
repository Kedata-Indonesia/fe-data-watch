import { useQuery } from '@tanstack/react-query';
import dataWatchKeys from '../keys';
import getDqCapabilities from '../repositories/get-dq-capabilities';

const useGetDqCapabilities = ({ enabled = true } = {}) => {
  return useQuery(dataWatchKeys.dqCapabilities(), () => getDqCapabilities(), {
    enabled,
    retry: false,
  });
};

export default useGetDqCapabilities;
