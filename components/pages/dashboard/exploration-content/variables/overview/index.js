import DataSummaryTable from '@/components/shared/data-summary-table';
import { useMemo } from 'react';

const VariableOverview = ({ data = null }) => {
  const overviewData = useMemo(() => {
    return Object.keys(data ?? []).map(key => ({
      key: key,
      label: key,
      value: data[key],
    }));
  }, [data]);

  return (
    <div className="w-1/2">
      <h5 className="text-heading-5 font-semibold mb-4">Length</h5>
      <DataSummaryTable data={overviewData} />
    </div>
  );
};

export default VariableOverview;
