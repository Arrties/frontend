import ChattingMessage from '@components/chat/ChatMessage'
import Layout from '@components/common/Layout'
import Modal from '@components/common/Modal'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

interface ChatRoomProps {
  params: any;
}

interface ChatRoomForm {
  id: string;
  time: string;
  text: string;
  sender: 'me' | 'you';
}

interface MessageForm {
  message: string;
  image: FileList;
}

const DUMP_CHATLIST: ChatRoomForm[] = [
  {
    id: '1',
    time: '오전 10:30',
    text: '온주 작가님 안녕하세요',
    sender: 'me',
  },
  {
    id: '2',
    time: '오전 10:30',
    text: '작품 관련 문의사항이 있어 연락드렸습니다.',
    sender: 'me',
  },
  { id: '3', time: '오전 10:33', text: '네 안녕하세요!', sender: 'you' },
  { id: '4', time: '오전 10:33', text: '반갑습니다', sender: 'you' },
  { id: '5', time: '오전 10:35', text: '반가워요', sender: 'me' },
];

export default function ChatRoom({ params }: ChatRoomProps) {
  const router = useRouter();
  const { register, handleSubmit, watch } = useForm<MessageForm>();
  const { id } = router.query;
  const [isModal, setIsModal] = useState(false);
  const [chatList, setChatList] = useState<ChatRoomForm[]>(DUMP_CHATLIST);

  const handleBack = () => {
    router.push('/chat');
  };

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
      <header className="absolute top-0 inset-x-0 w-full h-[145px] bg-[#FC6554]">
        <article className="relative flex w-full mt-[70px] px-5 text-white">
          <Image
            src="/svg/icons/icon_back_white.svg"
            alt="back"
            width="11"
            height="0"
            onClick={() => router.back()}
            className="cursor-pointer"
          />
          <div className="text-16 px-5 ">온주</div>
          <div className="text-12 flex items-center">응답시간 : 1시간 이내</div>
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
      <section className="absolute top-[120px] inset-x-0 w-full bg-white rounded-xl p-5">
        <article className="flex items-center justify-center text-center text-[#767676] text-14 h-[40px] font-bold">
          2022년 12월 23일
        </article>
        <article className="mt-4">
          {chatList.map((chatItem: ChatRoomForm) => (
            <ChattingMessage
              key={chatItem.id}
              time={chatItem.time}
              text={chatItem.text}
              sender={chatItem.sender}
            />
          ))}
        </article>
      </section>
      <form
        className="absolute w-[327px] h-[50px] rounded-[24.5px] bg-[#F8F8FA] bottom-[30px] flex items-center px-[10px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          className="border-none bg-[#F8F8FA] w-[200px] h-[23px] placeholder:text-[#999999] text-14 font-semibold "
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
              className="flex justify-center items-center"
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

        {/* 임시버튼 */}
      </form>
    </Layout>
  );
}
