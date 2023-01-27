import * as StompJs from '@stomp/stompjs';
import Chatroom from '@components/chat/ChatRoom';
import Layout from '@components/common/Layout';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { createClient, publish, subscribe } from '@apis/chat/socketConnect';
import Tab from '@components/common/Tab';
import useGetChatRoomList from '@hooks/queries/chat/useGetChatRoomList';
import useGetChatRoom from '@hooks/queries/chat/useGetChatRoom';

interface ChatRoomListForm {
  artWorkImage: string;
  chatRoomId: number;
  lastMessage: {
    message: string;
    sendDate: string;
  };
  otherMember: {
    id: number;
    name: string;
    image: string;
  };
  unreadCount: number;
}

export default function Chat() {
  const router = useRouter();
  const client: any = useRef({}) as React.MutableRefObject<StompJs.Client>;
  const { data: chatRooms } = useGetChatRoomList();
  const chatRoomList = chatRooms?.chatRooms || [];
  // const { data: chatRoom, refetch: refetchChatRoom } = useGetChatRoom(1);
  // const { data: chatRoomList } = useGetChatRoomList();
  const connect = () => {
    client.current = createClient('/ws-connection');
    client.current.onConnect = onConnected;
    client.current.activate();
  };
  const sendChat = () => {
    if (!client.current.connected) return;
    publish(client.current, 1, '박규성', 'abcde');
    // refetchChatRoom();
  };

  const onConnected = () => {
    subscribe(client.current, 1, subscribeCallback);
  };

  const subscribeCallback = (response) => {
    console.log(response);
    const responseBody = JSON.parse(response.body);
    console.log(responseBody);
  };

  useEffect(() => {
    connect();
    // () => {
    //   disconnect();
    // };
  }, []);

  const disconnect = () => {
    client.current.deactivate();
  };

  return (
    <>
      <button onClick={sendChat}>눌러</button>
      <Layout>
        <section className="flex h-20 items-center text-16 font-bold">
          채팅
        </section>
        {chatRoomList?.length ? (
          <div className="absolute inset-x-0 mt-5 w-full ">
            {chatRoomList.map((chatRoom: ChatRoomListForm) => (
              <Chatroom chatRoom={chatRoom} key={chatRoom.chatRoomId} />
            ))}
          </div>
        ) : (
          <section className="flex h-[650px] items-center justify-center">
            <Image
              src={'/svg/icons/icon_chat_main.svg'}
              width="150"
              height="0"
              alt="chat"
            />
          </section>
        )}
      </Layout>
      <Tab />
    </>
  );
}
