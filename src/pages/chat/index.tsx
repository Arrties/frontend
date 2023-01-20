import * as StompJs from '@stomp/stompjs'
import Chatroom from '@components/chat/ChatRoom'
import Layout from '@components/common/Layout'
import Tab from '@components/common/Tab'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { createClient } from '@apis/chat/socketConnect'

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
    // client.current = createClient('/ws-connection');
    // client.current.activate();
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
    <Layout>
      <section className="font-bold text-16">채팅</section>

      {chatRoomList.length ? (
        <div className="mt-5 absolute w-full inset-x-0 ">
          {chatRoomList.map((chatRoom: ChatRoomListForm) => (
            <Chatroom chatRoom={chatRoom} key={chatRoom.id} />
          ))}
        </div>
      ) : (
        <section className="flex justify-center items-center h-[650px]">
          <Image
            src={'/svg/icons/icon_chat_main.svg'}
            width="150"
            height="0"
            alt="chat"
          />
        </section>
      )}
      <Tab />
    </Layout>
  );
}
