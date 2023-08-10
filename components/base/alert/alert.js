import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import ReportProblem from '@/components/icons/ReportProblem';

const Alert = {
  /**
   * @param {object} props
   * @param {string} props.title
   * @param {string} props.text
   */
  error: ({ title, text }) => {
    const swal = withReactContent(Swal);

    swal.fire({
      title: title || 'Error',
      text: text,
      icon: 'error',
      iconHtml: <ReportProblem className="w-36 h-36" />,
    });
  },
};

export default Alert;
