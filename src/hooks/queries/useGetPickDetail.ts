import { useQuery } from 'react-query';
import { useState } from 'react';
import profileApi from '@apis/profile/profileApi';

interface PickDetail {
  member: Member;
  artworks: Artwork[];
}

const useGetPickDetail = (artistId: number) => {
  return useQuery(
    'useGetPickDetail',
    async () => {
      const response = await profileApi.getPickDetail(artistId);
      return response;
    },
    {
      retry: 0,
      refetchOnWindowFocus: false,
    },
  );
};

export default useGetPickDetail;
