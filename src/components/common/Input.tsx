import React from 'react';
import tw from 'tailwind-styled-components';

import type { UseFormRegisterReturn } from 'react-hook-form';
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type: string;
  label?: string;
  placeholder?: string;
  $error?: boolean;
  register?: UseFormRegisterReturn;
  unit?: string;
  [key: string]: any;
}

interface DefaultProps {
  [key: string]: any;
}

const InputBox = tw.div<DefaultProps>`
relative 
`;

const Label = tw.label<DefaultProps>`
text-14 leading-8
`;

const InputTag = tw.input<InputProps>`
w-full h-[52px] placeholder-[#999999] text-[13px] rounded-[4px] ${(p) =>
  p.$error ? 'border-[#FF3120]' : 'border-[#D8D8D8]'} ${(p) =>
  p.$unit && 'pr-10'} appearance-none
  `;
const TextAreaTag = tw.textarea<InputProps>`
w-full h-[20px] placeholder-[#999999] text-[13px] rounded-[4px] ${(p) =>
  p.$error ? 'border-[#FF3120]' : 'border-[#D8D8D8]'} ${(p) =>
  p.$unit && 'pr-10'} appearance-none flex items-center min-h-[70px]
  `;
export default function Input({
  type = 'text',
  label,
  placeholder,
  register,
  unit,
  ...rest
}: InputProps) {
  if (type === 'textarea') {
    return (
      <InputBox className="my-1">
        <Label>{label}</Label>
        <TextAreaTag
          type={type}
          placeholder={placeholder}
          $unit={unit}
          {...register}
          {...rest}
        />
        {unit && <span className="absolute right-4 bottom-4">{unit}</span>}
      </InputBox>
    );
  }
  return (
    <InputBox className="my-1">
      <Label>{label}</Label>
      <InputTag
        type={type}
        placeholder={placeholder}
        $unit={unit}
        {...register}
        {...rest}
      />
      {unit && <span className="absolute right-4 bottom-4">{unit}</span>}
    </InputBox>
  );
}
