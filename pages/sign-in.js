import Link from 'next/link';
import { AuthLayout } from '@/components/layouts';
import { useForm } from 'react-hook-form';
import { TextField } from '@/components/base/text-field';
import { Button } from '@/components/base/button';
import { EyeIcon } from '@/components/icons';

export default function SignIn() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  return (
    <AuthLayout>
      <p className="lg:self-end order-last lg:order-first text-center">
        Doesn’t have an account ?{' '}
        <span className="text-c-red-600 italic font-bold hover:text-c-red-300">
          <Link href="/register">Register now.</Link>
        </span>
      </p>
      <div className="flex lg:px-28 flex-col lg:h-[100%] justify-center">
        <h2 className="font-bold text-c-gray-600 text-3xl">Sign in to Kalkula</h2>
        <form className="w-full my-7">
          <TextField
            control={control}
            label="Email"
            name="email"
            placeholder="Enter your email"
            rules={{
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Please enter your valid email',
              },
            }}
          />
          <TextField
            isForgetPassword
            control={control}
            type="password"
            label="Passsword"
            name="password"
            placeholder="Enter your password"
            endIcon={EyeIcon}
            rules={{
              required: true,
            }}
          />
        </form>
        <div className="relative">
          <Button
            className="!px-10 mx-0"
            size="md"
            onClick={handleSubmit(form => console.log(form))}
          >
            Sign In
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
}
