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
        <div className="flex justify-between mt-5">
          <div className="flex justify-start">
            <span className="w-[70px] mr-2 border-[1px] border-[#DBDBDB] rounded-[39px] text-14 text-[#767676] text-center font-semibold py-[1px]">
              {inquiry.status}
            </span>
            <span className="text-[#999999] text-14">
              {inquiry.date} {inquiry.time}
            </span>
          </div>
          {inquiry.status === '대기중' && (
            <div className="text-[#999999] text-12">
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
        <div className="flex justify-between mt-2 text-[#767676] ">
          <span className="font-bold text-14">{inquiry.title}</span>
          <Disclosure.Button>
            <Image
              src="/svg/icons/icon_arrow_down.svg"
              alt="arrow"
              width={20}
              height={20}
            />
          </Disclosure.Button>
        </div>
        <Disclosure.Panel className="text-gray-500 pt-5 text-14">
          <div className="w-[320px] bg-[#F8F8FA] py-4 px-2">
            <section className="flex mb-4">
              <div className="w-6 h-6 bg-brand rounded-full flex items-center justify-center mr-2">
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
                <div className="w-6 h-6 bg-brand rounded-full flex items-center justify-center mr-2">
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
