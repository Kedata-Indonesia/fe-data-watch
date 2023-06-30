import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/base/button';
import Section from '@/components/pages/home-page/section';
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
        <div className="flex py-10">
          <div className="w-6/12">
            <h1 className="mb-10 mt-16 font-archivo text-[42px] font-bold leading-[46px] tracking-tight">
              <span className="text-c-red-600">Empowering Data Analysis with Free: </span>
              <span>Experience Quality Insights with Kalkula - DataWatch!</span>
            </h1>
            <p className="mb-12">
              Unlock the full potential of your data with our cutting-edge solution, empowering you
              to regain control and elevate the quality of your information.
            </p>
            <Link href="#join" scroll={false} passHref>
              <Button IconEnd={<RightArrowIcon classname="h-5 w-5" />}>Join Our Waitlist</Button>
            </Link>
          </div>
          <div className="relative h-[240px] w-6/12 self-start lg:h-[578px]">
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
        <div id="benefits" className="flex flex-col py-28">
          <div className="mb-20 w-full flex-col text-center">
            <h2 className="mb-5 font-archivo text-[28px] font-bold">
              Key Benefits of Embracing Our Solution
            </h2>
            <p>
              Empower Your Business with Enhanced Data Control and Quality for Optimal Performance
            </p>
          </div>
          <BenefitList />
        </div>
      </Section>
      <Section>
        <div id="features" className="flex flex-col py-28">
          <div className="mb-14 w-full flex-col text-center">
            <h2 className="mb-5 font-archivo text-[28px] font-bold">
              Advanced Features for Unleashing the Potential of Your Data
            </h2>
            <p>Discover the Power of Our Solution to Elevate Data Quality and Boost Performance</p>
          </div>
          <FeatureList />
        </div>
      </Section>
      {testimonials && testimonials.payload.length > 0 && (
        <Section className="skew-right-bottom bg-[#FFF5F7]">
          <div className="flex flex-col py-28">
            <div className="mb-20 w-full flex-col text-center">
              <h2 className="mb-5 font-archivo text-[28px] font-bold">
                Here&apos;s Why They Join Our Waitlist
              </h2>
              <p>
                Unlock Enhanced Data Control and Quality with Our Open-Source Micro SaaS Solution
              </p>
            </div>
            <UserWaitlist testimonials={testimonials} />
          </div>
        </Section>
      )}
      <Section>
        <div id="join" className="flex gap-10 py-28">
          <div className="w-5/12">
            <h1 className="mb-6 mt-16 font-archivo text-[42px] font-bold leading-[46px] tracking-tight">
              <span className="text-c-red-600"> Join the Waitlist</span> and Harness the Power of
              Data Ownership
            </h1>
            <p className="mb-6">
              Take charge of your data like never before! By joining our waitlist, you&apos;ll gain
              exclusive access to our revolutionary open-source solution designed to empower you
              with enhanced data quality. Say goodbye to compromises and hello to true data
              ownership.
            </p>
            <p>
              Be among the first to experience the transformative capabilities of our platform,
              enabling you to maintain complete control over your valuable data assets.
            </p>
          </div>
          <div className="w-7/12">
            <FormWaitlist />
          </div>
        </div>
      </Section>
    </LandingPageLayout>
  );
}
