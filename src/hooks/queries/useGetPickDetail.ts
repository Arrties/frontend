import instance from '@apis/_axios/instance';
import { useQuery } from 'react-query';
import { useState } from 'react';

interface PickDetail {
  member: Member;
  artworks: Artwork[];
}

const useGetPickDetail = (artistId: number) => {
  const [pickDetail, setPickDetail] = useState<PickDetail>();

  const query = useQuery(
    'useGetPickDetail',
    async () => {
      const response = await instance(`/artists/${artistId}`);
      return response;
    },
    {
      retry: 0,
      refetchOnWindowFocus: false,
      onSuccess: (response: any) => {
        setPickDetail(response?.data);
      },
      onError: (error: any) => {
        console.log(error);
      },
    },
  );
  return { ...query, pickDetail };
};

export default useGetPickDetail;
