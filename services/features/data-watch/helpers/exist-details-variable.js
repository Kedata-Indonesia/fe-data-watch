import VARIABLE_DETAILS from '@/constants/variables/variable-details';
import VARIABLE_TYPES from '@/constants/variables/variable-types';

const existDetailsVariable = /** @type {const} */ ({
  [VARIABLE_TYPES.TEXT]: {
    [VARIABLE_DETAILS.OVERVIEW]: 'Overview',
    [VARIABLE_DETAILS.WORDS]: 'Words',
  },
  [VARIABLE_TYPES.CATEGORICAL]: { [VARIABLE_DETAILS.CATEGORIES]: 'Categories' },
  [VARIABLE_TYPES.NUMERIC]: {
    [VARIABLE_DETAILS.STATISTIC]: 'Statistic',
    [VARIABLE_DETAILS.HISTOGRAM]: 'Histogram',
  },
});

export default existDetailsVariable;
