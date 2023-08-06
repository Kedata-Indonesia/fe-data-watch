import FileDropzone from '@/components/pages/dashboard/file-dropzone';
import UploadingFile from '@/components/pages/dashboard/uploading-file';
import ALLOWED_EXTENTION from '@/constants/allowed-extention';
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
          console.log('message', msg);
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

export default UploadPage;
