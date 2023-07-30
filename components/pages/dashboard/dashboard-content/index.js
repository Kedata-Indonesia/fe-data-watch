import { Button } from '@/components/base/button';
import DotSeparator from '@/components/base/dot-separator';
import { UploadIcon } from '@/components/icons';
import TableIcon from '@/components/icons/TableIcon';
import Tabs from '@/components/shared/tabs';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const SourceTable = dynamic(() => import('@/components/pages/dashboard/source-table'), {
  ssr: false,
});
const Exploration = dynamic(() => import('@/components/pages/dashboard/exploration'), {
  ssr: false,
});
const DataQuality = dynamic(() => import('@/components/pages/dashboard/data-quality'), {
  ssr: false,
});

const TAB_MENU = /** @type {const} */ ({
  TABLE: 'table',
  EXPLORATION: 'exploration',
  DATA_QUALITY: 'data-quality',
});

const DashboardContent = ({ onChangeFile }) => {
  const [activeTab, setActiveTab] = useState(TAB_MENU.EXPLORATION);
  const [dataQuality, setDataQuality] = useState([]);

  return (
    <div className="absolute inset-0 mb-auto flex w-full flex-col">
      <div className="flex w-full items-center justify-between border-b border-b-gray-300 px-5 py-4">
        <div className="flex items-center gap-2.5 text-gray-600">
          <TableIcon />
          <div className="flex flex-col">
            <h3 className="text-xl font-bold">data_tabel</h3>
            <div className="flex items-center gap-1 text-sm text-gray-400">
              <div>
                Type: <span className="font-bold">CSV</span>
              </div>
              <DotSeparator />
              <div>
                Size: <span className="font-bold">456KB</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Tabs
            items={[
              { key: TAB_MENU.TABLE, label: 'Table' },
              { key: TAB_MENU.EXPLORATION, label: 'Exploration' },
              { key: TAB_MENU.DATA_QUALITY, label: 'Data Quality' },
            ]}
            activeItem={activeTab}
            onChange={({ key }) => {
              setActiveTab(key);
            }}
          />
          <div className="mx-4 h-[42px] w-[1px] bg-gray-300" />
          <div className="relative border-l-gray-300">
            <Button IconStart={<UploadIcon className="h-5 w-5" />} size="md" className="!px-4">
              New File
              <input
                type="file"
                className="absolute left-0 top-0 h-full w-full opacity-0 "
                onChange={e => {
                  if (e.target.files && e.target.files?.length > 0) {
                    onChangeFile(e.target.files[0]);
                  }
                }}
              />
            </Button>
          </div>
        </div>
      </div>
      {activeTab === TAB_MENU.TABLE && <SourceTable />}
      {activeTab === TAB_MENU.EXPLORATION && <Exploration />}
      {activeTab === TAB_MENU.DATA_QUALITY && (
        <DataQuality
          data={dataQuality}
          onAddRule={rule => {
            setDataQuality(prev => [...prev, rule]);
          }}
        />
      )}
    </div>
  );
};

export default DashboardContent;
