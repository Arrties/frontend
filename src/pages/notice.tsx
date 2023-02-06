import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate';
import NoticeItem from '@components/notice/NoticeItem';
import useGetNotice from '@hooks/queries/useGetNotice';
import Image from 'next/image';

export default function Notice() {
  const { data: noticeList = [], refetch: refetchNotice } = useGetNotice();
  return (
    <Layout>
      <Navigate isRightButton={false} message="알림" />
      <h1 className="mt-6 mb-2 font-bold">활동 알림</h1>
      {noticeList.length > 0 ? (
        <ul>
          {noticeList.map((notice: Notice) => (
            <NoticeItem
              notice={notice}
              key={notice?.id}
              refetchNotice={refetchNotice}
            />
          ))}
        </ul>
      ) : (
        <div className="m-auto mt-[200px] flex h-[92px] w-[130px] flex-col items-center justify-center">
          <Image
            src="/svg/icons/icon_lamp.svg"
            alt="lamp"
            width={54}
            height={54}
          />
          <span className="mt-[15px] text-sm text-[#999999]">
            받은 알림이 없어요.
          </span>
        </div>
      )}
    </Layout>
  );
}
