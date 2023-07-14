import { useState } from 'react';
import { Button } from '@/components/base/button';
import { TextField } from '@/components/base/text-field';
import { TextArea } from '@/components/base/text-area';
import { CheckBox } from '@/components/base/check-box';
import { useForm } from 'react-hook-form';
import useRegisterWaitlist from '@/services/features/waitlist/hooks/use-register-waitlist';
import SocmedShare from '../socmed-share';
import { RightArrowIcon, CopyIcon, CheckCircleIcon } from '@/components/icons';
import { event } from 'nextjs-google-analytics';

const FormWaitlist = () => {
  const [isCopy, setIsCopy] = useState(false);
  const { control, reset, handleSubmit, setError } = useForm({
    defaultValues: {
      is_entry_public: false,
      email: '',
      full_name: '',
      organization: '',
      reason: '',
    },
  });

  const registerMutation = useRegisterWaitlist();

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
          <TextField
            control={control}
            label="Fullname"
            name="full_name"
            placeholder="Enter your fullname"
            rules={{ required: true }}
          />
          <TextField
            control={control}
            label="Organization"
            name="organization"
            placeholder="Enter your organization"
            rules={{ required: true }}
          />
          <TextArea
            control={control}
            label="Reason For"
            name="reason"
            placeholder="Enter your reason join our waitlist"
            rules={{ required: true }}
          />
          <CheckBox
            control={control}
            name="is_entry_public"
            label="I would like to share my reason for joining the waitlist."
          />
        </form>
      </div>
      <Button
        className="w-full justify-center rounded-lg rounded-t-none font-normal"
        IconEnd={<RightArrowIcon classname="h-5 w-5" />}
        isLoading={registerMutation.isLoading}
        onClick={handleSubmit(form => {
          return registerMutation.mutateAsync(
            {
              is_entry_public: form.is_entry_public,
              email: form.email,
              full_name: form.full_name,
              organization: form.organization,
              reason: form.reason,
            },
            {
              onSuccess: () => {
                setIsCopy(false);
                thanksModal.showModal();
                event('join_waitlist');
                reset();
              },
              onError: err => {
                setError(
                  'email',
                  { type: 'custom', message: err.response.data.message },
                  { shouldFocus: true }
                );
              },
            }
          );
        })}
        // onClick={() => {
        //   thanksModal.showModal();
        //   event('frey_event', {
        //     category: 'Custom Event',
        //     label: 'Join',
        //   });
        // }}
      >
        Join Our Waitlist
      </Button>
      <dialog id="thanksModal" className="modal">
        <form
          method="dialog"
          className="modal-box flex flex-col rounded-lg bg-white p-10 text-center text-[10px] text-c-gray-600 md:text-base lg:w-[560px] lg:max-w-[560px]"
        >
          <button className="btn-ghost btn-sm btn-circle btn absolute right-2 top-2">✕</button>
          <h3 className="mb-10 text-4xl font-bold text-c-red-600">Thank You</h3>
          <p className="mb-5">
            Please confirm your email address to activate your membership on our exclusive waitlist.
          </p>
          <p className="mb-5">
            Once confirmed, you&apos;ll be among the first to experience our groundbreaking features
            and innovations, taking control of your data with our open-source Micro SaaS platform.
          </p>
          <div className="mb-10 rounded-lg border border-c-gray-300 bg-slate-100 p-4 md:p-7">
            <p className="mb-2 md:mb-6">
              Refer your friends and colleagues to join our waitlist and be part of the excitement
            </p>
            <div className="flex justify-between rounded border border-c-gray-300 bg-white px-4 py-2">
              <p>https://data-watch.kalkula.id/#join</p>
              <span
                onClick={() => {
                  navigator.clipboard.writeText('https://data-watch.kalkula.id/#join');
                  setIsCopy(true);
                }}
              >
                {!isCopy && <CopyIcon className="h-6 w-6 text-c-gray-600" />}
                {isCopy && <CheckCircleIcon className="h-6 w-6 text-green-600" />}
              </span>
            </div>
          </div>
          <SocmedShare />
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default FormWaitlist;
