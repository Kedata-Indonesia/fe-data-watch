import ExplorationSection from '@/components/shared/exploration-section';
import Tabs from '@/components/shared/tabs';
import { useState } from 'react';

const TAB_ITEMS = /** @type {const} */ ({
  COUNT: 'count',
  MATRIX: 'matrix',
});

const MissingValues = ({ id, title }) => {
  const [activeTab, setActiveTab] = useState(TAB_ITEMS.COUNT);

  return (
    <ExplorationSection id={id} title={title}>
      <div className="mt-5 p-5 border border-gray-300 rounded-md">
        <div className="flex">
          <Tabs
            items={[
              { key: TAB_ITEMS.COUNT, label: 'Count' },
              { key: TAB_ITEMS.MATRIX, label: 'Matrix' },
            ]}
            itemClassName="capitalize w-auto p-[10px_32px]"
            activeItem={activeTab}
            onChange={item => setActiveTab(item.key)}
          />
        </div>
        <div className="h-[400px] w-full flex justify-center items-center">CONTENT CHART</div>
      </div>
    </ExplorationSection>
  );
};

export default MissingValues;
