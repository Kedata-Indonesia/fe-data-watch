import { Alert } from '@/components/base/alert';
import { Button } from '@/components/base/button';
import { Modal } from '@/components/base/modal';
import { TextArea } from '@/components/base/text-area';
import useSubmitFeedback from '@/services/features/feedback/hooks/use-submit-feedback';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';

const SubmitFeedbackModal = props => {
  const onClose = props.onClose || (() => {});
  const { control, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      rate: 5,
      feedback: '',
    },
  });
  const selectedRate = watch('rate');

  const submitFeedbackMutation = useSubmitFeedback();

  return (
    <Modal
      open={props.isOpen}
      onClose={onClose}
      title="Feedback"
      footer={
        <div className="flex gap-2 justify-end">
          {!submitFeedbackMutation.isLoading && (
            <Button type="outline" size="md" onClick={onClose}>
              Cancel
            </Button>
          )}
          <Button
            size="md"
            isLoading={submitFeedbackMutation.isLoading}
            onClick={handleSubmit(data => {
              submitFeedbackMutation.mutateAsync(
                {
                  rate: data.rate,
                  feedback: data.feedback,
                },
                {
                  onSuccess: () => {
                    Alert.success({
                      title: 'Thank you for your feedback!',
                      text: 'Thank you for taking the time to share your feedback with us. We truly appreciate your valuable input and look forward to implementing your suggestions to further enhance our data quality platform.',
                    });
                    onClose();
                  },
                  onError: error => {
                    console.error(error);
                    Alert.error({
                      title: 'Failed to submit feedback',
                      text: 'Please try again later.',
                    });
                  },
                }
              );
            })}
          >
            Submit
          </Button>
        </div>
      }
    >
      <div>
        <div className="font-bold mb-2">How would you rate your experience ?</div>
        <div className="flex gap-3 w-full mb-4">
          {rates.map(rate => {
            return (
              <div key={rate.value} className="w-full">
                <div
                  className={clsx(
                    'text-center text-gray-300 p-2 border border-solid border-gray-300 rounded-md cursor-pointer',
                    selectedRate === rate.value && '!border-c-red-600 !text-gray-600'
                  )}
                  onClick={() => {
                    setValue('rate', rate.value);
                  }}
                >
                  {rate.value}
                </div>
                {selectedRate === rate.value && (
                  <div className="text-center text-white text-xs mt-1 p-2 bg-c-red-600 rounded-md">
                    {rate.label}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <TextArea
        label="How can we improve our platform ?"
        placeholder="Enter your feedback here"
        control={control}
        name="feedback"
        rows={5}
        className="!mb-0"
        rules={{
          required: 'Please enter your feedback',
        }}
      />
    </Modal>
  );
};

const rates = [
  {
    value: 1,
    label: 'Bad!',
  },
  {
    value: 2,
    label: 'Poor!',
  },
  {
    value: 3,
    label: 'Fair!',
  },
  {
    value: 4,
    label: 'Good!',
  },
  {
    value: 5,
    label: 'Excellent!',
  },
];

export default SubmitFeedbackModal;
