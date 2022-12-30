import tw from 'tailwind-styled-components';

interface buttonProps {
  kind?: 'filled' | 'outlined';
  text: string;
  disabled?: boolean;
  onClick?: () => void;
  [key: string]: any;
}

const FilledButton = tw.button<buttonProps>`
${({ disabled }) => disabled && 'opacity-50 cursor-not-allowed'}
w-full transition h-[52px] text-sm rounded-[4px] hover:opacity-90 border border-transparent hover:[#F5535D]-2 bg-[#F5535D] px-0 text-white leading-3 font-normal
`;

const OutlinedButton = tw.button<buttonProps>`
${({ disabled }) => disabled && 'opacity-50 cursor-not-allowed'}
w-full transition h-[52px] text-sm rounded-[4px] border border-[#F5535D] hover:[#F5535D]-2 bg-white px-0 text-[#F5535D] leading-3 font-normal
`;

export default function Button({
  kind = 'filled',
  text,
  disabled = false,
  onClick,
  ...rest
}: buttonProps) {
  return kind === 'filled' ? (
    <FilledButton disabled={disabled} onClick={onClick} {...rest}>
      {text}
    </FilledButton>
  ) : (
    <OutlinedButton disabled={disabled} onClick={onClick} {...rest}>
      {text}
    </OutlinedButton>
  );
}
