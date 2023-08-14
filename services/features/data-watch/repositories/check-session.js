import clientHttp from '@/services/http/client-http';

const checkSession = async () => {
  const res = await clientHttp().get('/sessions/remaining-time');

  return res.data;
};

export default checkSession;
