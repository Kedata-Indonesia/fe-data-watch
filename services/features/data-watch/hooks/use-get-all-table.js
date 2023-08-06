import { useQuery } from '@tanstack/react-query';
import getAllTable from '../repositories/get-all-table';

/**
 * @param {UseGetAllTableParams} params
 */
const useGetAllTable = params => {
  const query = useQuery(useGetAllTable.keys(params), () => getAllTable(params));

  return query;
};

useGetAllTable.keys = params => ['eda', 'tables', params];

export default useGetAllTable;

/**
 * @typedef UseGetAllTableParams
 * @property {number} [page]
 * @property {number} [limit]
 * @property {string} [search]
 * @property {string[]} [columns]
 */
