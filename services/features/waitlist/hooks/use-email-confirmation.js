import { useMutation } from '@tanstack/react-query';
import emailConfirmation from '../repositories/email-confirmation';

const useEmailConfirmation = () => {
  const mutation = useMutation(emailConfirmation);
  return mutation;
};

export default useEmailConfirmation;
