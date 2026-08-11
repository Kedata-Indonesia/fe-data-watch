import { Alert } from '@/components/base/alert';
import { DashboardLayout } from '@/components/layouts';
import DataQuality from '@/components/pages/dashboard/data-quality';
import { DIMENSION_LABELS, RULE_LABELS } from '@/components/pages/dashboard/data-quality/constants';
import useAddDqDatasetRule from '@/services/features/data-watch/hooks/use-add-dq-dataset-rule';
import useExportDqReport from '@/services/features/data-watch/hooks/use-export-dq-report';
import useGetDqCapabilities from '@/services/features/data-watch/hooks/use-get-dq-capabilities';
import useGetDqDatasetIssues from '@/services/features/data-watch/hooks/use-get-dq-dataset-issues';
import useGetDqDatasetReport from '@/services/features/data-watch/hooks/use-get-dq-dataset-report';
import useGetDqDatasetRules from '@/services/features/data-watch/hooks/use-get-dq-dataset-rules';
import useGetDqDatasets from '@/services/features/data-watch/hooks/use-get-dq-datasets';
import useRerunDqDataset from '@/services/features/data-watch/hooks/use-rerun-dq-dataset';
import serverProps from '@/services/servers/server-props';
import withAuth from '@/services/servers/with-auth';
import withSession from '@/services/servers/with-session';
import useInterval from '@/utils/hooks/use-interval';
import { useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'react-toastify';

const ISSUE_LIMIT = 50;

const downloadBlob = (blob, format) => {
  const href = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = href;
  link.download = `dq-report.${format}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(href);
};

const DataQualityPage = props => {
  const [selectedDatasetId, setSelectedDatasetId] = useState(null);
  const [issuePage, setIssuePage] = useState(1);
  const [issueMetric, setIssueMetric] = useState('');
  const [issueDimension, setIssueDimension] = useState('');

  const datasetsQuery = useGetDqDatasets();
  const capabilitiesQuery = useGetDqCapabilities();

  const datasets = useMemo(() => datasetsQuery.data?.payload || [], [datasetsQuery.data]);
  const dataset = useMemo(
    () => datasets.find(item => item.dataset_id === selectedDatasetId) || datasets[0] || null,
    [datasets, selectedDatasetId]
  );
  const datasetId = dataset?.dataset_id || null;
  const columns = useMemo(() => dataset?.columns || [], [dataset]);

  useEffect(() => {
    if (!selectedDatasetId && datasets.length > 0) {
      setSelectedDatasetId(datasets[0].dataset_id);
    }
  }, [datasets, selectedDatasetId]);

  const rulesQuery = useGetDqDatasetRules({ datasetId });
  const rules = useMemo(() => rulesQuery.data?.payload?.rules || [], [rulesQuery.data]);

  const ruleOptions = useMemo(() => {
    const metrics = capabilitiesQuery.data?.payload?.metrics || [];
    return metrics
      .filter(capability => capability.availability === 'configurable')
      .map(capability => ({
        label: RULE_LABELS[capability.metric] || capability.metric,
        value: capability.metric,
        metric: capability.metric,
        dimension: capability.dimension,
        description: capability.description,
        parameters_schema: capability.parameters_schema,
      }));
  }, [capabilitiesQuery.data]);

  // Report with polling (exponential backoff) that stops on ready|failed.
  const pollAttemptRef = useRef(0);
  const reportQuery = useGetDqDatasetReport({
    datasetId,
    refetchInterval: query => {
      const status = query?.state?.data?.payload?.status;
      if (status === 'processing' || status === 'queued') {
        return Math.min(1000 * 2 ** Math.min(pollAttemptRef.current, 4), 16000);
      }
      return false;
    },
  });

  const reportPayload = reportQuery.data?.payload;
  const reportStatus = reportPayload?.status ?? null;
  const reportNotFound = reportStatus === null;
  const reportError = reportQuery.isError ? reportQuery.error?.response?.data?.message : null;

  useEffect(() => {
    if (reportStatus === 'processing' || reportStatus === 'queued') {
      pollAttemptRef.current += 1;
    } else if (reportStatus === 'ready' || reportStatus === 'failed') {
      pollAttemptRef.current = 0;
    }
  }, [reportStatus]);

  const issuesQuery = useGetDqDatasetIssues({
    datasetId,
    params: { page: issuePage, limit: ISSUE_LIMIT, metric: issueMetric, dimension: issueDimension },
    enabled: !!datasetId && reportStatus === 'ready',
  });

  const issueTruncation = useMemo(() => {
    const map = {};
    (reportPayload?.dimensions || []).forEach(dimension =>
      (dimension.metrics || []).forEach(metricResult => {
        if (metricResult.issue_stats) map[metricResult.metric] = metricResult.issue_stats;
      })
    );
    return map;
  }, [reportPayload]);

  const issueMetricOptions = useMemo(() => {
    const set = new Set();
    (reportPayload?.dimensions || []).forEach(dimension =>
      (dimension.metrics || []).forEach(metricResult => set.add(metricResult.metric))
    );
    return [...set].map(metric => ({ label: metric, value: metric }));
  }, [reportPayload]);

  const issueDimensionOptions = useMemo(() => {
    const set = new Set();
    (reportPayload?.dimensions || []).forEach(dimension => set.add(dimension.dimension));
    return [...set].map(dimension => ({
      label: DIMENSION_LABELS[dimension] || dimension,
      value: dimension,
    }));
  }, [reportPayload]);

  const addRuleMutation = useAddDqDatasetRule();
  const rerunMutation = useRerunDqDataset();
  const exportMutation = useExportDqReport();

  const handleAddRule = ({ rule_key, columns: ruleColumns, parameters }) => {
    if (!ruleColumns?.length) {
      toast.error('Select at least one column.');
      return;
    }
    addRuleMutation.mutate(
      { datasetId, rule_key, columns: ruleColumns, parameters },
      {
        onSuccess: () => {
          toast.success('Rule added.');
          rerunMutation.mutate(datasetId, {
            onError: err => toast.error(err?.response?.data?.message || 'Failed to start a run.'),
          });
        },
        onError: err => {
          const data = err?.response?.data;
          if (data?.payload?.length) {
            toast.error(data.payload.map(item => item.message).join('; '));
          } else {
            toast.error(data?.message || 'Failed to add rule.');
          }
        },
      }
    );
  };

  const handleRerun = () => {
    if (!datasetId) return;
    rerunMutation.mutate(datasetId, {
      onError: err => toast.error(err?.response?.data?.message || 'Failed to start a run.'),
    });
  };

  const handleDownload = format => {
    if (!datasetId || reportStatus !== 'ready') return;
    exportMutation.mutate(
      { datasetId, format },
      {
        onSuccess: blob => {
          downloadBlob(blob, format);
          toast.success('Report exported.');
        },
        onError: () => toast.error('Failed to export the report.'),
      }
    );
  };

  const handleSelectDataset = datasetId => {
    setSelectedDatasetId(datasetId);
    setIssuePage(1);
    setIssueMetric('');
    setIssueDimension('');
  };

  const handleIssueFilterChange = (key, value) => {
    if (key === 'metric') setIssueMetric(value);
    if (key === 'dimension') setIssueDimension(value);
    setIssuePage(1);
  };

  useInterval(
    (state, ref) => {
      if (state === 300) {
        Alert.error({
          title: 'Session will expire in 5 minutes.',
          text: 'Your session is valid for 15 minutes. Please remember to re-upload your file to continue using DataWatch without interruption. Thank you!',
        });
      }

      if (state === 0) {
        clearInterval(ref);
      }
    },
    {
      startAt: props?.session_remaining,
      stateType: 'decrement',
    }
  );

  return (
    <DataQuality
      datasets={datasets}
      dataset={dataset}
      columns={columns}
      onSelectDataset={handleSelectDataset}
      ruleOptions={ruleOptions}
      rules={rules}
      report={reportPayload}
      reportStatus={reportStatus}
      reportLoading={reportQuery.isFetching}
      reportError={reportError}
      issuesPayload={issuesQuery.data?.payload}
      issueTruncation={issueTruncation}
      issuePage={issuePage}
      issueMetric={issueMetric}
      issueDimension={issueDimension}
      issueMetricOptions={issueMetricOptions}
      issueDimensionOptions={issueDimensionOptions}
      onIssuePageChange={setIssuePage}
      onIssueFilterChange={handleIssueFilterChange}
      onAddRule={handleAddRule}
      onRerun={handleRerun}
      rerunning={rerunMutation.isPending}
      onDownload={handleDownload}
      exporting={exportMutation.isPending}
    />
  );
};

DataQualityPage.getLayout = page => <DashboardLayout>{page}</DashboardLayout>;

export const getServerSideProps = serverProps(
  withAuth(),
  withSession({
    onError: ctx => {
      ctx.res.redirect = {
        destination: '/app/upload',
      };
    },
  })
);

export default DataQualityPage;
