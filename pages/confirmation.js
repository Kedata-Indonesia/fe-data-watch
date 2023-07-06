import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useEmailConfirmation from '@/services/features/waitlist/hooks/use-email-confirmation';
import { LandingPageLayout } from '@/components/layouts';
import { Section } from '@/components/base/section';

export default function Confirmation() {
  const router = useRouter();
  const confirmationMutation = useEmailConfirmation();
  const { token } = router.query;
  const [queue, setQueue] = useState(null);

  useEffect(() => {
    if (token)
      confirmationMutation.mutateAsync(
        { token },
        {
          onSuccess: res => {
            setQueue(res.payload.queue_number);
          },
        }
      );
  }, [token]);

  return (
    <LandingPageLayout
      footerFixed={confirmationMutation.isError || confirmationMutation.isLoading ? true : false}
    >
      {confirmationMutation.isLoading && (
        <Section>
          <div className="mx-auto flex flex-col items-center text-center lg:w-[800px]">
            <h2 className="mb-4 font-archivo text-2xl font-bold md:mb-6 md:text-[42px] md:leading-[46px] md:tracking-tight lg:mt-5">
              Please Wait...
            </h2>
            <span className="loading loading-spinner loading-lg mb-6 md:mb-8" />
            <p className="mb-6 text-[10px] md:mb-8 md:text-base">Just a second...</p>
          </div>
        </Section>
      )}
      {confirmationMutation.isError && (
        <Section>
          <div className="mx-auto flex flex-col text-center lg:w-[800px]">
            <h2 className="mb-4 font-archivo text-2xl font-bold text-c-red-600 md:mb-6 md:text-[42px] md:leading-[46px] md:tracking-tight lg:mt-5">
              Ooppss!
            </h2>
            <p className="mb-6 text-[10px] md:mb-8 md:text-base">
              We can not process your confirmation, please check again confirmation link in your
              email.
            </p>
          </div>
        </Section>
      )}
      {confirmationMutation.isSuccess && (
        <Section>
          <div className="mx-auto flex flex-col text-center lg:w-[800px]">
            <h2 className="mb-4 font-archivo text-2xl font-bold md:mb-6 md:text-[42px] md:leading-[46px] md:tracking-tight lg:mt-5">
              Congratulations!
              {/* <span>Congratulations, Jhonatan Doe!</span> */}
            </h2>
            <p className="mb-6 text-[10px] md:mb-8 md:text-base">
              Thank you for confirming your email and joining our data quality platform! We're
              thrilled to have you on board. Your registration is now complete, and we are excited
              to announce that you have been assigned a queue number.
            </p>
            <div className="mx-auto mb-6 flex w-[324px] flex-col bg-[#FFF5F7] p-9 md:mb-8">
              <p className="mb-5 text-[10px] md:text-base">Here’s your position in the queue:</p>
              <p className="text-8xl font-bold text-c-red-600">{queue}</p>
            </div>
            <p className="mb-6 text-[10px] md:mb-8 md:text-base">
              Get ready to unlock the power of data quality and gain valuable insights with ease.
              Stay tuned as we prepare to launch and notify you when it's your turn to access our
              platform. We appreciate your patience and look forward to empowering your data-driven
              journey!
            </p>
          </div>
        </Section>
      )}
    </LandingPageLayout>
  );
}
