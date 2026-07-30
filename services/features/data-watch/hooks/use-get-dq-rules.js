import { useQuery } from '@tanstack/react-query';
import dataWatchKeys from '../keys';
import getDqRules from '../repositories/get-dq-rules';

const useGetDqRules = () => {
  return useQuery(dataWatchKeys.dqRules(), () => getDqRules());
};

export default useGetDqRules;
