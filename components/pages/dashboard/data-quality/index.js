import { DropdownMenu } from '@/components/base/dropdown-menu';
import AddIcon from '@/components/icons/addIcon';
import AddDataQualityModal from '../add-data-quality-modal';
import { useState } from 'react';
import useModal from '@/utils/hooks/use-modal';
import MoreIcon from '@/components/icons/MoreIcon';
import { Button } from '@/components/base/button';
import DataQualityContent from '../data-quality-content';
import ClipboardIcon from '@/components/icons/ClipboardIcon';

const DataQuality = ({ data, onAddRule }) => {
  const addDataQualityModal = useModal(false);
  const [modalData, setModalData] = useState(null);

  const rulesChangeHandler = menu => {
    addDataQualityModal.open();
    setModalData(menu);
  };

  return (
    <>
      <AddDataQualityModal
        isOpen={addDataQualityModal.isOpen}
        onClose={addDataQualityModal.close}
        data={modalData}
        onClick={data => onAddRule(data)}
      />
      <div className="relative flex h-full">
        <div className="w-[355px] border-r border-gray-300 bg-[#F5F6FA] p-6">
          <div className="mb-4 flex items-center justify-between">
            <p className="font-semibold text-gray-600">Data Quality Rule</p>
            <DropdownMenu
              menuWidth="190px"
              firstMenuClassName="!w-[190px]"
              menuChildWidth="auto"
              options={rulesOptions}
              placement="bottom-start"
              className="flex items-center"
              onChange={rulesChangeHandler}
              renderChild={({ containerRef, open, isOpen }) => {
                return (
                  <button
                    ref={containerRef}
                    onClick={open}
                    className={isOpen ? 'rounded-[4px] bg-[#EBEDF5] text-c-red-600' : ''}
                  >
                    <AddIcon />
                  </button>
                );
              }}
            />
          </div>
          {!data?.length ? (
            <p className="text-center text-sm italic text-gray-400">No rule added yet.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {data.map(({ rule, columns }) => (
                <div
                  key={rule.value}
                  className="rounded-[4px] border border-gray-300 bg-white px-[14px] py-2.5"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-sm font-bold text-gray-600">{rule.label}</p>
                    <MoreIcon />
                  </div>
                  <div className="text-xs text-gray-400">
                    Column <span className="font-bold">{columns?.join(', ')}</span> Must be{' '}
                    <span className="font-bold">Unique</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="absolute bottom-0 right-0 top-0 flex w-[calc(100%_-_355px)] flex-col gap-5 overflow-auto p-6">
          {data?.length ? (
            <DataQualityContent />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center">
              <div className="mb-5 rounded-full bg-gray-200 p-8">
                <ClipboardIcon />
              </div>
              <p className="text-gray-600">There is no data quality report created.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const rulesOptions = [
  {
    label: 'Completeness',
    value: 'completeness',
  },
  {
    label: 'Consistency',
    value: 'consistency',
  },
  {
    label: 'Uniqueness',
    value: 'uniqueness',
    options: [
      {
        label: 'One Column Unique',
        value: 'one-column-unique',
        className: 'w-[230px]',
      },
      {
        label: 'Multiple Column Unique',
        value: 'multiple-column-unique',
      },
    ],
  },
  {
    label: 'Validity',
    value: 'validity',
  },
  {
    label: 'Timeliness',
    value: 'timeliness',
  },
];

export default DataQuality;
