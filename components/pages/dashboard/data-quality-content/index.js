import { Button } from '@/components/base/button';
import { Skeleton } from '@/components/base/skeleton';

const formatPct = value => {
  if (value == null || Number.isNaN(Number(value))) return '-';
  return `${(Number(value) * 100).toFixed(2)}%`;
};

const formatNumber = value => {
  if (value == null) return '-';
  return Number(value).toLocaleString('id-ID');
};

const DataQualityContent = ({ report, loading = false, error }) => {
  if (loading && !report) {
    return <Skeleton.ExplorationContent />;
  }

  if (error && !report) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-c-red-600">{error}</div>
    );
  }

  const successRatio = report?.success_ratio;
  const sigmaLevel = report?.sigma_level;
  const completenessRatio = report?.completeness?.completeness_ratio;
  const validPct = completenessRatio == null ? 0 : Number(completenessRatio) * 100;
  const missingPct = Math.max(0, 100 - validPct);

  const dqReports = [
    { label: 'Success Ratio', value: formatPct(successRatio) },
    { label: 'Sigma Level', value: sigmaLevel == null ? '-' : `Level ${sigmaLevel}` },
    { label: 'Passing Rows', value: formatNumber(report?.passing_rows) },
    { label: 'Failing Rows', value: formatNumber(report?.failing_rows) },
  ];

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
        <Button size="md" type="outline" disabled>
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
          Success ratio is {formatPct(successRatio)}. Completeness ratio is{' '}
          {formatPct(completenessRatio)}. Sigma level is {sigmaLevel ?? '-'}.
        </p>
      </div>
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between text-gray-600">
          <p className="font-bold">All Data</p>
          <div className="flex gap-5">
            <p>{formatNumber(report?.total_columns)} Columns</p>
            <p>{formatNumber(report?.total_rows)} Rows</p>
          </div>
        </div>
        <div className="relative flex h-5 w-full overflow-hidden rounded-md">
          <div className="h-full bg-green-500" style={{ width: `${validPct}%` }} />
          <div className="h-full bg-gray-400" style={{ width: `${missingPct}%` }} />
        </div>
        <div className="flex gap-5">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-green-500" />
            <p>{validPct.toFixed(1)}% complete values</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-gray-400" />
            <p>{missingPct.toFixed(1)}% missing values</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DataQualityContent;
