import Image from 'next/image';
import React from 'react';

interface NoneProps {
  path: string;
  message: string;
}

export default function None({ path, message }: NoneProps) {
  return (
    <div className="flex h-[calc(100%-80px)] flex-col items-center justify-center">
      <Image src={`/svg/none/${path}.svg`} width={40} height={40} alt="wish" />
      <p className="mt-2 text-16 font-medium text-[#999999]">{message}</p>
    </div>
  );
}
