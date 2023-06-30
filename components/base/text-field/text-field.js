import { useController } from 'react-hook-form';
import clsx from 'clsx';

const ErrorMessageLabel = ({ children = '' }) => (
  <p className="mt-1.5 text-xs text-c-red-600">{children}</p>
);

const TextField = ({
  className = '',
  name = '',
  label = '',
  placeholder = '',
  control = null,
  rules = {},
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <section className={clsx('mb-4', className)}>
      <label htmlFor={name}>
        <div className="mb-2 font-bold uppercase">{label}</div>
        <input
          {...field}
          // name={name}
          type="text"
          className="block min-h-[42px] w-full rounded-md border border-c-gray-300 bg-white pl-4 placeholder:text-c-gray-300 focus:!border-c-red-600 focus:!ring-1 focus:!ring-c-red-600"
          placeholder={placeholder}
        />
      </label>

      {/* Error message */}
      {error && (
        <ErrorMessageLabel>
          {error.message ? error.message : `Please enter your "${label}"`}
        </ErrorMessageLabel>
      )}
    </section>
  );
};

export default TextField;
