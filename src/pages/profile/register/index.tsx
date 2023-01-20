import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import authApi from '@apis/auth/authApi';
import { getToken, setToken } from '@utils/localStorage/token';

interface FileForm {
  file: any;
  fileName: string;
  fileSize: string;
}

const formatBytes = (bytes, decimals = 1) => {
  if (!bytes) return '0';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export default function Register() {
  const router = useRouter();
  const { register, watch } = useForm<FileForm>();
  const [fileState, setFileState] = useState<FileForm[]>([]);
  const handleLeftButton = () => {
    router.back();
  };

  const handleRightButton = async () => {
    if (!fileState) return;
    const res = await authApi.patchRole();
    if (res.status === 200) {
      const token = getToken();
      token.roles = 'ROLE_ARTIST';
      if (token) setToken(token);
      router.push('/profile/register/complete');
    }
  };
  const file = watch('file');
  useEffect(() => {
    if (file?.length > 0) {
      setFileState((prev) => [
        ...prev,
        {
          file: file[0],
          fileName: file[0].name,
          fileSize: formatBytes(file[0].size),
        },
      ]);
    }
  }, [file]);
  const handleDelete = () => {
    setFileState([]);
  };
  return (
    <Layout>
      <Navigate
        right_message="다음"
        handleLeftButton={handleLeftButton}
        handleRightButton={handleRightButton}
        message="작가 등록"
      />
      <section className="flex items-start absolute inset-x-0 px-4 py-6 bg-[#F8F8FA]">
        <Image
          alt="speaker"
          src="/svg/icons/icon_speaker.svg"
          width="50"
          height="0"
          className="mr-1"
        />
        <div>
          <p className="text-14 font-bold">학력 인증 전에 먼저 읽어주세요!</p>
          <p className="text-11">
            아띠즈 작가는 학생증, 졸업증명서(2021년까지), 재학증명서 중 1개
            서류로 학력(전공)을 인증해야만 작가로 활동이 가능합니다.
          </p>
        </div>
      </section>
      <section className="mt-[9rem] ">
        <p className="text-16 font-bold">아띠즈 작가 인증</p>
        {fileState[0]?.file ? (
          <div className="my-3 w-full h-[6rem] border border-[#DBDBDB] rounded-xl flex items-center px-3">
            <Image
              alt="document_upload"
              src="/svg/icons/icon_document_upload.svg"
              width="25"
              height="0"
              className="mr-3"
            />
            <div className="flex  flex-col">
              <p className="text-14 ">{fileState[0]?.fileName}</p>
              <p className="text-10">{fileState[0]?.fileSize}/15MB</p>
            </div>
            <Image
              alt="trash_can"
              src="/svg/icons/icon_trash_can.svg"
              width="25"
              height="0"
              className="mr-3 absolute right-7 cursor-pointer"
              onClick={handleDelete}
            />
          </div>
        ) : (
          <div className="my-3 w-full h-[6rem] border border-[#DBDBDB] rounded-xl flex flex-col items-center justify-center ">
            <label htmlFor="fileImage">
              <Image
                alt="document_upload"
                src="/svg/icons/icon_document_upload.svg"
                width="25"
                height="0"
              />
            </label>
            <input
              type="file"
              id="fileImage"
              className="hidden"
              {...register('file')}
            />
            <p className="text-14 ">파일 업로드</p>
            <p className="text-10">0/15MB</p>
          </div>
        )}
        <li className="text-10 text-[#767676]">
          가리는 부분이 없어야 합니다. 학생증에 카드번호가 나온다면, 카드번호는
          지워주세요.
        </li>
      </section>
    </Layout>
  );
}
