import getServerSideData from '@/hoc/getServerSideData';
import AccountLayout from '@components/Layout/AccountLayout';
import Table from '@components/Settings/TransactionTable';
import { useI18n } from '@locales/i18n';
import { AccountCard } from '@ui/Account/AccountCard';
import { AccountSection } from '@ui/Account/AccountSection';
import { Pagination } from '@ui/Primitive/Pagination';
import { Tabs } from '@ui/Primitive/Tabs';
import { useState } from 'react';
import { useTransaction } from '@hooks/useTransaction';

export const getServerSideProps = getServerSideData(true);

const TransactionsSettingsPage = () => {
  const { transactions, page, setPage, totalPages, setFilters, filters, loading } = useTransaction({
    size: 10,
  });
  const t = useI18n();

  return (
    <AccountLayout>
      <AccountSection
        title={t('Settings.Transactions.Title')}
        filters={
          <Tabs
            value={filters?.type}
            onChange={(v) => v ? setFilters({ type: v }) : setFilters({})}
            options={[
              {
                value: 'item',
                label: t('Settings.Transactions.Tabs.Item'),
              },
              {
                value: 'deposit',
                label: t('Settings.Transactions.Tabs.Deposit'),
              },
              {
                value: 'loss',
                label: t('Settings.Transactions.Tabs.Loss'),
              },
            ]}
          />
        }
      >
        <AccountCard>
          <Table transactions={transactions} loading={loading}/>
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

export default TransactionsSettingsPage;
