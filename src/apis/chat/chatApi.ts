import instance from '@apis/_axios/instance';
import { AxiosInstance } from 'axios';

import { ChatDTOType, ChatParamGetType, ChatRoomDTOType } from './chatApi.type';

export class ChatApi {
  axios: AxiosInstance = instance;

  async getChatRoomList(): Promise<ChatRoomDTOType[]> {
    const { data } = await instance.get('/chat-rooms');
    return data;
  }

  async getChatById(id: string): Promise<ChatDTOType> {
    const { data } = await instance.get(`/chat-rooms/${id}`);
    return data;
  }

  async postChat(body: ChatDTOType): Promise<ChatDTOType> {
    const { data } = await instance.post('/chat-rooms', body);
    return data;
  }
}

const chatApi = new ChatApi();

export default chatApi;
