import { useQuery } from 'react-query';
import chatApi from '@apis/chat/chatApi';

const useGetChatRoom = (id: number) => {
  return useQuery<ChatRoomById, Error>(
    'useGetChatRoom',
    () => chatApi.getChatRoom(id),
    {
      retry: false,
      refetchOnWindowFocus: false,
    },
  );
};

export default useGetChatRoom;
