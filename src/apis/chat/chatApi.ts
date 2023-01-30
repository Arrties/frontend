import instance from '@apis/_axios/instance';

export class ChatApi {
  async getChatRoomList(): Promise<ChatRoomList> {
    const { data } = await instance.get('/chat-rooms');
    return data;
  }

  async getChatRoom(id: number): Promise<ChatRoomById> {
    const { data } = await instance.get(`/chat-rooms/${id}`);
    return data;
  }

  async postChatRoom(body: Chat): Promise<any> {
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
