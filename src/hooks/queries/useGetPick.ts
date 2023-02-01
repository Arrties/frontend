import { useQuery } from 'react-query';
import profileApi from '@apis/profile/profileApi';

const useGetPick = () => {
  return useQuery(
    'useGetPick',
    () => profileApi.getPick(),

    {
      retry: 0,
      refetchOnWindowFocus: false,
    },
  );
};

export default useGetPick;
