import dataWatchHttp from '@/services/http/data-watch-http';

const getDqReport = async () => {
  const res = await dataWatchHttp().get('/data-quality/report');
  return res.data;
};

export default getDqReport;
