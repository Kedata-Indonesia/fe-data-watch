import { Alert } from '@/components/base/alert';
import { DashboardLayout } from '@/components/layouts';
import DataQuality from '@/components/pages/dashboard/data-quality';
import useAddDqRule from '@/services/features/data-watch/hooks/use-add-dq-rule';
import useGetAllTable from '@/services/features/data-watch/hooks/use-get-all-table';
import useGetDqReport from '@/services/features/data-watch/hooks/use-get-dq-report';
import useGetDqRules from '@/services/features/data-watch/hooks/use-get-dq-rules';
import serverProps from '@/services/servers/server-props';
import withAuth from '@/services/servers/with-auth';
import withSession from '@/services/servers/with-session';
import useInterval from '@/utils/hooks/use-interval';
import { useMemo } from 'react';
import { toast } from 'react-toastify';

const RULE_API_MAP = {
  completeness: 'COMPLETENESS',
  timeliness: 'TIMELINESS',
};

const RULE_LABELS = {
  COMPLETENESS: 'Completeness',
  TIMELINESS: 'Timeliness',
};

const DataQualityPage = props => {
  const rulesQuery = useGetDqRules();
  const tableQuery = useGetAllTable({ page: 1 });
  const addRuleMutation = useAddDqRule();

  const rules = useMemo(() => {
    const payload = rulesQuery.data?.payload || [];
    return payload.map(item => ({
      rule: {
        label: RULE_LABELS[item.rule] || item.rule,
        value: item.rule,
      },
      columns: item.columns || [],
    }));
  }, [rulesQuery.data]);

  const columns = useMemo(() => {
    return (tableQuery.data?.payload?.available_columns || []).map(column => ({
      label: column,
      value: column,
    }));
  }, [tableQuery.data]);

  const reportQuery = useGetDqReport({ enabled: rules.length > 0 });

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
      data={rules}
      columns={columns}
      report={reportQuery.data?.payload}
      reportLoading={reportQuery.isFetching}
      reportError={reportQuery.error?.response?.data?.message}
      onAddRule={({ rule, columns: selectedColumns }) => {
        const apiRule = RULE_API_MAP[rule?.value] || rule?.value?.toUpperCase?.();
        if (!apiRule || !RULE_API_MAP[rule?.value]) {
          toast.error('This rule type is not supported yet.');
          return;
        }

        const columnValues = (selectedColumns || [])
          .map(col => (typeof col === 'string' ? col : col?.value))
          .filter(Boolean);

        if (!columnValues.length) {
          toast.error('Select at least one column.');
          return;
        }

        addRuleMutation.mutate(
          { rule: apiRule, columns: columnValues },
          {
            onSuccess: () => toast.success('Rule added.'),
            onError: err => {
              toast.error(err?.response?.data?.message || 'Failed to add rule.');
            },
          }
        );
      }}
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
