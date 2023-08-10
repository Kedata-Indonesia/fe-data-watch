import serverProps from '@/services/servers/server-props';

const DashboardPage = () => null;

export const getServerSideProps = serverProps(async ctx => {
  const { session_id } = ctx.req.cookies;

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
