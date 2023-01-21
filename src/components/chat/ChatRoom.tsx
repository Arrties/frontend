import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/router'

interface ChatRoomForm {
  id: string;
  profileImage: string;
  name: string;
  time: string;
  message: string;
  notifyCnt: number;
}

interface ChatRoomProps {
  chatRoom: ChatRoomForm;
  [key: string]: any;
}

export default function Chatroom({ chatRoom }: ChatRoomProps) {
  const handleChattingRoom = () => {
    router.push(`/chat/${chatRoom.id}`);
  };
  const router = useRouter();
  return (
    <section
      className="h-[64px] flex items-center relative border-b cursor-pointer p-5 first:border-t"
      onClick={handleChattingRoom}
    >
      <article>
        <Image
          src={chatRoom.profileImage}
          alt="profile"
          width="40"
          height="0"
          className="mx-1"
        />
      </article>

      <article className="flex flex-col">
        <div className="flex">
          <p className="text-[#191919] text-14 flex items-center justify-center font-bold px-2">
            {chatRoom.name}
          </p>
          <p className="text-[#767676] text-10 flex items-center justify-center">
            {chatRoom.time}
          </p>
        </div>
        <p className="text-[#191919] text-12 flex items-center justify-center px-2 mt-1">
          {chatRoom.message}
        </p>
      </article>
      {!!chatRoom.notifyCnt && (
        <article className="absolute right-5 bg-[#FC6554] w-[20px] h-[20px] flex justify-center items-center text-[#FFF] text-12 rounded-full">
          {chatRoom.notifyCnt}
        </article>
      )}
    </section>
  );
}
