import { Button } from '@/components/base/button';
import { Modal } from '@/components/base/modal';
import { TextField } from '@/components/base/text-field';
import { EyeIcon } from '@/components/icons';
import useChangePassword from '@/services/features/auth/hooks/use-change-password';
import { useForm } from 'react-hook-form';

const ChangePasswordModal = props => {
  const onClose = props.onClose || (() => {});
  const { control, watch, handleSubmit, setError } = useForm({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });
  const newPassword = watch('newPassword');

  const changePasswordMutation = useChangePassword();

  return (
    <Modal
      open={props.isOpen}
      onClose={onClose}
      title="Change Password"
      footer={
        <div className="flex gap-2 justify-end">
          {!changePasswordMutation.isLoading && (
            <Button type="outline" size="md" onClick={onClose}>
              Cancel
            </Button>
          )}
          <Button
            size="md"
            isLoading={changePasswordMutation.isLoading}
            onClick={handleSubmit(data => {
              changePasswordMutation.mutateAsync(
                {
                  currentPassword: data.currentPassword,
                  newPassword: data.newPassword,
                  confirmPassword: data.confirmPassword,
                },
                {
                  onSuccess: () => {
                    onClose();
                  },
                  onError: () => {
                    setError('currentPassword', {
                      type: 'manual',
                      message: 'The current password is incorrect',
                    });
                  },
                }
              );
            })}
          >
            Change Password
          </Button>
        </div>
      }
    >
      <TextField
        label="Current Password"
        control={control}
        name="currentPassword"
        type="password"
        placeholder="Enter your current password"
        endIcon={EyeIcon}
        rules={{
          required: true,
        }}
      />
      <TextField
        label="New Password"
        control={control}
        name="newPassword"
        type="password"
        placeholder="Enter your new password"
        endIcon={EyeIcon}
        rules={{
          required: true,
        }}
      />
      <TextField
        label="Confirm Password"
        control={control}
        name="confirmPassword"
        type="password"
        placeholder="Enter your new password again"
        className="!mb-0"
        endIcon={EyeIcon}
        rules={{
          required: true,
          validate: value => value === newPassword || 'The passwords do not match',
        }}
      />
    </Modal>
  );
};

export default ChangePasswordModal;
