import { useMutation } from '@tanstack/react-query';
import exportData from '../repositories/export-data';

const useExportData = () => {
  const mutation = useMutation(exportData);

  return mutation;
};

export default useExportData;
