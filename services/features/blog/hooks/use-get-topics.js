import { useQuery } from '@tanstack/react-query';
import getTopics from '../repositories/get-topics';

/**
 * Hooks untuk mengambil data topik artikel
 */

const useGetTopics = () => {
  const query = useQuery({
    queryKey: ['get-topics'],
    queryFn: () => getTopics(),
  });

  return query;
};

export default useGetTopics;
