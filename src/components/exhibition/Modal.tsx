import Image from 'next/image';
import tw from 'tailwind-styled-components';
import { useRouter } from 'next/router';

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
w-full h-auto m-auto rounded-[8px] backdrop-blur-[25.5px] p-5 transition ${(
  p,
) =>
  p.$open && p.$height < 800 && p.$height > 700
    ? 'bg-white translate-y-[-380px] bg-gradient-to-b from-[#f5f1f1] via-[#e0dddd] to-[#f5f1f1]'
    : 'bg-gradient-to-b from-[#FFFFFF] to-[#d1d1d1]'} ${(p) =>
  p.$open && p.$height < 700
    ? 'bg-white translate-y-[-310px] bg-gradient-to-b from-[#f5f1f1] via-[#e0dddd] to-[#f5f1f1]'
    : 'bg-gradient-to-b from-[#FFFFFF] to-[#d1d1d1]'} ${(p) =>
  p.$open && p.$height > 800
    ? 'bg-white translate-y-[-420px] bg-gradient-to-b from-[#f5f1f1] via-[#e0dddd] to-[#f5f1f1]'
    : 'bg-gradient-to-b from-[#FFFFFF] to-[#d1d1d1]'} ${(p) =>
  p.$open && p.$height > 1100
    ? ' bg-white translate-y-[-710px] bg-gradient-to-b from-[#f5f1f1] via-[#e0dddd] to-[#f5f1f1]'
    : 'bg-gradient-to-b from-[#FFFFFF] to-[#d1d1d1]'}
`;
const ModalHeader = tw.div<DefaultProps>`
text-[#424242] text-20 flex justify-between font-bold `;

const EducationDiv = tw.div<DefaultProps>`
text-[#191919] text-14 pt-1`;

const DescriptionDiv = tw.div<DefaultProps>`
text-[#191919] text-14 pt-3`;

const ModalButton = tw.div`
bg-[#FFFFFF] rounded-[4px] text-[#191919] text-14 flex items-center justify-center cursor-pointer px-10 py-4 max-[400px]:px-8 max-[370px]:px-7
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
            src="/svg/icons/icon_grayClose.svg"
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
