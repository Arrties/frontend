import Image from 'next/image';
import tw from 'tailwind-styled-components';

interface ModalProps {
  title: string;
  major: string;
  description: string;
  $open?: boolean;
  isOpen: boolean;
  onCloseModal: () => void;
  handleLeftButton: () => void;
  handleRighButton: () => void;
  handleSwipeArrow: () => void;
  [key: string]: any;
}

interface DefaultProps {
  [key: string]: any;
}

const ModalInner = tw.div<DefaultProps>`
absolute w-full bottom-0 h-auto m-auto rounded-[8px] backdrop-blur-[25.5px] p-5 transition  ${(
  p,
) =>
  p.$open
    ? 'bg-gradient-to-r from-[#FFFFFF]/[.16] to-[#FFFFFF]/[.46] translate-y-[-320px]'
    : 'bg-gradient-to-b from-[#FFFFFF]/[.16] to-[#FFFFFF]/[.46] translate-y-[120px]'}
`;
const ModalHeader = tw.div<DefaultProps>`
text-[#424242] text-20 flex justify-between font-bold `;

const MajorDiv = tw.div<DefaultProps>`
text-[#191919] text-14 pt-1`;

const DescriptionDiv = tw.div<DefaultProps>`
text-[#191919] text-14 pt-3`;

const ModalButton = tw.div`
w-[133px] h-[47px] bg-[#FFFFFF] rounded-[4px] text-[#191919] text-14 flex items-center justify-center cursor-pointer
`;

export default function Modal({
  title,
  major,
  description,
  isOpen,
  onCloseModal,
  handleLeftButton,
  handleRighButton,
  handleSwipeArrow,
  ...rest
}: ModalProps) {
  return (
    <>
      {!isOpen && (
        <div className="absolute bottom-[170px] flex h-auto w-[22px] justify-center">
          <Image
            alt="swipe"
            src="/svg/icons/icon_swipe_arrow.svg"
            width={20}
            height={20}
            className="cursor-pointer"
            onClick={handleSwipeArrow}
          />
        </div>
      )}
      <ModalInner {...rest}>
        <ModalHeader>
          <span>{title}</span>
          <Image
            src="/svg/icons/icon_grayClose.svg"
            alt="close"
            width={20}
            height={20}
            onClick={onCloseModal}
            className="cursor-pointer"
          />
        </ModalHeader>
        <MajorDiv>{major}</MajorDiv>
        <DescriptionDiv>{description}</DescriptionDiv>
        <div className="flex w-full justify-evenly pt-4">
          <ModalButton onClick={handleLeftButton}>작품 더보기</ModalButton>
          <ModalButton onClick={handleRighButton}>작가 프로필</ModalButton>
        </div>
      </ModalInner>
    </>
  );
}
