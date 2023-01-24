import instance from '@apis/_axios/instance';
import { useQuery } from 'react-query';
import { useState } from 'react';

export default function useGetKeywordArtWork() {
  const [keywordArtWork, setKeywordArtWork] = useState<Member[]>();

  const query = useQuery(
    'useKeywordArtWork',
    async () => {
      const res = await instance('/members/customized-artworks?page=1&limit=5');
      return res;
    },
    {
      retry: 0,
      refetchOnWindowFocus: false,
      onSuccess: (res: any) => {
        setKeywordArtWork(res?.data);
      },
      onError: (error: any) => {
        console.log(error);
      },
    },
  );
  return { ...query, keywordArtWork };
}
