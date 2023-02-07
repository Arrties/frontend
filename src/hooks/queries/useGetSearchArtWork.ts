import artworkApi from '@apis/artwork/artworkApi';
import { useQuery } from 'react-query';

export const useGetRecentSearch = () => {
  return useQuery<RecentSearch[], Error>('useGetRecentSearch', () =>
    artworkApi.getRecentSearch(),
  );
};

export const useGetSearch = (word: string, status: string[]) => {
  return useQuery<SearchArtWork[], Error>(
    ['useGetSearch', word],
    () => artworkApi.getSearchArtwork(word),
    {
      enabled: !!word,
      select: (arts) => {
        if (status?.length === 0) {
          return arts;
        } else {
          const selected = arts.filter((art) => status.includes(art.status));
          return selected;
        }
      },
    },
  );
};
