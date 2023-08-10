import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

const Alert = () => {
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
    });
  };
};

export default Alert;
