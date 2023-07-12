import { Button } from '@/components/base/button';
import { Modal } from '@/components/base/modal';
import { Select } from '@/components/base/select';
import { TextField } from '@/components/base/text-field';
import CalendarIcon from '@/components/icons/CalendarIcon';
import StringIntegerIcon from '@/components/icons/StringIntegerIcon';
import StringTextIcon from '@/components/icons/StringTextIcon';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

const AddDataQualityModal = ({ isOpen, onClose, data: originData, onClick }) => {
  const { control, resetField, handleSubmit } = useForm({
    defaultValues: {
      columns: undefined,
    },
  });

  const columnsData = useMemo(() => {
    return [
      {
        label: 'id',
        value: 'id',
        icon: StringIntegerIcon,
      },
      {
        label: 'Category',
        value: 'category',
        icon: StringTextIcon,
      },
      {
        label: 'Material',
        value: 'material',
        icon: StringTextIcon,
      },
      {
        label: 'Date',
        value: 'date',
        icon: CalendarIcon,
      },
    ];
  }, []);

  const close = () => {
    resetField('columns');
    onClose();
  };

  return (
    <Modal
      id="data-quality-modal"
      open={isOpen}
      onClose={onClose}
      title={originData?.label}
      className="!w-120"
      footer={
        <div className="flex justify-end gap-2.5">
          <Button size="sm" className="px-4" type="outline" onClick={close}>
            Cancel
          </Button>
          <Button
            size="sm"
            className="px-4"
            onClick={handleSubmit(data => {
              onClick({ rule: originData, columns: data.columns });
              close();
            })}
          >
            Add Rule
          </Button>
        </div>
      }
      withHeader
    >
      <div>
        <Select
          control={control}
          name="columns"
          label="Columns"
          placeholder="Select column"
          options={columnsData}
          fullWidth
          multi
        />
      </div>
    </Modal>
  );
};

export default AddDataQualityModal;
