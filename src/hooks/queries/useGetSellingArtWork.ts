import instance from '@apis/_axios/instance';
import { useQuery } from 'react-query';
import { useState } from 'react';

export default function useGetSellingArtWork() {
  const [sellingArtWork, setSellingArtWork] = useState<Member[]>();

  const query = useQuery(
    'useSellingArtWork',
    async () => {
      const response = await instance('/art-works/me');
      console.log(response);
      return response;
    },
    {
      retry: 0,
      refetchOnWindowFocus: false,
      onSuccess: (response: any) => {
        setSellingArtWork(response?.data);
      },
      onError: (error: any) => {
        console.log(error);
      },
    },
  );
  return { ...query, sellingArtWork };
}
