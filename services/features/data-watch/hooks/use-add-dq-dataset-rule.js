import { useMutation, useQueryClient } from '@tanstack/react-query';
import dataWatchKeys from '../keys';
import addDqDatasetRule from '../repositories/add-dq-dataset-rule';

const useAddDqDatasetRule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addDqDatasetRule,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(dataWatchKeys.dqDatasetRules(variables.datasetId));
    },
  });
};

export default useAddDqDatasetRule;
