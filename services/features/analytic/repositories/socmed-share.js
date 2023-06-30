import clientHttp from '@/services/http/client-http';

/**
 * Tracking analytic social media share
 *
 * @param {Object} [params] Parameter
 * @param {"twitter" | "facebook" | "whatsapp" | "linkedin"} [params.platform] Platform Social Media
 */

const socmedShare = async ({ platform = '' }) => {
  const res = await clientHttp().post(`/landing/share/${platform}`, {});
  return res.data;
};

export default socmedShare;
