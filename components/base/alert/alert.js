import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import ReportProblem from '@/components/icons/ReportProblem';
import { CheckCircleIcon } from '@/components/icons';

const Alert = {
  /**
   * @param {AlertSuccessProps} props
   * @returns {Promise<import('sweetalert2').SweetAlertResult>}
   */
  success: async ({ title, text, showCloseButton = true }) => {
    const swal = withReactContent(Swal);

    const result = await swal.fire({
      title: title || 'Success',
      text: text,
      icon: 'success',
      iconHtml: <CheckCircleIcon className="w-36 h-36 text-green-500" />,
      showConfirmButton: false,
      showCancelButton: showCloseButton,
      cancelButtonText: 'Close',
    });

    return result;
  },
  /**
   * @param {AlertErrorProps} props
   * @returns {Promise<import('sweetalert2').SweetAlertResult>}
   */
  error: async ({
    title,
    text,
    showConfirmButton = false,
    showCloseButton = true,
    onCancel = () => {},
    onConfirm = () => {},
  }) => {
    const swal = withReactContent(Swal);

    const result = await swal.fire({
      title: title || 'Error',
      text: text,
      icon: 'error',
      iconHtml: <ReportProblem className="w-36 h-36" />,
      showConfirmButton: showConfirmButton,
      showCancelButton: showCloseButton,
      cancelButtonText: 'Close',
    });

    if (result.isConfirmed) onConfirm && (await onConfirm());
    if (result.isDismissed) onCancel && (await onCancel());

    return result;
  },
};

export default Alert;

/**
 * @typedef {Object} AlertErrorProps
 * @property {string} title
 * @property {React.ReactNode | string} [text]
 * @property {boolean} [showConfirmButton]
 * @property {boolean} [showCloseButton]
 * @property {() => Promise<void>} [onCancel]
 * @property {() => Promise<void>} [onConfirm]
 */

/**
 * @typedef {Object} AlertSuccessProps
 * @property {string} title
 * @property {React.ReactNode | string} [text]
 * @property {boolean} [showCloseButton]
 */
