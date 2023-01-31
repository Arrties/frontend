import Navigate from '@components/common/Navigate';
import Image from 'next/image';
import tw from 'tailwind-styled-components';
import { useRouter } from 'next/router';
import useGetIsNotice from '@hooks/queries/useGetIsNotice';

interface AuctionNavigateProps {
  [key: string]: any;
}

const AuctionNavigateTag = tw.div<AuctionNavigateProps>``;

export default function AuctionNavigate({ ...rest }: AuctionNavigateProps) {
  const router = useRouter();
  const { data } = useGetIsNotice();
  const isNotice = data?.newNotification;
  return (
    <AuctionNavigateTag {...rest}>
      <Navigate
        left_message={
          <Image alt="" src="/svg/icons/icon_logo.svg" width="90" height="0" />
        }
        right_message={
          <div className="flex w-[60px] justify-between">
            <Image
              alt="search"
              src="/svg/icons/icon_search.svg"
              width="22"
              height="0"
              onClick={() => {
                router.push('/search');
              }}
            />
            {isNotice && (
              <div className="absolute right-0.5 top-0.5 h-2 w-2 rounded-full bg-brand" />
            )}
            <Image
              alt="notification"
              src="/svg/icons/icon_notification.svg"
              width="22"
              height="0"
              onClick={() => {
                router.push('/notice');
              }}
            />
          </div>
        }
        handleLeftButton={() => {
          router.push('/home');
        }}
      />
    </AuctionNavigateTag>
  );
}
