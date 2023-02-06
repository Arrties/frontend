import tw from 'tailwind-styled-components';
import { KEYWORDLIST } from '@utils/keywordList';
import KeywordBox from '@components/common/KeywordBox';

interface SelectKeywordProps {
  keywordList: string[];
  setKeywordList: (keywordList: string[]) => void;
  [key: string]: any;
}

const SelectKeywordTag = tw.div<SelectKeywordProps>``;

export default function KeywordSelect({
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
      <div className="flex flex-wrap py-4 text-[#767676]">
        {KEYWORDLIST.map((keyword) => (
          <KeywordBox
            text={keyword.name}
            key={keyword.id}
            focused={keywordList?.includes(keyword.name)}
            onClick={() => onKeywordClick(keyword.name)}
          />
          // <div
          //   key={keyword.id}
          //   id={keyword.id}
          //   className={`${
          //     keywordList?.includes(keyword.name)
          //       ? 'border-brand text-[#767676]'
          //       : 'border-[#CECECE] text-[#767676]'
          //   } w rounded-full flex justify-center items-center px-3 py-1 border mr-2 mb-2.5 cursor-pointer text-14 text-[#767676]`}
          //   onClick={() => onKeywordClick(keyword.name)}
          // >
          //   {keyword.name}
          // </div>
        ))}
      </div>
    </SelectKeywordTag>
  );
}
