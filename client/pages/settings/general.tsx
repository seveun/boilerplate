import getServerSideData from '@/hoc/getServerSideData';
import AccountLayout from '@components/Layout/AccountLayout';
import AddressForm from '@components/Settings/General/AddressForm';
import InformationForm from '@components/Settings/General/InformationForm';

export const getServerSideProps = getServerSideData(true);

const GeneralSettingsPage = () => {
  return (
    <AccountLayout>
      <InformationForm />
      <AddressForm />
    </AccountLayout>
  );
};

export default GeneralSettingsPage;
