import tw from 'tailwind-styled-components'

interface Genre {
  id: string;
  name: string;
  english: string;
}

const GERNELIST: Genre[] = [
  { id: '1', name: '동양화', english: 'Oriental Painting' },
  { id: '2', name: '한국화', english: 'Koreanization' },
  { id: '3', name: '서양화', english: 'Western Painting' },
  { id: '4', name: '조각', english: 'Sculpture' },
  { id: '5', name: '공예', english: 'Craft' },
  { id: '6', name: '서예', english: 'Calligraphy' },
  { id: '7', name: '판화', english: 'Printmaking' },
  { id: '8', name: '드로잉', english: 'Drawing' },
  { id: '9', name: '사진', english: 'Photography' },
];

interface SelectGenreProps {
  genre: string;
  setGenre: (genre: string) => void;
  [key: string]: any;
}

const SelectGenreTag = tw.div<SelectGenreProps>``;

export default function GenreSelect({
  genre,
  setGenre,
  ...rest
}: SelectGenreProps) {
  const onGenreClick = (name: string) => {
    setGenre(name);
  };
  return (
    <SelectGenreTag {...rest}>
      <div className="grid grid-cols-2 gap-3">
        {GERNELIST.map((genreObject) => (
          <div
            key={genreObject.id}
            id={genreObject.id}
            className={`${
              genre === genreObject.name
                ? 'border-[#F5535D]'
                : 'border-[#CECECE]'
            } w rounded flex-col text-black leading-5 px-3 py-[11px] justify-center items-center border cursor-pointer text-14 `}
            onClick={() => onGenreClick(genreObject.name)}
          >
            <p>{genreObject.name}</p>
            <p className="text-[#767676]">{genreObject.english}</p>
          </div>
        ))}
        <div
          className={`${
            genre === '기타' ? 'border-[#F5535D]' : 'border-[#CECECE]'
          }  rounded flex text-black  px-3 py-[11px] justify-start items-center border cursor-pointer text-14 `}
          onClick={() => onGenreClick('기타')}
        >
          기타
        </div>
      </div>
    </SelectGenreTag>
  );
}
