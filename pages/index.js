import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/base/button';
import { Section } from '@/components/base/section';
import BenefitList from '@/components/pages/home-page/benefit-list';
import FeatureList from '@/components/pages/home-page/feature-list';
import UserWaitlist from '@/components/pages/home-page/user-waitlist';
import FormWaitlist from '@/components/pages/home-page/form-waitlist';
import { RightArrowIcon } from '@/components/icons';
import { LandingPageLayout } from '@/components/layouts';
import useTestimonialWaitlist from '@/services/features/waitlist/hooks/use-testimonial-waitlist';

export default function Home() {
  const { data: testimonials } = useTestimonialWaitlist();

  return (
    <LandingPageLayout>
      <Section>
        <div className="flex flex-col items-center py-5 md:flex-row lg:py-10">
          <div className="relative w-full text-center md:w-6/12 md:text-left">
            <div className="absolute -left-32 -top-32 h-[491px] w-[475px] bg-[url('/images/red-bubble.png')] bg-cover" />
            <h1 className="mb-4 font-archivo text-2xl font-bold md:mb-6 md:text-[42px] md:leading-[46px] md:tracking-tight lg:mt-16">
              <span className="text-c-red-600">Elevate Your Data Quality </span>
              <span>Assessment Experience!</span>
            </h1>
            <p className="mb-6 text-[10px] md:mb-16 md:text-base">
              Streamline Your Data Analysis Process:
              <br />
              Upload | Explore | Set Rules | Enhance
            </p>
            <Link href="#join" scroll={false} passHref>
              <Button className="!px-12 font-bold" IconEnd={<RightArrowIcon classname="h-5 w-5" />}>
                Join Our Waitlist
              </Button>
            </Link>
          </div>
          <div className="relative h-[500px] w-full self-start md:w-6/12 lg:h-[578px]">
            <Image
              alt="kalkula image"
              src="/images/home-img-1.png"
              style={{ objectFit: 'contain' }}
              fill
            />
          </div>
        </div>
      </Section>
      <Section className="skew-left-top-right-bottom bg-[#FFF5F7]">
        <div id="benefits" className="flex flex-col py-16 md:py-28">
          <div className="mb-5 w-full flex-col text-center lg:mb-20">
            <h2 className="mb-5 font-archivo text-xl font-bold md:text-[28px]">
              Key Benefits of Embracing Our Solution
            </h2>
            <p className="text-[10px] md:text-base">
              Empower Your Business with Enhanced Data Control and Quality for Optimal Performance
            </p>
          </div>
          <BenefitList />
        </div>
      </Section>
      <Section>
        <div id="features" className="flex flex-col py-16 md:py-28">
          <div className="mb-9 w-full flex-col text-center md:mb-14">
            <h2 className="mb-4 font-archivo text-2xl font-bold md:mb-5 md:text-[28px]">
              Advanced Features for Unleashing the Potential of Your Data
            </h2>
            <p className="text-[10px] md:text-base">
              Discover the Power of Our Solution to Elevate Data Quality and Boost Performance
            </p>
          </div>
          <FeatureList />
        </div>
      </Section>
      {testimonials && testimonials.payload.length > 4 && (
        <Section className="skew-right-bottom bg-[#FFF5F7]">
          <div className="flex flex-col py-16 md:py-28">
            <div className="mb-10 w-full flex-col text-center md:mb-20">
              <h2 className="mb-4 font-archivo text-2xl font-bold md:mb-5 md:text-[28px]">
                Here&apos;s Why They Join Our Waitlist
              </h2>
              <p className="text-[10px] md:text-base">
                Unlock Enhanced Data Control and Quality with Our Open-Source Micro SaaS Solution
              </p>
            </div>
            <UserWaitlist testimonials={testimonials} />
          </div>
        </Section>
      )}
      <Section>
        <div id="join" className="flex flex-col gap-10 py-16 lg:flex-row lg:py-28">
          <div className="w-full lg:w-5/12">
            <h1 className="mb-6 font-archivo text-2xl font-bold md:text-[42px] lg:mt-16 lg:leading-[46px] lg:tracking-tight">
              <span className="text-c-red-600"> Join the Waitlist</span> and Harness the Power of
              Data Ownership
            </h1>
            <p className="mb-6 text-center text-[10px] md:text-base lg:text-left">
              Take charge of your data like never before! By joining our waitlist, you&apos;ll gain
              exclusive access to our revolutionary open-source solution designed to empower you
              with enhanced data quality. Say goodbye to compromises and hello to true data
              ownership.
            </p>
            <p className="text-center text-[10px] md:text-base lg:text-left">
              Be among the first to experience the transformative capabilities of our platform,
              enabling you to maintain complete control over your valuable data assets.
            </p>
          </div>
          <div className="w-full lg:w-7/12">
            <FormWaitlist />
          </div>
        </div>
      </Section>
    </LandingPageLayout>
  );
}
