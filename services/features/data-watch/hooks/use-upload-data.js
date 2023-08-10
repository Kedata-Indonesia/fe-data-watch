import { useMutation } from '@tanstack/react-query';
import uploadService from '../repositories/upload-service';

const CHUNK_SIZE = 1024 * 1024 * 2; // 2MB

const useUploadData = (cb = percent => {}) => {
  const mutation = useMutation(
    ({ file, config }) => {
      let totalCompleted = 0;
      const fileSize = file.size;

      const uploadFile = async (start, end) => {
        const currentChunk = file.slice(start, end);

        const chunkFile = new Blob([currentChunk], { type: file.type });

        totalCompleted += chunkFile.size;

        const res = await uploadService({
          originFile: file,
          file: chunkFile,
          start,
          end,
          config: {
            signal: config.signal,
            onUploadProgress: event => {
              let percent = 0;

              if (fileSize < CHUNK_SIZE) {
                percent = Math.round((event.loaded / event.total) * 100);
              } else {
                percent = Math.round((totalCompleted / fileSize) * 100);
              }
              cb(percent);
            },
          },
        });

        if (end < file.size) {
          return uploadFile(end, end + CHUNK_SIZE);
        }

        return res;
      };

      return uploadFile(0, CHUNK_SIZE);
    },
    { retry: false }
  );

  return mutation;
};

export default useUploadData;
