/**
 * @returns {import('next').GetServerSideProps}
 */
const withSession = () => {
  return ctx => {
    const { session_id } = ctx.req.cookies;

    if (!session_id) {
      ctx.res.redirect = {
        destination: '/app',
      };
      return;
    }
    ctx.res.props = {
      sessionId: session_id ?? null,
    };
  };
};

export default withSession;
