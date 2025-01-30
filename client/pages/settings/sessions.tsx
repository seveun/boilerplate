import getServerSideData from '@/hoc/getServerSideData';
import { createClient } from '@/utils/supabase/component';
import AccountLayout from '@components/Layout/AccountLayout';
import ConfirmModal from '@components/Modal/ConfirmModal/ConfirmModal';
import Table from '@components/Settings/SessionTable';
import { useAuth } from '@hooks/useAuth';
import { useI18n } from '@locales/i18n';
import { AccountCard } from '@ui/Account/AccountCard';
import { AccountSection } from '@ui/Account/AccountSection';
import { Pagination } from '@ui/Primitive/Pagination';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';

export const getServerSideProps = getServerSideData(true);

const SessionsSettingsPage = () => {
  const t = useI18n();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [sessions, setSessions] = useState([] as any);
  const pageRef = useRef(page);
  const { handleLogout } = useAuth();
  pageRef.current = page;

  useEffect(() => {
    setLoading(true);
    const supabase = createClient();
    const fetchSessions = async () => {
      const { data, count } = await supabase
        .from('sessions')
        .select('*', { count: 'exact' })
        .order('end_at', { ascending: false })
        .range(page * 8, (page + 1) * 8);
      setSessions(data);
      setTotalPages(Math.ceil((count || 0) / 8));
      setLoading(false);
    };

    const sessionsSubscription = supabase
      .channel('sessions-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'sessions' },
        () => fetchSessions(),
      )
      .subscribe();

    fetchSessions();

    return () => {
      sessionsSubscription.unsubscribe();
    };
  }, [page]);

  const handleDisconnectAll = async () => {
    setLoading(true);
    await handleLogout('others');
    toast.success(t('Generic.Success'));
    setLoading(false);
  };

  return (
    <AccountLayout>
      <AccountSection
        title={t('Settings.Sessions.Title')}
        filters={
          <ConfirmModal
            dangerous
            onConfirm={handleDisconnectAll}
            trigger={{
              children: t('Settings.Sessions.Action.DisconnectAll'),
              variant: 'secondary',
            }}
            confirmAction={{
              variant: 'destructive',
            }}
          />
        }
      >
        <AccountCard>
          <Table sessions={sessions} loading={loading} />
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

export default SessionsSettingsPage;
