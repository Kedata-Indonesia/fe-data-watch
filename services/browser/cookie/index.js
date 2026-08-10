import Cookies from 'js-cookie';

/**
 * @param {string} key
 * @param {string} value
 * @returns {boolean}
 */
const setCookie = (key, value) => {
  try {
    // Remove a legacy cookie created without an explicit path before
    // replacing it with a root-scoped cookie available across the app.
    Cookies.remove(key);
    Cookies.set(key, value, { path: '/' });
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

/**
 * @template T
 *
 * @param {string} key
 * @param {any} [defaultValue]
 * @returns {T}
 */
const getCookie = (key, defaultValue) => {
  return Cookies.get(key) || defaultValue;
};

/**
 * @param {string} key
 * @returns {boolean}
 */
const removeCookie = (key) => {
  try {
    Cookies.remove(key, { path: '/' });
    Cookies.remove(key);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const cookieServices = {
  set: setCookie,
  get: getCookie,
  remove: removeCookie,
};

export { getCookie, setCookie, removeCookie };

export default cookieServices;
