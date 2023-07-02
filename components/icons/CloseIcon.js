const CloseIcon = ({ className = '', onClick = () => {} }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path
        d="M17.4167 5.87584L16.1242 4.58334L11 9.70751L5.87583 4.58334L4.58333 5.87584L9.7075 11L4.58333 16.1242L5.87583 17.4167L11 12.2925L16.1242 17.4167L17.4167 16.1242L12.2925 11L17.4167 5.87584Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default CloseIcon;
