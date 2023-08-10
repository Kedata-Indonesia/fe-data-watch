import { useQuery } from '@tanstack/react-query';
import getAllTable from '../repositories/get-all-table';
import dataWatchKeys from '../keys';

/**
 * @param {UseGetAllTableParams} params
 */
const useGetAllTable = params => {
  const query = useQuery(dataWatchKeys.tables(params), () => getAllTable(params));

  return query;
};

export default useGetAllTable;

/**
 * @typedef UseGetAllTableParams
 * @property {number} [page]
 * @property {number} [limit]
 * @property {string} [search]
 * @property {string[]} [columns]
 */
