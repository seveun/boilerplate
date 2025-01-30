import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const ReferralRedirectPage = () => {
  const router = useRouter();
  const { code } = router.query;

  const checkIfRefferal = async () => {
    try {
      Cookies.set('referral_code', code as string);
      localStorage.setItem('referral_code', code as string);
      return router.push('/');
    } catch (error) {
      console.error('Error checking referrals:', error);
    }
  };

  useEffect(() => {
    checkIfRefferal();
  }, [code]);
};

export default ReferralRedirectPage;
