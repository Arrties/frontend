import DivisionBar from '@components/common/DivisionBar';
import KeywordBox from '@components/common/KeywordBox';
import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate';
import NoticeIcon from '@components/common/NoticeIcon';
import Tab from '@components/common/Tab';
import Activity from '@components/profile/Activity';
import SettingItem from '@components/profile/SettingItem';
import { isUser } from '@utils/isUser';
import Image from 'next/image';
import { useRouter } from 'next/router';
import tw from 'tailwind-styled-components';

interface defaultProps {
  [key: string]: any;
}

const WelcomeBox = tw.div<defaultProps>`
bg-brand rounded-lg h-[5.625rem] flex  items-center px-4
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
    icon: '/svg/icons/heart.svg',
    path: '/profile/wish',
  },
  {
    id: '2',
    text: '나의 픽 작가',
    icon: '/svg/icons/book_mark.svg',
    path: '/profile/pick',
  },
];

ActivityLists = isUser
  ? [
      ...ActivityLists,
      {
        id: '3',
        text: '나의 경매',
        icon: '/svg/icons/bid.svg',
        path: '/profile/bid',
      },
    ]
  : [
      ...ActivityLists,
      {
        id: '3',
        text: '나의 경매',
        icon: '/svg/icons/bid.svg',
        path: '/profile/bid',
      },
      {
        id: '4',
        text: '판매 활동',
        icon: '/svg/icons/selling.svg',
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

export default function Profile({ userInfo }) {
  const router = useRouter();
  const hasKeyword = !!userInfo?.keywords?.length;
  const hasImage = !!userInfo?.image;

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
            <div className="relative flex h-[3.375rem] w-[3.375rem] items-center overflow-hidden rounded-full bg-[#EDEDED]">
              {hasImage ? (
                <Image
                  src={userInfo?.image}
                  alt="profile"
                  priority
                  fill
                  className="object-cover"
                  onClick={() => {
                    if (isUser) {
                      window.alert('작가 전환 후 이용할 수 있는 페이지입니다.');
                    } else {
                      router.push({
                        pathname: '/profile/detail' + userInfo?.id,
                      });
                    }
                  }}
                />
              ) : (
                <Image
                  src="/svg/icons/profile/avatar.svg"
                  alt="user"
                  width={100}
                  height={100}
                  className="m-auto h-[1.6875rem] cursor-pointer rounded-full bg-[#EDEDED]"
                  onClick={() => {
                    if (isUser) {
                      window.alert('작가 전환 후 이용할 수 있는 페이지입니다.');
                    } else {
                      router.push({
                        pathname: '/profile/detail' + userInfo?.id,
                      });
                    }
                  }}
                />
              )}
            </div>
            <div className="ml-3 flex flex-col text-[#FFFFFF]">
              <span className="font-medium">
                {userInfo?.nickname ? userInfo?.nickname : '회원'}님,
              </span>
              <span className="text-xs">아띠즈에 오신 걸 환영합니다.</span>
            </div>
            <div className="absolute right-10">
              <Image
                src="/svg/icons/pencil.svg"
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
              className="mt-4 flex cursor-pointer justify-between rounded border-[0.0625rem] border-brand p-4"
            >
              <div className="flex">
                <Image
                  src="/svg/icons/user.svg"
                  alt="avatar"
                  width={23}
                  height={23}
                />
                <span className="ml-3 text-14 leading-6">
                  작가 프로필 전환하기
                </span>
              </div>
              <Image
                src="/svg/icons/arrow_black.svg"
                alt="arrow"
                width={25}
                height={25}
              />
            </div>
          )}
        </section>
        <section className="flex justify-between gap-2 ">
          {ActivityLists.map((activity: ActivityList) => (
            <Activity
              key={activity.id}
              text={activity.text}
              icon={activity.icon}
              path={activity.path}
            />
          ))}
        </section>
        <DivisionBar className="absolute inset-x-0 m-auto mt-5 max-w-[26.25rem]" />
        <section className="my-10">
          <div className="relative my-4 flex">
            <span className="text-14 font-bold text-[#191919]">취향 목록</span>
            {hasKeyword && (
              <Image
                src="/svg/icons/pencil_gray_bright.svg"
                alt="edit_keywords"
                width={16}
                height={16}
                className="top-1 ml-1 cursor-pointer"
                onClick={() => {
                  router.push('/profile/keyword');
                }}
              />
            )}
          </div>
          {hasKeyword ? (
            <div className="mb-8 flex flex-wrap">
              {userInfo?.keywords?.map((keyword: string, idx: number) => (
                <KeywordBox text={keyword} key={idx} />
              ))}
            </div>
          ) : (
            <div className="mb-12 mt-6 flex justify-center text-center">
              <button
                onClick={() => {
                  router.push('/profile/keyword');
                }}
                className="flex h-[2.25rem] w-[6.25rem] items-center justify-center rounded-[1.1875rem] border-[0.0625rem] border-brand text-xs text-brand"
              >
                <div>
                  <Image
                    src="/svg/icons/plus_pink.svg"
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
        <DivisionBar className="absolute inset-x-0 m-auto -mt-5 max-w-[26.25rem]" />
        <section>
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
