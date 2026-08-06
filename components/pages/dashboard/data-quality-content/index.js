import { Button } from '@/components/base/button';
import { Pagination } from '@/components/base/pagination';
import { Skeleton } from '@/components/base/skeleton';
import { useMemo } from 'react';
import { DIMENSION_LABELS, STATUS_LABELS } from '../data-quality/constants';

const formatPct = value => {
  if (value == null || Number.isNaN(Number(value))) return '-';
  return `${(Number(value) * 100).toFixed(2)}%`;
};

const formatNumber = value => {
  if (value == null) return '-';
  return Number(value).toLocaleString('id-ID');
};

const statusText = status =>
  STATUS_LABELS[status] || (status ? status.charAt(0).toUpperCase() + status.slice(1) : '-');

const statusBadgeClass = status => {
  switch (status) {
    case 'fail':
      return 'bg-c-red-600 text-white';
    case 'warn':
      return 'bg-amber-500 text-white';
    case 'pass':
      return 'bg-green-500 text-white';
    default:
      return 'bg-gray-300 text-gray-600';
  }
};

const DataQualityContent = ({
  report = null,
  reportStatus = null,
  reportLoading = false,
  reportError = null,
  issuesPayload = null,
  issueTruncation = {},
  issuePage = 1,
  issueLimit = 50,
  onIssuePageChange = () => {},
  issueMetric = '',
  issueDimension = '',
  issueMetricOptions = [],
  issueDimensionOptions = [],
  onIssueFilterChange = () => {},
  onRerun = () => {},
  rerunning = false,
  onDownload = () => {},
  exporting = false,
}) => {
  const scoredCount = useMemo(() => (report?.scored_dimensions || []).length, [report]);

  const renderIssueList = () => {
    const payload = issuesPayload || {};
    const issues = payload.issues || [];
    const totalCount = payload.total_count || 0;
    const truncated = Object.values(issueTruncation || {}).some(stats => stats?.truncated);
    const shown =
      issues.length ||
      Object.values(issueTruncation || {}).reduce((sum, s) => sum + (s?.sampled_count || 0), 0);

    return (
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="font-bold text-gray-600">Issue Locations</p>
          {totalCount > 0 && (
            <p className="text-xs text-gray-400">
              {truncated
                ? `Menampilkan ${formatNumber(shown)} dari ${formatNumber(totalCount)} (dipotong)`
                : `${formatNumber(totalCount)} issue`}
            </p>
          )}
        </div>

        <div className="flex gap-4">
          <select
            className="mb-4 rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-600"
            value={issueDimension}
            onChange={event => onIssueFilterChange('dimension', event.target.value)}
          >
            <option value="">All dimensions</option>
            {issueDimensionOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <select
            className="mb-4 rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-600"
            value={issueMetric}
            onChange={event => onIssueFilterChange('metric', event.target.value)}
          >
            <option value="">All metrics</option>
            {issueMetricOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {issues.length === 0 ? (
          <p className="py-6 text-center text-sm italic text-gray-400">
            {totalCount > 0 ? 'No issues match the selected filter.' : 'No issues found.'}
          </p>
        ) : (
          <div className="overflow-x-auto rounded-md border border-gray-300">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-100 text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-3 py-2">Row</th>
                  <th className="px-3 py-2">Column</th>
                  <th className="px-3 py-2">Metric</th>
                  <th className="px-3 py-2">Value</th>
                  <th className="px-3 py-2">Message</th>
                </tr>
              </thead>
              <tbody>
                {issues.map((issue, idx) => (
                  <tr
                    key={`${issue.run_id}-${issue.row_index}-${issue.column}-${idx}`}
                    className="border-t border-gray-200"
                  >
                    <td className="px-3 py-2">{issue.row_index ?? '-'}</td>
                    <td className="px-3 py-2">{issue.column || '-'}</td>
                    <td className="px-3 py-2">{issue.metric}</td>
                    <td className="max-w-[200px] truncate px-3 py-2">{issue.value || '-'}</td>
                    <td className="max-w-[260px] truncate px-3 py-2 text-gray-500">
                      {issue.message || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {totalCount > issueLimit && (
          <div className="flex justify-center">
            <Pagination
              current={issuePage}
              maxPage={Math.max(1, Math.ceil(totalCount / issueLimit))}
              onChange={onIssuePageChange}
            />
          </div>
        )}
      </div>
    );
  };

  if (reportLoading && !report) {
    return <Skeleton.ExplorationContent />;
  }

  if (reportStatus === 'queued' || reportStatus === 'processing') {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 text-gray-500">
        <span className="loading loading-spinner loading-lg text-c-red-600" />
        <p className="text-sm">Running quality checks...</p>
        <p className="text-xs text-gray-400">This may take a moment for large files.</p>
      </div>
    );
  }

  if (reportStatus === 'failed') {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
        <p className="text-lg font-bold text-c-red-600">Report failed</p>
        <p className="max-w-md text-sm text-gray-500">
          {report?.reason === 'interrupted'
            ? 'The backend was restarted while this job was running.'
            : report?.reason === 'timeout'
            ? 'The job exceeded its time limit.'
            : report?.error ||
              reportError ||
              'Something went wrong while running the quality checks.'}
        </p>
        <Button size="md" type="outline" onClick={onRerun} isLoading={rerunning}>
          Rerun
        </Button>
      </div>
    );
  }

  if (reportError && !report) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
        <p className="text-sm text-c-red-600">{reportError}</p>
        <Button size="md" type="outline" onClick={onRerun} isLoading={rerunning}>
          Run quality checks
        </Button>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
        <p className="text-gray-600">No data quality report yet.</p>
        <p className="text-sm text-gray-400">
          Run the automatic checks to generate one — configured rules will be evaluated too.
        </p>
        <Button size="md" type="outline" onClick={onRerun} isLoading={rerunning}>
          Run quality checks
        </Button>
      </div>
    );
  }

  const overallScore = report.overall_score;
  const overallStatus = report.overall_status || 'not_assessed';
  const dimensions = report.dimensions || [];

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between text-gray-600">
        <div>
          <h3 className="mb-2 text-xl font-bold">Data Quality Report</h3>
          <p className="text-xs">
            Gaining Insights into Data Integrity and Reliability: A Comprehensive Report on Data
            Quality Assessment and Analysis
          </p>
        </div>
        <div className="flex gap-2.5">
          <Button
            size="md"
            type="outline"
            disabled={reportStatus !== 'ready' || exporting}
            onClick={() => onDownload('json')}
          >
            {exporting ? 'Exporting...' : 'Download JSON'}
          </Button>
          <Button
            size="md"
            type="outline"
            disabled={reportStatus !== 'ready' || exporting}
            onClick={() => onDownload('csv')}
          >
            {exporting ? 'Exporting...' : 'Download CSV'}
          </Button>
        </div>
      </div>

      <div className="bg-gray-100 p-6 text-gray-600">
        <div className="mb-6 grid grid-cols-2 gap-4 rounded-md bg-white p-6 md:grid-cols-4">
          <div className="text-center">
            <p className="text-xs font-bold uppercase text-gray-400">Overall Score</p>
            <div className="text-[40px] font-bold text-gray-600">
              {overallScore == null ? 'Not assessed' : formatPct(overallScore)}
            </div>
            {scoredCount > 0 && (
              <p className="text-xs text-gray-400">(scored dimensions: {scoredCount})</p>
            )}
          </div>
          <div className="text-center">
            <p className="text-xs font-bold uppercase text-gray-400">Overall Status</p>
            <span
              className={`mt-3 inline-block rounded px-3 py-1 text-sm font-bold ${statusBadgeClass(
                overallStatus
              )}`}
            >
              {statusText(overallStatus)}
            </span>
          </div>
          <div className="text-center">
            <p className="text-xs font-bold uppercase text-gray-400">Scored Dimensions</p>
            <div className="text-[40px] font-bold text-gray-600">{scoredCount}</div>
          </div>
          <div className="text-center">
            <p className="text-xs font-bold uppercase text-gray-400">Not Assessed</p>
            <div className="text-[40px] font-bold text-gray-600">
              {(report.not_assessed_dimensions || []).length}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <p className="font-bold">Dimensions</p>
          {dimensions.map(dimension => {
            const label = DIMENSION_LABELS[dimension.dimension] || dimension.dimension;
            const isTechnical = dimension.dimension === 'technical_integrity';
            return (
              <div
                key={dimension.dimension}
                className="rounded-md border border-gray-300 bg-white p-4"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold">{label}</p>
                  <div className="flex items-center gap-3">
                    <span
                      className={`rounded px-2 py-0.5 text-xs font-bold ${statusBadgeClass(
                        dimension.status
                      )}`}
                    >
                      {statusText(dimension.status)}
                    </span>
                    {dimension.score != null && (
                      <span className="text-sm font-bold">{formatPct(dimension.score)}</span>
                    )}
                  </div>
                </div>
                {isTechnical && (
                  <p className="mt-1 text-xs text-gray-400">
                    Not included in the overall content score.
                  </p>
                )}
                {dimension.status === 'not_applicable' ? (
                  <p className="mt-2 text-xs text-gray-400">Not assessed for this dataset.</p>
                ) : (
                  <div className="mt-2 flex gap-4 text-xs text-gray-400">
                    {dimension.evaluated_count != null && (
                      <p>
                        Evaluated{' '}
                        <span className="font-bold">{formatNumber(dimension.evaluated_count)}</span>
                      </p>
                    )}
                    {dimension.failed_count != null && (
                      <p>
                        Failed{' '}
                        <span className="font-bold">{formatNumber(dimension.failed_count)}</span>
                      </p>
                    )}
                  </div>
                )}
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                  {(dimension.metrics || []).map((metric, idx) => (
                    <div
                      key={`${metric.metric}-${idx}`}
                      className="flex items-center gap-1.5 text-xs text-gray-500"
                    >
                      <span>{metric.metric}</span>
                      <span
                        className={`font-bold ${metric.status === 'fail' ? 'text-c-red-600' : ''}`}
                      >
                        {statusText(metric.status)}
                      </span>
                      {metric.evidence?.column && (
                        <span className="text-gray-400">({metric.evidence.column})</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {renderIssueList()}
    </div>
  );
};

export default DataQualityContent;
