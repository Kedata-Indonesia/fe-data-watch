/**
 * @param {import('react').SVGProps<SVGSVGElement>} props
 */
const UploadIcon = props => {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M62.5 68.75V43.75H79.1666L50 14.5834L20.8333 43.75H37.5V68.75H62.5ZM50 26.375L59.0416 35.4167H54.1666V60.4167H45.8333V35.4167H40.9583L50 26.375ZM79.1666 85.4167V77.0834H20.8333V85.4167H79.1666Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default UploadIcon;
