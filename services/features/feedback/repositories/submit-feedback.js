import dataWatchHttp from '@/services/http/data-watch-http';

/**
 * @param {SubmitFeedbackBody} payload
 */
const submitFeedback = async payload => {
  const res = await dataWatchHttp().post('/feedback', {
    rate: payload.rate,
    feedback: payload.feedback,
  });
  return res.data;
};

export default submitFeedback;

/**
 * @typedef {object} SubmitFeedbackBody
 * @property {number} rate
 * @property {string} feedback
 */
