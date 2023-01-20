import instance from '@apis/_axios/instance'
import { AxiosInstance } from 'axios'

import { ChatDTOType, ChatParamGetType, ChatRoomDTOType } from './chatApi.type'

export class ChatApi {
  axios: AxiosInstance = instance;
  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  async getChatRoomList(params: ChatParamGetType): Promise<ChatRoomDTOType[]> {
    const { data } = await this.axios.get('/chat-rooms', { params });
    return data;
  }

  async getChatById(id: string): Promise<ChatDTOType> {
    const { data } = await this.axios.get(`/chat-rooms/${id}`);
    return data;
  }

  async postChat(body: ChatDTOType): Promise<ChatDTOType> {
    const { data } = await this.axios.post('/chat-rooms', body);
    return data;
  }
}

const chatApi = new ChatApi();

export default chatApi;
