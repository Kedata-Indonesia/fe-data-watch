import { Modal } from '@/components/base/modal';
import FileDropzone from '../file-dropzone';
import ALLOWED_EXTENTION from '@/constants/allowed-extention';
import { useEffect, useState } from 'react';
import UploadingFile from '../uploading-file';
import { toast } from 'react-toastify';
import { CloseIcon } from '@/components/icons';

const FileUploadModal = ({ isOpen, onClose, onSuccess }) => {
  const [file, setFile] = useState(null);

  useEffect(() => {
    return () => {
      setFile(null);
    };
  }, []);

  return (
    <Modal
      id="data-quality-modal"
      open={isOpen}
      parentClassname="z-[999]"
      backdropClassname="z-[998]"
      onClose={onClose}
      className="md:w-[90%] h-screen relative !z-[999]"
      withHeader={false}
    >
      <button
        className="w-9 h-9 absolute right-1 top-1 z-50 bg-c-red-600 rounded-full"
        onClick={onClose}
      >
        <CloseIcon className="text-white" />
      </button>
      {file ? (
        <UploadingFile
          file={file}
          onError={msg => {
            setFile(null);
            toast.error(msg);
          }}
          onSuccess={info => {
            setFile(null);
            onSuccess(info);
          }}
        />
      ) : (
        <FileDropzone
          allowExtention={ALLOWED_EXTENTION}
          onChange={file => {
            setFile(file);
          }}
          onError={msg => {
            toast.error(msg);
          }}
        />
      )}
    </Modal>
  );
};

export default FileUploadModal;
