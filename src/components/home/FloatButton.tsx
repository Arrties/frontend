import { isUser } from '@utils/isUser';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function FloatButton() {
  const router = useRouter();
  return !isUser ? (
    <Image
      src="/svg/icons/icon_registration.svg"
      alt="register"
      width={80}
      height={0}
      onClick={() => {
        router.push('/home/post');
      }}
      className="sticky bottom-20 z-50  m-auto mr-0 h-[72px] w-[72px] cursor-pointer"
    />
  ) : (
    <div />
  );
}
