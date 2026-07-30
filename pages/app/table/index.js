import { Alert } from '@/components/base/alert';
import { Button } from '@/components/base/button';
import { CheckBox } from '@/components/base/check-box';
import { Dropdown } from '@/components/base/dropdown';
import { Pagination } from '@/components/base/pagination';
import { Table } from '@/components/base/table';
import { TextField } from '@/components/base/text-field';
import SearchIcon from '@/components/icons/SearchIcon';
import SettingIcon from '@/components/icons/SettingIcon';
import { DashboardLayout } from '@/components/layouts';
import useGetAllTable from '@/services/features/data-watch/hooks/use-get-all-table';
import serverProps from '@/services/servers/server-props';
import withAuth from '@/services/servers/with-auth';
import withSession from '@/services/servers/with-session';
import useInterval from '@/utils/hooks/use-interval';
import usePagination from '@/utils/hooks/use-pagination';
import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

const TablePage = props => {
  const pagination = usePagination();
  const [selectedColumns, setSelectedColumns] = useState([]);
  const { control, watch, setValue, handleSubmit } = useForm({
    defaultValues: {
      search: '',
      columns: undefined,
    },
  });

  useInterval(
    (state, ref) => {
      console.log('state', state);
      console.log('session_remaining', props?.session_remaining);

      if (state === 300) {
        Alert.error({
          title: 'Session will expire in 5 minutes.',
          text: 'Your session is valid for 15 minutes. Please remember to re-upload your file to continue using DataWatch without interruption. Thank you!',
        });
      }

      if (state === 0) {
        clearInterval(ref);
      }
    },
    {
      startAt: props?.session_remaining,
      stateType: 'decrement',
    }
  );

  const search = watch('search');

  const tableQuery = useGetAllTable({ page: pagination.page, columns: selectedColumns });
  const table = tableQuery?.data?.payload;

  useEffect(() => {
    if (!table) return;
    pagination.setTotalPage(table?.pagination?.total_pages);
  }, [pagination, table]);

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
        <Table columns={columnsTable} data={table?.rows} />
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
                  <Button
                    size="sm"
                    className="px-3"
                    type="outline"
                    onClick={() => {
                      let getSelectedColumns = undefined;
                      if (selectedColumns.length > 0) {
                        getSelectedColumns = selectedColumns.reduce((acc, curr) => {
                          acc[curr] = curr;
                          return acc;
                        }, {});
                      }

                      setValue('columns', getSelectedColumns);
                      setOpen(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    className="px-3"
                    onClick={handleSubmit(data => {
                      // console.log(data);
                      // return;
                      const columnsFilter = Object.values(data.columns)?.filter(column => !!column);
                      pagination.toPage(1);
                      console.log(columnsFilter);
                      // return;
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
          current={pagination.page}
          maxPage={pagination.totalPage}
          onChange={curr => {
            pagination.toPage(curr);
          }}
        />
      </div>
    </div>
  );
};

TablePage.getLayout = page => <DashboardLayout>{page}</DashboardLayout>;

export const getServerSideProps = serverProps(
  withAuth(),
  withSession({
    onError: ctx => {
      ctx.res.redirect = {
        destination: '/app/upload',
      };
    },
  })
);

export default TablePage;
