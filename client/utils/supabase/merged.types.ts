import type { MergeDeep } from 'type-fest';
import type { Database as DatabaseGenerated } from './database-generated.types';

export type CaseOpeningData = {
  boxesToOpen: {
    box: {
      id: string;
      name: string;
      image: string;
      tag: string;
      category: string;
      price: number;
    };
    items: {
      id: string;
      name: string;
      image: string;
      tag: string;
      category: string;
      price: number;
    }[];
  }[];
  results: {
    serverSeed: string;
    clientSeed: string;
    spin: number;
    winItemId: string;
    randomItems: {
      id: string;
      winner?: boolean;
    }[];
    marge: number;
    boxId: string;
  }[];
};

export type Database = MergeDeep<
  DatabaseGenerated,
  {
    public: {
      Tables: {
        games: {
          Row: {
            data: CaseOpeningData;
          };
        };
      };
    };
  }
>;
