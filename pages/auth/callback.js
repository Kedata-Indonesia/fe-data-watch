import Loading from '@/components/base/loading/loading';
import { CheckCircleIcon, CloseIcon } from '@/components/icons';
import { ACCESS_TOKEN_KEY } from '@/constants/cookie-keys';
import cookieServices from '@/services/browser/cookie';
import getProfile from '@/services/features/auth/repositories/get-profile';
import { queryClient } from '@/services/libs/react-query';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const SsoCallback = () => {
  const router = useRouter();

  const accessToken = router.query.accessToken;
  const hasToken = !!accessToken && typeof accessToken === 'string';

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    if (accessToken) {
      cookieServices.set(ACCESS_TOKEN_KEY, accessToken);
      getProfile()
        .then(data => {
          setData(data);
          queryClient.setQueryData(['profile'], data);
          setIsLoading(false);
          router.push('/app');
        })
        .catch(err => {
          setError(err);
          setIsLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="flex flex-col items-center">
        {!hasToken ? (
          <>
            <CloseIcon className="text-white w-10 h-10" />
            <div className="text-white mt-2 text-base">Verification failed</div>
          </>
        ) : (
          <>
            {!isLoading ? (
              <>
                {error ? (
                  <>
                    <CloseIcon className="text-white w-10 h-10" />
                    <div className="text-white mt-2 text-base">Verification failed</div>
                  </>
                ) : (
                  <>
                    <CheckCircleIcon className="text-white w-10 h-10" />
                    <div className="text-white mt-2 text-base">Verification successful</div>
                  </>
                )}
              </>
            ) : (
              <>
                <Loading className="h-8 w-8" />
                <div className="text-white mt-2 text-base">Please wait</div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SsoCallback;
