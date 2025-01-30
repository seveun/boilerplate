import getServerSideData from '@/hoc/getServerSideData';
import AccountLayout from '@components/Layout/AccountLayout';
import PreferenceTable from '@components/Settings/PreferenceTable';
import { useI18n } from '@locales/i18n';
import { AccountCard } from '@ui/Account/AccountCard';
import { AccountSection } from '@ui/Account/AccountSection';

export const getServerSideProps = getServerSideData(true);

const PreferencesSettingsPage = () => {
  const t = useI18n();

  return (
    <AccountLayout>
      <AccountSection title={t('Settings.Preferences.Title')}>
        <AccountCard>
          <PreferenceTable />
        </AccountCard>
      </AccountSection>
    </AccountLayout>
  );
};

export default PreferencesSettingsPage;
