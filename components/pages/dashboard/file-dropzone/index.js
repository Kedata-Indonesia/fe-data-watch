import { Alert } from '@/components/base/alert';
import { Button } from '@/components/base/button';
import { UploadIcon } from '@/components/icons';
import allowedExtention from '@/utils/allowed-extention';
import clsx from 'clsx';
import { useCallback, useState } from 'react';

const FileDropzone = ({ onChange, onError, allowExtention = [] }) => {
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDrag = useCallback(e => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setIsDragActive(true);
    else setIsDragActive(false);
  }, []);

  const handleDrop = useCallback(e => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    const files = [...e.dataTransfer.files];
    if (files.length > 0) {
      onFileChange(files[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFileChange = file => {
    if (!file) {
      onError('File not found');
      return;
    }
    const isAllowed = allowedExtention(file, allowExtention);
    if (!allowExtention.length || isAllowed) {
      onChange(file);
    } else {
      onError('File extention is not valid');
    }
  };

  return (
    <div className="absolute left-0 top-0 h-full w-full p-5">
      <div
        className={clsx(
          'h-full border-[3px] border-dashed border-gray-400',
          isDragActive && 'border-red-500'
        )}
      >
        <div
          className="flex h-full items-center justify-center"
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <div className="flex w-[675px] flex-col items-center justify-center text-center">
            <div className="mb-10 inline-block rounded-full bg-gray-200 p-6">
              <UploadIcon className="text-gray-400" />
            </div>
            <h6 className="mb-2.5 text-2xl font-bold text-gray-600">
              Start your journey on data quality by uploading your file
            </h6>
            {/* <Button size="md" className="mb-2.5 px-12" onClick={() => {
              Alert.
            }}>
              tes swal
            </Button> */}
            <p className="mb-11 text-gray-600">
              Drag and Drop or choose your file with format csv, txt or excel. Your uploaded files
              will not be saved on our platform, ensuring the confidentiality of your data
              throughout the upload process.
            </p>
            <label className="relative">
              <Button size="md" className="px-12">
                <input
                  type="file"
                  className="absolute left-0 top-0 h-[56px] w-[192px] opacity-0"
                  onChange={e => {
                    if (e.target.files && e.target.files?.length > 0) {
                      onFileChange(e.target.files[0]);
                    }
                  }}
                />
                Choose Files
              </Button>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileDropzone;
