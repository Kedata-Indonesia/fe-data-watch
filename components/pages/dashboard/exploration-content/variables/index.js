import { Select } from '@/components/base/select';
import { useForm } from 'react-hook-form';
import { useEffect, useMemo } from 'react';
import { Label } from '@/components/base/label';
import ExplorationSection from '@/components/shared/exploration-section';
import DataSummaryTable from '@/components/shared/data-summary-table';
import { omit } from 'lodash/fp';
import VARIABLE_ITEMS from '@/constants/variables/variable-items';
import {
  variableChartKeys,
  variableChartOptions,
} from '@/services/features/data-watch/helpers/variable-chart-options';
import dynamic from 'next/dynamic';
import VariableDetails from './variable-details';
import VARIABLE_TYPES from '@/constants/variables/variable-types';
import clsx from 'clsx';

const Chart = dynamic(() => import('@/components/base/chart').then(val => val.Chart), {
  ssr: false,
});

const Variables = ({ id, title, data }) => {
  const { control, setValue, watch } = useForm({
    defaultValues: {
      variables: '',
    },
  });

  const variablesWatch = watch('variables');

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

  const chartOptions = useMemo(() => {
    const variableType = variable?.tags?.type;
    const dataKey = variableChartKeys[variableType];

    if (!dataKey || dataKey?.length < 1) return {};

    let optionsData = variable;
    for (let i = 0; i < dataKey?.length; i++) {
      const objKey = dataKey[i];

      if (optionsData.hasOwnProperty(objKey)) {
        optionsData = optionsData[objKey];
      }
    }

    return variableChartOptions[variableType]?.(optionsData);
  }, [variable]);

  const isSupported = variable?.tags?.type !== VARIABLE_TYPES.UNSUPPORTED;

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
      <div
        className={clsx(
          'p-5 border rounded-md border-gray-300 flex flex-col mt-5 gap-5',
          !isSupported && 'opacity-50'
        )}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className={clsx('text-heading-3 font-bold mb-2', !isSupported && 'line-through')}>
              {variable?.label}
            </h3>
            <p className={clsx('text-gray-400', !isSupported && 'line-through')}>
              {variable?.tags?.type}
            </p>
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
            {isSupported && <Chart options={chartOptions} />}
          </div>
        </div>
        {isSupported && <VariableDetails variable={variable} />}
      </div>
    </ExplorationSection>
  );
};

export default Variables;
