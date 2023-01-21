import check from '@public/svg/icons/icon_checked.svg'
import checkRadio from '@public/svg/icons/icon_radio_checked.svg'
import unCheckRadio from '@public/svg/icons/icon_radio_unchecked.svg'
import uncheck from '@public/svg/icons/icon_unchecked.svg'
import Image from 'next/image'
import React from 'react'
import tw from 'tailwind-styled-components'
import { useRef } from 'react'

interface defaultProps {
  [key: string]: any;
}

const Label = tw.label<defaultProps>`flex items-center`;
const CheckBoxSpan = tw.span<defaultProps>`flex items-center justify-center rounded-sm mr-2`;
const CheckBoxInnerSpan = tw.span`text-14`;
const CheckBoxInput = tw.input`hidden`;
interface CheckBoxProps {
  id?: string;
  kind?: 'checkbox' | 'radio';
  label?: string;
  isChecked?: boolean;
  handler?(e: React.ChangeEvent<HTMLInputElement>): void;
  [key: string]: any;
}

export default function CheckBox({
  id,
  label,
  kind = 'checkbox',
  isChecked,
  handler,
  ...rest
}: CheckBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  return kind === 'checkbox' ? (
    <Label className="cursor-pointer">
      <CheckBoxSpan>
        {isChecked ? (
          <Image src={check} alt="checked" width={20} height={20} />
        ) : (
          <Image src={uncheck} alt="unchecked" width={20} height={20} />
        )}
      </CheckBoxSpan>
      <CheckBoxInnerSpan>{label}</CheckBoxInnerSpan>
      <CheckBoxInput
        ref={inputRef}
        id={id}
        type={kind}
        checked={isChecked}
        onChange={handler}
        {...rest}
      />
    </Label>
  ) : (
    <Label className="cursor-pointer">
      <CheckBoxSpan>
        {isChecked ? (
          <Image src={checkRadio} alt="checked" width={20} height={20} />
        ) : (
          <Image src={unCheckRadio} alt="unchecked" width={20} height={20} />
        )}
      </CheckBoxSpan>
      <CheckBoxInnerSpan>{label}</CheckBoxInnerSpan>
      <CheckBoxInput
        ref={inputRef}
        id={id}
        type="checkbox"
        checked={isChecked}
        onChange={handler}
        {...rest}
      />
    </Label>
  );
}
