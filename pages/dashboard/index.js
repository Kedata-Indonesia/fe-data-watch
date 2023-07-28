import { DashboardLayout } from '@/components/layouts';
import ProgressBar from '@/components/pages/dashboard/progress-bar';
import ALLOWED_EXTENTION from '@/constants/allowed-extention';
import cookieServices from '@/services/browser/cookie';
import useUploadData from '@/services/features/data-watch/hooks/use-upload-data';
import serverProps from '@/services/servers/server-props';
import withSession from '@/services/servers/with-session';
import useAbort from '@/utils/hooks/use-abort';
import mime from 'mime';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

const DashboardContent = dynamic(() => import('@/components/pages/dashboard/dashboard-content'));
const FileDropzone = dynamic(() => import('@/components/pages/dashboard/file-dropzone'));

const DashboardPage = params => {
  const [sessionId, setSessionId] = useState(params?.sessionId ?? null);
  const [isUploadMode, setIsUploadMode] = useState(false);
  const [currentFile, setCurrentFile] = useState(null);
  const [signal, signalController] = useAbort();

  const uploadMutation = useUploadData();

  const resetFile = () => {
    setIsUploadMode(false);
    setCurrentFile(null);
  };

  const uploadFile = file => {
    signalController.invoke();
    setCurrentFile({ name: file?.name, size: file?.size });
    setIsUploadMode(true);
    uploadMutation.mutateAsync(
      {
        file,
        config: {
          signal: signal(),
          onUploadProgress: e => {
            setCurrentFile(prev => ({
              ...prev,
              percentage: Math.round((100 * e.loaded) / e.total),
              timeLeft: e.estimated,
            }));
          },
        },
      },
      {
        onSuccess: data => {
          if (!data?.payload) return;
          const { session_id } = data?.payload;

          cookieServices.set('session_id', session_id);
          resetFile();
          setSessionId(session_id);
        },
        onError: err => {
          toast.error(err?.message ?? 'Failed to upload file');
          resetFile();
        },
      }
    );
  };

  if (!sessionId && !isUploadMode) {
    return (
      <FileDropzone
        allowExtention={ALLOWED_EXTENTION}
        onChange={file => {
          uploadFile(file);
        }}
        onError={msg => {
          toast.error(msg);
        }}
      />
    );
  }

  if (isUploadMode) {
    return (
      <ProgressBar
        fileName={currentFile?.name}
        fileSize={currentFile?.size}
        percentage={currentFile?.percentage}
        timeLeft={currentFile?.timeLeft}
        onCancel={() => {
          resetFile();
          signalController.abort();
        }}
      />
    );
  }

  return (
    <DashboardContent
      onChangeFile={file => {
        const ext = mime.getExtension(file.type);
        if (!ALLOWED_EXTENTION.length || ALLOWED_EXTENTION.includes(ext)) {
          uploadFile(file);
        } else {
          toast.error('File extention is not valid');
        }
      }}
    />
  );
};

export const getServerSideProps = serverProps(withSession());

DashboardPage.getLayout = page => <DashboardLayout>{page}</DashboardLayout>;

export default DashboardPage;
