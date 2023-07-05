import clientHttp from '@/services/http/client-http';

/**
 * Menampilkan nomor antrian berdasarkan email
 *
 * @param {Object} [params] Parameter
 * @param {string} [params.email] email user
 */

const checkQueue = async ({ email }) => {
  const res = await clientHttp().get(`/wait-list/queue-number?email=${email}`);
  return res.data;
};

export default checkQueue;
