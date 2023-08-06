import { useQuery } from '@tanstack/react-query';
import getAllExploration from '../repositories/get-all-exploration';
import dataWatchKeys from '../keys';

const useGetAllExploration = () => {
  const query = useQuery(dataWatchKeys.explorations(), () => getAllExploration());

  return query;
};

export default useGetAllExploration;
