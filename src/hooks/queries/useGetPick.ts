import { useQuery } from 'react-query';
import { useState } from 'react';
import instance from '@apis/_axios/instance';

const useGetPick = () => {
  const [pickList, setPickList] = useState<Member[]>();

  const query = useQuery(
    'useGetPick',
    async () => {
      const res = await instance(`/members/preferred-artists`);
      return res;
    },
    {
      retry: 0,
      refetchOnWindowFocus: false,
      onSuccess: (res: any) => {
        setPickList(res?.data);
      },
      onError: (error: any) => {
        console.log(error);
      },
    },
  );
  return { ...query, pickList };
};

export default useGetPick;
