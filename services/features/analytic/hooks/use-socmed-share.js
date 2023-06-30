import { useMutation } from '@tanstack/react-query';
import socmedShare from '../repositories/socmed-share';

const useSocmedShare = () => {
  const mutation = useMutation(socmedShare);
  return mutation;
};

export default useSocmedShare;
