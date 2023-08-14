import Loading from '@/components/base/loading/loading';
import useProfile from '@/services/features/auth/hooks/use-profile';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const AuthPublic = ({ children }) => {
  const router = useRouter();
  const profileQuery = useProfile();

  useEffect(() => {
    if (profileQuery.data) {
      router.push('/app');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileQuery.data]);

  if (profileQuery.isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loading className="h-8 w-8 stroke-red-500" />
          <div className="mt-2 text-base">Redirecting...</div>
        </div>
      </div>
    );
  }

  if (!profileQuery.data) {
    return children;
  }

  return null;
};

export default AuthPublic;
