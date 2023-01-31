import ChattingMessage from '@components/chat/ChatMessage';
import Layout from '@components/common/Layout';
import Modal from '@components/common/Modal';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import useGetChatRoom from '@hooks/queries/chat/useGetChatRoom';
import * as StompJs from '@stomp/stompjs';
import { createClient, publish, subscribe } from '@apis/chat/socketConnect';
import chatApi from '@apis/chat/chatApi';
import useGetProfile from '@hooks/queries/useGetProfile';
import { isUser } from '@utils/isUser';
interface ContentForm {
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
  useEffect(() => {
    window.addEventListener('beforeunload', (event) => {
      // 채팅방 나가기 API전송
    });
  }, []);
  const scrollRef = useRef();

  const id = params?.id;
  const router = useRouter();
  const { register, handleSubmit, watch, reset } = useForm<ContentForm>();
  const { data: chatRoom, refetch: refetchChatRoom } = useGetChatRoom(+id);
  const { artist, member, messages } = chatRoom || {};
  const { data: userInfo } = useGetProfile();
  const userId = userInfo?.id || 0;

  const [isModal, setIsModal] = useState(false);

  const handleOption = () => {
    setIsModal(true);
  };
  const onCloseModal = () => {
    setIsModal(false);
  };
  const onAccept = async () => {
    console.log('채팅방 나가기');
    const response = await chatApi.deleteChatRoom(id);
    if (response?.status === 200) {
      router.push('/chat');
    }
    // 채팅방 나가기 API
  };

  const image = watch('image');
  useEffect(() => {
    if (image && image.length > 0) {
      console.log(image[0]);
      // 사진 API전송
    }
  }, [image]);

  const client: any = useRef({}) as React.MutableRefObject<StompJs.Client>;
  const connect = async () => {
    client.current = await createClient('/ws-connection');
    client.current.onConnect = await onConnected;
    await client.current.activate();
  };

  const onConnected = () => {
    subscribe(client.current, id, subscribeCallback);
  };

  const subscribeCallback = (response) => {
    console.log(response);
    refetchChatRoom();
    reset({ message: '' });
  };

  useEffect(() => {
    connect();
  }, []);
  const disconnect = () => {
    client.current.deactivate();
  };

  const onSubmit = (form: { message: string; image: FileList }) => {
    if (!client.current.connected) return;
    publish(client.current, id, userInfo?.id, form?.message);
  };

  useEffect(() => {
    scrollRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });
  }, [messages]);

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
      <header className="fixed inset-x-0 top-0 mx-auto h-[145px] max-w-[420px] bg-[#FC6554]">
        <article className="relative mt-[70px] flex w-full px-5 text-white">
          <Image
            src="/svg/icons/icon_back_white.svg"
            alt="back"
            width="11"
            height="0"
            onClick={() => router.back()}
            className="cursor-pointer"
          />
          <div className="px-5 text-16 ">
            {isUser ? artist?.name : member?.name}
          </div>
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
      <section
        className="overflow absolute inset-x-0 top-[120px] w-full  rounded-xl bg-white p-5"
        ref={scrollRef}
      >
        <article className="flex h-[40px] items-center justify-center text-center text-14 font-bold text-[#767676]">
          2022년 12월 23일
        </article>
        <article className="mt-4">
          {messages &&
            messages.map((message: Message, idx: number) => (
              <ChattingMessage
                key={idx}
                sender={+userId === message?.senderId ? 'me' : 'you'}
                sendDate={message.sendDate}
                message={message.message}
              />
            ))}
        </article>
      </section>
      <form
        className="fixed bottom-[30px] flex h-[50px] w-[327px] items-center rounded-[24.5px] bg-[#F8F8FA] px-[10px]"
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
