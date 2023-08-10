import Table from '@/components/base/table/table';
import { variableChartOptions } from '@/services/features/data-watch/helpers/variable-chart-options';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';

const Chart = dynamic(() => import('@/components/base/chart').then(mod => mod.Chart), {
  ssr: false,
});

const VariableWords = ({ data }) => {
  const columns = useMemo(() => {
    return [
      {
        label: 'Value',
        renderCell: item => <div className="w-[250px]">{item.value}</div>,
      },
      {
        label: 'Count',
        renderCell: item => item.count,
      },
    ];
  }, []);

  const tableData = useMemo(() => {
    const wordCounts = Object.keys(data?.word_counts ?? []).map(key => ({
      value: key,
      count: data?.word_counts[key],
    }));

    const countAll = wordCounts.reduce((acc, item) => acc + item.count, 0);

    return wordCounts.slice(0, 10).concat([
      {
        value: `Other value (${wordCounts.length - 10})`,
        count: countAll,
      },
    ]);
  }, [data]);

  const chartOption = useMemo(() => {
    if (!data) return null;
    return variableChartOptions.Text(data);
  }, [data]);

  return (
    <div className="grid grid-cols-2">
      <div className="w-full">
        <Table data={tableData} columns={columns} />
      </div>
      <div className="w-full">{chartOption && <Chart options={chartOption} />}</div>
    </div>
  );
};

export default VariableWords;
