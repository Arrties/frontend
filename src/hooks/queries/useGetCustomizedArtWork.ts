import homeApi from '@apis/home/homeApi';
import { useQuery } from '@tanstack/react-query';

export default function useGetCustomizedArtWork(page: number, limit: number) {
  return useQuery<CustomizeArtwork, Error>(['useCustomizedArtWork'], () =>
    homeApi.getCustomizedArtWork(page, limit),
  );
}
