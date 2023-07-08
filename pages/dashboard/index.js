import { Button } from '@/components/base/button';
import DotSeparator from '@/components/base/dot-separator';
import { UploadIcon } from '@/components/icons';
import TableIcon from '@/components/icons/TableIcon';
import { DashboardLayout } from '@/components/layouts';
import DataUpload from '@/components/pages/dashboard/data-upload';
import clsx from 'clsx';
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

const TAB_MENU = {
  TABLE: 'table',
  EXPLORATION: 'exploration',
  DATA_QUALITY: 'data-quality',
};

const DashboardPage = () => {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState(TAB_MENU.EXPLORATION);

  return (
    <>
      {!data && (
        <DataUpload
          onSuccess={() => {
            setData('sds');
          }}
        />
      )}
      {data && (
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
              <MenuTab
                tabs={[
                  { key: TAB_MENU.TABLE, label: 'Table' },
                  { key: TAB_MENU.EXPLORATION, label: 'Exploration' },
                  { key: TAB_MENU.DATA_QUALITY, label: 'Data Quality' },
                ]}
                activeTab={activeTab}
                onClick={key => {
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
                        setFile(e.target.files[0]);
                      }
                    }}
                  />
                </Button>
              </div>
            </div>
          </div>
          {activeTab === TAB_MENU.TABLE && <SourceTable />}
          {activeTab === TAB_MENU.EXPLORATION && <Exploration />}
          {activeTab === TAB_MENU.DATA_QUALITY && <DataQuality />}
        </div>
      )}
    </>
  );
};

const MenuTab = ({ tabs, activeTab, onClick }) => {
  return (
    <div
      className={clsx(
        'rounded-[4px] border border-gray-300',
        '[&_button:not(:last-child)]:border-r [&_button:not(:last-child)]:border-r-gray-300'
      )}
    >
      {tabs.map((tab, index) => (
        <button
          key={tab.key}
          className={clsx('w-[139px] p-2.5 text-gray-400', activeTab === tab.key && 'text-red-600')}
          onClick={() => onClick(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

DashboardPage.getLayout = page => <DashboardLayout>{page}</DashboardLayout>;

export default DashboardPage;
