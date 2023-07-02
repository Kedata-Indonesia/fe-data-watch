import clsx from 'clsx';

const Button = ({
  children,
  className = '',
  IconStart = null,
  IconEnd = null,
  onClick = () => {},
  isLoading = false,
}) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={clsx(
        'm-0 mx-auto flex cursor-pointer items-center gap-2.5 rounded bg-c-red-600 px-12 py-4 text-sm font-bold text-white hover:bg-c-red-400 md:mx-0 md:text-base',
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
