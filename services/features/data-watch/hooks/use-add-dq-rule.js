import { useMutation, useQueryClient } from '@tanstack/react-query';
import dataWatchKeys from '../keys';
import addDqRule from '../repositories/add-dq-rule';

const useAddDqRule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addDqRule,
    onSuccess: () => {
      queryClient.invalidateQueries(dataWatchKeys.dqRules());
      queryClient.invalidateQueries(dataWatchKeys.dqReport());
    },
  });
};

export default useAddDqRule;
