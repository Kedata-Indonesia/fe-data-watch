import { useMutation } from '@tanstack/react-query';
import registerUser from '../repositories/register-user';

const useRegisterUser = () => {
  /**
   * @type {import('@tanstack/react-query').UseMutationResult<any, any, import('../repositories/register-user').RegisterUserBody>}
   */
  const query = useMutation({
    mutationFn: data => {
      return registerUser(data);
    },
  });

  return query;
};

export default useRegisterUser;
