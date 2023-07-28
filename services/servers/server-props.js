import { QueryClient, dehydrate } from '@tanstack/react-query';

/**
 * @description
 * fungsi ini merupakan tambahan untuk getServerSideProps dimana berisikan tambahan queryClient dan accessToken
 *
 * @param {import("next").GetServerSideProps[]} fns
 * @returns {import("next").GetServerSideProps}
 */
const serverProps = (...fns) => {
  return async ctx => {
    // satu QueryClient untuk setiap halaman yang menggunakan serverProps
    const queryClient = new QueryClient();
    ctx.queryClient = queryClient;

    ctx.params = {
      ...ctx.params,
    };
    ctx.query = {
      ...ctx.query,
    };

    try {
      // Menjalankan fungsi yang ada di dalam array
      for (let i = 0; i < fns.length; i++) await fns[i](ctx);

      ctx.res.props = {
        ...ctx.res.props,
        dehydratedState: dehydrate(ctx.queryClient),
      };

      queryClient.clear();

      return {
        props: ctx.res.props,
        redirect: ctx.res.redirect ?? undefined,
        notFound: ctx.res.notFound ?? false,
      };
    } catch (err) {
      ctx.res.props = {
        ...ctx.res.props,
        dehydratedState: dehydrate(ctx.queryClient),
      };

      queryClient.clear();

      if (ctx.res.notFound) {
        return {
          notFound: true,
          props: ctx.res.props,
        };
      }

      return {
        props: ctx.res.props,
        redirect: ctx.res.redirect ?? undefined,
      };
    }
  };
};

export default serverProps;
