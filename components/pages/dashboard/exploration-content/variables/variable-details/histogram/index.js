import { variableChartOptions } from '@/services/features/data-watch/helpers/variable-chart-options';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';

const Chart = dynamic(() => import('@/components/base/chart').then(mod => mod.Chart), {
  ssr: false,
});

const VariableHistogram = ({ data }) => {
  const chartOption = useMemo(() => {
    if (!data) return null;
    return variableChartOptions.Numeric(data);
  }, [data]);

  return (
    <div className="w-full flex flex-col justify-center text-center">
      <Chart options={chartOption} />
      <p>Histogram with fixed size bins (bins={data?.n_bins})</p>
    </div>
  );
};

export default VariableHistogram;
