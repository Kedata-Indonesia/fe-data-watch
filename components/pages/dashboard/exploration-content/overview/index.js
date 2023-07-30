import { Badge } from '@/components/base/badge';
import { Label } from '@/components/base/label';
import DataSummaryTable from '@/components/shared/data-summary-table';
import ExplorationSection from '@/components/shared/exploration-section';
import GroupSection from '@/components/shared/group-section';

const Overview = ({ id, title }) => {
  return (
    <ExplorationSection id={id} title={title}>
      <div className="flex w-full gap-5">
        {/* Dataset Statistic Section */}
        <GroupSection
          title="Dataset Statistic"
          rootClassName="w-[65%] flex-shrink-0"
          className="grid grid-cols-2 gap-5"
        >
          {rowCountsData.map(({ label, value }) => (
            <div key={label} className="rounded-md bg-background px-6 py-5">
              <p className="text-sm font-bold text-gray-400">{label}</p>
              <h3 className="mt-1 text-[40px] font-bold">{value}</h3>
            </div>
          ))}
        </GroupSection>
        {/* Variable Type Section*/}
        <GroupSection title="Variable Type" rootClassName="flex-grow">
          <DataSummaryTable
            data={[
              { key: 'categorical', label: 'Categorical', value: 31 },
              { key: 'numeric', label: 'Numeric', value: 31 },
              { key: 'DateTime', label: 'Numeric', value: 31 },
              { key: 'Text', label: 'Numeric', value: 31 },
            ]}
          />
        </GroupSection>
      </div>

      {/** Alert Section */}
      <GroupSection title="Alert" className="flex flex-col border border-c-gray-300 rounded-md">
        <div className="p-5 flex justify-between items-center border-b border-b-gray-300">
          <p>Dataset has 1 (0.7%) duplicate rows</p>
          <Label variant="gray">Duplicates</Label>
        </div>
        <div className="p-5 flex justify-between items-center border-b border-b-gray-300">
          <div className="flex gap-2 items-center">
            <Badge variant="danger" text="sepal_length" />
            is highly overall correlated with
            <Badge variant="danger" text="petal_width" />
            and 2 other fields
          </div>
          <Label variant="darkGray">high correlation</Label>
        </div>
        <div className="p-5 flex justify-between items-center border-b border-b-gray-300">
          <div className="flex gap-2 items-center">
            <Badge variant="danger" text="sepal_length" />
            is highly overall correlated with
            <Badge variant="danger" text="petal_width" />
            and 2 other fields
          </div>
          <Label variant="darkGray">high correlation</Label>
        </div>
        <div className="p-5 flex justify-between items-center border-b border-b-gray-300">
          <div className="flex gap-2 items-center">
            <Badge variant="danger" text="sepal_length" />
            is highly overall correlated with
            <Badge variant="danger" text="petal_width" />
            and 2 other fields
          </div>
          <Label variant="darkGray">high correlation</Label>
        </div>
        <div className="p-5 flex justify-between items-center">
          <p>species is uniformly distributed</p>
          <Label variant="blue">Uniform</Label>
        </div>
      </GroupSection>
    </ExplorationSection>
  );
};

const rowCountsData = [
  {
    label: 'Total Rows',
    value: 3755,
  },
  {
    label: 'Total Columns',
    value: 11,
  },
  {
    label: 'Discrete Columns',
    value: 7,
  },
  {
    label: 'Continuous Columns',
    value: 4,
  },
  {
    label: 'All Missing Columns',
    value: 0,
  },
  {
    label: 'Missing Observations',
    value: 0,
  },
];

export default Overview;
