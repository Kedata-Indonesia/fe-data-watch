import dataWatchHttp from '@/services/http/data-watch-http';

const exportData = async () => {
  const res = await dataWatchHttp().get('/sessions/export');

  return res.data;
};

export default exportData;
