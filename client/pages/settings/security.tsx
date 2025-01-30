import getServerSideData from '@/hoc/getServerSideData';
import AccountLayout from '@components/Layout/AccountLayout';
import OtpForm from '@components/Settings/Security/OtpForm';
import PasswordForm from '@components/Settings/Security/PasswordForm';
import TwoFactor from '@components/Settings/Security/TwoFactor';
import { useI18n } from '@locales/i18n';
import { AccountSection } from '@ui/Account/AccountSection';

export const getServerSideProps = getServerSideData(true);

const SecuritySettingsPage = () => {
  const t = useI18n();
  return (
    <AccountLayout>
      <AccountSection title={t('Settings.Security.Title')}>
        <PasswordForm />
        <OtpForm />
        <TwoFactor />
      </AccountSection>
    </AccountLayout>
  );
};

export default SecuritySettingsPage;
