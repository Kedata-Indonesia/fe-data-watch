import { useQuery } from '@tanstack/react-query';
import requestLogin from '../repositories/request-login';

const useRequestLogin = () => {
  const query = useQuery({
    queryKey: ['sso', 'request-login'],
    queryFn: () => {
      return requestLogin();
    },
  });

  return query;
};

export default useRequestLogin;
