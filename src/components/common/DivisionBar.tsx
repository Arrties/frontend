import tw from 'tailwind-styled-components';

interface DivisionBarProps {
  [key: string]: any;
}

const DivisionBarTag = tw.div`
bg-[#F6F6F6] h-[0.5rem] w-full
`;

export default function DivisionBar({ ...rest }: DivisionBarProps) {
  return <DivisionBarTag {...rest} />;
}
