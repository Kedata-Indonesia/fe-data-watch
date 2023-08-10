import FileDropzone from '@/components/pages/dashboard/file-dropzone';
import UploadingFile from '@/components/pages/dashboard/uploading-file';
import ALLOWED_EXTENTION from '@/constants/allowed-extention';
import serverProps from '@/services/servers/server-props';
import withAuth from '@/services/servers/with-auth';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

const UploadPage = () => {
  const [file, setFile] = useState(null);

  if (file) {
    return (
      <UploadingFile
        file={file}
        onError={msg => {
          setFile(null);
          toast.error(msg);
        }}
      />
    );
  }

  return (
    <FileDropzone
      allowExtention={ALLOWED_EXTENTION}
      onChange={file => {
        setFile(file);
      }}
      onError={msg => {
        toast.error(msg);
      }}
    />
  );
};

export const getServerSideProps = serverProps(withAuth());

export default UploadPage;
