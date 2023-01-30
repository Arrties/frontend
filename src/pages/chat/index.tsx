import * as StompJs from '@stomp/stompjs';
import Chatroom from '@components/chat/ChatRoom';
import Layout from '@components/common/Layout';
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { createClient, subscribe } from '@apis/chat/socketConnect';
import Tab from '@components/common/Tab';
import useGetChatRoomList from '@hooks/queries/chat/useGetChatRoomList';

export default function Chat() {
  const router = useRouter();
  const client: any = useRef({}) as React.MutableRefObject<StompJs.Client>;
  const { data: chatRoomlist, refetch: refetchChatRoomList } =
    useGetChatRoomList();
  const chatRoomList = chatRoomlist?.chatRooms || [];
  const connect = () => {
    client.current = createClient('/ws-connection');
    client.current.onConnect = onConnected;
    client.current.activate();
  };

  const onConnected = () => {
    chatRoomList.forEach((chatRoom) => {
      console.log(chatRoom?.chatRoomId, 2);
      subscribe(client.current, chatRoom?.chatRoomId, subscribeCallback);
    });
  };

  const subscribeCallback = (response) => {
    const responseBody = JSON.parse(response.body);
    console.log(responseBody);
    refetchChatRoomList();
  };

  useEffect(() => {
    connect();
    () => {
      disconnect();
    };
  }, [chatRoomlist]);

  const disconnect = () => {
    client.current.deactivate();
  };

  return (
    <>
      <Layout>
        <section className="flex h-20 items-center text-16 font-bold">
          채팅
        </section>
        {chatRoomList?.length ? (
          <div className="absolute inset-x-0 mt-5 w-full ">
            {chatRoomList.map((chatRoom: ChatRoom) => (
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
