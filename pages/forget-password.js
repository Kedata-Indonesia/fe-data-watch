import Link from 'next/link';
import { AuthLayout } from '@/components/layouts';
import { TextField } from '@/components/base/text-field';
import { Button } from '@/components/base/button';
import { useForm } from 'react-hook-form';

const ForgetPassword = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: { email: '' },
  });
  return (
    <AuthLayout>
      <p className="self-end">
        Doesn’t have an account ?{' '}
        <span className="text-c-red-600 italic font-bold hover:text-c-red-300">
          <Link href="/register">Register now.</Link>
        </span>
      </p>
      <div className="flex px-28 flex-col h-[100%] justify-center text-c-gray-600">
        <h2 className="font-bold  text-3xl">Forget Password</h2>
        <p className="mt-7">
          Enter the email address you used when you joined. We&apos;ll reset your password and send
          it to your email.
        </p>
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
        </form>
        <div className="relative">
          <Button className="!px-10" size="md" onClick={handleSubmit(form => console.log(form))}>
            Reset Password
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ForgetPassword;
