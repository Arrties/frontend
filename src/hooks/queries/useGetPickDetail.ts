import { useQuery } from 'react-query';
import { useState } from 'react';
import instance from '@apis/_axios/instance';

interface PickDetail {
  member: Member;
  artworks: Artwork[];
}

const useGetPickDetail = (artistId: number) => {
  const [pickDetail, setPickDetail] = useState<PickDetail>();

  const query = useQuery(
    'useGetPickDetail',
    async () => {
      const res = await instance(`/artists/${artistId}`);
      return res;
    },
    {
      retry: 0,
      refetchOnWindowFocus: false,
      onSuccess: (res: any) => {
        setPickDetail(res?.data);
      },
      onError: (error: any) => {
        console.log(error);
      },
    },
  );
  return { ...query, pickDetail };
};

export default useGetPickDetail;
