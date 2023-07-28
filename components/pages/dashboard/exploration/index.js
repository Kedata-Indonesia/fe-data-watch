import EXPLORATION_LISTS from '@/constants/exploration-menus';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import Overview from '../exploration-content/overview';

const Exploration = () => {
  const [activeParent, setActiveParent] = useState(EXPLORATION_LISTS.OVERVIEW);
  const [activeMenu, setActiveMenu] = useState(EXPLORATION_LISTS.OVERVIEW);

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
        {activeParent === EXPLORATION_LISTS.OVERVIEW && <Overview />}
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
    key: EXPLORATION_LISTS.OVERVIEW,
    label: 'Overview',
  },
  {
    key: EXPLORATION_LISTS.VARIABLES,
    label: 'Variables',
  },
  {
    key: EXPLORATION_LISTS.INTERACTIONS,
    label: 'Interactions',
  },
  {
    key: EXPLORATION_LISTS.CORRELATION,
    label: 'Correlation',
  },
  {
    key: EXPLORATION_LISTS.MISSING_VALUES,
    label: 'Missing Values',
  },
  {
    key: EXPLORATION_LISTS.DUPLICATE_ROWS,
    label: 'Duplicate Rows',
  },
];

export default Exploration;
