import { Button } from '@/components/base/button';
import { Modal } from '@/components/base/modal';
import { Select } from '@/components/base/select';
import StringTextIcon from '@/components/icons/StringTextIcon';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';

const AddDataQualityModal = ({ isOpen, onClose, data: originData, columns = [], onClick }) => {
  const { control, resetField, handleSubmit } = useForm({
    defaultValues: {
      columns: undefined,
    },
  });

  const columnsData = useMemo(() => {
    return (columns || []).map(column => ({
      label: column.label || column.value || column,
      value: column.value || column.label || column,
      icon: StringTextIcon,
    }));
  }, [columns]);

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
