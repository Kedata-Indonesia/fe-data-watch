import { Button } from '@/components/base/button';
import DotSeparator from '@/components/base/dot-separator';
import { KedataLoading } from '@/components/base/kedata-loading';
import cookieServices from '@/services/browser/cookie';
import useUploadData from '@/services/features/data-watch/hooks/use-upload-data';
import bytesToSize from '@/utils/byte-convert';
import useAbort from '@/utils/hooks/use-abort';
import timeLeftConvert from '@/utils/time-left-convert';
import mime from 'mime';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

/**
 * @param {File} file
 * @param {(message) => {}} onError
 */
const UploadingFile = ({ file, onError = () => {} }) => {
  /**
   * @type {[File, (file: File) => {}]}
   */
  const router = useRouter();
  const [currentFile, setCurrentFile] = useState(null);
  const [signal, signalController] = useAbort();
  const [loadingInfo, setLoadingInfo] = useState({
    percentage: 0,
    timeLeft: 0,
  });

  const uploadMutation = useUploadData();

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

  const uploadFile = file => {
    signalController.invoke();

    uploadMutation.mutate(
      {
        file,
        config: {
          signal: signal(),
          onUploadProgress: e => {
            setLoadingInfo({
              percentage: Math.round((100 * e.loaded) / e.total),
              timeLeft: e.estimated,
            });
          },
        },
      },
      {
        onSuccess: data => {
          const { session_id } = data?.payload;

          if (!session_id) {
            errorHandler('Failed to upload file');
            return;
          }

          const fileInfo = {
            name: file.name,
            size: bytesToSize(file.size),
            extention: mime.getExtension(file.type),
          };

          cookieServices.set('session_id', session_id);
          cookieServices.set('file_info', JSON.stringify(fileInfo));
          setTimeout(() => {
            router.push('/app/exploration');
          }, 500);
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
