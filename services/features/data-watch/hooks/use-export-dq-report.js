import { useMutation } from '@tanstack/react-query';
import exportDqReport from '../repositories/export-dq-report';

const useExportDqReport = () => {
  return useMutation(exportDqReport);
};

export default useExportDqReport;
