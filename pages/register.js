import Link from 'next/link';
import { AuthLayout } from '@/components/layouts';
import { useForm } from 'react-hook-form';
import { TextField } from '@/components/base/text-field';
import { Button } from '@/components/base/button';
import { EyeIcon } from '@/components/icons';
import { NextSeo } from 'next-seo';
import useRegisterUser from '@/services/features/auth/hooks/use-register-user';
import { useMemo } from 'react';
import { Select } from '@/components/base/select';
import DatePicker from '@/components/base/date-picker';
import axios from 'axios';
import dayjs from 'dayjs';
import { Alert } from '@/components/base/alert';
import AuthPublic from '@/components/layouts/auth-public';

const Register = props => {
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      organization: '',
      country: '',
      dateOfBirth: '',
    },
  });
  const password = watch('password');
  const registerMutation = useRegisterUser();

  const countryOptions = useMemo(() => {
    return Object.keys(props.countries).map(key => {
      const country = props.countries[key];
      const emoji = String.fromCodePoint(...country.emojiU);

      return {
        label: `${emoji} ${country.name}`,
        value: key,
      };
    });
  }, [props.countries]);

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
            name="fullName"
            placeholder="Enter your fullname"
            rules={{
              required: true,
            }}
          />
          <DatePicker
            control={control}
            name="dateOfBirth"
            label="Date of Birth"
            placeholder="Enter your date of birth"
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
            label="Password"
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
            label="Confirm Password"
            name="confirmPassword"
            placeholder="Enter your confirm password"
            endIcon={EyeIcon}
            rules={{
              required: true,
              validate: value => value === password || 'The passwords do not match',
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
          <Select
            control={control}
            label="Country"
            name="country"
            placeholder="Select your country"
            className="w-full"
            options={countryOptions}
            clearable={false}
            searchable
            rules={{
              required: true,
            }}
          />
        </form>
        <div className="relative">
          <Button
            className="!px-10 mx-0"
            size="md"
            isLoading={registerMutation.isLoading}
            onClick={handleSubmit(form => {
              registerMutation.mutateAsync(
                {
                  email: form.email,
                  password: form.password,
                  fullName: form.fullName,
                  organization: form.organization,
                  dateOfBirth: dayjs(form.dateOfBirth).format('YYYYMMDD'),
                  country: form.country,
                  confirmationPassword: form.confirmPassword,
                },
                {
                  onSuccess: () => {
                    Alert.success({
                      title: 'Thank you for registering',
                      text: 'Please check your email to verify your account',
                    });
                  },
                  onError: error => {
                    console.error(error);
                    Alert.error({
                      title: 'Registration failed',
                      text: 'Please try again later',
                    });
                  },
                }
              );
            })}
          >
            Register
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
};

export const getStaticProps = async () => {
  const countryRes = await axios.get(
    'https://raw.githubusercontent.com/annexare/Countries/main/dist/countries.min.json'
  );
  const countries = countryRes.data;

  Object.keys(countryRes.data).map(key => {
    countries[key] = {
      ...countryRes.data[key],
      emojiU: key
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt(0)),
    };
  });

  return {
    props: {
      countries: countries,
    },
  };
};

Register.getLayout = page => <AuthPublic>{page}</AuthPublic>;

export default Register;
