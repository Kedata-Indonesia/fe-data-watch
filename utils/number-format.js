import isNumber from 'lodash/fp/isNumber';

/**
 * @param {number} number
 */
const numberFormat = number => {
  if (!isNumber(number)) throw new Error('number must be a number');
  return number.toLocaleString('id-ID');
};

export default numberFormat;
