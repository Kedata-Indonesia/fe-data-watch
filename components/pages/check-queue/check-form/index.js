import { Button } from '@/components/base/button';
import { RightArrowIcon } from '@/components/icons';
import { TextField } from '@/components/base/text-field';
import { useForm } from 'react-hook-form';
import useCheckQueue from '@/services/features/waitlist/hooks/use-check-queue';
import { useState, useEffect } from 'react';

const FormCheckQueue = ({ setEmail = () => {}, setQueue = () => {} }) => {
  const [inputEmail, setInputEmail] = useState(null);
  const { control, reset, handleSubmit } = useForm({
    defaultValues: { email: '' },
  });
  const checkQuery = useCheckQueue({ email: inputEmail });

  useEffect(() => {
    setQueue(checkQuery.data?.payload);
  }, [checkQuery?.data]);

  return (
    <div className="flex w-full flex-col rounded-lg shadow-xl">
      <div className="flex p-8">
        <form className="w-full">
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
          <p className="text-xs text-c-red-600">{checkQuery.error?.response.data.message}</p>
        </form>
      </div>
      <Button
        className="w-full justify-center rounded-lg rounded-t-none font-normal"
        IconEnd={<RightArrowIcon classname="h-5 w-5" />}
        isLoading={checkQuery.isFetching}
        onClick={handleSubmit(form => {
          setEmail(form.email);
          setInputEmail(form.email);
          reset();
        })}
      >
        Check Queue Number
      </Button>
    </div>
  );
};

export default FormCheckQueue;
