import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import ReportProblem from '@/components/icons/ReportProblem';

const Alert = {
  /**
   * @param {object} props
   * @param {string} props.title
   * @param {string} props.text
   */
  error: async ({ title, text, showConfirmButton = true }) => {
    const swal = withReactContent(Swal);

    const result = await swal.fire({
      title: title || 'Error',
      text: text,
      icon: 'error',
      iconHtml: <ReportProblem className="w-36 h-36" />,
      showConfirmButton: showConfirmButton,
      showCancelButton: true,
      showDenyButton: true,
    });

    return result;
  },
};

export default Alert;
