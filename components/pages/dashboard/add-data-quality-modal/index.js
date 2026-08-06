import { Button } from '@/components/base/button';
import { Modal } from '@/components/base/modal';
import { Select } from '@/components/base/select';
import { TextField } from '@/components/base/text-field';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { COLUMN_PARAM_NAMES } from '../data-quality/constants';

const NAMED_FORMAT_OPTIONS = [
  { label: 'Email', value: 'email' },
  { label: 'Phone', value: 'phone' },
  { label: 'UUID', value: 'uuid' },
  { label: 'ISO date', value: 'iso_date' },
];

const BOOLEAN_OPTIONS = [
  { label: 'True', value: true },
  { label: 'False', value: false },
];

const normalizeParamValue = (field, value) => {
  if (value === undefined || value === null || value === '') return undefined;
  if (field?.type === 'number') return Number(value);
  if (field?.type === 'array') {
    if (Array.isArray(value)) return value;
    return String(value)
      .split(',')
      .map(item => item.trim())
      .filter(Boolean);
  }
  if (field?.type === 'boolean') return value === true || value === 'true';
  return value;
};

const AddDataQualityModal = ({ isOpen, onClose, data, columns = [], onClick }) => {
  const { control, resetField, handleSubmit } = useForm();

  const columnOptions = useMemo(
    () => columns.map(column => ({ label: column, value: column })),
    [columns]
  );

  const schema = data?.parameters_schema || [];
  const columnFields = schema.filter(field => COLUMN_PARAM_NAMES.includes(field.name));
  const paramFields = schema.filter(field => !COLUMN_PARAM_NAMES.includes(field.name));

  const isSingleColumn = columnFields.some(field => ['column', 'date_column'].includes(field.name));

  const close = () => {
    resetField('columns');
    paramFields.forEach(field => resetField(`parameters.${field.name}`));
    onClose();
  };

  const submit = handleSubmit(formValues => {
    const columnValue = formValues?.columns || [];
    const parameters = {};
    paramFields.forEach(field => {
      const value = normalizeParamValue(field, formValues?.parameters?.[field.name]);
      if (value !== undefined) parameters[field.name] = value;
    });

    onClick({
      rule_key: data?.metric,
      columns: isSingleColumn ? [].concat(columnValue).filter(Boolean) : columnValue,
      parameters,
    });
    close();
  });

  const columnField = columnFields[0];

  return (
    <Modal
      id="dq-rule-modal"
      open={isOpen}
      onClose={onClose}
      title={data?.label || 'Add rule'}
      className="!w-120"
      withHeader
      footer={
        <div className="flex justify-end gap-2.5">
          <Button size="sm" className="px-4" type="outline" onClick={close}>
            Cancel
          </Button>
          <Button size="sm" className="px-4" onClick={submit}>
            Add Rule
          </Button>
        </div>
      }
    >
      <div>
        {columnField && (
          <Select
            control={control}
            name="columns"
            label={columnField.name === 'date_column' ? 'Date column' : 'Columns'}
            placeholder={isSingleColumn ? 'Select column' : 'Select column(s)'}
            options={columnOptions}
            fullWidth
            multi={!isSingleColumn}
          />
        )}
        {paramFields.map(field => {
          if (field.name === 'named_format') {
            return (
              <Select
                key={field.name}
                control={control}
                name={`parameters.${field.name}`}
                label="Format"
                placeholder="Select format"
                options={NAMED_FORMAT_OPTIONS}
                fullWidth
              />
            );
          }
          if (field.type === 'boolean') {
            return (
              <Select
                key={field.name}
                control={control}
                name={`parameters.${field.name}`}
                label={field.name}
                options={BOOLEAN_OPTIONS}
                fullWidth
              />
            );
          }
          return (
            <TextField
              key={field.name}
              className="w-full"
              control={control}
              name={`parameters.${field.name}`}
              label={field.name}
              placeholder={field.description || field.name}
              type={field.type === 'number' ? 'number' : 'text'}
            />
          );
        })}
        {data?.description ? (
          <p className="mt-2 text-xs text-gray-400">{data.description}</p>
        ) : null}
      </div>
    </Modal>
  );
};

export default AddDataQualityModal;
