import Link from 'next/link';
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
  type = 'text',
  isForgetPassword = false,
  control = null,
  rules = {},
  startIcon = null,
  endIcon = null,
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

  const EndIcon = useCallback(
    ({ error = false }) => {
      if (!endIcon) return null;
      const Icon = endIcon;
      return (
        <Icon
          className={clsx('absolute w-6 bottom-0 right-3 top-[40px]', error && 'text-c-red-600')}
        />
      );
    },
    [endIcon]
  );

  return (
    <section className={clsx('relative mb-4', className)}>
      <label htmlFor={name}>
        <StartIcon error={error} />
        <EndIcon error={error} />
        <div className="flex justify-between mb-2">
          <div className="font-bold uppercase">{label}</div>
          {type === 'password' && isForgetPassword && (
            <div className="text-sm text-c-red-200 hover:text-c-red-600">
              <Link href="/forget-password">Forget Password?</Link>
            </div>
          )}
        </div>
        <input
          {...field}
          type={type}
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
