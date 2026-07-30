import { Skeleton } from '@/components/base/skeleton';
import EXPLORATION_LISTS from '@/constants/exploration-lists';
import useWatchScroll from '@/utils/hooks/use-watch-scroll';
import clsx from 'clsx';
import Link from 'next/link';

const ExplorationSidebar = ({ items = [], isLoading = false, container }) => {
  const { active: activeMenu } = useWatchScroll({
    menuElements: '.exploration-sidebar',
    defaultActive: EXPLORATION_LISTS.OVERVIEW,
    customContainerRef: container,
  });

  return (
    <div className="w-[300px] flex-shrink-0 p-6">
      <div className="flex flex-col items-start gap-1">
        {isLoading ? (
          <Skeleton.ExplorationSidebar />
        ) : (
          items.map(item => {
            return (
              <div key={item.key} className="flex w-full flex-col gap-1">
                <Link
                  href={`#${item.key}`}
                  className={clsx(
                    'exploration-sidebar w-full rounded-[4px] px-4 py-2 text-left text-gray-400 transition-all duration-300',
                    activeMenu === item.key && 'bg-c-red-50 font-semibold !text-c-red-600'
                  )}
                >
                  {item.label}
                </Link>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ExplorationSidebar;
