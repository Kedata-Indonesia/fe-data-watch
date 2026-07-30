import dataWatchHttp from '@/services/http/data-watch-http';

/**
 * @param {ChangePasswordBody} payload
 */
const changePassword = async payload => {
  const res = await dataWatchHttp().put('/auth/password', {
    current_password: payload.currentPassword,
    new_password: payload.newPassword,
    confirm_password: payload.confirmPassword,
  });
  return res.data;
};

export default changePassword;

/**
 * @typedef {object} ChangePasswordBody
 * @property {string} currentPassword
 * @property {string} newPassword
 * @property {string} confirmPassword
 */
