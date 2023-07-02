const BurgerMenuIcon = ({ className = '', onClick = () => {} }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path
        d="M2.75 5.5H19.25V7.33333H2.75V5.5ZM2.75 10.0833H19.25V11.9167H2.75V10.0833ZM2.75 14.6667H19.25V16.5H2.75V14.6667Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default BurgerMenuIcon;
