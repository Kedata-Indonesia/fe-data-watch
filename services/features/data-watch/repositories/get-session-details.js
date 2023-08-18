import clientHttp from '@/services/http/client-http';

const getSessionDetails = async (client = clientHttp()) => {
  const res = await client.get('/sessions/details');

  return res.data;
};

export default getSessionDetails;
