import { Button } from '@/components/base/button';
import { CheckBox } from '@/components/base/check-box';
import { Dropdown } from '@/components/base/dropdown';
import { Table } from '@/components/base/table';
import { TextField } from '@/components/base/text-field';
import ChevronLeftIcon from '@/components/icons/ChevronLeftIcon';
import ChevronRightIcon from '@/components/icons/ChevronRightIcon';
import SearchIcon from '@/components/icons/SearchIcon';
import SettingIcon from '@/components/icons/SettingIcon';
import clsx from 'clsx';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';

const SourceTable = () => {
  const { control, watch } = useForm({
    defaultValues: {
      search: '',
      selected: [],
    },
  });

  const search = watch('search');

  const columnSearch = useMemo(() => {
    const keyword = search.toLowerCase();

    return columns.filter(column => {
      return column.label.toLowerCase().includes(keyword);
    });
  }, [search]);

  const tableData = useMemo(() => {
    const data = [];
    for (let i = 1; i < 40; i++) {
      data.push({
        id: i,
        material: 'Rubber',
        category: 'BEY-HAWA',
        amount: '9462',
        price: 'Rp 41.000',
        discount: 'Rp 41.000',
      });
    }
    return data;
  });

  return (
    <div className="relative flex h-full flex-col items-start bg-gray-100">
      <div className="absolute inset-0 bottom-14 overflow-scroll">
        <div className="relative h-full">
          <div className="absolute bottom-0 left-0 top-0">
            <Table columns={columns} data={tableData} />
          </div>
        </div>
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
                  className="mb-0"
                  placeholder="Search column"
                  name="search"
                  control={control}
                />
                <div className="flex h-full flex-col overflow-hidden rounded-md border border-gray-300">
                  <div className="h-full overflow-y-auto py-2.5">
                    {columnSearch.map(column => (
                      <CheckBox
                        key={column.label}
                        name="selected"
                        className="m-4 mr-3 border-2"
                        label={<span className="!text-base">{column.label}</span>}
                        control={control}
                      />
                    ))}
                  </div>
                  <div className="border-t border-t-gray-300 px-4 py-2.5 text-end text-sm font-bold uppercase text-gray-400">
                    5 of 6 Column selected
                  </div>
                </div>
                <div className="flex w-full flex-shrink-0 justify-end gap-2.5">
                  <Button size="sm" className="px-3" type="outline" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button size="sm" className="px-3">
                    Apply
                  </Button>
                </div>
              </div>
            )}
          </Dropdown>
          <p>4 Columns</p>
          <p>24.054 Rows</p>
          <p>3 Data Types</p>
        </div>
        <div className="flex items-center gap-2.5 px-4">
          <button className="px-3.5 py-2">
            <ChevronLeftIcon className="text-gray-300" />
          </button>
          <Button className="rounded-md px-3.5 py-2 !text-sm">1</Button>
          <Button type="outline" className="rounded-md px-3.5 py-2 !text-sm">
            2
          </Button>
          <button className="px-3.5 py-2">
            <ChevronRightIcon className="text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

const columns = [
  {
    label: 'id',
    renderCell: item => item.id,
  },
  {
    label: 'material',
    renderCell: item => item.material,
  },
  {
    label: 'category',
    renderCell: item => item.category,
  },
  {
    label: 'amount',
    renderCell: item => item.amount,
  },
  {
    label: 'price',
    renderCell: item => item.price,
  },
  {
    label: 'discount',
    renderCell: item => item.discount,
  },
];

export default SourceTable;
