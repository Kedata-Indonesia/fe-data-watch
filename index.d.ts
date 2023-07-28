import { QueryClient } from '@tanstack/react-query';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';
import {
  GetServerSideProps as NextGetServerSideProps,
  GetServerSidePropsContext as NextGetServerSidePropsContext,
  GetServerSidePropsResult as NextGetServerSidePropsResult,
  Redirect,
} from 'next/types';

declare module 'next' {
  export type GetServerSidePropsContext = NextGetServerSidePropsContext & {
    queryClient: QueryClient;
    req: {
      cookies: NextApiRequestCookies;
    };
    res: {
      props: any;
      notFound: boolean;
      redirect: Redirect;
    };
  };

  export type GetServerSideProps = (
    ctx: GetServerSidePropsContext
  ) => Promise<NextGetServerSidePropsResult>;
}
