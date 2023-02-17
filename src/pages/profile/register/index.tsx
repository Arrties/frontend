import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { formatBytes } from '@utils/formatBytes';
import usePatchResgister from '@hooks/mutations/usePatchRegister';
import Loader from '@components/common/Loader';

interface FileForm {
  file: any;
  fileName: string;
  fileSize: string;
}

export default function Register() {
  const router = useRouter();
  const { register, watch } = useForm<FileForm>();
  const [fileState, setFileState] = useState<FileForm[]>([]);
  const { mutate, isLoading } = usePatchResgister();

  const handleRightButton = async () => {
    if (!fileState) return;
    const formData = new FormData();
    formData.append('certificationImage', fileState[0].file);
    mutate(formData);
    router.push('/profile/register/complete');
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

  if (isLoading) return <Loader />;

  return (
    <Layout>
      <Navigate
        right_message="다음"
        handleRightButton={handleRightButton}
        message="작가 등록"
        focused={!!file}
      />
      <section className="absolute inset-x-0 flex items-start bg-[#F8F8FA] px-4 py-6">
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
          <div className="my-3 flex h-[6rem] w-full items-center rounded-xl border border-[#DBDBDB] px-3">
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
              className="absolute right-7 mr-3 cursor-pointer"
              onClick={handleDelete}
            />
          </div>
        ) : (
          <div className="my-3 flex h-[6rem] w-full flex-col items-center justify-center rounded-xl border border-[#DBDBDB] ">
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
