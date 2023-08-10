import { SESSION_ID_KEY } from '@/constants/cookie-keys';

/**
 * @returns {import('next').GetServerSideProps}
 */
const withSession = () => {
  return ctx => {
    const cookies = ctx.req.cookies;

    const session_id = cookies?.[SESSION_ID_KEY] ?? null;

    if (!session_id) {
      ctx.res.redirect = {
        destination: '/app',
      };
      return;
    }
    ctx.res.props = {
      sessionId: session_id,
    };
  };
};

export default withSession;
