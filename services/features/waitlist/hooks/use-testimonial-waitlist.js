import { useQuery } from '@tanstack/react-query';
import testimonialWaitlist from '../repositories/testimonial-waitlist';

/**
 * Hooks untuk mengambil data user waitlist
 * sebagai testimonials di landing page
 */

const useTestimonialWaitlist = () => {
  const query = useQuery({
    queryKey: useTestimonialWaitlist.keys(),
    queryFn: () => testimonialWaitlist(),
  });
  return query;
};

useTestimonialWaitlist.keys = () => ['testimonials'];

export default useTestimonialWaitlist;
