import artworkApi from '@apis/artwork/artworkApi';
import { useQuery } from '@tanstack/react-query';

export default function useGetMyArtWork() {
  return useQuery<MyArtwork[], Error, any>(
    ['useGetMyArtWork'],
    () => artworkApi.getMyArtworkList(),
    {
      select: (data) => {
        const registered = data?.filter(
          (item) => item.auctionStatus === 'registered',
        );
        const processing = data?.filter(
          (item) => item.auctionStatus === 'processing',
        );
        const sales_finished = data?.filter(
          (item) =>
            item.auctionStatus === 'sales_success' ||
            item.auctionStatus === 'sales_failed',
        );
        return [registered, processing, sales_finished];
      },
      retry: 0,
    },
  );
}
