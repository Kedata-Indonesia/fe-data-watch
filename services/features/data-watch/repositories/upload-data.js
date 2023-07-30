import dataWatchHttp from '@/services/http/data-watch-http';

/**
 *
 * @param {object} dto
 * @param {File} dto.file
 * @param {import('axios').AxiosRequestConfig<any>} dto.config
 * @returns {{ headers: import('axios').AxiosResponseHeaders; data: any; }}}
 */
const uploadData = async dto => {
  const data = new FormData();
  data.append('file', dto.file);

  const res = await dataWatchHttp().post('/eda/upload', data, {
    ...dto.config,
  });

  return res?.data;
};

export default uploadData;