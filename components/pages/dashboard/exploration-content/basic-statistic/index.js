import EXPLORATION_LISTS from '@/constants/exploration-menus';
import SectionBox from '../section-box';
import clsx from 'clsx';

const BasicStatistic = () => {
  return (
    <div id={EXPLORATION_LISTS.BASIC_STATISTIC} className="p-6 text-gray-600">
      <h1 className="text-[28px] font-bold">Basic Statistic</h1>
      {/* Row Count */}
      <SectionBox
        id={EXPLORATION_LISTS.ROW_COUNTS}
        title="Row Counts"
        className="grid grid-cols-4 gap-5"
      >
        {rowCountsData.map(({ label, value }) => (
          <div key={label} className="rounded-md bg-[#F5F6FA] px-6 py-5">
            <p className="text-sm font-bold text-gray-400">{label}</p>
            <h3 className="mt-1 text-[40px] font-bold">{value}</h3>
          </div>
        ))}
      </SectionBox>
      {/* Percentages */}
      <SectionBox
        id={EXPLORATION_LISTS.PERCENTAGES}
        title="Percentages"
        className="flex flex-col gap-5 bg-[#F5F6FA] p-6"
      >
        {rowCountsData.map(({ label, value }) => {
          const percentage = ((value / 50000) * 100).toFixed(0);

          return (
            <div className="flex items-center gap-5">
              <p className="w-[170px] flex-shrink-0 text-right">{label}</p>
              <div className="relative flex h-6 w-full overflow-hidden rounded-full bg-gray-200">
                <div
                  className="absolute left-0 top-0 flex h-full items-center bg-c-red-600"
                  style={{ width: `${percentage}%` }}
                >
                  <p
                    className={clsx('w-full px-2 text-right text-[10px] font-bold text-white', [
                      percentage < 2 && '!text-gray-600',
                    ])}
                  >
                    {percentage}%
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </SectionBox>
    </div>
  );
};

const rowCountsData = [
  {
    label: 'Total Rows',
    value: 3755,
  },
  {
    label: 'Total Columns',
    value: 11,
  },
  {
    label: 'Discrete Columns',
    value: 7,
  },
  {
    label: 'Continuous Columns',
    value: 4,
  },
  {
    label: 'All Missing Columns',
    value: 0,
  },
  {
    label: 'Missing Observations',
    value: 0,
  },
  {
    label: 'Complete Rows',
    value: 3755,
  },
  {
    label: 'Total Observations',
    value: 41305,
  },
];

export default BasicStatistic;
