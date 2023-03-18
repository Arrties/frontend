import Image from 'next/image';
import { useRouter } from 'next/router';

export default function FloatButton() {
  const router = useRouter();
  return (
    <Image
      src="/svg/icons/registration.svg"
      alt="register"
      width={80}
      height={0}
      onClick={() => {
        router.push('/home/post');
      }}
      className="insex-x-0 sticky bottom-16 z-50 m-auto mr-0 h-[72px] w-[72px] cursor-pointer "
    />
  );
}
