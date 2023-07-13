import Image from 'next/image';
import { Button } from '@/components/base/button';
import { RightArrowIcon } from '@/components/icons';
import useGetArticles from '@/services/features/blog/hooks/use-get-articles';
import Link from 'next/link';

const BlogSection = () => {
  const articleQuery = useGetArticles({ page: 1, limit: 3 });

  return (
    <div className="flex flex-col py-16 md:py-28">
      <div className="mb-5 w-full flex-col text-center lg:mb-14">
        <h2 className="mb-4 font-archivo text-xl font-bold md:text-[28px]">
          Empowering Data Analysis with Freedom: Unleash Quality Insights
        </h2>
        <p className="text-[10px] md:text-base">
          Harness the Potential of Data Analysis with Our Free Tools: Discover Valuable Insights to
          Drive Growth and Success
        </p>
      </div>
      <div className="mb-14 flex flex-col gap-5 lg:flex-row">
        {articleQuery.data?.payload.data.map(item => (
          <Link key={item.id} href={`/blog/${item.id}`} passHref>
            <div className="basis-1/3 bg-white shadow hover:cursor-pointer hover:shadow-lg">
              <div className="relative h-[160px] w-full">
                <Image
                  alt="kalkula image"
                  src={item.cover_image ? item.cover_image : '/images/dummy-article.png'}
                  style={{ objectFit: 'cover' }}
                  fill
                />
              </div>
              <p className="p-6 font-archivo font-bold">{item.title}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="relative mx-auto">
        <Link href="/blog" passHref>
          <Button className="!px-12 font-bold" IconEnd={<RightArrowIcon classname="h-5 w-5" />}>
            Read More
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default BlogSection;
