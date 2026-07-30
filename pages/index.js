import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/base/button';
import { Section } from '@/components/base/section';
import BenefitList from '@/components/pages/home-page/benefit-list';
import FeatureList from '@/components/pages/home-page/feature-list';
import BlogSection from '@/components/pages/blog/blog-section';
import { RightArrowIcon } from '@/components/icons';
import { LandingPageLayout } from '@/components/layouts';

export default function Home() {
  return (
    <LandingPageLayout>
      <Section>
        <div className="flex flex-col items-center py-5 md:flex-row lg:py-10">
          <div className="relative w-full text-center md:w-6/12 md:text-left">
            <div className="hidden absolute lg:block -left-32 -top-32 h-[400px] w-[475px] bg-[url('/images/red-bubble.png')] bg-cover" />
            <h1 className="mb-4 font-archivo text-2xl font-bold md:mb-6 md:text-[42px] md:leading-[46px] md:tracking-tight lg:mt-16">
              <span className="text-c-red-600">Elevate Your Data Quality </span>
              <span>Assessment Experience!</span>
            </h1>
            <p className="mb-6 text-[10px] md:mb-16 md:text-base">
              Streamline Your Data Analysis Process:
              <br />
              Upload | Explore | Set Rules | Enhance
            </p>
            <Link href="/sign-in" passHref>
              <Button className="!px-12 font-bold" IconEnd={<RightArrowIcon classname="h-5 w-5" />}>
                Login
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
      <Section>
        <div id="login" className="flex flex-col items-center gap-6 py-16 text-center lg:py-28">
          <h1 className="font-archivo text-2xl font-bold md:text-[42px] md:leading-[46px] md:tracking-tight">
            <span className="text-c-red-600">Login</span> and Harness the Power of Data Ownership
          </h1>
          <p className="max-w-2xl text-[10px] md:text-base">
            Access Data Watch to upload your data, explore insights, set quality rules, and take
            control of your data assets.
          </p>
          <Link href="/sign-in" passHref>
            <Button className="!px-12 font-bold" IconEnd={<RightArrowIcon classname="h-5 w-5" />}>
              Login
            </Button>
          </Link>
        </div>
      </Section>
      <Section className="bg-[#FFF5F7]">
        <BlogSection />
      </Section>
    </LandingPageLayout>
  );
}
