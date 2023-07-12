import { useRouter } from 'next/router';
import useGetDetailArticle from '@/services/features/blog/hooks/use-get-detail-article';
import { LandingPageLayout } from '@/components/layouts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Section } from '@/components/base/section';
import BlogSection from '@/components/pages/blog/blog-section';
import Image from 'next/image';
import Head from 'next/head';

export default function DetailArticle() {
  const router = useRouter();
  const { articleId } = router.query;
  const detailArticleQuery = useGetDetailArticle({ articleId });

  return (
    <LandingPageLayout>
      <Head>
        <title>{detailArticleQuery.data?.payload.title}</title>
      </Head>
      <Section id="article">
        <div className="flex flex-col py-5 lg:py-16 lg:pt-20">
          <div className="mx-auto mb-8 flex flex-col lg:mb-14 lg:w-[1040px] lg:flex-row">
            <div className="w-full lg:w-8/12">
              <h1 className="text-3xl font-bold lg:text-[56px] lg:leading-[60px]">
                {detailArticleQuery.data?.payload.title}
              </h1>
            </div>
            <div className="w-full lg:w-4/12"></div>
          </div>
          <div className="relative mx-auto h-[190px] w-full lg:h-[500px]">
            <Image
              alt={detailArticleQuery.data?.payload.title}
              src={
                detailArticleQuery.data?.payload.cover_image ?? '/images/dummy-detail-article.png'
              }
              style={{ objectFit: 'contain' }}
              fill
            />
          </div>
          <article className="mx-auto flex flex-col gap-6 py-5 lg:w-[680px] lg:py-10">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {detailArticleQuery.data?.payload.content.split('---')[2]}
            </ReactMarkdown>
          </article>
        </div>
      </Section>
      <Section className="bg-[#FFF5F7]">
        <BlogSection />
      </Section>
    </LandingPageLayout>
  );
}
