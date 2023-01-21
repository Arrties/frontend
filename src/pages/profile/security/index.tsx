import authApi from '@apis/auth/authApi'
import Layout from '@components/common/Layout'
import Modal from '@components/common/Modal'
import Navigate from '@components/common/Navigate'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { deleteToken, getToken } from '@utils/localStorage/token'

export default function Security() {
  const [isModal, setIsModal] = useState(false);
  const router = useRouter();
  const onLeftButton = () => {
    router.back();
  };
  const handlePassword = () => {
    router.push('/profile/security/password');
  };

  const handleWithdrawal = () => {
    setIsModal(true);
  };
  const handleCloseModal = () => {
    setIsModal(false);
  };
  const handleAcceptWithdrawal = async () => {
    const res = await authApi.deleteUser();
    console.log(res);
    if (res?.status === 200) {
      deleteToken();
      router.push('/auth/login');
    }
  };

  return (
    <Layout>
      <Modal
        isModal={isModal}
        isMain
        message="아띠즈 탈퇴시 회원님의 사용정보가 모두 삭제됩니다."
        denyMessage="탈퇴"
        onCloseModal={handleCloseModal}
        onAccept={handleAcceptWithdrawal}
      />
      <Navigate
        isRightButton={false}
        handleLeftButton={onLeftButton}
        message="개인/보안"
      />
      <section>
        <article
          className="border-b h-[60px] flex items-center font-bold relative text-14 cursor-pointer"
          onClick={handlePassword}
        >
          <p>비밀번호 변경</p>
          <Image
            src="/svg/icons/icon_front.svg"
            width="18"
            height="0"
            className="absolute right-0"
            alt="link"
          />
        </article>
        <article
          className="border-b h-[60px] flex items-center font-bold relative text-14 cursor-pointer"
          onClick={handleWithdrawal}
        >
          <p>회원 탈퇴</p>
          <Image
            src="/svg/icons/icon_front.svg"
            width="18"
            height="0"
            className="absolute right-0"
            alt="link"
          />
        </article>
      </section>
    </Layout>
  );
}
