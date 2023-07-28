import { useQuery } from '@tanstack/react-query';
import getAllExploration from '../repositories/get-all-exploration';

const useGetAllExploration = () => {
  const query = useQuery(useGetAllExploration.keys(), () => getAllExploration());

  return query;
};

useGetAllExploration.keys = () => ['eda', 'explorations'];

export default useGetAllExploration;
