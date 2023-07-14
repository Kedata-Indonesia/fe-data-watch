import { useState } from 'react';
import Image from 'next/image';
import { LandingPageLayout } from '@/components/layouts';
import { Section } from '@/components/base/section';
import useGetTopics from '@/services/features/blog/hooks/use-get-topics';
import useGetArticles from '@/services/features/blog/hooks/use-get-articles';
import clsx from 'clsx';
import { RightArrowIcon } from '@/components/icons';
import Link from 'next/link';
import Pagination from 'react-paginate';
import Select from 'react-select';
import Head from 'next/head';

export default function Blog() {
  const [topicId, setTopicId] = useState('');
  const [page, setPage] = useState(0);
  const topicQuery = useGetTopics();
  const articleQuery = useGetArticles({ page: page + 1, limit: 6, topic_id: topicId });

  const topicOptions = topicQuery.data?.payload.map(item => ({
    value: item.id,
    label: item.title,
  }));

  return (
    <LandingPageLayout>
      <Head>
        <title>Blog - Data Watch</title>
      </Head>
      <Section className="bg-[#FFF5F7]">
        <div className="flex flex-col py-5 md:flex-row lg:py-10">
          <div className="w-full text-center md:w-8/12 md:text-left">
            <h1 className="mb-4 font-archivo text-2xl font-bold md:mb-6 md:text-[42px] md:leading-[46px] md:tracking-tight lg:mt-16">
              <span className="text-c-red-600">Empowering Data Analysis </span>
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
          <div className="w-full lg:w-3/12">
            <Select
              className="mb-8 block lg:hidden"
              options={topicOptions ? [{ value: '', label: 'All Topic' }, ...topicOptions] : []}
              placeholder="Select Topic"
              onChange={({ value }) => {
                setTopicId(value);
                setPage(0);
              }}
            />
            <ul className="hidden flex-col gap-4 font-bold uppercase text-c-gray-400 lg:flex">
              <li
                className={clsx(
                  'hover:cursor-pointer hover:text-c-red-600',
                  topicId === '' && 'text-c-red-600'
                )}
                onClick={() => {
                  setTopicId('');
                  setPage(0);
                }}
              >
                All Topic
              </li>
              {topicQuery.data?.payload.map(item => (
                <li
                  key={item.id}
                  className={clsx(
                    'hover:cursor-pointer hover:text-c-red-600',
                    item.id === topicId && 'text-c-red-600'
                  )}
                  onClick={() => {
                    setTopicId(item.id);
                    setPage(0);
                  }}
                >
                  {item.title}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex w-full flex-col lg:w-9/12">
            <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
              {articleQuery.data?.payload.data.length <= 0 && (
                <p className="text-c-red-600">
                  Ooppss... Sorry, there are no articles on this topic yet.
                </p>
              )}
              {articleQuery.data?.payload.data.map(item => (
                <div
                  key={item.id}
                  className="group basis-1/2 bg-white text-c-gray-600 shadow hover:shadow-lg"
                >
                  <div className="relative h-[160px] w-full">
                    <Image
                      alt="kalkula image"
                      src={item.cover_image ? item.cover_image : '/images/dummy-article.png'}
                      style={{ objectFit: 'cover' }}
                      fill
                    />
                  </div>
                  <div className="flex flex-col p-6 lg:min-h-[300px]">
                    <p className="mb-2 font-archivo text-xl font-bold">{item.title}</p>
                    <p>{item.excerpt}</p>

                    <span className="mt-10 text-sm font-bold uppercase hover:cursor-pointer group-hover:text-red-600 lg:mt-auto">
                      <Link
                        href={`/blog/${item.id}`}
                        className="inline-flex items-center gap-2"
                        passHref
                      >
                        read more <RightArrowIcon classname="h-5 w-5" />
                      </Link>
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <Pagination
              containerClassName="pagination flex flex-wrap items-center gap-3 justify-center lg:self-end text-sm text-c-red-600"
              breakLabel="..."
              previousLabel="<"
              nextLabel=">"
              onPageChange={e => setPage(e.selected)}
              forcePage={page}
              pageRangeDisplayed={5}
              pageCount={articleQuery.data?.payload.total_pages}
              renderOnZeroPageCount={null}
              pageClassName="px-3 py-2 border border-c-gray-300 rounded-[5px] hover:bg-c-red-600 hover:text-white hover:cursor-pointer hover:border-c-red-600"
            />
          </div>
        </div>
      </Section>
    </LandingPageLayout>
  );
}
