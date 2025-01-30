import getServerSideData from '@/hoc/getServerSideData';
import AccountLayout from '@components/Layout/AccountLayout';
import AffiliateForm from '@components/Settings/Affiliate/AffiliateForm';
import AffiliateSummary from '@components/Settings/Affiliate/AffiliateSummary';
import AffiliateTable from '@components/Settings/Affiliate/AffiliateTable';

export const getServerSideProps = getServerSideData(true);

const CommissionsPage = () => {
  return (
    <AccountLayout>
      <AffiliateSummary />
      <AffiliateForm />
      <AffiliateTable />
    </AccountLayout>
  );
};

export default CommissionsPage;
