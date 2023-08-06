import dataWatchHttp from '@/services/http/data-watch-http';

const exportData = async () => {
  const res = await dataWatchHttp().get('/sessions/export', {
    responseType: 'blob',
  });

  return res.data;
};

export default exportData;
