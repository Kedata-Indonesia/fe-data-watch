import { ACCESS_TOKEN_KEY } from '@/constants/cookie-keys';
import axios from 'axios';

/**
 *
 * @returns {import('next').GetServerSideProps}
 */
const withAuth = () => {
  return async ctx => {
    const { queryClient } = ctx;
    const accessToken = ctx.req.cookies[ACCESS_TOKEN_KEY];

    try {
      const profileRes = await axios.get(
        `${process.env.NEXT_PUBLIC_DATA_WATCH_API_URL}/v1/auth/profile`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      queryClient.setQueryData(['profile'], profileRes.data);
    } catch (err) {
      console.log(err);
      ctx.res.notFound = true;
    }
  };
};

export default withAuth;
