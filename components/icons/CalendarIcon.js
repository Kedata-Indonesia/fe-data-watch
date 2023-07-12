/**
 * @param {import('react').SVGProps<SVGSVGElement>} props
 */
const CalendarIcon = props => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.6667 1.83337V3.66671H7.33333V1.83337H5.5V3.66671H4.58333C3.56583 3.66671 2.75917 4.49171 2.75917 5.50004L2.75 18.3334C2.75 19.3417 3.56583 20.1667 4.58333 20.1667H17.4167C18.425 20.1667 19.25 19.3417 19.25 18.3334V5.50004C19.25 4.49171 18.425 3.66671 17.4167 3.66671H16.5V1.83337H14.6667ZM15.5833 11.9167H11V16.5H15.5833V11.9167ZM4.58333 18.3334H17.4167V8.25004H4.58333V18.3334Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default CalendarIcon;
