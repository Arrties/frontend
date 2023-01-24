import instance from '@apis/_axios/instance';
import { useQuery } from 'react-query';
import { useState } from 'react';

const useGetPick = () => {
  const [pickList, setPickList] = useState<Member[]>();

  const query = useQuery(
    'useGetPick',
    async () => {
      const response = await instance(`/members/preferred-artists`);
      return response;
    },
    {
      retry: 0,
      refetchOnWindowFocus: false,
      onSuccess: (response: any) => {
        setPickList(response?.data);
      },
      onError: (error: any) => {
        console.log(error);
      },
    },
  );
  return { ...query, pickList };
};

export default useGetPick;
