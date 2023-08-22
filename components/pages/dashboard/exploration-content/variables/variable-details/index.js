import { Button } from '@/components/base/button';
import Tabs from '@/components/shared/tabs';
import VARIABLE_DETAILS from '@/constants/variables/variable-details';
import { useEffect, useMemo, useState } from 'react';
import existDetailsVariable from '@/services/features/data-watch/helpers/exist-details-variable';
import VariableStatistic from './statistic';
import VariableHistogram from './histogram';
import VariableCategories from './categories';
import VariableOverview from './overview';
import CommonValues from './common-values';
import VariableWords from './words';

const VariableDetails = ({ variable }) => {
  const [activeTab, setActiveTab] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const detailLists = useMemo(() => {
    const exist = existDetailsVariable[variable?.tags?.type] ?? {};

    return Object.keys(exist)?.map(key => ({ label: exist[key], key }));
  }, [variable?.tags?.type]);

  useEffect(() => {
    setActiveTab(detailLists[0]?.key);
  }, [detailLists]);

  const DetailsComponent = useMemo(() => {
    return DETAILS_COMPONENTS[activeTab];
  }, [activeTab]);

  const detailComponentData = useMemo(() => {
    return variable?.details?.[activeTab] ?? null;
  }, [variable?.details, activeTab]);

  if (!isOpen) {
    return (
      <div className="w-full flex justify-center">
        <Button type="outline" size="md" className="px-4" onClick={() => setIsOpen(true)}>
          More Details
        </Button>
      </div>
    );
  }
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <Tabs
          items={detailLists?.map(({ key, label }) => ({ key, label }))}
          itemClassName="capitalize w-auto p-[10px_32px]"
          activeItem={activeTab}
          onChange={item => setActiveTab(item.key)}
        />
        <Button type="outline" size="md" className="px-4" onClick={() => setIsOpen(false)}>
          Close
        </Button>
      </div>
      <DetailsComponent data={detailComponentData} />
    </div>
  );
};

const DETAILS_COMPONENTS = {
  [VARIABLE_DETAILS.STATISTIC]: VariableStatistic,
  [VARIABLE_DETAILS.HISTOGRAM]: VariableHistogram,
  [VARIABLE_DETAILS.CATEGORIES]: VariableCategories,
  [VARIABLE_DETAILS.OVERVIEW]: VariableOverview,
  [VARIABLE_DETAILS.COMMON_VALUES]: CommonValues,
  [VARIABLE_DETAILS.WORDS]: VariableWords,
};

export default VariableDetails;
