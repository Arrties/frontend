import Image from 'next/image';
import { Disclosure } from '@headlessui/react';

interface InquiryItemForm {
  key: string;
  inquiry: {
    id: number;
    date: string;
    time: string;
    title: string;
    content: string;
    status: string;
    answer: string;
  };
  handler: (e: number) => void;
}

export default function InquiryItem({ inquiry, handler }: InquiryItemForm) {
  return (
    <div className="border-b-[1px] pb-6">
      <Disclosure>
        <div className="mt-5 flex justify-between">
          <div className="flex justify-start">
            <span className="mr-2 w-[70px] rounded-[39px] border-[1px] border-[#DBDBDB] py-[1px] text-center text-12 font-semibold text-[#767676] ">
              {inquiry.status === 'WAITING' && '대기중'}
            </span>
            <span className="text-14 text-[#999999]">
              {inquiry.date} {inquiry.time}
            </span>
          </div>
          {inquiry.status === 'WAITING' && (
            <div className="text-12 text-[#999999]">
              <span className="cursor-pointer">수정</span>
              <span className="mx-2 text-[#DBDBDB]">|</span>
              <span
                onClick={() => handler(inquiry.id)}
                className="cursor-pointer"
              >
                삭제
              </span>
            </div>
          )}
        </div>
        <div className="mt-2 flex justify-between text-[#767676] ">
          <span className="text-14 font-bold">{inquiry.title}</span>
          <Disclosure.Button>
            <Image
              src="/svg/icons/icon_arrow_down.svg"
              alt="arrow"
              width={20}
              height={20}
            />
          </Disclosure.Button>
        </div>
        <Disclosure.Panel className="pt-5 text-14 text-gray-500">
          <div className="w-[320px] bg-[#F8F8FA] py-4 px-2">
            <section className="mb-4 flex">
              <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-brand">
                <Image
                  src="/svg/icons/icon_search_white.svg"
                  alt="search"
                  width={16}
                  height={16}
                />
              </div>
              <div className="w-[270px]">{inquiry.content}</div>
            </section>
            {inquiry.answer && (
              <section className="flex">
                <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-brand">
                  <Image
                    src="/svg/icons/icon_logo_brand.svg"
                    alt="logo"
                    width={16}
                    height={16}
                  />
                </div>
                <div className="w-[270px]">{inquiry.answer}</div>
              </section>
            )}
          </div>
        </Disclosure.Panel>
      </Disclosure>
    </div>
  );
}
