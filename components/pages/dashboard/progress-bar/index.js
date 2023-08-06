import { Button } from '@/components/base/button';
import DotSeparator from '@/components/base/dot-separator';
import { KedataLoading } from '@/components/base/kedata-loading';
import { SpinnerLoading } from '@/components/base/spinner-loading';
import bytesToSize from '@/utils/byte-convert';
import timeLeftConvert from '@/utils/time-left-convert';

const ProgressBar = ({ fileName, fileSize, percentage, timeLeft, onCancel = () => {} }) => {
  return (
    <div className="absolute left-0 top-0 h-full w-full p-5">
      <div className="h-full border-[3px] border-dashed border-gray-400">
        {percentage == 100 ? (
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
                  <p className="mb-1 font-bold text-gray-600">{fileName}</p>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    {bytesToSize(fileSize)} <DotSeparator /> {timeLeftConvert(timeLeft)}
                  </div>
                </div>
                <p className="text-gray-600">{percentage ?? 0}%</p>
              </div>
              <div className="flex h-[10px] w-full overflow-hidden rounded-full bg-gray-200">
                <div
                  className="bg-red-500 trasition-all duration-500"
                  style={{
                    width: `${percentage}%`,
                  }}
                />
              </div>
              <div className="mt-10 flex w-full justify-center">
                <Button type="outline" size="md" className="px-12" onClick={onCancel}>
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

export default ProgressBar;
