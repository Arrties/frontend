import homeApi from '@apis/home/homeApi';
import { useInfiniteQuery } from 'react-query';

interface InfiniteQueryProps {
  artworks: KeywordArtwork[];
  current_page: number;
  nextPage: boolean;
}

export const useGetInfiniteArtWork = () => {
  const getArtWork = async ({ pageParam = 1 }): Promise<InfiniteQueryProps> => {
    const data = await homeApi.getCustomizedArtWork(pageParam, 20);
    const { artworks, nextPage } = data;
    return {
      artworks,
      current_page: pageParam,
      nextPage,
    };
  };

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['useInfiniteArtWork'],
    getArtWork,
    {
      getNextPageParam: (lastPage: InfiniteQueryProps) => {
        if (lastPage.nextPage) return lastPage.current_page + 1;
        return undefined;
      },
      retry: false,
      refetchOnWindowFocus: false,
    },
  );

  return { data, fetchNextPage, hasNextPage };
};
