import 'swiper/css';

import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate';
import GenreModal from '@components/exhibition/GenreModal';
import Modal from '@components/exhibition/Modal';
import Image from 'next/image';
import React from 'react';
import tw from 'tailwind-styled-components';
import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRouter } from 'next/router';

const DUMP_ART_LISTS = [
  {
    img: 'asdasd',
    title: '콰야 녹아내리는 고드름',
    major: '홍익대학교 예술학과',
    description:
      '대자연을 자신만의 시각적 언어로 표현한다. 작가는 언어보다 시각적 언어로 표현한다. 언어보다 시각적으로 사물을 관찰하고 이해한 바를 캔버스로 옮긴다. 먼저 속에 떠오르는 형태, 색 그리고 공간의 질서를 만들어간다.',
  },
  {
    img: '111111',
    title: 'asodnvioansodn',
    major: '건국대학교 미술학과',
    description:
      '대자연을 자신만의 시각적 언어로 표현한다. 작가는 언어보다 시각적 언어로 표현한다. 언어보다 시각적으로 사물을 관찰하고 이해한 바를 캔버스로 옮긴다. 먼저 속에 떠오르는 형태, 색 그리고 공간의 질서를 만들어간다.',
  },
  {
    img: '222222222',
    title: '콰야 녹아내리는 고드름',
    major: '단국대학교 조형과',
    description:
      '대자연을 자신만의 시각적 언어로 표현한다. 작가는 언어보다 시각적 언어로 표현한다. 언어보다 시각적으로 사물을 관찰하고 이해한 바를 캔버스로 옮긴다. 먼저 속에 떠오르는 형태, 색 그리고 공간의 질서를 만들어간다.',
  },
];

interface DefaultProps {
  [key: string]: any;
}

const SwiperButtonDiv = tw.div<DefaultProps>`
bg-[rgba(153,153,153,0.24)] rounded-[10px] w-8 h-8 flex justify-center cursor-pointer
`;

export default function Exhibition() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(true);
  const [isGenreModal, setIsGenreModal] = useState<boolean>(false);
  const [isExpansion, setExpansion] = useState<boolean>(false);
  const [genre, setGenre] = useState<string[]>([]);

  const swiperRef = useRef<any>(null);

  const router = useRouter();
  console.log(router.query);
  console.log(genre);

  const handleLeftButton = () => {
    // 작품 더보기 페이지로 이동
    router.push('/');
  };

  const handleRightButton = () => {
    // 해당 작품 작가 프로필로 이동
    router.push('/');
  };

  const onCloseModal = () => {
    setIsOpen(false);
  };

  const handleSwipeArrow = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  const handleExpansion = () => {
    if (modal) {
      setModal(false);
      setExpansion(true);
    } else {
      setModal(true);
      setExpansion(false);
    }
  };

  if (isGenreModal)
    return (
      <GenreModal
        genre={genre}
        setGenre={setGenre}
        onCloseModal={() => setIsGenreModal(false)}
      />
    );

  return (
    <Layout>
      {isExpansion ? (
        <Image
          alt="exhibition_bg"
          src="/svg/icons/bg_exhibition.jpg"
          quality={100}
          width={400}
          height={0}
          sizes="100vh"
          style={{
            objectFit: 'contain',
          }}
          className="absolute top-[240px] right-[-3px] scale-[2.0]"
        />
      ) : (
        <Image
          alt="exhibition_bg"
          src="/svg/icons/bg_exhibition.jpg"
          quality={100}
          fill
          sizes="100vh"
          style={{
            objectFit: 'cover',
          }}
        />
      )}
      <Navigate
        right_message={
          <Image
            src="/svg/icons/icon_filter.svg"
            alt="filter"
            width={20}
            height={20}
          />
        }
        handleRightButton={() => setIsGenreModal(true)}
        className="absolute inset-0 mx-[24px] w-[calc(100%-48px)]"
      />
      <Swiper className="absolute h-full" ref={swiperRef} spaceBetween={180}>
        {!isExpansion && !isOpen && (
          <div className="absolute top-[330px] z-10 flex w-full justify-between">
            <SwiperButtonDiv
              onClick={() => swiperRef.current.swiper.slidePrev()}
            >
              <Image
                src="/svg/icons/icon_back_white.svg"
                alt="back"
                width={10}
                height={0}
              />
            </SwiperButtonDiv>
            <SwiperButtonDiv
              onClick={() => swiperRef.current.swiper.slideNext()}
            >
              <Image
                src="/svg/icons/icon_arrow_white.svg"
                alt="back"
                width={10}
                height={0}
              />
            </SwiperButtonDiv>
          </div>
        )}
        {DUMP_ART_LISTS.map((art, idx) => (
          <SwiperSlide key={idx}>
            {isExpansion ? (
              <div className="flex h-full w-full justify-center">
                <Image
                  alt="canvas"
                  src="/svg/icons/bg_canvas.svg"
                  quality={100}
                  width={400}
                  height={0}
                  sizes="100vh"
                  style={{
                    objectFit: 'contain',
                  }}
                  className="absolute top-[240px] scale-[2.0]"
                />
                <div className="absolute top-[160px] mr-1 w-[95%]">
                  <Image
                    src="/svg/example/exhibition.svg"
                    alt="image"
                    width={1000}
                    height={0}
                    quality={100}
                  />
                </div>
                <div className="absolute top-[170px] right-[20px]">
                  <Image
                    src="/svg/icons/icon_maximize.svg"
                    alt="image"
                    width={25}
                    height={0}
                    className="cursor-pointer"
                    onClick={handleExpansion}
                  />
                </div>
              </div>
            ) : (
              <div className="flex h-full w-full justify-center">
                <Image
                  alt="canvas"
                  src="/svg/icons/bg_canvas.svg"
                  quality={100}
                  width={400}
                  height={0}
                  sizes="100vh"
                  style={{
                    objectFit: 'contain',
                  }}
                  className="absolute top-[140px] scale-[1.6]"
                />
                <div className="absolute top-[130px] mr-1 w-[77%]">
                  <Image
                    src="/svg/example/exhibition.svg"
                    alt="image"
                    width={1000}
                    height={0}
                    quality={100}
                  />
                </div>
                <div className="absolute top-[140px] right-[55px]">
                  <Image
                    src="/svg/icons/icon_maximize.svg"
                    alt="image"
                    width={25}
                    height={0}
                    className="cursor-pointer"
                    onClick={handleExpansion}
                  />
                </div>
              </div>
            )}
            {modal && (
              <div className="flex justify-center">
                <Modal
                  isOpen={isOpen}
                  $open={isOpen}
                  title={art.title}
                  major={art.major}
                  description={art.description}
                  onCloseModal={onCloseModal}
                  handleLeftButton={handleLeftButton}
                  handleRighButton={handleRightButton}
                  handleSwipeArrow={handleSwipeArrow}
                />
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </Layout>
  );
}
