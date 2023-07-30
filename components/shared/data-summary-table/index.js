import clsx from 'clsx';

/**
 * @param {DataSummaryTableProps} props
 */
const DataSummaryTable = ({
  data = [],
  labelClassName = '',
  valueClassName = '',
  rootClassName = '',
}) => {
  return (
    <div
      className={clsx(
        'flex flex-col w-full [&_div:nth-child(odd)]:bg-background rounded-md overflow-hidden',
        rootClassName
      )}
    >
      {data?.map((item, idx) => (
        <div
          key={item?.key || `${item?.label}${idx}`}
          className="flex justify-between p-4 border-b border-b-gray-300"
        >
          <p className={clsx('font-bold', labelClassName)}>{item?.label}</p>
          <span className={valueClassName}>{item.value}</span>
        </div>
      ))}
    </div>
  );
};

export default DataSummaryTable;

/**
 * @typedef DataSummaryTableProps
 * @property {DataSummaryTableData[]} data
 * @property {string} labelClassName
 * @property {string} valueClassName
 * @property {string} rootClassName
 */

/**
 * @typedef DataSummaryTableData
 * @property {string} key
 * @property {string} label
 * @property {string} value
 */
