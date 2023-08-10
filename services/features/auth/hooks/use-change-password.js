import { useMutation } from '@tanstack/react-query';
import changePassword from '../repositories/change-password';

const useChangePassword = () => {
  /**
   * @type {import('@tanstack/react-query').UseMutationResult<any, any, import('../repositories/change-password').ChangePasswordBody>}
   */
  const query = useMutation({
    mutationFn: data => {
      return changePassword(data);
    },
  });

  return query;
};

export default useChangePassword;
