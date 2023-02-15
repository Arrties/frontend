import Image from 'next/image';
import React from 'react';

interface NoneProps {
  path: string;
  message: string;
}

export default function None({ path, message }: NoneProps) {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 flex flex-col items-center justify-center">
      <Image src={`/svg/none/${path}.svg`} width={40} height={40} alt="wish" />
      <p className="mt-2 text-16 font-medium text-[#999999]">{message}</p>
    </div>
  );
}
