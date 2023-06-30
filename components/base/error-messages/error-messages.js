import { ErrorMessage } from '@hookform/error-message';

/**
 * @description Handling error message for input.
 */

const ErrorMessages = ({ errors = {}, name = '' }) => {
  return (
    <ErrorMessage
      errors={errors}
      name={name}
      render={data => {
        // render={({ messages, message }) => {
        console.log('data', data);

        // if (!messages) return <ErrorMessages.Label>{message}</ErrorMessages.Label>;

        // return (
        //   <div>
        //     {Object.values(messages ?? {}).map(message => {
        //       return <ErrorMessages.Label key={message}>{message}</ErrorMessages.Label>;
        //     })}
        //   </div>
        // );
      }}
    ></ErrorMessage>
  );
};

ErrorMessages.Label = ({ children = null }) => (
  <p className="mt-1.5 text-sm text-c-red-600">{children}</p>
);

export default ErrorMessages;
