import mime from 'mime';

/**
 * @param {File} file
 * @param {string[]} allowed
 * @param {(ext) => {} | null} cb
 * @returns {boolean}
 */
const allowedExtention = (file, allowed, cb = null) => {
  const extFromType = mime.getExtension(file.type);
  const ext = file.name.split('.').pop();

  const isValid = allowed.includes(extFromType) || allowed.includes(ext);

  if (cb) cb(isValid ? extFromType || ext : null);

  return isValid;
};

export default allowedExtention;
