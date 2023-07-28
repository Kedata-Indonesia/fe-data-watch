import { useRouter } from 'next/router';
import useGetDetailArticle from '@/services/features/blog/hooks/use-get-detail-article';
import { LandingPageLayout } from '@/components/layouts';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Section } from '@/components/base/section';
import BlogSection from '@/components/pages/blog/blog-section';
import Image from 'next/image';
import { NextSeo } from 'next-seo';
import { event } from 'nextjs-google-analytics';
import { Skeleton } from '@/components/base/skeleton';
import {
  ShareIcon,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
} from '@/components/icons';

export default function DetailArticle() {
  const router = useRouter();
  const urlShare = process.env.NEXT_PUBLIC_BASE_URL + router.asPath;
  const { articleId } = router.query;
  const detailArticleQuery = useGetDetailArticle({ articleId });

  return (
    <LandingPageLayout>
      <NextSeo
        title={detailArticleQuery.data?.payload.title}
        description={detailArticleQuery.data?.payload.excerpt}
      />
      <Section id="article">
        <div className="flex flex-col py-5 lg:py-16 lg:pt-20">
          {!detailArticleQuery.isLoading && (
            <div className="mx-auto mb-8 flex flex-col lg:mb-14 lg:w-[1040px] lg:flex-row gap-5">
              <div className="w-full lg:w-8/12">
                <h1 className="text-3xl font-bold lg:text-[56px] lg:leading-[60px]">
                  {detailArticleQuery.data?.payload.title}
                </h1>
              </div>
              <div className="w-full lg:w-4/12 flex flex-col gap-5">
                <blockquote class="p-4 my-4 border-l-4 border-gray-300 bg-gray-50 dark:border-gray-300 dark:bg-gray-50">
                  <p class="text-sm italic font-medium leading-relaxed text-gray-900 dark:text-gray-900">
                    &quot;{detailArticleQuery.data?.payload.excerpt}&quot;
                  </p>
                </blockquote>
                <div className="flex gap-6 mx-auto lg:m-0">
                  <div className="flex text-c-neutral-100 gap-2">
                    <ShareIcon />
                    <div className="font-bold">SHARE</div>
                  </div>
                  <div className="flex text-c-red-600 w-full gap-2">
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${urlShare}`}
                      target="_blank"
                      onClick={() => event('share_article', { category: 'Facebook' })}
                    >
                      <FacebookIcon />
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${urlShare}`}
                      target="_blank"
                      onClick={() => event('share_article', { category: 'LinkedIn' })}
                    >
                      <LinkedinIcon />
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?text=${detailArticleQuery.data?.payload.title}&url=${urlShare}`}
                      target="_blank"
                      onClick={() => event('share_article', { category: 'Twitter' })}
                    >
                      <TwitterIcon />
                    </a>
                    <a
                      href={`https://api.whatsapp.com/send?text=${detailArticleQuery.data?.payload.title}+${urlShare}&url=${urlShare}`}
                      target="_blank"
                      onClick={() => event('share_article', { category: 'Whatsapp' })}
                    >
                      <WhatsappIcon />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
          {detailArticleQuery.isLoading ? (
            <div className="mx-auto w-full">
              <Skeleton height={300} />
            </div>
          ) : (
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
          )}
          <article className="mx-auto flex flex-col gap-6 py-5 lg:w-[680px] lg:py-10">
            {detailArticleQuery.isLoading ? (
              <>
                <Skeleton />
                <Skeleton width={'80%'} />
                <Skeleton width={'50%'} />
                <Skeleton width={'80%'} />
                <Skeleton />
                <Skeleton width={'80%'} />
                <Skeleton width={'50%'} />
                <Skeleton width={'80%'} />
                <Skeleton />
              </>
            ) : (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {detailArticleQuery.data?.payload.content.split('---')[2]}
              </ReactMarkdown>
            )}
          </article>
        </div>
      </Section>
      <Section className="bg-[#FFF5F7]">
        <BlogSection />
      </Section>
    </LandingPageLayout>
  );
}
