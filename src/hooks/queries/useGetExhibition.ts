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

export const useGetExhibitionItems = (auctionId: number) => {
  return useQuery<ExhibitArtWork[], Error>(
    'useGetExhibitionItems',
    () => artworkApi.getExhibitionItems(auctionId),
    {
      retry: false,
      refetchOnWindowFocus: false,
      enabled: !!auctionId,
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
