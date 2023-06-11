import 'swiper/css';

import Navigate from '@components/common/Navigate';
import GenreModal from '@components/exhibition/GenreModal';
import Modal from '@components/exhibition/Modal';
import Image from 'next/image';
import React from 'react';
import tw from 'tailwind-styled-components';
import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRouter } from 'next/router';
import { useGetExhibitionItemList } from '@hooks/queries/useGetExhibition';
import { EffectCoverflow } from 'swiper';
import useWindowSize from '@hooks/useWindowSize';

const SwiperButtonDiv = tw.div<defaultProps>`
bg-[rgba(153,153,153,0.24)] rounded-[0.625rem] w-8 h-8 max-[25rem]:w-7 max-[25rem]:h-7 flex justify-center cursor-pointer
`;

export default function ExhibitionArts() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(true);
  const [isGenreModal, setIsGenreModal] = useState<boolean>(false);
  const [isExpansion, setExpansion] = useState<boolean>(false);
  const [genre, setGenre] = useState<string[]>([]);

  const swiperRef = useRef<any>(null);

  const router = useRouter();
  const id = Number(router.query.id);

  const { height } = useWindowSize();

  const { data: artLists } = useGetExhibitionItemList(id, genre);

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

  if (isGenreModal) {
    return (
      <GenreModal
        genre={genre}
        setGenre={setGenre}
        onCloseModal={() => setIsGenreModal(false)}
        isEmpty={artLists && artLists.length === 0}
      />
    );
  }
  return (
    <>
      {isExpansion ? (
        <Image
          alt="exhibition_bg"
          src="/svg/icons/bg_exhibition.jpg"
          quality={100}
          width={400}
          height={0}
          sizes="100vh"
          className="absolute right-[-0.1875rem] top-[15rem] scale-[2.0] object-contain"
        />
      ) : (
        <Image
          alt="exhibition_bg"
          src="/svg/icons/bg_exhibition.jpg"
          quality={100}
          fill
          sizes="100vh"
          className="object-cover"
        />
      )}
      <Navigate
        right_message={
          <Image
            src="/svg/icons/filter.svg"
            alt="filter"
            width={20}
            height={20}
          />
        }
        handleRightButton={() => setIsGenreModal(true)}
        className="absolute inset-0 mx-[1.5rem] w-[calc(100%-3rem)]"
      />
      <Swiper
        className="mySwiper absolute h-full"
        ref={swiperRef}
        effect={'coverflow'}
        modules={[EffectCoverflow]}
      >
        {!isExpansion && !isOpen && (
          <div className="absolute top-[20.625rem] z-10 flex w-full justify-between">
            <SwiperButtonDiv
              onClick={() => swiperRef.current.swiper.slidePrev()}
            >
              <Image
                src="/svg/icons/back_white.svg"
                alt="back"
                width={10}
                height={0}
              />
            </SwiperButtonDiv>
            <SwiperButtonDiv
              onClick={() => swiperRef.current.swiper.slideNext()}
            >
              <Image
                src="/svg/icons/arrow_white.svg"
                alt="back"
                width={10}
                height={0}
              />
            </SwiperButtonDiv>
          </div>
        )}
        {artLists?.map((art, idx) => (
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
                  className="absolute top-[15rem] scale-[2.0] object-contain"
                />
                <div className="max-[25rem]:top-[10.625rem] absolute top-[10rem] mr-1 w-[95%]">
                  <Image
                    src={art.image}
                    alt="image"
                    width={1000}
                    height={0}
                    quality={100}
                  />
                  <div className="absolute right-[0.625rem] top-[0.625rem]">
                    <Image
                      src="/svg/icons/maximize.svg"
                      alt="image"
                      width={25}
                      height={0}
                      className="cursor-pointer"
                      onClick={handleExpansion}
                    />
                  </div>
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
                  className="absolute top-[8.75rem] scale-[1.6] object-contain"
                />
                <div className="absolute top-[8.4375rem] mr-1 w-[77%]">
                  <Image
                    src={art.image}
                    alt="image"
                    width={1000}
                    height={0}
                    quality={100}
                  />
                  <div className="absolute right-[0.625rem] top-[0.625rem]">
                    <Image
                      src="/svg/icons/maximize.svg"
                      alt="image"
                      width={25}
                      height={0}
                      className="cursor-pointer"
                      onClick={handleExpansion}
                    />
                  </div>
                </div>
              </div>
            )}
            {modal && (
              <div className="max-[23.75rem]:bottom-[-12.5rem] absolute bottom-[-5rem] flex w-full flex-col justify-center">
                {!isOpen && (
                  <div className="m-auto mb-3 w-[1.375rem]">
                    <Image
                      alt="swipe"
                      src="/svg/icons/swipe_arrow.svg"
                      width={20}
                      height={20}
                      className="cursor-pointer"
                      onClick={handleSwipeArrow}
                    />
                  </div>
                )}
                <Modal
                  $open={isOpen}
                  $height={height}
                  title={art.title}
                  education={art.education}
                  description={art.description}
                  onCloseModal={onCloseModal}
                  id={art.id}
                  artistId={art.artistId}
                />
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
