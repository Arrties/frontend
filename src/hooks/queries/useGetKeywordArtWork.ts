import homeApi from '@apis/home/homeApi';
import { useQuery } from 'react-query';

interface KeywordArtwork {
  id: string;
  image: string;
  title: string;
  education: string;
}

export default function useGetKeywordArtWork() {
  return useQuery<KeywordArtwork[], Error>('useKeywordArtWork', () =>
    homeApi.getKeywordArtWork(),
  );
}
