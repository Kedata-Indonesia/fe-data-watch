import Link from 'next/link';
import { AuthLayout } from '@/components/layouts';
import { useForm } from 'react-hook-form';
import { TextField } from '@/components/base/text-field';
import { Button } from '@/components/base/button';
import { EyeIcon } from '@/components/icons';
import { NextSeo } from 'next-seo';

const Register = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      fullname: '',
      email: '',
      password: '',
      organization: '',
    },
  });
  return (
    <AuthLayout>
      <NextSeo title="Register" />
      <p className="lg:self-end order-last lg:order-first text-center">
        Have an account ?{' '}
        <span className="text-c-red-600 italic font-bold hover:text-c-red-300">
          <Link href="/sign-in">Sign In.</Link>
        </span>
      </p>
      <div className="flex lg:px-28 flex-col lg:h-[100%] justify-center">
        <h2 className="font-bold text-c-gray-600 text-3xl">Register to Kalkula</h2>
        <form className="w-full my-7">
          <TextField
            control={control}
            label="Fullname"
            name="fullname"
            placeholder="Enter your fullname"
            rules={{
              required: true,
            }}
          />
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
          <TextField
            control={control}
            type="password"
            label="Confirm Passsword"
            name="confirm_password"
            placeholder="Enter your confirm password"
            endIcon={EyeIcon}
            rules={{
              required: true,
            }}
          />
          <TextField
            control={control}
            label="Organization"
            name="organization"
            placeholder="Enter your organization"
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
            Register
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Register;
