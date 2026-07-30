import dataWatchHttp from '@/services/http/data-watch-http';

/**
 * @param {RegisterUserBody} payload
 */
const registerUser = async payload => {
  const res = await dataWatchHttp().post('/auth/register', {
    email: payload.email,
    full_name: payload.fullName,
    password: payload.password,
    confirmation_password: payload.confirmationPassword,
    country_code: payload.country,
    additional_information: {
      organization: payload.organization,
      date_of_birth: payload.dateOfBirth,
    },
  });
  return res.data;
};

export default registerUser;

/**
 * @typedef {object} RegisterUserBody
 * @property {string} email
 * @property {string} fullName
 * @property {string} password
 * @property {string} confirmationPassword
 * @property {string} organization
 * @property {string} dateOfBirth with format YYYYMMDD
 * @property {string} country
 */
