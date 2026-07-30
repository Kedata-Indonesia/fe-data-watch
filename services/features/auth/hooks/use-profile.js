import { useQuery } from '@tanstack/react-query';
import getProfile from '../repositories/get-profile';

const useProfile = () => {
  const query = useQuery({
    queryKey: ['profile'],
    queryFn: () => {
      return getProfile();
    },
  });

  return query;
};

export default useProfile;
