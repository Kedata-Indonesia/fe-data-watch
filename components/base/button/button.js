import clsx from 'clsx';

const sizeClassName = {
  sm: 'p-2 text-sm',
  md: 'p-2.5 text-sm',
  lg: 'p-4 text-sm',
};

const typeClassName = {
  primary: 'bg-c-red-600 text-white hover:bg-c-red-400',
  outline: 'bg-white text-c-red-600 border border-gray-400 hover:bg-c-gray-200',
};

const Button = ({
  children,
  className = '',
  IconStart = null,
  IconEnd = null,
  onClick = () => {},
  isLoading = false,
  size = 'lg',
  type = 'primary',
}) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={clsx(
        'm-0 mx-auto flex cursor-pointer items-center gap-2.5 rounded md:mx-0 md:text-base',
        typeClassName[type],
        sizeClassName[size],
        className
      )}
    >
      {!isLoading && IconStart && IconStart}
      {isLoading ? <Button.spinner /> : children}
      {!isLoading && IconEnd && IconEnd}
    </button>
  );
};

Button.spinner = () => <span className="loading loading-spinner loading-md" />;

Button.share = ({
  children,
  className = '',
  IconStart = null,
  IconEnd = null,
  onClick = () => {},
}) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={clsx(
        'm-0 flex cursor-pointer items-center gap-2.5 rounded px-3 py-2 text-sm text-white',
        className
      )}
    >
      {IconStart && IconStart}
      {children}
      {IconEnd && IconEnd}
    </button>
  );
};

export default Button;
