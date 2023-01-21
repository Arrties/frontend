import Image from 'next/image'
import React from 'react'
import { makeBlob } from '@utils/makeBlob'

interface FileItemForm {
  file: any;
  key: string;
  handler: (name: string, size: number) => void;
}

export default function FileItem({ file, handler }: FileItemForm) {
  return (
    <div className="w-[60px] h-[60px] border-[1px] border-[#DBDBDB] rounded ml-3 relative mb-2">
      <div
        onClick={() => handler(file.name, file.size)}
        className="w-[14px] h-[14px] bg-[#999999] rounded-full flex justify-center items-center absolute right-[-5px] top-[-5px] cursor-pointer"
      >
        <Image
          src="/svg/icons/icon_close_white.svg"
          alt="close"
          width={15}
          height={15}
        />
      </div>
      <Image
        src={makeBlob(file)}
        alt={file.name}
        width={20}
        height={20}
        className="w-full h-full"
      />
    </div>
  );
}
