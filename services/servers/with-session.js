import { ACCESS_TOKEN_KEY, SESSION_ID_KEY } from '@/constants/cookie-keys';
import axios from 'axios';

/**
 * @param {object} params
 * @param {(ctx: import('next').GetServerSidePropsContext, data: any) => void | null} params.onSuccess
 * @param {(ctx: import('next').GetServerSidePropsContext, error: any) => void | null} params.onError
 * @returns {import('next').GetServerSideProps}
 */
const withSession = ({ onSuccess = null, onError = null }) => {
  return async ctx => {
    const cookies = ctx.req.cookies?.[ACCESS_TOKEN_KEY];

    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_DATA_WATCH_API_URL}/v1/sessions/remaining-time`,
        {
          headers: {
            Authorization: `Bearer ${cookies}`,
          },
        }
      );

      const remaining = res.data?.payload?.session_remaining_time || 0;

      ctx.res.props = {
        session_remaining: Math.trunc(remaining),
      };

      onSuccess && onSuccess(ctx, res.data);
    } catch (error) {
      onError && onError(ctx, error);
    }
  };
};

export default withSession;
