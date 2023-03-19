import artworkApi from '@apis/artwork/artworkApi';
import { useQuery } from 'react-query';

export const useGetExhibition = () => {
  return useQuery<ExhibitionList[], Error>(
    'useGetExhibition',
    () => artworkApi.getExhibitionList(),
    {
      refetchOnWindowFocus: false,
    },
  );
};

export const useGetExhibitionItemList = (
  auctionId: number,
  genres: string[],
) => {
  return useQuery<ExhibitionArtWork[], Error>(
    ['useGetExhibitionItems', auctionId],
    () => artworkApi.getExhibitionItemList(auctionId),
    {
      enabled: !isNaN(auctionId),
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

export const useGetExhibitionItem = (artWorkId: number) => {
  return useQuery<ExhibitionArtWork, Error>(
    ['useGetExhibitionItem', artWorkId],
    () => artworkApi.getExhibitionItem(artWorkId),
    {
      refetchOnWindowFocus: false,
      enabled: !!artWorkId,
    },
  );
};
