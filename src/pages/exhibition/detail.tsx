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
          className="absolute top-[15rem] right-[-0.1875rem] scale-[2.0] object-contain"
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
        className="absolute inset-0 mx-[1.5rem] w-[calc(100%-3rem)]"
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
              className="absolute top-[15rem] scale-[2.0] object-contain"
            />
            <div className="absolute top-[10rem] mr-1 w-[90%]">
              <Image
                src={art.image}
                alt="image"
                width={1000}
                height={0}
                quality={100}
              />
              <div className="absolute top-[0.625rem] right-[0.625rem] z-50">
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
              <div className="absolute top-[0.625rem] right-[0.625rem] z-50">
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
          ''
        )}
        {!!art && modal && (
          <div className="absolute bottom-[-5rem] z-50 flex w-full flex-col justify-center max-[23.75rem]:bottom-[-12.5rem]">
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
      </Swiper>
    </Layout>
  );
}
