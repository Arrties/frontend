import Modal from '@components/common/Modal'
import Navigate from '@components/common/Navigate'
import tw from 'tailwind-styled-components'
import { useState } from 'react'
import { useRouter } from 'next/router'

import Button from '../../components/common/Button'

interface KeywordForm {
  id: string;
  name: string;
}

const KEYWORDLIST: KeywordForm[] = [
  { id: '1', name: '유화' },
  { id: '2', name: '심플한' },
  { id: '3', name: '세련된' },
  { id: '4', name: '모던한' },
  { id: '6', name: '서양화' },
  { id: '5', name: '변화의' },
  { id: '7', name: '비판적인' },
  { id: '8', name: '동양화' },
  { id: '9', name: '미디어아트' },
  { id: '10', name: '풍경화' },
  { id: '11', name: '화려한' },
  { id: '12', name: '판화' },
  { id: '13', name: '사진' },
  { id: '14', name: '소묘' },
  { id: '15', name: '파스텔' },
  { id: '16', name: '추상화' },
  { id: '17', name: '자유로운' },
  { id: '18', name: '다양한' },
  { id: '19', name: '개성적인' },
  { id: '20', name: '새로운' },
  { id: '21', name: '한국적인' },
  { id: '22', name: '강한' },
  { id: '23', name: '거친' },
  { id: '24', name: '율동적인' },
  { id: '25', name: '편안한' },
  { id: '26', name: '포근한' },
  { id: '27', name: '자연적인' },
  { id: '28', name: '다이나믹한' },
  { id: '29', name: '서양적인' },
];

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
