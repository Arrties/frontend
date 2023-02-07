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
      }  mt-1 mr-1 cursor-pointer rounded-[19px] border py-0.5 px-2 text-[14px] text-[#767676]`}
      {...rest}
    >
      {text}
    </KeywordBoxTag>
  );
}
