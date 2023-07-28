import { useQuery } from '@tanstack/react-query';
import getarticles from '../repositories/get-articles';

/**
 * Hooks untuk mendapatkan daftar article
 *
 * @param {Object} [params] Parameter
 * @param {integer} [params.page=1] Halaman yang diambil
 * @param {integer} [params.limit=3] Jumlah data yang diambil dalam satu halaman
 * @param {string} [params.topic_id] Filter berdasarkan ID topik yang diberikan - Opsional
 */

const useGetArticles = ({ page = 1, limit = 3, topic_id = '' }) => {
  const query = useQuery({
    queryKey: ['get-articles', { page, limit, topic_id }],
    queryFn: ({ queryKey }) => {
      const [, params] = queryKey;
      return getarticles(params);
    },
  });
  return query;
};

export default useGetArticles;
