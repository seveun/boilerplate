import getServerSideData from '@/hoc/getServerSideData';
import AccountLayout from '@components/Layout/AccountLayout';
import Orders from '@components/Settings/OrderTable';
import { useTransaction } from '@hooks/useTransaction';
import { useI18n } from '@locales/i18n';
import { AccountCard } from '@ui/Account/AccountCard';
import { AccountSection } from '@ui/Account/AccountSection';
import { Pagination } from '@ui/Primitive/Pagination';

export const getServerSideProps = getServerSideData(true);

const OrdersPage = () => {
  const {
    transactions,
    page,
    setPage,
    totalPages,
    setOrderBy,
    orderBy,
    loading,
  } = useTransaction({
    filters: {
      type: 'ordered',
    },
    orderBy: {
      orderBy: 'valid_at',
      order: 'DESC',
    },
    size: 10,
  });
  const t = useI18n();

  return (
    <AccountLayout>
      <AccountSection title={t('Settings.Orders.Title')}>
        <AccountCard>
          <Orders
            transactions={transactions}
            loading={loading}
            orderBy={orderBy}
            setOrderBy={setOrderBy}
          />
          <Pagination
            current={page}
            total={totalPages}
            onChange={(page) => setPage(page)}
          />
        </AccountCard>
      </AccountSection>
    </AccountLayout>
  );
};

export default OrdersPage;
