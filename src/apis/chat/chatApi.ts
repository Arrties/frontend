import instance from '@apis/_axios/instance';
import { ChatDTOType, ChatRoomDTOType } from './chatApi.type';

export class ChatApi {
  async getChatRoomList(): Promise<ChatRoomDTOType[]> {
    const { data } = await instance.get('/chat-rooms');
    return data;
  }

  async getChatRoom(id: number): Promise<ChatDTOType> {
    const { data } = await instance.get(`/chat-rooms/${id}`);
    return data;
  }

  async postChat(body: ChatDTOType): Promise<any> {
    const { data } = await instance.post('/chat-rooms', body);
    return data;
  }
}

const chatApi = new ChatApi();

export default chatApi;
