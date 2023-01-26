import { useQuery } from 'react-query';
import chatApi from '@apis/chat/chatApi';

const useGetChatRoomList = () => {
  return useQuery<any, Error>(
    'useGetChatRoomList',
    () => chatApi.getChatRoomList(),
    { retry: 0 },
  );
};

export default useGetChatRoomList;
