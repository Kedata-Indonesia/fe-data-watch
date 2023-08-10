import DataSummaryTable from '@/components/shared/data-summary-table';
import { useMemo } from 'react';

const VariableStatistic = ({ data }) => {
  const descriptiveStat = useMemo(() => data?.descriptive_statistic, [data]);
  const quantileStat = useMemo(() => data?.quantile_statistic, [data]);

  return (
    <div className="flex gap-6">
      <div className="flex-1">
        <h3 className="uppercase text-gray-400 font-bold py-3 px-4">quantile statistic</h3>
        <DataSummaryTable
          rootClassName="rounded-none"
          data={[
            { label: 'Minimum', value: quantileStat?.minimum },
            { label: '5-th Percentile', value: quantileStat?.fifth_percentile },
            { label: 'Q1', value: quantileStat?.first_quartile },
            { label: 'Median', value: quantileStat?.median },
            { label: 'Q3', value: quantileStat?.third_quartile },
            { label: '95-th Percentile', value: quantileStat?.ninety_fifth_percentile },
            { label: 'Maximum', value: quantileStat?.maximum },
            { label: 'Range', value: quantileStat?.range },
            { label: 'Interquartile Range', value: quantileStat?.range },
          ]}
        />
      </div>
      <div className="flex-1">
        <h3 className="uppercase text-gray-400 font-bold py-3 px-4">descriptiove statistic</h3>
        <DataSummaryTable
          rootClassName="rounded-none"
          data={[
            { label: 'Standard Deviation', value: descriptiveStat?.standard_deviation },
            {
              label: 'Coefficient of Variation (CV)',
              value: descriptiveStat?.coefficient_variation,
            },
            { label: 'Kurtosis ', value: descriptiveStat?.kurtosis },
            { label: 'Mean', value: descriptiveStat?.mean },
            {
              label: 'Median Absolute Deviation (MAD)',
              value: descriptiveStat?.median_absolute_deviation,
            },
            { label: 'Skewness', value: descriptiveStat?.skewness },
            { label: 'Sum', value: descriptiveStat?.sum },
            { label: 'Variance', value: descriptiveStat?.variance },
          ]}
        />
      </div>
    </div>
  );
};

export default VariableStatistic;
