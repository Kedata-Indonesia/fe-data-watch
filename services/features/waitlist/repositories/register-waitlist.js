import clientHttp from '@/services/http/client-http';

/**
 * Menambah User ke Waitlist
 *
 * @param {Object} [params] Parameter
 * @param {boolean} [params.is_entry_public] Reason akan dimunculkan ke landing page jika true
 * @param {string} [params.email] User email
 * @param {string} [params.full_name] User full name
 * @param {string} [params.organization] User organization
 * @param {string} [params.reason] User reason
 */

const registerWaitlist = async (params) => {
  const res = await clientHttp().post('/wait-list', {
    is_entry_public: params.is_entry_public,
    email: params.email,
    full_name: params.full_name,
    organization: params.organization,
    reason: params.reason,
  });
  return res.data;
};

export default registerWaitlist;
