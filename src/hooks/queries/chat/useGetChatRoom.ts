import { useQuery } from '@tanstack/react-query';
import chatApi from '@apis/chat/chatApi';

const useGetChatRoom = (id: number) => {
  return useQuery<ChatRoomById, Error>(
    ['useGetChatRoom', id],
    () => chatApi.getChatRoom(id),
    {
      enabled: !!id,
    },
  );
};

export default useGetChatRoom;
