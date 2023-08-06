import DataSummaryTable from '@/components/shared/data-summary-table';
import { useMemo } from 'react';

const VariableCategories = ({ data }) => {
  const dataSummary = useMemo(() => {
    const summary = Object.keys(data?.word_counts ?? []).map(key => ({
      key,
      label: key,
      value: data?.word_counts?.[key],
    }));

    return [
      {
        key: 'header',
        label: 'Value',
        value: 'Count',
        render: value => <span className="font-bold">{value}</span>,
      },
      ...summary,
    ];
  }, [data]);

  return (
    <div>
      <h6 className="text-heading-5 font-semibold">Common Values</h6>
      <div className="mt-4">
        <DataSummaryTable data={dataSummary} />
      </div>
    </div>
  );
};

export default VariableCategories;
