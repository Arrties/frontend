import instance from '@apis/_axios/instance';
import { useQuery } from 'react-query';
import { useState } from 'react';

interface InquiryForm {
  date: string;
  time: string;
  title: string;
  content: string;
  status: string;
  answer: string;
  id: number;
}

export default function useGetInquiry() {
  const [inquiryList, setInquiryList] = useState<InquiryForm[]>();

  const query = useQuery(
    'useInquiry',
    async () => {
      const response = await instance('/members/ask');
      return response;
    },
    {
      retry: 0,
      refetchOnWindowFocus: false,
      onSuccess: (response: any) => {
        setInquiryList(response?.data);
      },
      onError: (error: any) => {
        console.log(error);
      },
    },
  );
  return { ...query, inquiryList };
}
