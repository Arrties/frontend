import * as SockJS from 'sockjs-client';
import * as StompJs from '@stomp/stompjs';
import { getToken } from '@utils/localStorage/token';
/**
 * 소켓을 생성하는 함수
 * @param {String} endpoint
 * @returns
 */
const access = getToken().accessToken;
const headers = { Authorization: access };
const createClient = (endpoint) => {
  // 토큰 헤더에 담기
  if (!access) return;
  const client = new StompJs.Client({
    brokerURL: `wss://atties.shop${endpoint}`,
    connectHeaders: headers,
    debug: (str) => {
      console.log(str);
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
  });
  client.webSocketFactory = () => {
    const socketIn = new SockJS(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`,
    );
    return socketIn;
  };

  return client;
};

/**
 * 특정 방을 구독하는 함수
 * @param {StompJsClient} client
 * @param {Number} roomId
 * @param {Function} subscribeCallback
 *
 */
const subscribe = (client, roomId, subscribeCallback) => {
  client.subscribe(`/queue/chat-rooms/${roomId}`, subscribeCallback);
};

const publish = (client, roomId, senderId, chat) => {
  client.publish({
    destination: '/app/send',
    body: {
      chatRoomId: roomId,
      sender: senderId,
      message: chat,
    },
  });
};

export { createClient, subscribe, publish };
