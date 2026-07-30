import dataWatchHttp from '@/services/http/data-watch-http';

const addDqRule = async ({ rule, columns }) => {
  const res = await dataWatchHttp().post('/data-quality/rules', {
    rule,
    columns,
  });
  return res.data;
};

export default addDqRule;
