import { useQuery } from 'react-query';
import profileApi from '@apis/profile/profileApi';

const useGetPick = () => {
  return useQuery(
    'useGetPick',
    async () => {
      const response = await profileApi.getPick();
      return response;
    },
    {
      retry: 0,
      refetchOnWindowFocus: false,
    },
  );
};

export default useGetPick;
