import { useQuery } from '@tanstack/react-query';
import getDetailArticle from '../repositories/get-detail-article';

/**
 * Hooks untuk mendapatkan detail article
 *
 * @param {Object} [params] Parameter
 * @param {string} [params.articleId] Filter berdasarkan ID article
 */

const useGetDetailArticle = ({ articleId }) => {
  const query = useQuery({
    queryKey: ['get-detail-article', { articleId }],
    queryFn: ({ queryKey }) => {
      const [, params] = queryKey;
      return getDetailArticle(params);
    },
    enabled: !!articleId,
  });
  return query;
};

export default useGetDetailArticle;
