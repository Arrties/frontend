import Modal from '@components/common/Modal'
import Navigate from '@components/common/Navigate'
import tw from 'tailwind-styled-components'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { KEYWORDLIST } from '@utils/keywordList'

import Button from '../common/Button'

interface SelectKeywordProps {
  handleSubmit: (e: any) => void;
  keywordList: string[];
  setKeywordList: (keywordList: string[]) => void;
  [key: string]: any;
}

interface SelectKeyWordTagProps {
  [key: string]: any;
}

const SelectKeywordTag = tw.div<SelectKeyWordTagProps>``;

export default function SelectKeyword({
  handleSubmit,
  keywordList,
  setKeywordList,
  ...rest
}: SelectKeywordProps) {
  const router = useRouter();
  const [isModal, setIsModal] = useState<boolean>(false);
  const handleLeftButton = () => {
    router.back();
  };
  const onKeywordClick = (name: string) => {
    const tasteSelectedArr = [...keywordList];
    if (tasteSelectedArr.includes(name)) {
      tasteSelectedArr.splice(tasteSelectedArr.indexOf(name), 1);
    } else {
      tasteSelectedArr.push(name);
    }
    setKeywordList(tasteSelectedArr);
  };

  return (
    <SelectKeywordTag {...rest}>
      <Modal
        message="취향 분석이 완료 되었습니다."
        isModal={isModal}
        onCloseModal={() => {
          setIsModal(false);
        }}
        onAccept={handleSubmit}
      />
      <Navigate isRightButton={false} handleLeftButton={handleLeftButton} />
      <div className="text-16 font-semibold">관심있는 키워드를 골라주세요.</div>
      <div className="flex flex-wrap py-4 text-[#767676]">
        {KEYWORDLIST.map((keyword) => (
          <div
            key={keyword.id}
            id={keyword.id}
            className={`${
              keywordList?.includes(keyword.name)
                ? 'border-[#F5535D] text-[#767676]'
                : 'border-[#CECECE] text-[#767676]'
            } w rounded-full flex justify-center items-center px-3 py-1 border mr-2 mb-2.5 cursor-pointer text-14 text-[#767676]`}
            onClick={() => onKeywordClick(keyword.name)}
          >
            {keyword.name}
          </div>
        ))}
      </div>
      <Button
        text="완료"
        onClick={() => {
          setIsModal(true);
        }}
        disabled={keywordList?.length === 0}
        className="absolute bottom-[100px] inset-x-0 m-auto w-[327px]"
      />
      <button
        className="w-full transition text-xs underline  hover:[#F5535D]-2 px-0 text-[#999999] font-normal absolute bottom-[60px] inset-x-0 m-auto"
        onClick={handleSubmit}
      >
        다음에 할래요
      </button>
    </SelectKeywordTag>
  );
}
