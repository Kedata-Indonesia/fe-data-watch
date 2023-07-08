import { Button } from '@/components/base/button';
import { UploadIcon } from '@/components/icons';
import clsx from 'clsx';
import { useCallback, useEffect, useState } from 'react';

/**
 * @param {DataUploadProps} props
 */
const DataUpload = ({ onSuccess = () => {} }) => {
  const [file, setFile] = useState(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [percentage, setPercentage] = useState(0);

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
      setFile(files[0]);
    }
  }, []);

  useEffect(() => {
    if (!file) return;
    setIsUploading(true);
    const upload = setInterval(() => {
      setPercentage(prev => (prev >= 100 ? 0 : prev + 10));
    }, 1000);

    return () => {
      setInterval(upload);
    };
  }, [file]);

  useEffect(() => {
    if (percentage < 100) return;
    setPercentage(0);
    setIsUploading(false);
    onSuccess();
  }, [percentage]);

  console.log(percentage);

  return (
    <div className="absolute left-0 top-0 h-full w-full p-5">
      <div
        className={clsx(
          'h-full border-[3px] border-dashed border-gray-400',
          isDragActive && 'border-red-500'
        )}
      >
        {!isUploading && (
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
                        setFile(e.target.files[0]);
                      }
                    }}
                  />
                  Choose Files
                </Button>
              </label>
            </div>
          </div>
        )}
        {isUploading && (
          <div className="flex h-full w-full items-center justify-center">
            <div className="w-[500px]">
              <div className="mb-2.5 flex items-center justify-between">
                <div>
                  <p className="mb-1 font-bold text-gray-600">data_table.csv</p>
                  <p className="text-sm text-gray-600">
                    1.2 GB <span /> 2 second remaining
                  </p>
                </div>
                <p className="text-gray-600">{percentage}%</p>
              </div>
              <div className="flex h-[10px] w-full overflow-hidden rounded-full bg-gray-200">
                <div
                  className="bg-red-500"
                  style={{
                    width: `${percentage}%`,
                  }}
                />
              </div>
              <div className="mt-10 flex w-full justify-center">
                <Button type="outline" size="md" className="px-12">
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

export default DataUpload;

/**
 * @typedef DataUploadProps
 * @property {(file: File) => void} onSuccess
 */
