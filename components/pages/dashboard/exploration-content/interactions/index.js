import { Button } from '@/components/base/button';
import { Select } from '@/components/base/select';
import ExplorationSection from '@/components/shared/exploration-section';
import { useForm } from 'react-hook-form';

const Interactions = ({ id, title }) => {
  const { control } = useForm({
    defaultValues: {
      xAxis: 'sepal_length',
      yAxis: 'petal_width',
    },
  });

  return (
    <ExplorationSection id={id} title={title}>
      <div className="mt-5 p-5 border border-gray-300 rounded-md">
        <div className="flex items-center gap-5">
          <Select
            label="X Axis"
            className="flex-1"
            control={control}
            name="xAxis"
            options={[{ label: 'sepal_length', value: 'sepal_length' }]}
            clearable={false}
          />
          <Select
            label="Y Axis"
            className="flex-1"
            control={control}
            name="yAxis"
            options={[{ label: 'petal_width', value: 'petal_width' }]}
            clearable={false}
          />
          <Button size="md" className="px-4 mt-4">
            Filter Data
          </Button>
        </div>
        <div className="h-[400px] w-full flex justify-center items-center border border-gray-200">
          Chart
        </div>
      </div>
    </ExplorationSection>
  );
};

export default Interactions;
