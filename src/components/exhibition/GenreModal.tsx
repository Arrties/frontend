import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate';
import tw from 'tailwind-styled-components';
import { Dispatch, SetStateAction } from 'react';

interface GenreModalProps {
  onCloseModal: () => void;
  genre: string[];
  setGenre: Dispatch<SetStateAction<string[]>>;
  [key: string]: any;
}

interface Genre {
  id: string;
  name: string;
}

const GENRELIST: Genre[] = [
  { id: '1', name: '동양화' },
  { id: '2', name: '한국화' },
  { id: '3', name: '서양화' },
  { id: '4', name: '조각' },
  { id: '5', name: '공예' },
  { id: '6', name: '서예' },
  { id: '7', name: '판화' },
  { id: '8', name: '드로잉' },
  { id: '9', name: '사진' },
  { id: '10', name: '리빙' },
  { id: '11', name: '패션' },
  { id: '12', name: '일러스트' },
  { id: '13', name: '제품' },
  { id: '14', name: '기타' },
];

export default function GenreModal({
  onCloseModal,
  genre,
  setGenre,
}: GenreModalProps) {
  const onGenreClick = (name: string) => {
    const genreSelectedArr = [...genre];
    if (genreSelectedArr.includes(name)) {
      genreSelectedArr.splice(genreSelectedArr.indexOf(name), 1);
    } else {
      genreSelectedArr.push(name);
    }
    setGenre(genreSelectedArr);
  };
  return (
    <Layout>
      <Navigate
        message="필터"
        handleLeftButton={onCloseModal}
        right_message="완료"
        handleRightButton={onCloseModal}
      />
      <h1 className="mb-3 text-16 font-semibold">장르</h1>
      <div className="grid grid-cols-2 gap-3">
        {GENRELIST.map((genreList) => (
          <div
            key={genreList.id}
            id={genreList.id}
            className={`${
              genre.includes(genreList.name)
                ? 'border-brand text-brand'
                : 'border-[#CECECE] text-black'
            } w cursor-pointer rounded border px-3 py-[11px] text-center text-14 leading-5`}
            onClick={() => onGenreClick(genreList.name)}
          >
            <p>{genreList.name}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
}
