import clientHttp from '@/services/http/client-http';

/**
 * Konfirmasi email menggunakan url dari email dengan parameter token
 *
 * @param {Object} [params] Parameter
 * @param {string} [params.token] Confirmation token
 */

const emailConfirmation = async ({ token }) => {
  const res = await clientHttp().put(`/wait-list/confirm/${token}`, {
    confirmation_token: token,
  });
  return res.data;
};

export default emailConfirmation;
