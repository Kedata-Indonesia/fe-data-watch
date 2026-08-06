import dataWatchHttp from '@/services/http/data-watch-http';

const getDqCapabilities = async () => {
  const res = await dataWatchHttp().get('/data-quality/capabilities');
  return res.data;
};

export default getDqCapabilities;
