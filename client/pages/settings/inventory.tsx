import getServerSideData from '@/hoc/getServerSideData';
import { useOrderMutation, useSellMutation } from '@/services/item.service';
import AccountLayout from '@components/Layout/AccountLayout';
import ConfirmModal from '@components/Modal/ConfirmModal/ConfirmModal';
import InventoryTable from '@components/Settings/InventoryTable';
import { useTransaction } from '@hooks/useTransaction';
import { useI18n } from '@locales/i18n';
import { AccountCard } from '@ui/Account/AccountCard';
import { AccountSection } from '@ui/Account/AccountSection';
import { Pagination } from '@ui/Primitive/Pagination';
import { useState } from 'react';

export const getServerSideProps = getServerSideData(true);

const InventoryPage = () => {
  const [selected, setSelected] = useState<string[]>([]);

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
      type: 'item',
    },
    orderBy: {
      orderBy: 'valid_at',
      order: 'DESC',
    },
    size: 10,
  });
  const t = useI18n();

  const [sell] = useSellMutation();
  const [order] = useOrderMutation();

  return (
    <AccountLayout>
      <AccountSection
        title={t('Settings.Inventory.Title')}
        filters={
          <div className="flex items-center gap-2">
            <ConfirmModal
              onConfirm={async () => {
                await order({
                  items: selected,
                }).unwrap();
              }}
              trigger={{
                disabled: selected.length === 0 || loading,
                children: t('Action.Order'),
                variant: 'tertiary',
              }}
            />
            <ConfirmModal
              onConfirm={async () => {
                await sell({
                  items: selected,
                }).unwrap();
              }}
              trigger={{
                disabled: selected.length === 0 || loading,
                children: t('Action.Sell'),
              }}
            />
          </div>
        }
      >
        <AccountCard>
          <InventoryTable
            selected={selected}
            setSelected={setSelected}
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

export default InventoryPage;
