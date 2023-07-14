import clientHttp from '@/services/http/client-http';

/**
 * Mengambil daftar topik artikel
 */

const getTopics = async () => {
  const res = await clientHttp().get('/topics');
  return res.data;
};

export default getTopics;
