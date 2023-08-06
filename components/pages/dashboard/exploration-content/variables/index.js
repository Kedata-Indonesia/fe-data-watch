import { Select } from '@/components/base/select';
import { useForm } from 'react-hook-form';
import { useEffect, useMemo, useState } from 'react';
import { Label } from '@/components/base/label';
import { Button } from '@/components/base/button';
import ExplorationSection from '@/components/shared/exploration-section';
import Tabs from '@/components/shared/tabs';
import DataSummaryTable from '@/components/shared/data-summary-table';
import { omit } from 'lodash/fp';
import VARIABLE_ITEMS from '@/constants/variables/variable-items';
import VARIABLE_DETAILS from '@/constants/variables/variable-details';
import VariableStatistic from './statistic';
import VariableHistogram from './histogram';
import VariableCategories from './categories';
import VariableOverview from './overview';
import VariableWords from './words';
import existDetailsVariable from '@/services/features/data-watch/helpers/exist-details-variable';
import {
  variableChartKeys,
  variableChartOptions,
} from '@/services/features/data-watch/helpers/variable-chart-options';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('@/components/base/chart').then(val => val.Chart), {
  ssr: false,
});

const Variables = ({ id, title, data }) => {
  const { control, setValue, watch } = useForm({
    defaultValues: {
      variables: 'sepal_length',
    },
  });

  const variablesWatch = watch('variables');

  const [showDetails, setShowDetails] = useState(false);
  const [activeTab, setActiveTab] = useState(null);

  const variableOptions = useMemo(() => {
    if (!data) return [];
    return Object.keys(data).map(key => ({ label: key, value: key }));
  }, [data]);

  useEffect(() => {
    setValue('variables', variableOptions[0].value);
  }, [setValue, variableOptions]);

  const variable = useMemo(() => {
    return {
      label: variablesWatch,
      ...(data?.[variablesWatch] ?? []),
    };
  }, [data, variablesWatch]);

  const variableLabels = useMemo(() => {
    const labels = omit(['type'], variable?.tags);

    return Object.keys(labels)?.filter(label => labels[label]);
  }, [variable?.tags]);

  const availableVariable = useMemo(() => {
    const exist = existDetailsVariable[data[variablesWatch]?.tags?.type] ?? {};

    return Object.keys(exist)?.map(key => ({ label: exist[key], key }));
  }, [data, variablesWatch]);

  const variableStat = useMemo(() => {
    const items = VARIABLE_ITEMS.filter(item => Object.keys(variable).includes(item.key)).map(
      item => ({
        ...item,
        value: variable[item.key],
      })
    );

    if (items?.length >= 7) {
      const split = Math.round(items.length / 2);
      return [items.slice(0, split), items.slice(split)];
    }
    return [items];
  }, [variable]);

  const DetailsComponent = useMemo(() => {
    return DETAILS_COMPONENTS[activeTab];
  }, [activeTab]);

  const chartOptions = useMemo(() => {
    const variableType = variable?.tags?.type;
    const dataKey = variableChartKeys[variableType];
    return variableChartOptions[variableType]?.(variable.details[dataKey]);
  }, [variable]);

  useEffect(() => {
    setActiveTab(availableVariable[0]?.key);
  }, [availableVariable]);

  return (
    <ExplorationSection
      id={id}
      renderTitle={
        <div className="flex items-center justify-between">
          <h1 className="text-[28px] font-bold">{title}</h1>
          <Select
            control={control}
            className="w-[300px] !mb-0"
            name="variables"
            options={variableOptions}
            clearable={false}
          />
        </div>
      }
    >
      <div className="p-5 border rounded-md border-gray-300 flex flex-col mt-5 gap-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-heading-3 font-bold mb-2">{variable?.label}</h3>
            <p className="text-gray-400">{variable?.tags?.type}</p>
          </div>
          {variableLabels?.map(label => (
            <Label key={label} variant="red" text={label} />
          ))}
        </div>
        <div className="flex gap-5">
          <div className="flex flex-grow rounded-md overflow-hidden">
            {variableStat.map((stat, idx) => (
              <DataSummaryTable key={`stat${idx}`} rootClassName="rounded-none" data={stat} />
            ))}
          </div>
          <div className="w-[45%] flex justify-center items-center">
            <Chart options={chartOptions} />
          </div>
        </div>
        {!showDetails ? (
          <div className="w-full flex justify-center">
            <Button type="outline" size="md" className="px-4" onClick={() => setShowDetails(true)}>
              More Details
            </Button>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-6">
              <Tabs
                items={availableVariable?.map(({ key, label }) => ({ key, label }))}
                itemClassName="capitalize w-auto p-[10px_32px]"
                activeItem={activeTab}
                onChange={item => setActiveTab(item.key)}
              />
              <Button
                type="outline"
                size="md"
                className="px-4"
                onClick={() => setShowDetails(false)}
              >
                Close
              </Button>
            </div>
            <DetailsComponent data={variable?.details[activeTab]} />
          </div>
        )}
      </div>
    </ExplorationSection>
  );
};

const DETAILS_COMPONENTS = {
  [VARIABLE_DETAILS.STATISTIC]: VariableStatistic,
  [VARIABLE_DETAILS.HISTOGRAM]: VariableHistogram,
  [VARIABLE_DETAILS.CATEGORIES]: VariableCategories,
  [VARIABLE_DETAILS.OVERVIEW]: VariableOverview,
  [VARIABLE_DETAILS.WORDS]: VariableWords,
};

export default Variables;
