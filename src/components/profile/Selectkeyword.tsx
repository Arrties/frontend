import tw from 'tailwind-styled-components';
import { KEYWORDLIST } from '@utils/keywordList';
import KeywordBox from '@components/common/KeywordBox';

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
      <div className="flex flex-wrap py-5 text-[#767676]">
        {KEYWORDLIST.map((keyword) => (
          <KeywordBox
            text={keyword.name}
            key={keyword.id}
            id={keyword.id}
            onClick={() => onKeywordClick(keyword.name)}
            focused={keywordList?.includes(keyword.name)}
          />
        ))}
      </div>
    </SelectKeywordTag>
  );
}
