import { useMutation, useQueryClient } from '@tanstack/react-query';
import dataWatchKeys from '../keys';
import rerunDqDataset from '../repositories/rerun-dq-dataset';
import getDqDatasetReport from '../repositories/get-dq-dataset-report';

const useRerunDqDataset = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: rerunDqDataset,
    onSettled: (_data, _error, datasetId) => {
      queryClient.invalidateQueries(dataWatchKeys.dqDatasets());

      const reportKey = dataWatchKeys.dqDatasetReport(datasetId);

      const poll = async () => {
        try {
          const result = await queryClient.fetchQuery({
            queryKey: reportKey,
            queryFn: () => getDqDatasetReport(datasetId),
            staleTime: 0,
          });
          const status = result?.payload?.status;
          if (status === 'queued' || status === 'processing') {
            setTimeout(poll, 2000);
          }
        } catch {
          setTimeout(poll, 3000);
        }
      };

      poll();
    },
  });
};

export default useRerunDqDataset;
