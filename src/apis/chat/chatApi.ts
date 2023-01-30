import instance from '@apis/_axios/instance';
import {
  ChatDTOType,
  ChatRoomListDTOType,
  ChatRoomDTOType,
} from './chatApi.type';

export class ChatApi {
  async getChatRoomList(): Promise<ChatRoomListDTOType> {
    const { data } = await instance.get('/chat-rooms');
    return data;
  }

  async getChatRoom(id: number): Promise<ChatRoomDTOType> {
    const { data } = await instance.get(`/chat-rooms/${id}`);
    return data;
  }

  async postChatRoom(body: ChatDTOType): Promise<any> {
    const { data } = await instance.post('/chat-rooms', body);
    return data;
  }
  async deleteChatRoom(id: number): Promise<any> {
    const response = await instance.delete(`/chat-rooms/${id}`);
    return response;
  }
}

const chatApi = new ChatApi();

export default chatApi;
