import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate';
import PickArtist from '@components/profile/pick/PickArtist';
import useGetPick from '@hooks/queries/useGetPick';
import Button from 'stories/Button';
import tw from 'tailwind-styled-components';
import { useRouter } from 'next/router';
import None from '@components/common/None';

interface defaultProps {
  [key: string]: any;
}

const PickContainer = tw.div<defaultProps>`
w-full flex-col divide-y-[0.0625rem] divide-[#EDEDED]
`;

export default function Pick() {
  const router = useRouter();
  const { data: pickList } = useGetPick();

  return (
    <Layout>
      <Navigate
        message="나의 픽 작가"
        isRightButton={false}
        handleLeftButton={() => {
          router.back();
        }}
      />
      <PickContainer>
        {pickList?.length ? (
          pickList.map((pick: pickList) => (
            <PickArtist
              key={pick?.id}
              id={pick?.id}
              nickname={pick?.nickname}
              education={pick?.education}
              image={pick?.image}
            />
          ))
        ) : (
          <None path="pick" message="나의 픽 작가가 없어요." />
        )}
      </PickContainer>
    </Layout>
  );
}
