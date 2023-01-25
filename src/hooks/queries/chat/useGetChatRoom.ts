import { useQuery } from 'react-query';
import chatApi from '@apis/chat/chatApi';

const useGetChatRoom = () => {
  return useQuery<any, Error>('useGetChatRoom', () =>
    chatApi.getChatRoomList(),
  );
};

export default useGetChatRoom;
