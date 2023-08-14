import serverProps from '@/services/servers/server-props';
import withAuth from '@/services/servers/with-auth';
import withSession from '@/services/servers/with-session';

const DashboardPage = () => null;

export const getServerSideProps = serverProps(
  withAuth(),
  withSession({
    onError: ctx => {
      ctx.res.redirect = {
        destination: '/app/upload',
      };
    },
    onSuccess: ctx => {
      ctx.res.redirect = {
        destination: '/app/exploration',
      };
    },
  })
);

export default DashboardPage;
