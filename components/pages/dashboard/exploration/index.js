import EXPLORATION_LISTS from '@/constants/exploration-menus';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import BasicStatistic from '../exploration-content/basic-statistic';

const Exploration = () => {
  const [activeParent, setActiveParent] = useState(EXPLORATION_LISTS.BASIC_STATISTIC);
  const [activeMenu, setActiveMenu] = useState(EXPLORATION_LISTS.BASIC_STATISTIC);

  const menuClickHandler = (parent, menu) => {
    setActiveParent(parent);
    setActiveMenu(menu);
  };

  useEffect(() => {
    if (!window || !activeMenu) return;
    document.querySelector(`#${activeMenu}`)?.scrollIntoView({ behavior: 'smooth' });
  }, [activeMenu]);

  return (
    <div className="relative flex h-full">
      <div className="w-[300px] flex-shrink-0 p-6">
        <div className="flex flex-col items-start gap-1">
          {explorationMenuItems.map(item => {
            return (
              <div key={item.key} className="flex w-full flex-col gap-1">
                <SidebarButton
                  label={item.label}
                  active={activeMenu === item.key}
                  onClick={() => menuClickHandler(item.key, item.key)}
                />
                {item?.items?.map(subItem => (
                  <SidebarButton
                    key={subItem.key}
                    label={subItem.label}
                    active={activeMenu === subItem.key}
                    onClick={() => menuClickHandler(item.key, subItem.key)}
                    className="pl-10"
                  />
                ))}
              </div>
            );
          })}
        </div>
      </div>
      <div className="absolute bottom-0 right-0 top-0 w-[calc(100%_-_300px)] overflow-y-auto">
        {activeParent === EXPLORATION_LISTS.BASIC_STATISTIC && <BasicStatistic />}
      </div>
    </div>
  );
};

const SidebarButton = ({ active = false, label, onClick, className }) => {
  return (
    <button
      className={clsx(
        'w-full rounded-[4px] px-4 py-2 text-left text-gray-400 transition-all duration-150',
        active && 'bg-c-red-50 font-semibold !text-c-red-600',
        className
      )}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

const explorationMenuItems = [
  {
    key: EXPLORATION_LISTS.BASIC_STATISTIC,
    label: 'Basic Statistic',
    items: [
      {
        key: EXPLORATION_LISTS.ROW_COUNTS,
        label: 'Row Counts',
      },
      {
        key: EXPLORATION_LISTS.PERCENTAGES,
        label: 'Percentages',
      },
    ],
  },
  {
    key: EXPLORATION_LISTS.MISSING_DATA_PROFILES,
    label: 'Missing Data Profiles',
  },
  {
    key: EXPLORATION_LISTS.UNIVARIATE_DISTRIBUTION,
    label: 'Univariate Distribution',
    items: [
      {
        key: EXPLORATION_LISTS.HISTOGRAM,
        label: 'Histogram',
      },
      {
        key: EXPLORATION_LISTS.BAR_CHART,
        label: 'Bar Chart (with frequency)',
      },
      {
        key: EXPLORATION_LISTS.QQ_PLOT,
        label: 'QQ Plot',
      },
    ],
  },
  {
    key: EXPLORATION_LISTS.CORRELATION_ANALYSIS,
    label: 'Correlation Analysis',
  },
  {
    key: EXPLORATION_LISTS.PRONCIPAL_COMPONENT_ANALYSIS,
    label: 'Principal Component Analysis',
  },
];

export default Exploration;
