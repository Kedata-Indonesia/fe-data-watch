import { Button } from '@/components/base/button';

const DataQualityContent = () => {
  return (
    <>
      <div className="flex items-center justify-between text-gray-600">
        <div>
          <h3 className="mb-2 text-xl font-bold">Data Quality Report</h3>
          <p className="text-xs">
            Gaining Insights into Data Integrity and Reliability: A Comprehensive Report on Data
            Quality Assessment and Analysis
          </p>
        </div>
        <Button size="md" type="outline">
          Download Report
        </Button>
      </div>
      <div className="bg-gray-100 p-6 text-gray-600">
        <div className="mb-6 grid grid-cols-4 rounded-md bg-white p-6">
          {dqReports.map(({ label, value }) => (
            <div className="text-center" key={label}>
              <p className="text-xs font-bold uppercase text-gray-400">{label}</p>
              <div className="text-[40px] font-bold text-gray-600">{value}</div>
            </div>
          ))}
        </div>
        <p className="mb-5">
          When evaluating the quality of data, we consider two critical factors: the success ratio
          and sigma level. The success ratio, which stands at an impressive 74%, measures the
          proportion of successful data points within the dataset. This high success ratio signifies
          a substantial degree of accuracy in the data, indicating that 74% of the data points have
          been successfully recorded and validated.
        </p>
        <p>
          Additionally, we examine the sigma level to assess the consistency and precision of the
          data. The sigma level provides valuable insights into the spread of data points around the
          mean. With a sigma level of 4, the data demonstrates a moderate level of consistency, as
          the standard deviation from the mean is 4. This suggests that the data points exhibit a
          reasonable degree of closeness to the average, ensuring reliable and dependable outcomes.
        </p>
      </div>
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between text-gray-600">
          <p className="font-bold">All Data</p>
          <div className="flex gap-5">
            <p>8 Columns</p>
            <p>15.571 Rows</p>
            <p>6 Data Types</p>
          </div>
        </div>
        <div className="relative flex h-5 w-full overflow-hidden rounded-md">
          <div className="h-full bg-green-500" style={{ width: '64%' }} />
          <div className="h-full bg-gray-400" style={{ width: '24%' }} />
          <div className="h-full bg-c-red-600" style={{ width: '12%' }} />
        </div>
        <div className="flex gap-5">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-green-500" />
            <p>64% valid values</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-gray-400" />
            <p>12% missing values</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-c-red-600" />
            <p>24% mismatching values</p>
          </div>
        </div>
      </div>
    </>
  );
};

const dqReports = [
  {
    label: 'Success Ratio',
    value: '78.64%',
  },
  {
    label: 'Sigma Level',
    value: 'Level 4',
  },
  {
    label: 'Passing Rows',
    value: '12.245',
  },
  {
    label: 'Failing Rows',
    value: '5.326',
  },
];

export default DataQualityContent;
