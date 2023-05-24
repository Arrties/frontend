import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import moment from 'moment';
import 'moment/locale/ko';

interface ChatRoomProps {
  chatRoom: ChatRoom;
  [key: string]: any;
}

const MessageBox = styled.p`
  overflow: hidden;
  max-width: 260px;
  padding-left: 10px;
  padding-right: 5px;
  color: #191919;
  font-size: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export default function Chatroom({ chatRoom }: ChatRoomProps) {
  const handleChattingRoom = () => {
    router.push(`/chat/${chatRoom?.chatRoomId}`);
  };
  const router = useRouter();
  return (
    <section
      className="relative flex h-[4rem] cursor-pointer items-center border-b p-5 first:border-t"
      onClick={handleChattingRoom}
    >
      <div className="relative h-[3.0625rem] w-[3.0625rem]">
        <Image
          src={chatRoom?.otherMember?.image || '/svg/icons/avatar.svg'}
          alt="profile"
          fill
          className="rounded-full object-cover"
        />
      </div>
      <article className="flex flex-col">
        <div className="flex items-center">
          <p className="px-2 text-14 font-bold">
            {chatRoom?.otherMember?.name}
          </p>
          <p className="text-10 text-[#767676]">
            {chatRoom?.lastMessage?.sendDate &&
              moment(
                chatRoom?.lastMessage?.sendDate,
                'YYYY-MM-DD-hh-mm-ss',
              ).format('LT')}
          </p>
        </div>
        <MessageBox>{chatRoom?.lastMessage?.content}</MessageBox>
      </article>
      {!!chatRoom.unreadCount && (
        <article className="absolute right-16 flex h-[1.25rem] w-[1.25rem] items-center justify-center rounded-full bg-[#FC6554] text-12 text-[#FFF]">
          {chatRoom?.unreadCount}
        </article>
      )}
      <Image
        alt=""
        src={chatRoom?.artWorkImage || '/svg/icons/.svg'}
        width="30"
        height="0"
        className="absolute inset-y-0 right-5 my-auto h-10 w-10 rounded"
      />
    </section>
  );
}
