import clientHttp from '@/services/http/client-http';

/**
 * Mendapatkan daftar articles
 */

const getarticles = async ({ page, limit, topic_id }) => {
  const res = await clientHttp().get(`/articles?page=${page}&limit=${limit}&topic_id=${topic_id}`);
  return res.data;
};

export default getarticles;
