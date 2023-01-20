import Layout from '@components/common/Layout';
import Input from '@components/common/Input';
import back from '@public/svg/icons/icon_back.svg';
import close from '@public/svg/icons/icon_grayClose.svg';
import tw from 'tailwind-styled-components';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
interface DefaultProps {
  [key: string]: any;
}

const SearchBox = tw.header<DefaultProps>`
flex justify-between items-center font-semibold relative h-[64px]
`;

const RecentKeywordBox = tw.li<DefaultProps>`
border-b-[1px] border-[#EDEDED] text-[#767676] flex px-2 justify-between basis-[48.6%] p-0 cursor-pointer odd:mr-2 pb-1 mt-2
`;

interface RecentKeywordForm {
  id?: string;
  word: string;
}

const DUMP_RECENT_KEYWORD = [
  {
    id: '1',
    word: '유화',
  },
  {
    id: '2',
    word: '화유',
  },
  {
    id: '3',
    word: '졸업',
  },
  {
    id: '4',
    word: '작품',
  },
  {
    id: '5',
    word: '거래',
  },
];
const DUMP_RECOMMEND_KEYWORD = [
  {
    id: '1',
    word: '유화',
  },
  {
    id: '2',
    word: '심플한',
  },
  {
    id: '3',
    word: '세련된',
  },
  {
    id: '4',
    word: '모던한',
  },
  {
    id: '5',
    word: '서양화',
  },
  {
    id: '6',
    word: '변화의',
  },
  {
    id: '7',
    word: '비판적인',
  },
  {
    id: '8',
    word: '동양화',
  },
  {
    id: '9',
    word: '미디어아트',
  },
  {
    id: '10',
    word: '풍경화',
  },
  {
    id: '11',
    word: '화려한',
  },
];

export default function Search() {
  const router = useRouter();
  const [recentKeywordList, setRecentKeywordList] =
    useState<RecentKeywordForm[]>(DUMP_RECENT_KEYWORD);

  const { register, handleSubmit } = useForm<RecentKeywordForm>();

  const handleBackBtn = () => {
    router.back();
  };
  const onSubmit = (form: any) => {
    console.log(form.word);
    // 검색 API
  };
  const handleRecentKeyword = (e: any) => {
    console.log(e.target.id, 'Search');
    // 검색 API
  };
  const handleDelete = (e: any) => {
    e.stopPropagation();
    setRecentKeywordList(
      recentKeywordList.filter(
        (recentKeyword: RecentKeywordForm) => recentKeyword.id !== e.target.id,
      ),
    );
  };
  const handleDeleteAll = () => {
    setRecentKeywordList([]);
  };
  // console.log(recentKeywordList);
  const handleRecommendKeyword = (e: any) => {
    console.log(e.target.id);
  };

  return (
    <Layout>
      <SearchBox>
        <div className="grow-[1]" onClick={() => handleBackBtn()}>
          <Image src={back} alt="back" />
        </div>
        <form className="grow-[5]" onSubmit={handleSubmit(onSubmit)}>
          <Input
            className="h-[42px] bg-[#F1F1F5] border-none"
            type="text"
            placeholder="검색어를 입력해주세요"
            register={register('word')}
          />
        </form>
      </SearchBox>
      <section className="mt-[38px]">
        <div className="flex justify-between">
          <span className="text-base font-semibold">최근 검색어</span>
          {!!recentKeywordList.length && (
            <span
              className="text-xs leading-6 text-[#999999] cursor-pointer"
              onClick={handleDeleteAll}
            >
              모두 지우기
            </span>
          )}
        </div>
        <div className="mt-[15px]">
          <ul className="flex m-auto flex-wrap">
            {recentKeywordList.length ? (
              recentKeywordList.map((recentKeyword: RecentKeywordForm) => (
                <RecentKeywordBox
                  key={recentKeyword.id}
                  id={recentKeyword.word}
                  onClick={handleRecentKeyword}
                >
                  <span>{recentKeyword.word}</span>
                  <span className="flex align-middle ml-2">
                    <Image
                      src={close}
                      alt="close"
                      width={20}
                      height={20}
                      id={recentKeyword.id}
                      onClick={handleDelete}
                    />
                  </span>
                </RecentKeywordBox>
              ))
            ) : (
              <div>최근 검색어가 없습니다.</div>
            )}
          </ul>
        </div>
      </section>
      <section>
        <div className="flex justify-between mt-6 flex-col">
          <div className="text-base font-semibold ">취향 분석 맞춤 키워드</div>
          <div className="flex flex-wrap mt-2">
            {DUMP_RECOMMEND_KEYWORD.map((keyword) => (
              <div
                key={keyword.id}
                id={keyword.word}
                className="py-1 px-3 border  rounded-[19px] mr-3 my-[6px] cursor-pointer text-14 text-[#767676] font-bold"
                onClick={handleRecommendKeyword}
              >
                {keyword.word}
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
