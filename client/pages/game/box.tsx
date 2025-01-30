import getServerSideData from '@/hoc/getServerSideData';
import CasesSection from '@components/Content/CasesSection';
import Items from '@components/Games/Box/Items';
import HorizontalRoulette from '@components/Games/Shared/HorizontalRoulette.tsx';
import { useGame } from '@hooks/useGame';
import { BoxOpeningResult } from '@shared/supabase/queries/game';
import moment from 'moment';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const getServerSideProps = getServerSideData();

const BoxOpeningPage = () => {
  const searchParams = useSearchParams();
  const gameId = searchParams.get('id');
  const { game } = useGame(gameId);
  const [status, setStatus] = useState<'started' | 'finished' | 'pre-started'>(
    'pre-started',
  );
  const [currentBoxOpeningResult, setCurrentBoxOpeningResult] =
    useState<BoxOpeningResult | null>(null);

  const boxOpeningResult =
    currentBoxOpeningResult || game?.data?.boxOpeningResults[0];
  const box = game?.data?.boxesToOpen.find(
    (b) => b.id === boxOpeningResult?.boxId,
  );

  useEffect(() => {
    if (!game?.data?.boxOpeningResults?.length) return;

    const updateResult = () => {
      const now = moment().valueOf();

      const validResults = game.data.boxOpeningResults.filter(
        (r: any) => moment(r.begin).valueOf() > now,
      );

      if (validResults.length === 0) {
        setStatus('started');
        setCurrentBoxOpeningResult(
          game.data.boxOpeningResults[game.data.boxOpeningResults.length - 1],
        );
        return;
      }

      const nextResult = validResults.reduce((closest: any, current: any) =>
        !closest ||
        moment(current.begin).valueOf() < moment(closest.begin).valueOf()
          ? current
          : closest,
      );

      const timeDiff = moment(nextResult.begin).valueOf() - now;
      if (timeDiff < 12000) {
        setStatus('started');
        setCurrentBoxOpeningResult(nextResult);
      }
    };

    updateResult();

    const interval = setInterval(updateResult, 100);
    return () => {
      clearInterval(interval);
    };
  }, [game?.data?.boxOpeningResults]);

  return (
    box &&
    currentBoxOpeningResult && (
      <div>
        <HorizontalRoulette
          status={status}
          key={currentBoxOpeningResult.begin.toString()}
          items={currentBoxOpeningResult?.results[0]?.randomItems}
          marge={50}
          updatedAt={currentBoxOpeningResult.begin}
          fastOpening={false}
        />

        <Items items={box.items ?? []} />
        <CasesSection />
      </div>
    )
  );
};

export default BoxOpeningPage;
