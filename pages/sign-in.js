import { Button } from '@/components/base/button';
import { GitHubIcon, GitLabIcon, GoogleIcon } from '@/components/icons';
import { AuthLayout } from '@/components/layouts';
import AuthPublic from '@/components/layouts/auth-public';
import getOauthLoginUrl from '@/services/features/auth/repositories/get-oauth-login-url';
import requestLogin from '@/services/features/auth/repositories/request-login';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { useState } from 'react';

const PROVIDERS = [
  { key: 'github', label: 'GitHub', icon: GitHubIcon, brandClass: 'text-c-neutral-900' },
  { key: 'gitlab', label: 'GitLab', icon: GitLabIcon, brandClass: 'text-[#FC6D26]' },
  { key: 'google', label: 'Google', icon: GoogleIcon, brandClass: '' },
];

const SignIn = () => {
  const [loadingKey, setLoadingKey] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleOauth = async provider => {
    setErrorMessage('');
    setLoadingKey(provider);
    try {
      const res = await getOauthLoginUrl(provider);
      window.location.href = res.payload.login_url;
    } catch (err) {
      setErrorMessage(
        err?.response?.data?.message ||
          `Failed to start ${provider} login. Check the backend configuration.`
      );
      setLoadingKey(null);
    }
  };

  const handleEmail = async () => {
    setErrorMessage('');
    setLoadingKey('email');
    try {
      const res = await requestLogin();
      window.location.href = res.payload.login_url;
    } catch (err) {
      setErrorMessage(err?.response?.data?.message || 'Failed to start email login.');
      setLoadingKey(null);
    }
  };

  const busy = loadingKey !== null;

  return (
    <AuthLayout>
      <NextSeo title="Sign In" />
      <div className="flex min-h-[calc(100vh-120px)] items-center justify-center px-6">
        <div className="w-full max-w-md">
          <h1 className="mb-1 text-center text-2xl font-bold text-gray-800">Welcome back</h1>
          <p className="mb-8 text-center text-sm text-gray-500">
            Sign in to continue to Data Watch.
          </p>

          <div className="flex flex-col gap-3">
            {PROVIDERS.map(({ key, label, icon: Icon, brandClass }) => (
              <button
                key={key}
                type="button"
                onClick={() => handleOauth(key)}
                disabled={busy}
                className="flex w-full items-center justify-center gap-3 rounded border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loadingKey === key ? (
                  <span className="loading loading-spinner loading-sm text-c-red-600" />
                ) : (
                  <Icon className={`h-5 w-5 ${brandClass}`} />
                )}
                Continue with {label}
              </button>
            ))}
          </div>

          <div className="my-6 flex items-center gap-4">
            <span className="h-px flex-1 bg-gray-200" />
            <span className="text-xs uppercase text-gray-400">or</span>
            <span className="h-px flex-1 bg-gray-200" />
          </div>

          <Button
            size="lg"
            type="outline"
            className="w-full"
            onClick={busy ? undefined : handleEmail}
            isLoading={loadingKey === 'email'}
          >
            Continue with email
          </Button>

          {errorMessage ? (
            <p className="mt-4 rounded bg-c-red-50 p-3 text-center text-sm text-c-red-600">
              {errorMessage}
            </p>
          ) : null}

          <p className="mt-8 text-center text-sm text-gray-500">
            Don&apos;t have an account?{' '}
            <span className="font-bold italic text-c-red-600 hover:text-c-red-300">
              <Link href="/register">Register.</Link>
            </span>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

SignIn.getLayout = page => <AuthPublic>{page}</AuthPublic>;

export default SignIn;
