import DivisionBar from '@components/common/DivisionBar';
import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate';
import Tab from '@components/common/Tab';
import Activity from '@components/profile/Activity';
import SettingItem from '@components/profile/SettingItem';
import useGetProfile from '@hooks/queries/useGetProfile';
import Image from 'next/image';
import tw from 'tailwind-styled-components';
import { isUser } from '@utils/isUser';
import { useRouter } from 'next/router';
import NoticeIcon from '@components/common/NoticeIcon';
import KeywordBox from '@components/common/KeywordBox';

interface defaultProps {
  [key: string]: any;
}

const WelcomeBox = tw.div<defaultProps>`
bg-brand rounded-lg h-[90px] flex  items-center px-4
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
        text: '나의 경매',
        icon: '/svg/icons/icon_bid.svg',
        path: '/profile/bid',
      },
      {
        id: '4',
        text: '판매 활동',
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
  const { data } = useGetProfile();

  return (
    <>
      <Layout>
        <Navigate
          message="프로필"
          isLeftButton={false}
          handleLeftButton={() => {
            router.push('/home');
          }}
          right_message={<NoticeIcon isSearch={false} />}
          handleRightButton={() => {
            router.push('/notice');
          }}
        />
        <section>
          <WelcomeBox>
            <div className="flex h-[54px] w-[54px] items-center overflow-hidden rounded-full bg-[#EDEDED]">
              {data?.image ? (
                <Image
                  src={data?.image}
                  width="54"
                  height="54"
                  alt="profile"
                  priority
                />
              ) : (
                <Image
                  src="/svg/icons/icon_user_gray.svg"
                  alt="user"
                  width={100}
                  height={100}
                  className="m-auto h-[27px] rounded-full bg-[#EDEDED]"
                />
              )}
            </div>
            <div className="ml-3 flex flex-col  text-[#FFFFFF]">
              <span className="font-medium">
                {data?.nickname ? data?.nickname : '회원'}님,
              </span>
              <span className="text-xs">아띠즈에 오신 걸 환영합니다.</span>
            </div>
            <div className="absolute right-10">
              <Image
                src="/svg/icons/icon_pencil.svg"
                alt="setting"
                className=" cursor-pointer"
                onClick={() => {
                  router.push('/profile/edit');
                }}
                width={23}
                height={23}
              />
            </div>
          </WelcomeBox>
          {isUser && (
            <div
              onClick={() => {
                router.push('/profile/register');
              }}
              className="mt-4 flex cursor-pointer justify-between rounded border-[1px] border-brand p-4"
            >
              <div className="flex">
                <Image
                  src="/svg/icons/icon_user.svg"
                  alt="avatar"
                  width={23}
                  height={23}
                />
                <span className="ml-3 text-14 leading-6">
                  작가 프로필 전환하기
                </span>
              </div>
              <Image
                src="/svg/icons/icon_arrow_black.svg"
                alt="arrow"
                width={25}
                height={25}
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
            <span className="text-14 font-bold text-[#191919]">취향 목록</span>
            {data?.keywords && (
              <Image
                src="/svg/icons/icon_pencil_black.svg"
                alt="edit_keywords"
                width={18}
                height={18}
                className="absolute left-[4rem] top-1 cursor-pointer"
                onClick={() => {
                  router.push('/profile/keyword');
                }}
              />
            )}
          </div>
          {!!data?.keywords?.length ? (
            <div className="mb-8 flex flex-wrap">
              {data?.keywords?.map((keyword: string, idx: number) => (
                <KeywordBox text={keyword} key={idx} />
              ))}
            </div>
          ) : (
            <div className="mt-6 mb-12 flex justify-center text-center">
              <button
                onClick={() => {
                  router.push('/profile/keyword');
                }}
                className="flex h-[36px] w-[100px] items-center justify-center rounded-[19px] border-[1px] border-brand text-xs text-brand"
              >
                <div>
                  <Image
                    src="/svg/icons/icon_plus_pink.svg"
                    alt="plus"
                    width={10}
                    height={10}
                  />
                </div>
                <div>취향분석</div>
              </button>
            </div>
          )}
        </section>
        <DivisionBar className="my-5" />
        <section className="mb-52">
          {SettingLists.map((setting: SettingList) => (
            <SettingItem
              key={setting.id}
              text={setting.text}
              path={setting.path}
            />
          ))}
        </section>
      </Layout>
      <Tab />
    </>
  );
}
