import instance from '@apis/_axios/instance';
import { useQuery } from 'react-query';
import { useState } from 'react';

export default function useGetSellingArtWork() {
  const [sellingArtWork, setSellingArtWork] = useState<Member[]>();

  const query = useQuery(
    'useSellingArtWork',
    async () => {
      const res = await instance('/art-works/me');
      console.log(res);
      return res;
    },
    {
      retry: 0,
      refetchOnWindowFocus: false,
      onSuccess: (res: any) => {
        setSellingArtWork(res?.data);
      },
      onError: (error: any) => {
        console.log(error);
      },
    },
  );
  return { ...query, sellingArtWork };
}
