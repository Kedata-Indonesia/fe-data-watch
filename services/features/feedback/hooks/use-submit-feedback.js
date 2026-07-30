import { useMutation } from '@tanstack/react-query';
import submitFeedback from '../repositories/submit-feedback';

const useSubmitFeedback = () => {
  const mutation = useMutation(submitFeedback);

  return mutation;
};

export default useSubmitFeedback;
