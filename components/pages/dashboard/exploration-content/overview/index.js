import { Badge } from '@/components/base/badge';
import { Label } from '@/components/base/label';
import DataSummaryTable from '@/components/shared/data-summary-table';
import ExplorationSection from '@/components/shared/exploration-section';
import GroupSection from '@/components/shared/group-section';
import StringFormatter from '@/components/shared/string-formatter';
import numberFormat from '@/utils/number-format';
import { useMemo } from 'react';
import reactStringReplace from 'react-string-replace';

const Overview = ({ id, title, data }) => {
  const statisticData = useMemo(() => {
    return [
      {
        key: 'n_variables',
        label: 'Number of variables',
      },
      {
        key: 'n_observations',
        label: 'Number of observations',
      },
      {
        key: 'n_missing_cells',
        label: 'missing cells',
        percentageKey: 'p_missing_cells',
      },
      {
        key: 'p_duplicate_rows',
        label: 'Duplicate rows',
        percentageKey: 'p_duplicate_rows',
      },
      {
        key: 'memory_size',
        label: 'Total size in memory',
        render: value => `${(value / 1024).toFixed(1)} KiB`,
      },
      {
        key: 'avg_memory_size',
        label: 'avg record size in memory',
        render: value => `${(+value).toFixed(1)} B`,
      },
    ];
  }, []);

  const variableTypesData = useMemo(() => {
    if (!data?.variable_types) return [];
    return Object.keys(data?.variable_types)?.map(value => {
      return {
        key: value,
        label: value,
        value: data?.variable_types?.[value],
      };
    });
  }, [data?.variable_types]);

  return (
    <ExplorationSection id={id} title={title}>
      <div className="flex w-full gap-5">
        {/* Dataset Statistic Section */}
        <GroupSection
          title="Dataset Statistic"
          rootClassName="w-[65%] flex-shrink-0"
          className="grid grid-cols-2 gap-5"
        >
          {statisticData.map(({ key, label, percentageKey, render }) => {
            const source = data?.dataset_statistic;
            const percentage = source?.[percentageKey];

            return (
              <div key={key} className="rounded-md bg-background px-6 py-5">
                <p className="text-sm font-bold text-gray-400">{label}</p>
                <h3 className="mt-1 text-[40px] font-bold flex items-end">
                  {render ? render(source?.[key]) : numberFormat(source?.[key])}
                  {percentage !== undefined && (
                    <span className="bg-[#FFCCD6] text-red-600 text-[10px] py-0.5 px-1.5 ml-1.5 mb-3 rounded-sm">
                      {percentage.toFixed(2)}%
                    </span>
                  )}
                </h3>
              </div>
            );
          })}
        </GroupSection>
        {/* Variable Type Section*/}
        <GroupSection title="Variable Type" rootClassName="flex-grow">
          <DataSummaryTable data={variableTypesData} />
        </GroupSection>
      </div>

      {/** Alert Section */}
      <GroupSection title="Alert" className="flex flex-col border border-c-gray-300 rounded-md">
        {data?.alerts &&
          data?.alerts?.map((alert, idx) => {
            return (
              <div
                key={`alert-${idx}`}
                className="p-5 flex justify-between items-center border-b border-b-gray-300"
              >
                <div className="flex gap-2 items-center">
                  {reactStringReplace(alert, /\[(.*?)\]/g, match => (
                    <Badge variant="danger" text={match} />
                  ))}
                </div>
              </div>
            );
          })}
      </GroupSection>
    </ExplorationSection>
  );
};

export default Overview;
