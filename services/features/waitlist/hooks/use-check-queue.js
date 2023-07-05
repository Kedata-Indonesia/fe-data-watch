import { useQuery } from '@tanstack/react-query';
import checkQueue from '../repositories/check-queue';

/**
 * Hooks untuk get nomor antrian user waitlist
 *
 * @param {Object} [params] Parameter
 * @param {string} [params.email] email user
 *
 */

const useCheckQueue = params => {
  const query = useQuery({
    queryKey: useCheckQueue.keys(params),
    queryFn: () => checkQueue(params),
    enabled: !!params?.email,
  });
  return query;
};

useCheckQueue.keys = ({ email }) => (email ? ['check-queue', { email }] : ['check-queue']);

export default useCheckQueue;
