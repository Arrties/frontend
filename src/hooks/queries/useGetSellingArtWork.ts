import instance from '@apis/_axios/instance';
import { useQuery } from 'react-query';

export default function useGetSellingArtWork() {
  return useQuery('useSellingArtWork', () => instance('/art-works/me'), {
    retry: 0,
    refetchOnWindowFocus: false,
  });
}
