import { TableLite } from '@/components/base/table-lite';
import DataSummaryTable from '@/components/shared/data-summary-table';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';

const Chart = dynamic(() => import('@/components/base/chart').then(val => val.Chart), {
  ssr: false,
});

const VariableCategories = ({ data }) => {
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
    if (!data?.common_values_table) return [];

    return data?.common_values_table?.map(({ value, count, frequency }) => ({
      value,
      count,
      frequency,
    }));
  }, [data]);

  const chartOptions = useMemo(() => {
    const length = data?.length;

    if (!length) return {};

    const xAxisData = length.bins.map(item => item.bin_start);
    const yAxisData = length.bins.map(item => item.count);
    return {
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        data: xAxisData,
        axisLabel: {
          show: true,
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          show: true,
        },
      },
      series: [
        {
          name: 'Histogram',
          type: 'bar',
          barCategoryGap: '0',
          data: yAxisData,
          label: {
            show: false,
          },
        },
      ],
    };
  }, [data]);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h6 className="text-heading-5 font-semibold">Common Values</h6>
        <div className="mt-4">
          <TableLite columns={columns} data={tableData} />
        </div>
      </div>
      <div>
        <h6 className="text-heading-5 font-semibold">Length</h6>
        <div className="mt-4">
          <Chart options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default VariableCategories;
