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
  data.append('start_chunk', dto.start);
  data.append('end_chunk', dto.end);
  data.append('size', dto.originFile.size);
  data.append('total_completed', dto.completed);
  data.append('original_filename', dto.originFile.name);

  console.log({
    file: dto.file,
    start_chunk: dto.start,
    end_chunk: dto.end,
    size: dto.originFile.size,
    total_completed: dto.completed,
  });

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
