import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/router';

interface ChatRoomProps {
  chatRoom: ChatRoom;
  [key: string]: any;
}

export default function Chatroom({ chatRoom }: ChatRoomProps) {
  const handleChattingRoom = () => {
    router.push(`/chat/${chatRoom?.chatRoomId}`);
  };
  const router = useRouter();
  return (
    <section
      className="relative flex h-[64px] cursor-pointer items-center border-b  p-5 first:border-t"
      onClick={handleChattingRoom}
    >
      <Image
        src={chatRoom?.otherMember?.image || '/svg/icons/icon_avatar.svg'}
        alt="profile"
        width="40"
        height="0"
        className="mx-1"
      />

      <article className="flex flex-col items-start">
        <div className="flex">
          <p className="flex items-center justify-center px-2 text-14 font-bold text-[#191919]">
            {chatRoom?.otherMember?.name}
          </p>
          <p className="flex items-center justify-center text-10 text-[#767676]">
            {chatRoom?.lastMessage?.sendDate}
          </p>
        </div>
        <p className="mt-1 flex items-center justify-center px-2 text-12 text-[#191919]">
          {chatRoom?.lastMessage?.message}
        </p>
      </article>
      {!!chatRoom.unreadCount && (
        <article className="absolute right-5 flex h-[20px] w-[20px] items-center justify-center rounded-full bg-[#FC6554] text-12 text-[#FFF]">
          {chatRoom?.unreadCount}
        </article>
      )}
      <Image
        alt=""
        src={chatRoom?.artWorkImage || '/svg/icons/icon_.svg'}
        width="30"
        height="0"
        className="absolute inset-y-0 right-7 my-auto "
      />
    </section>
  );
}
