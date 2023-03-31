import tw from 'tailwind-styled-components';

interface ModalProps {
  message: string;
  isModal: boolean;
  isMain?: boolean;
  denyMessage?: string;
  onCloseModal: () => void;
  onAccept?: (e) => void;
  [key: string]: any;
}

interface DefaultProps {
  [key: string]: any;
}

const ModalTag = tw.div<DefaultProps>`fixed inset-x-0 inset-y-0 z-20`;

const ModalBackground = tw.div`
  absolute inset-0 bg-[#767676] opacity-80 backdrop-blur-3xl z-20
`;
const ModalInner = tw.div<DefaultProps>`
  z-20 w-[20.4375rem] h-[9.75rem] absolute inset-0 m-auto
`;
const ModalMessage = tw.div`
h-[6.5rem] bg-white text-[#191919] text-14 rounded-t-[0.25rem] flex items-center justify-center font-bold px-5
`;
const ModalAccept = tw.div`
bg-[#FC6554] h-[3.25rem] rounded-b-[0.25rem] text-white flex items-center justify-center cursor-pointer
`;

const MainModalBackground = tw.div`
  absolute inset-0 bg-[#767676] opacity-60 backdrop-blur-3xl z-10
`;
const MainModalInner = tw.div<DefaultProps>`
absolute z-10 w-[20.4375rem] h-[9.75rem] bg-[#fff] inset-0 m-auto rounded-[0.25rem] 
`;
const MainModalMessage = tw.div`
h-[6.5rem] text-[#191919] text-14 rounded-t-[0.25rem] flex items-center justify-center font-bold p-5 text-14
`;

const MainModalDeny = tw.div`
w-[7.875rem] h-[2.125rem] border border-[#DBDBDB] rounded-[0.25rem] flex items-center justify-center cursor-pointer
`;
const MainModalAccept = tw.div`
w-[7.875rem] h-[2.125rem]  bg-[#FC6554] rounded-[0.25rem] text-[#FFF] flex items-center justify-center cursor-pointer
`;

export default function Modal({
  message,
  isModal = false,
  isMain = false,
  onCloseModal,
  denyMessage,
  onAccept,
  ...rest
}: ModalProps) {
  return isModal ? (
    isMain ? (
      <ModalTag {...rest}>
        <MainModalBackground onClick={onCloseModal} />
        <MainModalInner>
          <MainModalMessage>{message}</MainModalMessage>
          <div className="flex w-full justify-evenly ">
            <MainModalDeny onClick={onCloseModal}>취소</MainModalDeny>
            <MainModalAccept onClick={onAccept}>{denyMessage}</MainModalAccept>
          </div>
        </MainModalInner>
      </ModalTag>
    ) : (
      <ModalTag {...rest}>
        <ModalBackground onClick={onCloseModal} />
        <ModalInner>
          <ModalMessage>{message}</ModalMessage>
          <ModalAccept onClick={onAccept || onCloseModal}>확인</ModalAccept>
        </ModalInner>
      </ModalTag>
    )
  ) : (
    <div></div>
  );
}
