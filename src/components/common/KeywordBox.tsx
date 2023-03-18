import React from 'react';
import tw from 'tailwind-styled-components';

interface KeywordBoxProps {
  text: string;
  id?: string;
  [key: string]: any;
}

const KeywordBoxTag = tw.span<defaultProps>`${(p) =>
  p.focused === 'true'
    ? 'border-brand text-[#767676]'
    : 'border-[#CECECE] text-[#767676]'} mt-[0.375rem] mr-[0.5rem] cursor-pointer rounded-[1.1875rem] border py-0.5 px-2 text-[0.875rem] text-[#767676] `;

export default React.memo(function KeywordBox({
  text,
  id,
  focused = false,
  ...rest
}: KeywordBoxProps) {
  return (
    <KeywordBoxTag id={id} {...rest} focused={focused + ''}>
      {text}
    </KeywordBoxTag>
  );
});
