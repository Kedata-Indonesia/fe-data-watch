import Link from 'next/link';
import { AuthLayout } from '@/components/layouts';
import { useForm } from 'react-hook-form';
import { TextField } from '@/components/base/text-field';
import { Button } from '@/components/base/button';
import { EyeIcon } from '@/components/icons';
import { NextSeo } from 'next-seo';
import { useEffect } from 'react';
import useRequestLogin from '@/services/features/auth/hooks/use-request-login';
import Loading from '@/components/base/loading/loading';

export default function SignIn() {
  const requestLoginQuery = useRequestLogin();
  const loginUrl = requestLoginQuery.data?.payload?.login_url;

  useEffect(() => {
    if (loginUrl) {
      window.location.href = loginUrl;
    }
  }, [loginUrl]);

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="flex flex-col items-center">
        <Loading className="h-8 w-8 stroke-red-500" />
        <div className="mt-2 text-base">Redirecting...</div>
      </div>
    </div>
  );
}
