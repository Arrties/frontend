import * as SockJS from 'sockjs-client';
import * as StompJs from '@stomp/stompjs';
import { getToken } from '@utils/localStorage/token';

const access = getToken().accessToken;

const createClient = (endpoint) => {
  const client = new StompJs.Client({
    brokerURL: `wss://atties.shop${endpoint}`,
    connectHeaders: { Authorization: access },

    reconnectDelay: 0,
  });
  client.webSocketFactory = () => {
    const socketIn = new SockJS(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`,
    );
    return socketIn;
  };
  return client;
};

const subscribe = (client, roomId, subscribeCallback, isRoom = false) => {
  if (isRoom) {
    client.subscribe(`/queue/chat-rooms/${roomId}`, subscribeCallback, {
      Authorization: access,
      action: 'enter',
    });
  } else {
    client.subscribe(`/queue/chat-rooms/${roomId}`, subscribeCallback, {
      Authorization: access,
    });
  }
};

const publish = (client, roomId, senderId, chat) => {
  client.publish({
    destination: '/app/send',
    body: JSON.stringify({
      chatRoomId: roomId,
      senderId: senderId,
      content: chat,
    }),
  });
};

const publishImage = (client, roomId, senderId, chat) => {
  client.publish({
    destination: '/app/send',
    body: JSON.stringify({
      chatRoomId: roomId,
      senderId: senderId,
      encodedImage: chat,
    }),
  });
};

export { createClient, subscribe, publish, publishImage };
