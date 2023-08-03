import { Button } from '@/components/base/button';
import { CheckBox } from '@/components/base/check-box';
import { Dropdown } from '@/components/base/dropdown';
import { Pagination } from '@/components/base/pagination';
import { Table } from '@/components/base/table';
import { TextField } from '@/components/base/text-field';
import SearchIcon from '@/components/icons/SearchIcon';
import SettingIcon from '@/components/icons/SettingIcon';
import useGetAllTable from '@/services/features/data-watch/hooks/use-get-all-table';
import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

const SourceTable = () => {
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const { control, watch, handleSubmit } = useForm({
    defaultValues: {
      search: '',
      columns: undefined,
    },
  });

  const search = watch('search');

  const tableQuery = useGetAllTable({ params: { page, columns: selectedColumns } });
  const table = tableQuery?.data?.payload;

  useEffect(() => {
    if (!table) return;
    setTotalPage(table?.pagination?.total_pages);
  }, [table]);

  const columnsTable = useMemo(() => {
    return table?.columns?.map(column => ({
      label: Object.keys(column)[0],
      renderCell: item => item[Object.keys(column)[0]],
    }));
  }, [table?.columns]);

  const columns = useMemo(() => {
    return table?.available_columns?.map(column => ({
      label: column,
      value: column,
    }));
  }, [table?.available_columns]);

  const columnSearch = useMemo(() => {
    const keyword = search.toLowerCase();

    return columns?.filter(column => {
      return column.label.toLowerCase().includes(keyword);
    });
  }, [columns, search]);

  return (
    <div className="relative flex h-full flex-col items-start bg-gray-100">
      <div className="absolute inset-0 bottom-14 overflow-hidden">
        <Table loading={tableQuery.isFetching} columns={columnsTable} data={table?.rows} />
      </div>
      <div className="absolute bottom-0 z-50 flex w-full justify-between border-t border-t-gray-300 bg-white">
        <div className="flex items-center gap-4 px-4 py-[18px] text-sm font-bold uppercase text-gray-400">
          <Dropdown
            button={({ open, setOpen }) => (
              <button
                className={clsx(
                  'flex items-center gap-1 border-r border-r-gray-400 pr-4',
                  open && 'text-c-red-600'
                )}
                onClick={() => setOpen(true)}
              >
                <SettingIcon />
                <p>Settings</p>
              </button>
            )}
            className="z-50 ml-6 h-[458px] w-[380px] overflow-hidden rounded-md border border-gray-300 bg-white shadow-md"
          >
            {({ setOpen }) => (
              <div className="flex h-full flex-shrink-0 flex-col gap-4 p-5">
                <TextField
                  startIcon={SearchIcon}
                  className="!mb-0"
                  placeholder="Search column"
                  name="search"
                  control={control}
                />
                <div className="flex h-full flex-col overflow-hidden rounded-md border border-gray-300">
                  <div className="h-full overflow-y-auto py-2.5">
                    {columnSearch?.map((column, idx) => (
                      <CheckBox
                        key={`${column.label}${idx}`}
                        id={column.label}
                        name={`columns.${column.label}`}
                        className="m-4 mr-3 border-2"
                        label={<span className="!text-base">{column.label}</span>}
                        control={control}
                        value={column.label}
                      />
                    ))}
                  </div>
                  <div className="border-t border-t-gray-300 px-4 py-2.5 text-end text-sm font-bold uppercase text-gray-400">
                    {!selectedColumns.length
                      ? 'All'
                      : `${selectedColumns?.length} of ${columns?.length}`}{' '}
                    Column selected
                  </div>
                </div>
                <div className="flex w-full flex-shrink-0 justify-end gap-2.5">
                  <Button size="sm" className="px-3" type="outline" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    className="px-3"
                    onClick={handleSubmit(data => {
                      const columnsFilter = Object.values(data.columns)?.filter(column => !!column);
                      setSelectedColumns(columnsFilter);
                      setOpen(false);
                    })}
                  >
                    Apply
                  </Button>
                </div>
              </div>
            )}
          </Dropdown>
          <p>{table?.columns?.length ?? 0} Columns</p>
          <p>{table?.total_rows?.toLocaleString('ID-id')} Rows</p>
          <p>{table?.total_data_types} Data Types</p>
        </div>
        <Pagination
          current={page}
          maxPage={totalPage}
          onChange={curr => {
            setPage(curr);
          }}
        />
      </div>
    </div>
  );
};

export default SourceTable;
