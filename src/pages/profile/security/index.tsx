import authApi from '@apis/auth/authApi';

import Modal from '@components/common/Modal';
import Navigate from '@components/common/Navigate';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { deleteToken } from '@utils/localStorage/token';

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
    const response = await authApi.deleteUser();
    if (response?.status === 200) {
      deleteToken();
      router.push('/auth/login');
    }
  };

  return (
    <article>
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
          className="relative flex h-[3.75rem] cursor-pointer items-center border-b text-14 font-bold"
          onClick={handlePassword}
        >
          <p>비밀번호 변경</p>
          <Image
            src="/svg/icons/front.svg"
            width="18"
            height="0"
            className="absolute right-0"
            alt="link"
          />
        </article>
        <article
          className="relative flex h-[3.75rem] cursor-pointer items-center border-b text-14 font-bold"
          onClick={handleWithdrawal}
        >
          <p>회원 탈퇴</p>
          <Image
            src="/svg/icons/front.svg"
            width="18"
            height="0"
            className="absolute right-0"
            alt="link"
          />
        </article>
      </section>
    </article>
  );
}
