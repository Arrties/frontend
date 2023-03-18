import Image from 'next/image';
import tw from 'tailwind-styled-components';
import { useRouter } from 'next/router';

interface DefaultProps {
  [key: string]: any;
}

interface PickArtistForm {
  id: number;
  nickname: string;
  education: string;
  image: string;
}

const PickArtistContainer = tw.div<DefaultProps>`
w-full text-14 h-[6.125rem] flex items-center cursor-pointer
`;

const PickArtistProfile = tw.div<DefaultProps>`
w-[3.125rem] relative mr-[0.625rem] rounded-full aspect-square flex justify-center items-center rounded-full border-[0.0625rem] border-[#999999]
`;

export default function PickArtist({
  id,
  nickname,
  education,
  image,
}: PickArtistForm) {
  const router = useRouter();

  return (
    <PickArtistContainer
      onClick={() =>
        router.push({
          pathname: '/profile/detail',
          query: { id },
        })
      }
    >
      <PickArtistProfile>
        <Image
          src={image || '/svg/icons/profile/avatar.svg'}
          alt="avatar"
          // width={28}
          // height={28}
          className="rounded-full object-cover"
          fill
        />
      </PickArtistProfile>
      <span>{nickname}</span>
      <span className="pl-1">{education}</span>
    </PickArtistContainer>
  );
}
