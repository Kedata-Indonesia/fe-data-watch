import { useEffect } from 'react';
import Link from 'next/link';
import useRequestLogin from '@/services/features/auth/hooks/use-request-login';
import Loading from '@/components/base/loading/loading';
import AuthPublic from '@/components/layouts/auth-public';

export default function SignIn() {
  const requestLoginQuery = useRequestLogin();
  const loginUrl = requestLoginQuery.data?.payload?.login_url;
  const errorMessage =
    requestLoginQuery.error?.response?.data?.message ||
    requestLoginQuery.error?.message ||
    (requestLoginQuery.isError ? 'Failed to start login.' : null);

  useEffect(() => {
    if (loginUrl) {
      window.location.href = loginUrl;
    }
  }, [loginUrl]);

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="flex flex-col items-center max-w-md px-6 text-center">
        {errorMessage ? (
          <>
            <div className="text-base text-c-red-600 font-semibold">Login failed</div>
            <div className="mt-2 text-sm text-c-gray-600">{errorMessage}</div>
            <div className="mt-1 text-xs text-c-gray-400">
              Check BE is running and SSO_URL/APP_ID (or leave SSO_URL empty for local auth).
            </div>
            <Link href="/" className="mt-4 text-c-red-600 underline">
              Back to home
            </Link>
          </>
        ) : (
          <>
            <Loading className="h-8 w-8 stroke-red-500" />
            <div className="mt-2 text-base">Redirecting...</div>
          </>
        )}
      </div>
    </div>
  );
}

SignIn.getLayout = page => <AuthPublic>{page}</AuthPublic>;
