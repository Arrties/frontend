import Navigate from '@components/common/Navigate'
import Image from 'next/image'
import tw from 'tailwind-styled-components'
import { useRouter } from 'next/router'

interface AuctionNavigateProps {
  [key: string]: any;
}

const AuctionNavigateTag = tw.div<AuctionNavigateProps>``;

export default function AuctionNavigate({ ...rest }: AuctionNavigateProps) {
  const router = useRouter();
  const handleSearch = () => {
    router.push('/search');
  };
  const handleNotice = () => {
    router.push('/notice');
  };
  const handleLeftButton = () => {
    router.push('/home');
  };
  return (
    <AuctionNavigateTag {...rest}>
      <Navigate
        left_message={
          <Image alt="" src="/svg/icons/icon_logo.svg" width="90" height="0" />
        }
        right_message={
          <div className="flex w-[50px] justify-between">
            <Image
              alt=""
              src="/svg/icons/icon_search.svg"
              width="22"
              height="0"
              onClick={handleSearch}
            />
            <Image
              alt=""
              src="/svg/icons/icon_notification.svg"
              width="22"
              height="0"
              onClick={handleNotice}
            />
          </div>
        }
        handleLeftButton={handleLeftButton}
      />
    </AuctionNavigateTag>
  );
}
