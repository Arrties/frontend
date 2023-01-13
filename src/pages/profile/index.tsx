import authApi from '@apis/auth/authApi';
import Layout from '@components/common/Layout';
import Loader from '@components/common/Loader';
import Navigate from '@components/common/Navigate';
import Tab from '@components/common/Tab';
import Activity from '@components/mypage/Activity';
import SettingItem from '@components/mypage/SettingItem';
import useGetProfile from '@hooks/queries/useGetProfile';
import { isUser } from '@utils/isUser';
import Image from 'next/image';
import { useRouter } from 'next/router';
import tw from 'tailwind-styled-components';

interface defaultProps {
  [key: string]: any;
}

const WelcomeBox = tw.div<defaultProps>`
bg-[#F5535D] rounded-lg h-[90px] flex justify-between items-center px-4
`;

interface ActivityListForm {
  id: string;
  text: string;
  icon: string;
  path: string;
}

const ActivityLists: ActivityListForm[] = [
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
  {
    id: '3',
    text: '진행 경매',
    icon: '/svg/icons/icon_dollar.svg',
    path: '/auction',
  },
];

interface SettingListForm {
  id: string;
  text: string;
  path: string;
}
const SettingLists: SettingListForm[] = [
  {
    id: '1',
    text: '1:1문의',
    path: '/inquiry',
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
  const handleTaste = () => {
    router.push('/auth/join04');
  };
  const handleEdit = () => {
    router.push('/profile/edit');
  };
  const handleConvert = () => {
    router.push('/profile/convert');
  };

  const { isLoading, userInfo } = useGetProfile();
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
          <div className="w-[54px] h-[54px] rounded-full bg-[#EDEDED] flex items-center">
            <Image
              src="/svg/icons/icon_user_gray.svg"
              alt="user"
              width="12"
              height="0"
              className="w-[27px] h-[27px] m-auto rounded-full bg-[#EDEDED]"
            />
          </div>
          <div className="flex flex-col text-[#FFFFFF] mr-3">
            <span className="font-medium">{userInfo?.nickname}님,</span>
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
            onClick={handleConvert}
            className="flex justify-between border-[1px] rounded border-[#F5535D] p-4 cursor-pointer mt-4"
          >
            <div className="flex">
              <Image
                src="/svg/icons/icon_user.svg"
                alt="avatar"
                width="23"
                height="0"
              />
              <span className="text-14 leading-6 ml-3">
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
      <section className="flex justify-between ">
        {ActivityLists.map((activity: ActivityListForm) => (
          <Activity
            key={activity.id}
            text={activity.text}
            icon={activity.icon}
            path={activity.path}
          ></Activity>
        ))}
      </section>
      <section className="my-4 border-y-[12px] border-[#F8F8FA] ">
        <div className="my-4 relative">
          <span className="text-14 text-[#191919] font-bold">
            취향 목록
            {userInfo?.keywords?.length && (
              <Image
                src="/svg/icons/icon_pencil_black.svg"
                alt="notification"
                width="18"
                height="0"
                className="absolute left-[4rem] top-1"
              />
            )}
          </span>
        </div>
        {userInfo?.keywords?.length ? (
          <div className="flex flex-wrap mb-8">
            {userInfo?.keywords?.map((keyword) => (
              <span
                className="border-[1px] border-[#DBDBDB] rounded-[19px] px-3 py-1 mr-2 mb-1 last:mr-0 text-14 text-[#767676] "
                key={keyword}
              >
                {keyword}
              </span>
            ))}
          </div>
        ) : (
          <div className="mt-6 text-center mb-12 flex justify-center">
            <button
              onClick={handleTaste}
              className="w-[100px] h-[36px] border-[1px] border-[#F5535D] rounded-[19px] text-xs text-[#F5535D] flex items-center justify-center"
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
      <section className="">
        {SettingLists.map((settingItem): SettingListForm[] => (
          <SettingItem
            key={settingItem.id}
            text={settingItem.text}
            path={settingItem.path}
          />
        ))}
      </section>
      <Tab />
    </Layout>
  );
}
