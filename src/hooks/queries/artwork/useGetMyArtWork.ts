import artworkApi from '@apis/artwork/artworkApi';
import { useQuery } from 'react-query';

export default function useGetMyArtWork() {
  return useQuery<MyArtwork[], Error>(
    'useGetMyArtWork',
    () => artworkApi.getMyArtworkList(),
    {
      retry: 0,
      refetchOnWindowFocus: false,
    },
  );
}
