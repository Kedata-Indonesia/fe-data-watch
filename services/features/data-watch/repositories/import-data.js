import dataWatchHttp from '@/services/http/data-watch-http';

/**
 * @param {object} dto
 * @param {File} dto.file
 * @param {import('axios').AxiosRequestConfig<any>} dto.config
 */
const importData = async dto => {
  const data = new FormData();
  data.append('file', dto.file);

  const res = await dataWatchHttp().post('/sessions/import', data, {
    ...dto.config,
  });

  return res?.data;
};

export default importData;
