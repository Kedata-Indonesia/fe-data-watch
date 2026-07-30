import { TableLite } from '@/components/base/table-lite';
import clsx from 'clsx';
import { useMemo } from 'react';

const VariableWords = ({ data }) => {
  const columns = useMemo(() => {
    return [
      {
        key: 'value',
        title: 'Value',
        className: 'w-[80%]',
      },
      {
        key: 'count',
        title: 'Count',
        headerClassName: 'text-right',
        className: 'w-[10%]',
        render: item => <div className="text-right">{item.count}</div>,
      },
      {
        key: 'frequency',
        title: 'Frequency',
        headerClassName: 'text-right',
        className: 'w-[10%]',
        render: item => {
          const percent = +item.frequency?.replace('%', '');
          return (
            <div className="w-full relative text-right">
              <div className="!bg-blue-400 h-[22px] rounded-md" style={{ width: item.frequency }} />
              <span
                className={clsx(
                  'absolute top-[1px] right-3 inline-block text-sm',
                  percent > 35 && 'text-white'
                )}
              >
                {item.frequency}
              </span>
            </div>
          );
        },
      },
    ];
  }, []);

  const tableData = useMemo(() => {
    if (!data) return [];

    let word_counts = data;
    if (data?.hasOwnProperty('word_counts')) {
      word_counts = data?.word_counts;
    }

    return word_counts?.map(item => ({
      value: item.value,
      count: item.count,
      frequency: item.frequency,
    }));
  }, [data]);

  return (
    <div className="w-full">
      <TableLite columns={columns} data={tableData} />
    </div>
  );
};

export default VariableWords;
