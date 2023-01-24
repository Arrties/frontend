import instance from '@apis/_axios/instance';
import { useQuery } from 'react-query';
import { useState } from 'react';

export default function useGetKeywordArtWork() {
  const [keywordArtWork, setKeywordArtWork] = useState<Member[]>();

  const query = useQuery(
    'useKeywordArtWork',
    async () => {
      const response = await instance(
        '/members/customized-artworks?page=1&limit=5',
      );
      console.log(response);
      return response;
    },
    {
      retry: 0,
      refetchOnWindowFocus: false,
      onSuccess: (response: any) => {
        setKeywordArtWork(response?.data);
      },
      onError: (error: any) => {
        console.log(error);
      },
    },
  );
  return { ...query, keywordArtWork };
}
