import { useMutation, useQueryClient } from '@tanstack/react-query';
import dataWatchKeys from '../keys';
import rerunDqDataset from '../repositories/rerun-dq-dataset';

const useRerunDqDataset = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: rerunDqDataset,
    onSuccess: (_, datasetId) => {
      queryClient.invalidateQueries(dataWatchKeys.dqDatasetReport(datasetId));
      queryClient.invalidateQueries(dataWatchKeys.dqDatasets());
    },
  });
};

export default useRerunDqDataset;
