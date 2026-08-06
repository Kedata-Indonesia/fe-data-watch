import { useMutation } from '@tanstack/react-query';
import mime from 'mime';
import uploadService from '../repositories/upload-service';

const CHUNK_SIZE = 1024 * 1024 * 2; // 2MB

const useUploadData = (cb = percent => {}) => {
  const mutation = useMutation(
    ({ file, config }) => {
      let totalCompleted = 0;
      const fileSize = file.size;
      const fileType = mime.getType(file.name) || file.type || 'application/octet-stream';

      const uploadFile = async (start, end) => {
        const chunkEnd = Math.min(end, fileSize);
        const currentChunk = file.slice(start, chunkEnd);

        const chunkFile = new Blob([currentChunk], { type: fileType });

        totalCompleted += chunkFile.size;

        const res = await uploadService({
          originFile: file,
          file: chunkFile,
          completed: totalCompleted,
          start,
          end: chunkEnd,
          config: {
            signal: config.signal,
            // onUploadProgress: event => {
            //   let percent = 0;

            //   if (fileSize < CHUNK_SIZE) {
            //     percent = Math.round((event.loaded / event.total) * 100);
            //   } else {
            //     percent = Math.round((totalCompleted / fileSize) * 100);
            //   }
            //   cb(percent);
            // },
          },
        });

        cb(res?.payload?.upload_progress);

        if (chunkEnd < file.size) {
          return uploadFile(chunkEnd, chunkEnd + CHUNK_SIZE);
        }

        return res;
      };

      return uploadFile(0, Math.min(CHUNK_SIZE, fileSize));
    },
    { retry: false }
  );

  return mutation;
};

export default useUploadData;
