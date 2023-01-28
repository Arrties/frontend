import tw from 'tailwind-styled-components';

interface KeywordBoxProps {
  text: string;
  id?: string;
  focused?: boolean;
  [key: string]: any;
}

const KeywordBoxTag = tw.span<defaultProps>``;

export default function KeywordBox({
  text,
  id,
  focused = false,
  ...rest
}: KeywordBoxProps) {
  return (
    <KeywordBoxTag
      id={id}
      className={`${
        focused
          ? 'border-brand text-[#767676]'
          : 'border-[#CECECE] text-[#767676]'
      }  mr-2 mt-2 cursor-pointer rounded-[19px] border px-3 py-1 text-[14px] text-[#767676]`}
      {...rest}
    >
      {text}
    </KeywordBoxTag>
  );
}
