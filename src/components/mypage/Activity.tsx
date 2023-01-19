import tw from 'tailwind-styled-components';
import Image from 'next/image';
import { useRouter } from 'next/router';

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
bg-[#F8F8FA] rounded-lg w-[98px] h-[90px] mt-4 flex flex-col justify-center items-center cursor-pointer
`;

export default function Activity({ text, path, icon }: ActivityBoxProps) {
  const router = useRouter();
  return (
    <ActivityBox
      onClick={() => {
        router.push(`${path}`);
      }}
    >
      <Image src={icon} alt={`${icon}`} width={20} height={20} />
      <span className="text-[#767676] pt-[12px] text-12">{text}</span>
    </ActivityBox>
  );
}
