import * as StompJs from '@stomp/stompjs';
import Chatroom from '@components/chat/ChatRoom';
import Layout from '@components/common/Layout';
import Tab from '@components/common/Tab';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { createClient } from '@apis/chat/socketConnect';

interface ChatRoomListForm {
  id: string;
  profileImage: string;
  name: string;
  time: string;
  message: string;
  notifyCnt: number;
}

const DUMP_CHAT_ROOM_LIST: ChatRoomListForm[] = [
  {
    id: '1',
    profileImage: '/svg/icons/icon_basic_profile.svg',
    name: '온주',
    time: '오전 10:33',
    message: '작품에 대해 설명 드릴게요.',
    notifyCnt: 0,
  },
  {
    id: '2',
    profileImage: '/svg/icons/icon_basic_profile.svg',
    name: '온주',
    time: '오전 10:33',
    message: '작품에 대해 설명 드릴게요.',
    notifyCnt: 4,
  },
  {
    id: '3',
    profileImage: '/svg/icons/icon_basic_profile.svg',
    name: '온주',
    time: '오전 10:33',
    message: '작품에 대해 설명 드릴게요.',
    notifyCnt: 6,
  },
];

export default function Chat() {
  const [chatRoomList, setChatRoomList] =
    useState<ChatRoomListForm[]>(DUMP_CHAT_ROOM_LIST);

  const client = useRef({}) as React.MutableRefObject<StompJs.Client>;
  const router = useRouter();

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

  useEffect(() => {
    // 채팅방 GET API
  }, []);

  return (
    <>
      <Layout>
        <section className="text-16 font-bold">채팅</section>

        {chatRoomList.length ? (
          <div className="absolute inset-x-0 mt-5 w-full ">
            {chatRoomList.map((chatRoom: ChatRoomListForm) => (
              <Chatroom chatRoom={chatRoom} key={chatRoom.id} />
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
      </Layout>{' '}
      <Tab />
    </>
  );
}
