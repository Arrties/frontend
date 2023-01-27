import ChattingMessage from '@components/chat/ChatMessage';
import Layout from '@components/common/Layout';
import Modal from '@components/common/Modal';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import useGetChatRoom from '@hooks/queries/chat/useGetChatRoom';
interface ChatRoomForm {
  senderId: string;
  sendDate: string;
  message: string;
}

interface MessageForm {
  message: string;
  image: FileList;
}

export function getServerSideProps({ params }) {
  return {
    props: {
      params,
    },
  };
}

export default function ChatRoom({ params }) {
  const router = useRouter();
  const { register, handleSubmit, watch } = useForm<MessageForm>();
  const [isModal, setIsModal] = useState(false);
  const { data: chatRoom } = useGetChatRoom(Number(params?.id));
  const { artist, chatRoomId, member, messages } = chatRoom || { messages: [] };

  const handleOption = () => {
    console.log('option');
    setIsModal(true);
  };
  const onCloseModal = () => {
    setIsModal(false);
  };
  const onAccept = () => {
    console.log('채팅방 나가기');
    // 채팅방 나가기 API
  };

  const onSubmit = (form: MessageForm) => {
    console.log(form);
    console.log(chatRoom);
    // publish(form.message);
  };

  const image = watch('image');
  useEffect(() => {
    if (image && image.length > 0) {
      console.log(image[0]);
      // 사진 API전송
    }
  }, [image]);

  return (
    <Layout>
      <Modal
        isMain
        message="채팅방을 나가면 채팅 목록 및 대화내용이 삭제 됩니다.
채팅방에서 나가시겠어요?"
        isModal={isModal}
        onCloseModal={onCloseModal}
        denyMessage="나가기"
        onAccept={onAccept}
      />
      <header className="absolute inset-x-0 top-0 h-[145px] w-full bg-[#FC6554]">
        <article className="relative mt-[70px] flex w-full px-5 text-white">
          <Image
            src="/svg/icons/icon_back_white.svg"
            alt="back"
            width="11"
            height="0"
            onClick={() => router.back()}
            className="cursor-pointer"
          />
          <div className="px-5 text-16 ">{artist?.name}</div>
          <div className="flex items-center text-12">응답시간 : 1시간 이내</div>
          <Image
            src="/svg/icons/icon_option.svg"
            alt="option"
            width="3"
            height="0"
            className="absolute right-5 cursor-pointer"
            onClick={handleOption}
          />
        </article>
      </header>
      <section className="absolute inset-x-0 top-[120px] w-full rounded-xl bg-white p-5">
        <article className="flex h-[40px] items-center justify-center text-center text-14 font-bold text-[#767676]">
          2022년 12월 23일
        </article>
        <article className="mt-4">
          {messages.map((chatItem: ChatRoomForm) => (
            <ChattingMessage
              key={chatItem.senderId}
              time={chatItem.sendDate}
              text={chatItem.message}
              sender={chatItem.senderId}
            />
          ))}
        </article>
      </section>
      <form
        className="absolute bottom-[30px] flex h-[50px] w-[327px] items-center rounded-[24.5px] bg-[#F8F8FA] px-[10px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          className="h-[23px] w-[200px] border-none bg-[#F8F8FA] text-14 font-semibold placeholder:text-[#999999] "
          placeholder="메세지를 입력해주세요."
          {...register('message', { required: true })}
        />
        {watch('message') ? (
          <Image
            alt=""
            src="/svg/icons/icon_send.svg"
            width="22"
            height="0"
            className="absolute right-[15px] cursor-pointer"
          />
        ) : (
          <>
            <Image
              src="/svg/icons/icon_glasses.svg"
              alt="glasses"
              width="25"
              height="0"
              className="absolute right-14 cursor-pointer"
            />
            <label
              className="flex items-center justify-center"
              htmlFor="profileImage"
            >
              <Image
                src="/svg/icons/icon_picture.svg"
                alt="picture"
                width="25"
                height="0"
                className="absolute right-6 cursor-pointer"
              />
            </label>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              className="hidden"
              {...register('image')}
            />
          </>
        )}
      </form>
    </Layout>
  );
}
