import { Button } from '@/components/base/button';
import DotSeparator from '@/components/base/dot-separator';
import { DropdownMenu } from '@/components/base/dropdown-menu';
import { UploadIcon } from '@/components/icons';
import ExportIcon from '@/components/icons/ExportIcon';
import TableIcon from '@/components/icons/TableIcon';
import FileUploadModal from '@/components/pages/dashboard/file-upload-modal';
import Tabs from '@/components/shared/tabs';
import cookieServices from '@/services/browser/cookie';
import useExportData from '@/services/features/data-watch/hooks/use-export-data';
import useProfile from '@/services/features/auth/hooks/use-profile';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useModal from '@/utils/hooks/use-modal';
import SubmitFeedbackModal from '@/components/shared/submit-feedback-modal';
import ChangePasswordModal from '@/components/shared/change-password-modal';
import { ACCESS_TOKEN_KEY, CURRENT_FILE_KEY } from '@/constants/cookie-keys';
import ExpandLessIcon from '@/components/icons/ExpandLessIcon';
import clsx from 'clsx';

const TAB_MENU = /** @type {const} */ ({
  TABLE: '/app/table',
  EXPLORATION: '/app/exploration',
  DATA_QUALITY: '/app/data-quality',
});

const DashboardLayout = ({ children }) => {
  const router = useRouter();
  const [fileInfo, setFileInfo] = useState(null);
  const profileQuery = useProfile();
  const profile = profileQuery?.data?.payload;
  const queryClient = useQueryClient();

  useEffect(() => {
    const fileInfoCookies = cookieServices.get(CURRENT_FILE_KEY);
    if (fileInfoCookies) {
      setFileInfo(JSON.parse(fileInfoCookies));
    }
  }, []);

  const exportMutation = useExportData();

  const changePasswordModal = useModal();
  const submitFeedbackModal = useModal();

  return (
    <div className="min-h-screen bg-white flex flex-col overflow-hidden">
      <div className="px-5 py-4 bg-[#27272A] flex justify-between items-center">
        <ChangePasswordModal
          isOpen={changePasswordModal.isOpen}
          onClose={changePasswordModal.close}
        />
        <SubmitFeedbackModal
          isOpen={submitFeedbackModal.isOpen}
          onClose={submitFeedbackModal.close}
        />
        <Image
          src="/logo-bw.svg"
          width={110}
          height={30}
          alt="logo kalkula"
          className="hidden lg:block"
        />
        {profile && (
          <div>
            <DropdownMenu
              options={[
                {
                  label: 'Change Password',
                  value: 'change-password',
                },
                {
                  label: 'Feedback',
                  value: 'feedback',
                },
                {
                  label: 'Logout',
                  value: 'logout',
                  className: 'text-red-500',
                },
              ]}
              onChange={data => {
                const { value } = data;
                switch (value) {
                  case 'logout':
                    queryClient.clear();
                    router.push('/');
                    cookieServices.remove(ACCESS_TOKEN_KEY);
                    // cookieServices.remove(CURRENT_FILE_KEY);
                    break;
                  case 'change-password':
                    changePasswordModal.open();
                    break;
                  case 'feedback':
                    submitFeedbackModal.open();
                    break;
                }
              }}
              renderChild={({ isOpen, open }) => {
                return (
                  <button className="text-white cursor-pointer flex items-center" onClick={open}>
                    Hello, {profile.full_name}
                    <ExpandLessIcon
                      className={clsx('transition-transform ml-1', !isOpen && 'rotate-180')}
                    />
                  </button>
                );
              }}
            />
          </div>
        )}
      </div>
      <div className="relative top-0 h-full w-full flex-1">
        <div className="absolute inset-0 mb-auto flex w-full flex-col">
          <div className="flex w-full items-center justify-between border-b border-b-gray-300 px-5 py-4">
            <div className="flex items-center gap-2.5 text-gray-600">
              <TableIcon />
              <div className="flex flex-col">
                <h3 className="text-xl font-bold">{fileInfo?.name}</h3>
                <div className="flex items-center gap-1 text-sm text-gray-400">
                  <div>
                    Type: <span className="font-bold">{fileInfo?.extention}</span>
                  </div>
                  <DotSeparator />
                  <div>
                    Size: <span className="font-bold">{fileInfo?.size}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Tabs
                items={[
                  { key: TAB_MENU.TABLE, label: 'Table' },
                  { key: TAB_MENU.EXPLORATION, label: 'Exploration' },
                  { key: TAB_MENU.DATA_QUALITY, label: 'Data Quality' },
                ]}
                activeItem={router.pathname}
                onChange={({ key }) => {
                  router.push(key);
                }}
              />
              <div className="mx-4 h-[42px] w-[1px] bg-gray-300" />
              <div className="relative border-l-gray-300 flex gap-2">
                <Button
                  IconStart={<ExportIcon className="h-5 w-5" />}
                  className="bg-gray-600 hover:bg-gray-500 !px-4"
                  size="md"
                  isLoading={exportMutation.isLoading}
                  onClick={() => {
                    exportMutation.mutate(
                      {},
                      {
                        onSuccess: data => {
                          // download file from data
                          const href = URL.createObjectURL(data);

                          const fileName = fileInfo?.name?.slice(
                            0,
                            fileInfo?.name?.lastIndexOf('.')
                          );

                          const link = document.createElement('a');
                          link.href = href;
                          link.download = `${fileName}.dat`;
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                          URL.revokeObjectURL(href);

                          toast.success('File exported successfully');
                        },
                        onError: err => {
                          toast.error(err?.response?.data?.message ?? 'Failed to export file');
                        },
                      }
                    );
                  }}
                >
                  Export
                </Button>
                <Link href="?upload_mode=true" as="/app/upload">
                  <Button
                    IconStart={<UploadIcon className="h-5 w-5" />}
                    size="md"
                    className="!px-4"
                  >
                    New File
                    {/* <input
                    type="file"
                    className="absolute left-0 top-0 h-full w-full opacity-0 "
                    onChange={e => {
                      if (e.target.files && e.target.files?.length > 0) {
                        onChangeFile(e.target.files[0]);
                      }
                    }}
                  /> */}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          {children}
        </div>
      </div>
      <FileUploadModal
        isOpen={router.query.upload_mode === 'true'}
        onClose={() => {
          router.push(router.pathname);
        }}
        onSuccess={({ info }) => {
          setFileInfo(info);
          router.push(router.pathname);
        }}
      />
    </div>
  );
};

export default DashboardLayout;
