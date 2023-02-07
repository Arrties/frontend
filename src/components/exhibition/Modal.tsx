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
  onCloseModal: () => void;
  [key: string]: any;
}

interface DefaultProps {
  [key: string]: any;
}

const ModalInner = tw.div<DefaultProps>`
w-full h-auto m-auto rounded-[8px] backdrop-blur-[25.5px] p-5 transition  ${(
  p,
) =>
  p.$open
    ? 'bg-gradient-to-r from-[#FFFFFF]/[.16] to-[#FFFFFF]/[.46] translate-y-[-420px]'
    : 'bg-gradient-to-b from-[#FFFFFF]/[.16] to-[#FFFFFF]/[.46]'}
`;
const ModalHeader = tw.div<DefaultProps>`
text-[#424242] text-20 flex justify-between font-bold `;

const EducationDiv = tw.div<DefaultProps>`
text-[#191919] text-14 pt-1`;

const DescriptionDiv = tw.div<DefaultProps>`
text-[#191919] text-14 pt-3`;

const ModalButton = tw.div`
w-[133px] h-[47px] bg-[#FFFFFF] rounded-[4px] text-[#191919] text-14 flex items-center justify-center cursor-pointer
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
    router.push(`/auction/${id}`);
  };

  const handleRightButton = () => {
    router.push(`/profile/${artistId}`);
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
        <div className="flex w-full justify-evenly pt-4">
          <ModalButton onClick={handleLeftButton}>작품 더보기</ModalButton>
          <ModalButton onClick={handleRightButton}>작가 프로필</ModalButton>
        </div>
      </ModalInner>
    </>
  );
}
