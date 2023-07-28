import { useQuery } from '@tanstack/react-query';
import getAllTable from '../repositories/get-all-table';

const useGetAllTable = ({ params }) => {
  const query = useQuery(useGetAllTable.keys(params), () => getAllTable(params));

  return query;
};

useGetAllTable.keys = params => ['eda', 'tables', params];

export default useGetAllTable;
