import { useMutation } from '@tanstack/react-query';
import checkSession from '../repositories/check-session';

const useCheckSession = () => {
  const mutation = useMutation(checkSession);

  return mutation;
};

export default useCheckSession;
