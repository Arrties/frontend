import tw from 'tailwind-styled-components';
import Image from 'next/image';
import { useDeleteWord } from '@hooks/mutations/useDeleteWord';

interface RecentSearchProps {
  data: RecentSearch;
  handleRecentWord(word: string): void;
  [key: string]: any;
}

interface DefaultProps {
  [key: string]: any;
}

const RecentKeywordBox = tw.li<DefaultProps>`
border-b-[1px] border-[#EDEDED] text-[#767676] flex px-2 justify-between basis-[48.6%] p-0 cursor-pointer odd:mr-2 pb-1 mt-2
`;

export default function RecentSearchBox({
  data,
  handleRecentWord,
}: RecentSearchProps) {
  const { mutate: deleteWord } = useDeleteWord(data?.id);
  const handleDelete = () => {
    deleteWord();
  };
  return (
    <RecentKeywordBox>
      <span onClick={() => handleRecentWord(data.word)}>{data.word}</span>
      <span className="ml-2 flex align-middle">
        <Image
          src="/svg/icons/icon_grayClose.svg"
          alt="close"
          width={20}
          height={20}
          onClick={handleDelete}
        />
      </span>
    </RecentKeywordBox>
  );
}
