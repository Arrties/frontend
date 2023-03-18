import tw from 'tailwind-styled-components';

interface ButtonProps {
  text: string;
  $valid?: boolean;
  onClick?: (e: { target: { id: any } }) => void;
  [key: string]: any;
}

const DoubleCheckButton = tw.div<ButtonProps>`
w-[3.625rem] h-[1.5625rem] text-[0.75rem] radius border-[0.0625rem] rounded flex justify-center ${(
  p,
) => (p.$valid ? 'border-[#DBDBDB]' : 'border-[#0099FF]')}
  ${(p) => (p.$valid ? 'text-[#767676]' : 'text-[#0099FF]')}
  items-center absolute right-[0.5rem] top-[2.8125rem] cursor-pointer font-bold
`;

export default function Button({ text, onClick, ...rest }: ButtonProps) {
  return (
    <DoubleCheckButton onClick={onClick} {...rest}>
      {text}
    </DoubleCheckButton>
  );
}
