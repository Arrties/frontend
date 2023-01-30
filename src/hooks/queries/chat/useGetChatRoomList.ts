import { ChatRoomListDTOType } from './../../../apis/chat/chatApi.type';
import { useQuery } from 'react-query';
import chatApi from '@apis/chat/chatApi';

const useGetChatRoomList = () => {
  return useQuery<ChatRoomListDTOType, Error>(
    'useGetChatRoomList',
    () => chatApi.getChatRoomList(),
    { retry: 0, refetchOnWindowFocus: false },
  );
};

export default useGetChatRoomList;
