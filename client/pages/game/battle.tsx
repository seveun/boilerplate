import getServerSideData from '@/hoc/getServerSideData';
import { useSearchParams } from 'next/navigation';

export const getServerSideProps = getServerSideData();

const BattlePage = () => {
  const searchParams = useSearchParams();
  const gameId = searchParams.get('id');
  if (!gameId) return null;

  return 'InProgress';
};

export default BattlePage;
