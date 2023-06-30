import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useEmailConfirmation from '@/services/features/waitlist/hooks/use-email-confirmation';

export default function Confirmation() {
  const router = useRouter();
  const confirmationMutation = useEmailConfirmation();
  const { token } = router.query;

  useEffect(() => {
    if (token)
      confirmationMutation.mutateAsync(
        { token },
        {
          onSuccess: () => {
            setTimeout(() => {
              router.push('/');
            }, 1000);
          },
        }
      );
  }, [token]);

  return null;
}
