import { Select } from '@/components/base/select';
import { useForm } from 'react-hook-form';
import { useEffect, useMemo, useState } from 'react';
import { Label } from '@/components/base/label';
import { Button } from '@/components/base/button';
import ExplorationSection from '@/components/shared/exploration-section';
import Tabs from '@/components/shared/tabs';
import DataSummaryTable from '@/components/shared/data-summary-table';
import { omit } from 'lodash/fp';
import numberFormat from '@/utils/number-format';
import percentage from '@/utils/percentage';

const VARIABLE_ITEMS = /** @type {const} */ ({
  STATISTIC: 'statistic',
  HISTOGRAM: 'histogram',
  COMMON_VALUES: 'common values',
  EXTREME_VALUES: 'extreme values',
});

const Variables = ({ id, title, data }) => {
  const { control, setValue, watch } = useForm({
    defaultValues: {
      variables: 'sepal_length',
    },
  });

  const variablesWatch = watch('variables');

  const [showDetails, setShowDetails] = useState(false);
  const [activeTab, setActiveTab] = useState(VARIABLE_ITEMS.STATISTIC);
  // const [currentData, setCurrentData] = useState(null);

  const variableOptions = useMemo(() => {
    if (!data) return [];
    return Object.keys(data).map(key => ({ label: key, value: key }));
  }, [data]);

  useEffect(() => {
    if (variableOptions && !variableOptions.length) return;
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
          <div className="flex flex-grow">
            <DataSummaryTable
              rootClassName="rounded-r-none"
              data={[
                { label: 'Distinct', value: variable?.n_distinct },
                { label: 'Distinct Percentage', value: percentage(variable?.p_distinct) },
                { label: 'Missing', value: variable?.n_missing },
                { label: 'Missing Percentage', value: percentage(variable?.p_missing) },
                { label: 'Infinite', value: variable?.n_infinite },
                { label: 'Infinite Percentage', value: percentage(variable?.p_infinite) },
                { label: 'Mean', value: variable?.mean },
              ]}
            />
            <DataSummaryTable
              rootClassName="rounded-l-none"
              data={[
                { label: 'Minimum', value: variable?.minimum },
                { label: 'Maximum', value: variable?.maximum },
                { label: 'Zeros', value: variable?.n_zeros },
                { label: 'Zeros Percentage', value: percentage(variable?.p_zeros) },
                { label: 'Negative', value: variable?.n_negative },
                { label: 'Negative Percentage', value: percentage(variable?.p_negative) },
                { label: 'Memory Size', value: variable?.memory_size + ' KiB' },
              ]}
            />
          </div>
          <div className="w-[45%] flex justify-center items-center">chart</div>
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
                items={[
                  { key: VARIABLE_ITEMS.STATISTIC, label: 'Statistic' },
                  { key: VARIABLE_ITEMS.HISTOGRAM, label: 'Histogram' },
                  { key: VARIABLE_ITEMS.COMMON_VALUES, label: 'Common Values' },
                  { key: VARIABLE_ITEMS.EXTREME_VALUES, label: 'Extreme Values' },
                ]}
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
            <div className="flex gap-6">
              <div className="flex-1">
                <h3 className="uppercase text-gray-400 font-bold py-3 px-4">quantile statistic</h3>
                <DataSummaryTable
                  rootClassName="rounded-none"
                  data={[
                    { label: 'Minimum', value: '150' },
                    { label: '5-th Percentile', value: '23' },
                    { label: 'Q1', value: '3.4' },
                    { label: 'Median', value: '22' },
                    { label: 'Q3', value: '5.84' },
                    { label: '95-th Percentile', value: '5.84' },
                    { label: 'Maximum', value: '5.84' },
                    { label: 'Range', value: '5.84' },
                    { label: 'Interquartile Range', value: '5.84' },
                  ]}
                />
              </div>
              <div className="flex-1">
                <h3 className="uppercase text-gray-400 font-bold py-3 px-4">
                  descriptiove statistic
                </h3>
                <DataSummaryTable
                  rootClassName="rounded-none"
                  data={[
                    { label: 'Standard Deviation', value: '150' },
                    { label: 'Coefficient of Variation (CV)', value: '23' },
                    { label: 'Kurtosis ', value: '3.4' },
                    { label: 'Mean', value: '22' },
                    { label: 'Median Absolute Deviation (MAD)', value: '5.84' },
                    { label: 'Skewness', value: '5.84' },
                    { label: 'Sum', value: '5.84' },
                    { label: 'Variance', value: '5.84' },
                    { label: 'Monotonicity', value: '333.3' },
                  ]}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </ExplorationSection>
  );
};

export default Variables;
