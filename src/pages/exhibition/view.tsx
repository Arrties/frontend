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
import { useGetExhibitionItemList } from '@hooks/queries/useGetExhibition';
import { EffectCoverflow, Pagination } from 'swiper';

const SwiperButtonDiv = tw.div<defaultProps>`
bg-[rgba(153,153,153,0.24)] rounded-[10px] w-8 h-8 flex justify-center cursor-pointer
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
          className="absolute top-[240px] right-[-3px] scale-[2.0] object-contain"
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
            src="/svg/icons/icon_filter.svg"
            alt="filter"
            width={20}
            height={20}
          />
        }
        handleRightButton={() => setIsGenreModal(true)}
        className="absolute inset-0 mx-[24px] w-[calc(100%-48px)]"
      />
      <Swiper
        className="mySwiper absolute h-full"
        ref={swiperRef}
        effect={'coverflow'}
        modules={[EffectCoverflow]}
      >
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
                  className="absolute top-[240px] scale-[2.0] object-contain"
                />
                <div className="absolute top-[160px] mr-1 w-[95%]">
                  <Image
                    src={art.image}
                    alt="image"
                    width={1000}
                    height={0}
                    quality={100}
                  />
                  <div className="absolute top-[10px] right-[10px]">
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
                  className="absolute top-[140px] scale-[1.6] object-contain"
                />
                <div className="absolute top-[135px] mr-1 w-[77%]">
                  <Image
                    src={art.image}
                    alt="image"
                    width={1000}
                    height={0}
                    quality={100}
                  />
                  <div className="absolute top-[10px] right-[10px]">
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
              </div>
            )}
            {modal && (
              <div className="absolute bottom-[-80px] flex w-full flex-col justify-center">
                {!isOpen && (
                  <div className="m-auto mb-3 w-[22px]">
                    <Image
                      alt="swipe"
                      src="/svg/icons/icon_swipe_arrow.svg"
                      width={20}
                      height={20}
                      className="cursor-pointer"
                      onClick={handleSwipeArrow}
                    />
                  </div>
                )}
                <Modal
                  $open={isOpen}
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
    </Layout>
  );
}
