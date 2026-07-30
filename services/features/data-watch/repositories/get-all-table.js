import dataWatchHttp from '@/services/http/data-watch-http';

const getAllTable = async dto => {
  const res = await dataWatchHttp().get('/eda/table-details', {
    params: {
      page: dto?.page ?? 1,
      limit: 50,
      column: dto?.columns ?? undefined,
    },
  });

  return res?.data;
};

export default getAllTable;
