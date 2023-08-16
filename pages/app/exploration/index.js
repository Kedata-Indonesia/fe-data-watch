import { Alert } from '@/components/base/alert';
import { Skeleton } from '@/components/base/skeleton';
import { DashboardLayout } from '@/components/layouts';
import Correlations from '@/components/pages/dashboard/exploration-content/correlations';
import Overview from '@/components/pages/dashboard/exploration-content/overview';
import Variables from '@/components/pages/dashboard/exploration-content/variables';
import ExplorationSidebar from '@/components/pages/dashboard/exploration-sidebar';
import EXPLORATION_LISTS from '@/constants/exploration-lists';
import useGetAllExploration from '@/services/features/data-watch/hooks/use-get-all-exploration';
import serverProps from '@/services/servers/server-props';
import withAuth from '@/services/servers/with-auth';
import withSession from '@/services/servers/with-session';
import useInterval from '@/utils/hooks/use-interval';
import { useRef } from 'react';

const ExplorationPage = props => {
  const containerRef = useRef(null);
  const explorationsQuery = useGetAllExploration();
  const explorations = explorationsQuery.data?.payload;
  const isLoading = explorationsQuery?.isFetching || !explorationsQuery?.data;

  useInterval(
    (state, ref) => {
      console.log('state', state);
      console.log('session_remaining', props?.session_remaining);

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
    <div className="relative flex h-full">
      <ExplorationSidebar
        items={explorationMenuItems}
        isLoading={isLoading}
        container={containerRef}
      />
      <div
        ref={containerRef}
        className="absolute bottom-0 right-0 top-0 w-[calc(100%_-_300px)] overflow-y-auto pb-24"
      >
        {isLoading ? (
          <Skeleton.ExplorationContent />
        ) : (
          explorationMenuItems.map(item => {
            const Component = item.component;
            return (
              <Component
                key={item.key}
                id={item.key}
                title={item.label}
                data={explorations[item.key]}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

const explorationMenuItems = [
  {
    key: EXPLORATION_LISTS.OVERVIEW,
    label: 'Overview',
    component: Overview,
  },
  {
    key: EXPLORATION_LISTS.VARIABLES,
    label: 'Variables',
    component: Variables,
  },
  {
    key: EXPLORATION_LISTS.CORRELATIONS,
    label: 'Correlations',
    component: Correlations,
  },
];

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

ExplorationPage.getLayout = page => <DashboardLayout>{page}</DashboardLayout>;

export default ExplorationPage;
