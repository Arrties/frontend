import Image from 'next/image';
import React from 'react';
import { makeBlob } from '@utils/makeBlob';

interface FileItemForm {
  file: any;
  key: string;
  idx?: number;
  handler: (name: string, size: number) => void;
}

export default function FileItem({ file, handler, idx }: FileItemForm) {
  return (
    <div className="relative ml-3 mb-2 h-[3.75rem] w-[3.75rem] rounded border-[0.0625rem] border-[#DBDBDB]">
      <div
        onClick={() => handler(file.name || file.idx, file.size)}
        className="absolute right-[-0.3125rem] top-[-0.3125rem] flex h-[0.875rem] w-[0.875rem] cursor-pointer items-center justify-center rounded-full bg-[#999999]"
      >
        <Image
          src="/svg/icons/close_white.svg"
          alt="close"
          width={15}
          height={15}
        />
      </div>
      <Image
        src={file.hasOwnProperty('url') ? file.url : makeBlob(file)}
        alt={file.name || idx}
        width={20}
        height={20}
        className="h-full w-full"
      />
    </div>
  );
}
