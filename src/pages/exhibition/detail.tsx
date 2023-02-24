import 'swiper/css';

import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate';
import Modal from '@components/exhibition/Modal';
import Image from 'next/image';
import React from 'react';
import { Swiper } from 'swiper/react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useGetExhibitionItem } from '@hooks/queries/useGetExhibition';
import useWindowSize from '@hooks/useWindowSize';

export default function ExhibitionArt() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(true);
  const [isExpansion, setExpansion] = useState<boolean>(false);

  const router = useRouter();
  const id = Number(router.query.id);

  const { data: art } = useGetExhibitionItem(id);

  const { height } = useWindowSize();

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
        isRightButton={false}
        className="absolute inset-0 mx-[24px] w-[calc(100%-48px)]"
      />
      <Swiper className="absolute h-full">
        {art && isExpansion ? (
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
            <div className="absolute top-[160px] mr-1 w-[90%]">
              <Image
                src={art.image}
                alt="image"
                width={1000}
                height={0}
                quality={100}
              />
              <div className="absolute top-[10px] right-[10px] z-50">
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
          ''
        )}
        {art && !isExpansion ? (
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
              <div className="absolute top-[10px] right-[10px] z-50">
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
          ''
        )}
        {!!art && modal && (
          <div className="absolute bottom-[-80px] z-50 flex w-full flex-col justify-center">
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
      </Swiper>
    </Layout>
  );
}
