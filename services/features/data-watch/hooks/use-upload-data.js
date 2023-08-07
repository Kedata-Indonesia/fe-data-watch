import { useMutation } from '@tanstack/react-query';
import uploadService from '../repositories/upload-service';

const useUploadData = () => {
  const mutation = useMutation(uploadService, { retry: false });

  return mutation;
};

export default useUploadData;
