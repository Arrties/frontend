import Modal from '@components/common/Modal';
import Navigate from '@components/common/Navigate';
import tw from 'tailwind-styled-components';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { KEYWORDLIST } from '@utils/keywordList';

import Button from '../common/Button';

interface SelectKeywordProps {
  keywordList: string[];
  setKeywordList: (keywordList: string[]) => void;
  [key: string]: any;
}

interface SelectKeyWordTagProps {
  [key: string]: any;
}

const SelectKeywordTag = tw.div<SelectKeyWordTagProps>``;

export default function SelectKeyword({
  keywordList,
  setKeywordList,
  ...rest
}: SelectKeywordProps) {
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
      <div className="text-16 font-semibold">관심있는 키워드를 골라주세요.</div>
      <div className="flex flex-wrap py-4 text-[#767676]">
        {KEYWORDLIST.map((keyword) => (
          <div
            key={keyword.id}
            id={keyword.id}
            className={`${
              keywordList?.includes(keyword.name)
                ? 'border-brand text-[#767676]'
                : 'border-[#CECECE] text-[#767676]'
            } w mr-2 mb-2.5 flex cursor-pointer items-center justify-center rounded-full border px-3 py-1 text-14 text-[#767676]`}
            onClick={() => onKeywordClick(keyword.name)}
          >
            {keyword.name}
          </div>
        ))}
      </div>
    </SelectKeywordTag>
  );
}
