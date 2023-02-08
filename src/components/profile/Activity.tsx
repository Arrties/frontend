import Image from 'next/image';
import tw from 'tailwind-styled-components';
import { useRouter } from 'next/router';
import { isUser } from '@utils/isUser';

interface ActivityBoxProps {
  key: string;
  text: string;
  path: string;
  icon: string;
}

interface DefaultProps {
  [key: string]: any;
}

const ActivityBox = tw.div<DefaultProps>`
bg-[#F8F8FA] rounded-lg  mt-4 flex flex-col justify-center items-center cursor-pointer aspect-[10/9]
${(p) => (p.$isUser ? 'w-[calc(33%-12px)]' : 'w-[calc(25%-12px)]')}
`;

export default function Activity({ text, path, icon }: ActivityBoxProps) {
  const router = useRouter();
  return (
    <ActivityBox
      $isUser={isUser}
      onClick={() => {
        router.push(`${path}`);
      }}
    >
      <Image src={icon} alt={`${icon}`} width={20} height={20} />
      <span className="pt-[12px] text-12 text-[#767676]">{text}</span>
    </ActivityBox>
  );
}
