import { Button } from '@/components/base/button';
import DotSeparator from '@/components/base/dot-separator';
import { KedataLoading } from '@/components/base/kedata-loading';
import { CURRENT_FILE_KEY } from '@/constants/cookie-keys';
import cookieServices from '@/services/browser/cookie';
import useUploadData from '@/services/features/data-watch/hooks/use-upload-data';
import dataWatchKeys from '@/services/features/data-watch/keys';
import getAllExploration from '@/services/features/data-watch/repositories/get-all-exploration';
import getAllTable from '@/services/features/data-watch/repositories/get-all-table';
import { queryClient } from '@/services/libs/react-query';
import bytesToSize from '@/utils/byte-convert';
import useAbort from '@/utils/hooks/use-abort';
import timeLeftConvert from '@/utils/time-left-convert';
import mime from 'mime';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

/**
 * @param {object} props
 * @param {File} props.file
 * @param {(message) => {}} props.onError
 * @param {() => {} | null} props.onSuccess
 */
const UploadingFile = ({ file, onError = () => {}, onSuccess = null }) => {
  const router = useRouter();
  /**
   * @type {[File, (file: File) => {}]}
   */
  const [currentFile, setCurrentFile] = useState(null);
  const [signal, signalController] = useAbort();
  const [loadingInfo, setLoadingInfo] = useState({
    percentage: 0,
    timeLeft: 0,
  });

  const uploadMutation = useUploadData(percent => {
    setLoadingInfo({
      percentage: percent,
      timeLeft: 4,
    });
  });

  useEffect(() => {
    if (file) {
      setCurrentFile(file);
    }
  }, [file]);

  useEffect(() => {
    if (currentFile) {
      uploadFile(currentFile);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFile]);

  const errorHandler = err => {
    onError(err);
    setCurrentFile(null);
  };

  /**
   * @param {File} file
   */
  const uploadFile = file => {
    signalController.invoke();

    uploadMutation.mutate(
      {
        file,
        config: {
          signal: signal(),
        },
      },
      {
        onSuccess: async () => {
          const fileInfo = {
            name: file.name,
            size: bytesToSize(file.size),
            extention: mime.getExtension(file.type),
          };

          cookieServices.set(CURRENT_FILE_KEY, JSON.stringify(fileInfo));

          queryClient.removeQueries(dataWatchKeys.all);

          try {
            await Promise.all([
              queryClient.fetchQuery(dataWatchKeys.explorations(), ({ signal }) =>
                getAllExploration({ signal })
              ),
              queryClient.fetchQuery(dataWatchKeys.tables({ page: 1, columns: [] }), () =>
                getAllTable({ page: 1, columns: [] })
              ),
            ]);
          } catch (error) {}

          if (onSuccess) {
            onSuccess({ info: fileInfo, session: '' });
          } else {
            router.push('/app/exploration');
          }
        },
        onError: err => errorHandler(err?.message ?? 'Failed to upload file'),
      }
    );
  };

  return (
    <div className="absolute left-0 top-0 h-full w-full p-5">
      <div className="h-full border-[3px] border-dashed border-gray-400">
        {loadingInfo.percentage == 100 ? (
          <div className="flex h-full flex-col items-center justify-center">
            <div className="w-[200px]">
              <KedataLoading className="flex justify-center !w-full !h-full text-center mx-auto" />
            </div>
            <p className="mt-6 text-gray-600">Loading data. Please wait ...</p>
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <div className="w-[500px]">
              <div className="mb-2.5 flex items-center justify-between">
                <div>
                  <p className="mb-1 font-bold text-gray-600">{currentFile?.name}</p>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    {bytesToSize(currentFile?.size)}
                    <DotSeparator />
                    {timeLeftConvert(loadingInfo.timeLeft)}
                  </div>
                </div>
                <p className="text-gray-600">{loadingInfo.percentage ?? 0}%</p>
              </div>
              <div className="flex h-[10px] w-full overflow-hidden rounded-full bg-gray-200">
                <div
                  className="bg-red-500 trasition-all duration-500"
                  style={{
                    width: `${loadingInfo.percentage}%`,
                  }}
                />
              </div>
              <div className="mt-10 flex w-full justify-center">
                <Button
                  type="outline"
                  size="md"
                  className="px-12"
                  onClick={() => {
                    signalController.abort();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadingFile;
