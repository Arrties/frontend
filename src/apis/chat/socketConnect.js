import * as SockJS from 'sockjs-client';
import * as StompJs from '@stomp/stompjs';
import { getToken } from '@utils/localStorage/token';

const createClient = (endpoint) => {
  const access = getToken().accessToken;
  const client = new StompJs.Client({
    brokerURL: `wss://atties.shop${endpoint}`,
    connectHeaders: { Authorization: access },
  });
  client.webSocketFactory = () => {
    const socketIn = new SockJS(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`,
    );
    return socketIn;
  };
  return client;
};

const subscribe = async (client, roomId, subscribeCallback) => {
  await client.subscribe(`/queue/chat-rooms/${roomId}`, subscribeCallback);
};

const publish = (client, roomId, senderId, chat) => {
  client.publish({
    destination: '/app/send',
    body: JSON.stringify({
      chatRoomId: roomId,
      senderId: senderId,
      message: chat,
    }),
  });
};

export { createClient, subscribe, publish };
