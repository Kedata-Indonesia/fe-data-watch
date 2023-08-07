import dataWatchHttp from '@/services/http/data-watch-http';

/**
 *
 * @param {object} dto
 * @param {File} dto.file
 * @param {import('axios').AxiosRequestConfig<any>} dto.config
 */
const uploadData = async dto => {
  const data = new FormData();
  data.append('file', dto.file);

  try {
    const res = await dataWatchHttp().post('/eda/upload', data, {
      ...dto.config,
    });

    return res?.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default uploadData;
