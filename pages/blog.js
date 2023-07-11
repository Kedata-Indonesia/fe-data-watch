import { LandingPageLayout } from '@/components/layouts';
import { Section } from '@/components/base/section';
import useGetTopics from '@/services/features/blog/hooks/use-get-topics';

export default function Blog() {
  const topicQuery = useGetTopics();
  console.log('topicQuery', topicQuery.data);
  return (
    <LandingPageLayout>
      <Section className="bg-[#FFF5F7]">
        <div className="flex flex-col py-5 md:flex-row lg:py-10">
          <div className="w-full text-center md:w-8/12 md:text-left">
            <h1 className="mb-4 font-archivo text-2xl font-bold md:mb-6 md:text-[42px] md:leading-[46px] md:tracking-tight lg:mt-16">
              <span className="text-c-red-600">Empowering Data Analysis</span>
              <span>with Freedom: Unleash Quality Insights</span>
            </h1>
            <p className="mb-6 text-[10px] md:mb-16 md:text-base">
              Harness the Potential of Data Analysis with Our Free Tools: Discover Valuable Insights
              to Drive Growth and Success
            </p>
          </div>
        </div>
      </Section>
      <Section>
        <div className="flex flex-col py-5 md:flex-row lg:py-10">
          <div className="w-3/12">
            <ul className="flex flex-col gap-4 uppercase">
              {/* {topicQuery.data?.payload.map(item => )} */}
              <li>all topic</li>
              <li>data governance</li>
            </ul>
          </div>
          <div className="w-9/12">asdadasd</div>
        </div>
      </Section>
    </LandingPageLayout>
  );
}
