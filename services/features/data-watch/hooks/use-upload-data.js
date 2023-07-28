import { useMutation } from '@tanstack/react-query';
import uploadData from '../repositories/upload-data';

const useUploadData = () => {
  const mutation = useMutation(uploadData, { retry: false });

  return mutation;
};

export default useUploadData;
