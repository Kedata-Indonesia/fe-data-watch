import clientHttp from '@/services/http/client-http';

/**
 * Menampilkan reason user waitlist sebagai testimonial di homepage
 */

const testimonialWaitlist = async () => {
  const res = await clientHttp().get('/landing/testimonials');
  return res.data;
};

export default testimonialWaitlist;
