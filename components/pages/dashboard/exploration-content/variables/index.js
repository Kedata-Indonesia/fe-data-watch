import { Select } from '@/components/base/select';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Label } from '@/components/base/label';
import { Button } from '@/components/base/button';
import ExplorationSection from '@/components/shared/exploration-section';
import Tabs from '@/components/shared/tabs';
import DataSummaryTable from '@/components/shared/data-summary-table';

const VARIABLE_ITEMS = /** @type {const} */ ({
  STATISTIC: 'statistic',
  HISTOGRAM: 'histogram',
  COMMON_VALUES: 'common values',
  EXTREME_VALUES: 'extreme values',
});

const Variables = ({ id, title }) => {
  const { control } = useForm({
    defaultValues: {
      variables: 'sepal_length',
    },
  });

  const [showDetails, setShowDetails] = useState(false);
  const [activeTab, setActiveTab] = useState(VARIABLE_ITEMS.STATISTIC);

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
            options={[{ label: 'sepal_length', value: 'sepal_length' }]}
            clearable={false}
          />
        </div>
      }
    >
      <div className="p-5 border rounded-md border-gray-300 flex flex-col mt-5 gap-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-heading-3 font-bold mb-2">sepal_length</h3>
            <p className="text-gray-400">Real Number (R)</p>
          </div>
          <Label variant="red" text="high correlation" />
        </div>
        <div className="flex gap-5">
          <div className="flex flex-grow">
            <DataSummaryTable
              rootClassName="rounded-r-none"
              data={[
                { label: 'Distinct', value: '150' },
                { label: 'Distinct Percentage', value: '23' },
                { label: 'Missing', value: '32' },
                { label: 'Missing Percentage', value: '22' },
                { label: 'Infinite', value: '5.84' },
                { label: 'Infinite Percentage', value: '5.84' },
                { label: 'Mean', value: '5.84' },
              ]}
            />
            <DataSummaryTable
              rootClassName="rounded-l-none"
              data={[
                { label: 'Minimum', value: '150' },
                { label: 'Maximum', value: '23' },
                { label: 'Zeros', value: '32' },
                { label: 'Zeros Percentage', value: '22' },
                { label: 'Negative', value: '5.84' },
                { label: 'Negative Percentage', value: '5.84' },
                { label: 'Memory Size', value: '5.84' },
              ]}
            />
          </div>
          <div className="w-[45%]">chart</div>
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
