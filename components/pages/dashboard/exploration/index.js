import EXPLORATION_LISTS from '@/constants/exploration-menus';
import clsx from 'clsx';
import Overview from '../exploration-content/overview';
import Link from 'next/link';
import useWatchScroll from '@/utils/hooks/use-watch-scroll';
import Variables from '../exploration-content/variables';
import Interactions from '../exploration-content/interactions';
import Correlations from '../exploration-content/correlations';
import MissingValues from '../exploration-content/missing-values';

const Exploration = () => {
  const { active: activeMenu, containerRef } = useWatchScroll({
    menuElements: '.exploration-sidebar',
  });

  return (
    <div className="relative flex h-full">
      <div className="w-[300px] flex-shrink-0 p-6">
        <div className="flex flex-col items-start gap-1">
          {explorationMenuItems.map(item => {
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
          })}
        </div>
      </div>
      <div
        ref={containerRef}
        className="absolute bottom-0 right-0 top-0 w-[calc(100%_-_300px)] overflow-y-auto pb-24"
      >
        {explorationMenuItems.map(item => {
          const Component = item.component;
          return <Component key={item.key} id={item.key} title={item.label} />;
        })}
      </div>
    </div>
  );
};

const explorationMenuItems = [
  {
    key: EXPLORATION_LISTS.OVERVIEW,
    label: 'Overview',
    component: Overview,
  },
  {
    key: EXPLORATION_LISTS.VARIABLES,
    label: 'Variables',
    component: Variables,
  },
  {
    key: EXPLORATION_LISTS.INTERACTIONS,
    label: 'Interactions',
    component: Interactions,
  },
  {
    key: EXPLORATION_LISTS.CORRELATIONS,
    label: 'Correlations',
    component: Correlations,
  },
  {
    key: EXPLORATION_LISTS.MISSING_VALUES,
    label: 'Missing Values',
    component: MissingValues,
  },
  // {
  //   key: EXPLORATION_LISTS.DUPLICATE_ROWS,
  //   label: 'Duplicate Rows',
  //   component: () => <div>Duplicate Rows</div>,
  // },
];

export default Exploration;
