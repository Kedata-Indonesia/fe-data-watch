import { SESSION_ID_KEY } from '@/constants/cookie-keys';
import serverProps from '@/services/servers/server-props';
import withAuth from '@/services/servers/with-auth';

const DashboardPage = () => null;

export const getServerSideProps = serverProps(withAuth(), async ctx => {
  const cookies = ctx.req.cookies;

  const session_id = cookies?.[SESSION_ID_KEY] ?? null;

  if (session_id) {
    ctx.res.redirect = {
      destination: '/app/exploration',
    };
    return;
  }
  ctx.res.redirect = {
    destination: '/app/upload',
  };
});

export default DashboardPage;
