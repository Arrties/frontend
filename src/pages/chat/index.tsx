import * as StompJs from '@stomp/stompjs';
import Chatroom from '@components/chat/ChatRoom';
import Layout from '@components/common/Layout';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { createClient } from '@apis/chat/socketConnect';
import Tab from '@components/common/Tab';
import useGetChatRoom from '@hooks/queries/chat/useGetChatRoom';

interface ChatRoomListForm {
  artWorkImage: string;
  chatRoomId: number;
  lastMessage: string;
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
  const { data } = useGetChatRoom();
  const chatRoomList = data?.chatRooms || [];
  console.log(chatRoomList);

  const connect = () => {
    client.current = createClient('/ws-connection');
    client.current.activate();
  };

  useEffect(() => {
    connect();
    () => {
      disconnect();
    };
  }, []);

  const disconnect = () => {
    client.current.deactivate();
  };

  return (
    <>
      <Layout>
        <section className="text-16 font-bold">채팅</section>

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
