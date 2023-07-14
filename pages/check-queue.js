import { useState } from 'react';
import { LandingPageLayout } from '@/components/layouts';
import { Section } from '@/components/base/section';
import FormCheckQueue from '@/components/pages/check-queue/check-form';
import Head from 'next/head';

export default function CheckQueue() {
  const [email, setEmail] = useState(null);
  const [queue, setQueue] = useState(null);

  return (
    <LandingPageLayout footerFixed>
      <Head>
        <title>Check Queue - Data Watch</title>
      </Head>
      {!queue && (
        <Section>
          <div className="flex flex-col items-center py-5 lg:flex-row lg:gap-16 lg:py-10">
            <div className="relative w-full text-center md:w-6/12 md:text-left">
              <div className="absolute -left-32 -top-32 h-[491px] w-[475px] bg-[url('/images/red-bubble.png')] bg-cover" />
              <h1 className="mb-4 font-archivo text-2xl font-bold md:mb-6 md:text-[42px] md:leading-[46px] md:tracking-tight lg:mt-16">
                <span className="text-c-red-600">Stay Informed and Plan Ahead: </span>
                <span>Discover Your Place in the Waitlist Queue</span>
              </h1>
              <p className="mb-6 text-[10px] md:mb-6 md:text-base">
                Stay informed, and strategically plan your data-driven decisions by harnessing the
                insights you gain from understanding your position in the waitlist queue.
              </p>
              <p className="mb-6 text-[10px] md:mb-6 md:text-base">
                Empower your organization with quality data analysis experiences that will propel
                you ahead of the competition and unlock new levels of success.
              </p>
            </div>
            <div className="w-full md:w-6/12">
              <FormCheckQueue setEmail={setEmail} setQueue={setQueue} />
            </div>
          </div>
        </Section>
      )}
      {queue && (
        <Section>
          <div className="mx-auto flex flex-col text-center lg:w-[800px]">
            <h2 className="mb-4 font-archivo text-2xl font-bold md:mb-6 md:text-[42px] md:leading-[46px] md:tracking-tight lg:mt-5">
              <span>Thank You, {email}!</span>
            </h2>
            <p className="mb-6 text-[10px] md:mb-8 md:text-base">
              We are thrilled to inform you that your waitlist journey with us is progressing
              smoothly. After carefully reviewing the information you provided, we have successfully
              located your queue number associated with the email you provided.
            </p>
            <div className="mx-auto mb-6 flex w-[324px] flex-col bg-[#FFF5F7] p-9 md:mb-8">
              <p className="mb-5 text-[10px] md:text-base">Here’s your position in the queue:</p>
              <p className="text-8xl font-bold text-c-red-600">{queue}</p>
            </div>
            <p className="mb-6 text-[10px] md:mb-8 md:text-base">
              Stay tuned for future updates as we get closer to the moment when you can harness the
              power of data quality to gain valuable insights and make informed decisions.
            </p>
            <p className="mb-6 text-[10px] md:mb-8 md:text-base">
              Thank you for your continued support and trust in our data quality platform. We are
              excited to have you join us soon!
            </p>
          </div>
        </Section>
      )}
    </LandingPageLayout>
  );
}
