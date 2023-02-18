import artworkApi from '@apis/artwork/artworkApi';
import Modal from '@components/common/Modal';
import { useState } from 'react';
import tw from 'tailwind-styled-components';
import { useRouter } from 'next/router';

interface ModalProps {
  onCloseModal: () => void;
  thisId: number;
  [key: string]: any;
}

interface DefaultProps {
  [key: string]: any;
}

const ModalTag = tw.div<DefaultProps>`fixed inset-x-0 inset-y-0 z-10`;

const MainModalBackground = tw.div`
  fixed inset-0 bg-[#767676] opacity-60 backdrop-blur-3xl z-9
`;
const MainModalInner = tw.div<DefaultProps>`
absolute z-10 w-full h-[202px] bottom-0 bg-[#fff] flex flex-col items-center justify-around
`;
const SelectEdit = tw.div`text-[#3478F6] w-full  grow border-b border-[#ebdede] flex justify-center items-center`;
const SelectDelete = tw.div`text-[#FF3120] w-full  grow border-b border-[#ebdede]  flex justify-center items-center`;
const SelectCancel = tw.div`text-[#3478F6] w-full  grow  flex justify-center items-center`;

export default function SellingModal({
  onCloseModal,
  thisId,
  ...rest
}: ModalProps) {
  const [modalMessage, setModalMessage] = useState<string>('');
  const router = useRouter();

  const handleAccept = () => {
    if (modalMessage === '수정') {
      router.push({ pathname: '/profile/selling/edit', query: { id: thisId } });
    } else {
      artworkApi.deleteArtwork(thisId);
      router.replace('/profile/selling');
    }
  };

  return (
    <>
      {!!modalMessage && (
        <Modal
          isModal={modalMessage !== ''}
          isMain
          onCloseModal={() => {
            setModalMessage('');
          }}
          message="경매 중으로 넘어간 작품은 수정/삭제가 불가능 합니다."
          denyMessage={modalMessage}
          className="top-5"
          onAccept={handleAccept}
        />
      )}
      <ModalTag {...rest}>
        <MainModalBackground onClick={onCloseModal} />
        <MainModalInner>
          <SelectEdit
            onClick={() => {
              setModalMessage('수정');
            }}
          >
            게시글 수정
          </SelectEdit>
          <SelectDelete
            onClick={() => {
              setModalMessage('삭제');
            }}
          >
            삭제
          </SelectDelete>
          <SelectCancel onClick={onCloseModal}>취소</SelectCancel>
        </MainModalInner>
      </ModalTag>
    </>
  );
}
