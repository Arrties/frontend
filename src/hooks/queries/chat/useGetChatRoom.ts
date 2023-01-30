import { ChatRoomDTOType } from './../../../apis/chat/chatApi.type';
import { useQuery } from 'react-query';
import chatApi from '@apis/chat/chatApi';

const useGetChatRoom = (id: number) => {
  return useQuery<ChatRoomDTOType, Error>(
    'useGetChatRoom',
    () => chatApi.getChatRoom(id),
    {
      retry: false,
      refetchOnWindowFocus: false,
    },
  );
};

export default useGetChatRoom;
