import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate';
import ExhibitionItem from '@components/home/ExhibitionItem';
import useGetProfile from '@hooks/queries/useGetProfile';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useGetInfiniteArtWork } from '@hooks/queries/useGetInfiniteArtWork';
import { useRouter } from 'next/router';

interface ARTLISTS {
  id?: number;
  title: string;
  education: string;
  image: string;
}

export default function View() {
  const router = useRouter();

  const target = useRef<HTMLDivElement | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const { data: userInfo } = useGetProfile();
  const { data, hasNextPage, fetchNextPage } = useGetInfiniteArtWork();

  const artworkLists = useMemo(
    () => data?.pages.flatMap((page) => page.artworks),
    [data?.pages],
  );

  const getMoreArtWork = async () => {
    setIsLoaded(true);
    if (hasNextPage) {
      await fetchNextPage();
    }
    setIsLoaded(false);
  };

  const onIntersect = useCallback(
    async (
      [entry]: IntersectionObserverEntry[],
      observer: IntersectionObserver,
    ) => {
      if (entry.isIntersecting && !isLoaded) {
        observer.unobserve(entry.target);
        await getMoreArtWork();
        observer.observe(entry.target);
      }
    },
    [fetchNextPage, hasNextPage],
  );

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.1,
      });
      observer.observe(target.current);
    }
    return () => observer && observer.disconnect();
  }, [onIntersect]);

  return (
    <Layout>
      <Navigate isRightButton={false} />
      <div>
        <p className="text-[14px] font-semibold text-[#767676]">
          {userInfo?.nickname}님 취향의
        </p>
        <p className="text-[20px] font-bold text-[#191919]">이번 주 전시작품</p>
      </div>
      <div className="mt-6 flex w-full flex-wrap justify-center gap-y-5 gap-x-5">
        {artworkLists?.map((art, idx) => (
          <ExhibitionItem
            key={idx}
            src={art.image}
            education={art.education}
            title={art.title}
            id={art.id}
          />
        ))}
        <div ref={target} className="flex h-[100px] w-full justify-center">
          {isLoaded && (
            <div className="mt-5 flex h-[30px] items-center justify-center">
              <div className="grid gap-2">
                <div className="flex items-center justify-center space-x-2">
                  <div className="h-3 w-3 animate-bounce1 rounded-full bg-brand"></div>
                  <div className="h-3 w-3 animate-bounce2 rounded-full bg-brand"></div>
                  <div className="h-3 w-3 animate-bounce3 rounded-full bg-brand"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
