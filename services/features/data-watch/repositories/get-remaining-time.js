import clientHttp from '@/services/http/client-http';

const getRemainingTime = async (client = clientHttp()) => {
  const res = await client.get('/sessions/remaining-time');

  return res.data;
};

export default getRemainingTime;
