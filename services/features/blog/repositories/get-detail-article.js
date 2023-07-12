import clientHttp from '@/services/http/client-http';

/**
 * Mendapatkan article berdasarkan ID article
 */

const getDetailArticle = async ({ articleId }) => {
  const res = await clientHttp().get(`/articles/${articleId}`);
  return res.data;
};

export default getDetailArticle;
