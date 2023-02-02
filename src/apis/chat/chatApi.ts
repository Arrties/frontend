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

  async postChatRoom(body: Chat): Promise<chatData> {
    const { data } = await instance.post('/chat-rooms', body);
    return data;
  }
  async deleteChatRoom(id: number): Promise<any> {
    await instance.delete(`/chat-rooms/${id}`);
  }
}

const chatApi = new ChatApi();

export default chatApi;
