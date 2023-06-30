import { useMutation } from '@tanstack/react-query';
import registerWaitlist from '../repositories/register-waitlist';

const useRegisterWaitlist = () => {
  const mutation = useMutation(registerWaitlist);
  return mutation;
};

export default useRegisterWaitlist;
