import { Alert } from '@/components/base/alert';
import { DashboardLayout } from '@/components/layouts';
import serverProps from '@/services/servers/server-props';
import withAuth from '@/services/servers/with-auth';
import withSession from '@/services/servers/with-session';
import useInterval from '@/utils/hooks/use-interval';

const DataQualityPage = props => {
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
    <div className="relative h-full">
      <div className="absolute inset-0 flex justify-center items-center">
        <h1 className="text-heading-4 italic text-gray-400">Releasing soon...</h1>
      </div>
    </div>
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
