const makeArray = (length, callback = (val, idx) => {}) => {
  return Array.from({ length }, callback);
};

export default makeArray;
