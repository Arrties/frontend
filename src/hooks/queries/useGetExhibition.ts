import artworkApi from '@apis/artwork/artworkApi';
import { useQuery } from 'react-query';

export const useGetExhibition = () => {
  return useQuery<ExhibitListProps[], Error>(
    'useGetExhibition',
    () => artworkApi.getExhibitionList(),
    {
      retry: false,
      refetchOnWindowFocus: false,
    },
  );
};

export const useGetExhibitionItemList = (
  auctionId: number,
  genres: string[],
) => {
  return useQuery<ExhibitArtWork[], Error>(
    'useGetExhibitionItems',
    () => artworkApi.getExhibitionItemList(auctionId),
    {
      enabled: !!auctionId,
      select: (arts) => {
        if (genres?.length === 0) {
          return arts;
        } else {
          const selected = arts.filter((art) => genres.includes(art.genre));
          return selected;
        }
      },
    },
  );
};

export const useGetExhibitionItem = (auctionId: number) => {
  return useQuery<ExhibitArtWork, Error>(
    'useGetExhibitionItem',
    () => artworkApi.getExhibitionItem(auctionId),
    {
      retry: false,
      refetchOnWindowFocus: false,
      enabled: !!auctionId,
    },
  );
};
