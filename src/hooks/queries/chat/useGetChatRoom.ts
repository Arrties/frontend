import { useQuery } from 'react-query';
import chatApi from '@apis/chat/chatApi';

const useGetChatRoom = (id: number) => {
  return useQuery<any, Error>('useGetChatRoom', () => chatApi.getChatRoom(id), {
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export default useGetChatRoom;
