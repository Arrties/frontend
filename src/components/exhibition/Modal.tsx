import Image from 'next/image';
import tw from 'tailwind-styled-components';
import { useRouter } from 'next/router';
import styled from 'styled-components';

interface ModalProps {
  id: number;
  title: string;
  education: string;
  description: string;
  artistId: number;
  $open?: boolean;
  $height?: number;
  onCloseModal: () => void;
  [key: string]: any;
}

interface DefaultProps {
  [key: string]: any;
}

const ModalInner = tw.div<DefaultProps>`
w-full h-auto m-auto rounded-[0.5rem] backdrop-blur-[1.5938rem] p-5 transition ${(
  p,
) =>
  p.$open && p.$height < 800 && p.$height > 700
    ? 'bg-white translate-y-[-23.75rem] bg-gradient-to-b from-[#f5f1f1] via-[#e0dddd] to-[#f5f1f1]'
    : 'bg-gradient-to-b from-[#FFFFFF] to-[#d1d1d1]'} ${(p) =>
  p.$open && p.$height < 700
    ? 'bg-white translate-y-[-19.375rem] bg-gradient-to-b from-[#f5f1f1] via-[#e0dddd] to-[#f5f1f1]'
    : 'bg-gradient-to-b from-[#FFFFFF] to-[#d1d1d1]'} ${(p) =>
  p.$open && p.$height > 800
    ? 'bg-white translate-y-[-26.25rem] bg-gradient-to-b from-[#f5f1f1] via-[#e0dddd] to-[#f5f1f1]'
    : 'bg-gradient-to-b from-[#FFFFFF] to-[#d1d1d1]'} ${(p) =>
  p.$open && p.$height > 1100
    ? ' bg-white translate-y-[-44.375rem] bg-gradient-to-b from-[#f5f1f1] via-[#e0dddd] to-[#f5f1f1]'
    : 'bg-gradient-to-b from-[#FFFFFF] to-[#d1d1d1]'}
`;
const ModalHeader = tw.div<DefaultProps>`
text-[#424242] text-20 flex justify-between font-bold `;

const EducationDiv = tw.div<DefaultProps>`
text-[#191919] text-14 pt-1`;

const ModalButton = tw.div`
bg-[#FFFFFF] rounded-[0.25rem] text-[#191919] text-14 flex items-center justify-center cursor-pointer px-10 py-4 max-[25rem]:px-8 max-[23.125rem]:px-7
`;

const DescriptionDiv = styled.div`
  font-size: 0.875rem;
  max-height: 8.4375rem;
  overflow-y: auto;
  padding-right: 0.9375rem;
  ::-webkit-scrollbar {
    width: 0.1875rem;
  }
  ::-webkit-scrollbar-track {
    background-color: #ffffff;
    border-radius: 1.875rem;
    width: 0.0625rem;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #191919;
    border-radius: 1.875rem;
  }
`;

export default function Modal({
  id,
  title,
  education,
  description,
  artistId,
  onCloseModal,
  ...rest
}: ModalProps) {
  const router = useRouter();
  const handleLeftButton = () => {
    router.push({
      pathname: `/auction/view`,
      query: { id },
    });
  };

  const handleRightButton = () => {
    router.push({
      pathname: '/profile/detail',
      query: { id: artistId },
    });
  };
  return (
    <>
      <ModalInner {...rest}>
        <ModalHeader>
          <span>{title}</span>
          <Image
            src="/svg/icons/grayClose.svg"
            alt="close"
            width={20}
            height={20}
            onClick={onCloseModal}
            className="cursor-pointer"
          />
        </ModalHeader>
        <EducationDiv>{education}</EducationDiv>
        <DescriptionDiv>{description}</DescriptionDiv>
        <div className="m-auto flex w-full justify-between pt-4">
          <ModalButton onClick={handleLeftButton}>작품 더보기</ModalButton>
          <ModalButton onClick={handleRightButton}>작가 프로필</ModalButton>
        </div>
      </ModalInner>
    </>
  );
}
