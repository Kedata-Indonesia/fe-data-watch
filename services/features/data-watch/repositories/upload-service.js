import uploadData from './upload-data';
import importData from './import-data';
import allowedExtention from '@/utils/allowed-extention';
import ALLOWED_EXTENTION from '@/constants/allowed-extention';

/**
 * @param {object} dto
 * @param {File} dto.file
 */
const uploadService = async dto => {
  let extention = '';
  const isAllowed = allowedExtention(dto.file, ALLOWED_EXTENTION, ext => {
    extention = ext;
  });

  if (!isAllowed) Promise.reject('File extention is not valid');
  if (extention === 'dat') {
    return await importData(dto);
  }
  return await uploadData(dto);
};

export default uploadService;
