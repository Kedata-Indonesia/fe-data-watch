import { ACCESS_TOKEN_KEY, SESSION_ID_KEY } from '@/constants/cookie-keys';
import axios from 'axios';
import getRemainingTime from '../features/data-watch/repositories/get-remaining-time';

/**
 * @param {object} params
 * @param {(ctx: import('next').GetServerSidePropsContext, data: any) => void | null} params.onSuccess
 * @param {(ctx: import('next').GetServerSidePropsContext, error: any) => void | null} params.onError
 * @returns {import('next').GetServerSideProps}
 */
const withSession = ({ onSuccess = null, onError = null }) => {
  return async ctx => {
    const { queryClient } = ctx;
    const access_token = ctx.req.cookies?.[ACCESS_TOKEN_KEY];

    const clientHttp = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_DATA_WATCH_API_URL}/v1`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    try {
      const remaining_time = await queryClient.fetchQuery({
        queryKey: ['session_data'],
        queryFn: () => getRemainingTime(clientHttp),
        retry: 3,
        cacheTime: 0,
      });

      const remaining = remaining_time?.payload?.session_remaining_time || 0;

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
