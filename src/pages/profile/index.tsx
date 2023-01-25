import DivisionBar from '@components/common/DivisionBar';
import Layout from '@components/common/Layout';
import Loader from '@components/common/Loader';
import Navigate from '@components/common/Navigate';
import Tab from '@components/common/Tab';
import Activity from '@components/profile/Activity';
import SettingItem from '@components/profile/SettingItem';
import useGetProfile from '@hooks/queries/useGetProfile';
import Image from 'next/image';
import tw from 'tailwind-styled-components';
import { isUser } from '@utils/isUser';
import { useRouter } from 'next/router';

interface defaultProps {
  [key: string]: any;
}

const WelcomeBox = tw.div<defaultProps>`
bg-brand rounded-lg h-[90px] flex justify-between items-center px-4
`;

interface ActivityList {
  id: string;
  text: string;
  icon: string;
  path: string;
}

let ActivityLists: ActivityList[] = [
  {
    id: '1',
    text: '관심목록',
    icon: '/svg/icons/icon_heart.svg',
    path: '/profile/wish',
  },
  {
    id: '2',
    text: '나의 픽 작가',
    icon: '/svg/icons/icon_book.svg',
    path: '/profile/pick',
  },
];

ActivityLists = isUser
  ? [
      ...ActivityLists,
      {
        id: '3',
        text: '작품 목록',
        icon: '/svg/icons/icon_picture_black.svg',
        path: '/auction',
      },
    ]
  : [
      ...ActivityLists,
      {
        id: '3',
        text: '구매작품',
        icon: '/svg/icons/icon_buying.svg',
        path: '/profile/buying',
      },
      {
        id: '4',
        text: '판매활동',
        icon: '/svg/icons/icon_selling.svg',
        path: '/profile/selling',
      },
    ];

interface SettingList {
  id: string;
  text: string;
  path: string;
}

const SettingLists: SettingList[] = [
  {
    id: '1',
    text: '1:1문의',
    path: '/profile/inquiry',
  },
  {
    id: '2',
    text: '개인/보안',
    path: '/profile/security',
  },
  {
    id: '3',
    text: '로그아웃',
    path: '/auth/login',
  },
];

export default function Profile() {
  const router = useRouter();
  const handleRightButton = () => {
    router.push('/notice');
  };
  const handleKeywords = () => {
    router.push('/profile/keyword');
  };
  const handleEdit = () => {
    router.push('/profile/edit');
  };
  const handleRegister = () => {
    router.push('/profile/register');
  };
  const { isLoading, data } = useGetProfile();

  if (isLoading) return <Loader />;
  return (
    <Layout>
      <Navigate
        left_message=" "
        message="프로필"
        right_message={
          <Image
            src="/svg/icons/icon_notification.svg"
            alt="notification"
            width="20"
            height="0"
          />
        }
        handleRightButton={handleRightButton}
      />
      <section>
        <WelcomeBox>
          <div className="flex h-[54px] w-[54px] items-center rounded-full bg-[#EDEDED]">
            {data?.image ? (
              <img src={data?.image} className="rounded-full" alt="profile" />
            ) : (
              <Image
                src="/svg/icons/icon_user_gray.svg"
                alt="user"
                width="12"
                height="0"
                className="m-auto h-[27px] w-[27px] rounded-full bg-[#EDEDED]"
              />
            )}
          </div>
          <div className="mr-3 flex flex-col text-[#FFFFFF]">
            <span className="font-medium">{data?.nickname}님,</span>
            <span className="text-xs">아띠즈에 오신 걸 환영합니다.</span>
          </div>
          <div className="mr-3">
            <Image
              src="/svg/icons/icon_pencil.svg"
              alt="setting"
              className="cursor-pointer"
              onClick={handleEdit}
              width="23"
              height="0"
            />
          </div>
        </WelcomeBox>
        {isUser && (
          <div
            onClick={handleRegister}
            className="mt-4 flex cursor-pointer justify-between rounded border-[1px] border-brand p-4"
          >
            <div className="flex">
              <Image
                src="/svg/icons/icon_user.svg"
                alt="avatar"
                width="23"
                height="0"
              />
              <span className="ml-3 text-14 leading-6">
                작가 프로필 전환하기
              </span>
            </div>
            <Image
              src="/svg/icons/icon_arrow_black.svg"
              alt="arrow"
              width="25"
              height="0"
            />
          </div>
        )}
      </section>
      <section className="flex justify-between gap-2">
        {ActivityLists.map((activity: ActivityList) => (
          <Activity
            key={activity.id}
            text={activity.text}
            icon={activity.icon}
            path={activity.path}
          />
        ))}
      </section>
      <DivisionBar className="my-5" />
      <section className="my-4">
        <div className="relative my-4">
          <span className="text-14 font-bold text-[#191919]">
            취향 목록
            {data?.keywords?.length && (
              <Image
                src="/svg/icons/icon_pencil_black.svg"
                alt="edit_keywords"
                width="18"
                height="0"
                className="absolute left-[4rem] top-1 cursor-pointer"
                onClick={() => {
                  router.push('/profile/keyword');
                }}
              />
            )}
          </span>
        </div>
        {data?.keywords?.length ? (
          <div className="mb-8 flex flex-wrap">
            {data?.keywords?.map((keyword: string) => (
              <span
                className="mr-2 mb-1 rounded-[19px] border-[1px] border-[#DBDBDB] px-3 py-1 text-14 text-[#767676] last:mr-0 "
                key={keyword}
              >
                {keyword}
              </span>
            ))}
          </div>
        ) : (
          <div className="mt-6 mb-12 flex justify-center text-center">
            <button
              onClick={handleKeywords}
              className="flex h-[36px] w-[100px] items-center justify-center rounded-[19px] border-[1px] border-brand text-xs text-brand"
            >
              <div>
                <Image
                  src="/svg/icons/icon_plus_pink.svg"
                  alt="plus"
                  width="10"
                  height="0"
                />
              </div>
              <div>취향분석</div>
            </button>
          </div>
        )}
      </section>
      <DivisionBar className="my-5" />
      <section>
        {SettingLists.map((setting: SettingList) => (
          <SettingItem
            key={setting.id}
            text={setting.text}
            path={setting.path}
          />
        ))}
      </section>
      <Tab />
    </Layout>
  );
}
