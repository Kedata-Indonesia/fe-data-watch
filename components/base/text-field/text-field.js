import { useController } from 'react-hook-form';
import clsx from 'clsx';
import { useCallback } from 'react';

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
  startIcon = null,
  disabled = false,
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  const StartIcon = useCallback(
    ({ error = false }) => {
      if (!startIcon) return null;
      const Icon = startIcon;
      return (
        <Icon
          className={clsx(
            'absolute bottom-0 left-4 top-[17px] w-6',
            disabled ? '!text-c-gray-400' : '!text-c-gray-600',
            error ? 'text-c-red-600' : ''
          )}
        />
      );
    },
    [startIcon, disabled]
  );

  return (
    <section className={clsx('relative mb-4', className)}>
      <label htmlFor={name}>
        <StartIcon error={error} />
        <div className="mb-2 font-bold uppercase">{label}</div>
        <input
          {...field}
          // name={name}
          type="text"
          className={clsx(
            'block min-h-[42px] w-full rounded-md border border-c-gray-300 bg-white pl-4 placeholder:text-c-gray-300 focus:!border-c-red-600 focus:!ring-1 focus:!ring-c-red-600',
            startIcon && 'pl-[46px]'
          )}
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
