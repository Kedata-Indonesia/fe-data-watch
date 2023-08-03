const percentage = (num, digits = 1) => {
  const percent = Number(num).toFixed(digits);
  return `${percent}%`;
};

export default percentage;
