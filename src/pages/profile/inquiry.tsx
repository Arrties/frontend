import Button from '@components/common/Button';
import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate';
import FileItem from '@components/inquiry/FileItem';
import InquiryItem from '@components/inquiry/InquiryItem';
import useGetInquiry from '@hooks/queries/useGetInquiry';
import Loader from '@components/common/Loader';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Tab } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { formatBytes } from '@utils/formatBytes';
import usePostInquiry from '@hooks/mutations/usePostInquiry';

interface InquiryForm {
  title: string;
  content: string;
  image: string;
}

interface InquiryForm {
  date: string;
  time: string;
  title: string;
  content: string;
  status: string;
  answer: string;
  id: number;
}

export default function Inquiry() {
  const [postData, setPostData] = useState<FormData>();
  const [fileLists, setFileLists] = useState<File[]>([]);
  const [fileSize, setFileSize] = useState<number>(0);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const { mutate: postInquiry, isLoading } = usePostInquiry(postData);
  const { data } = useGetInquiry();

  const router = useRouter();
  const handleLeftButton = () => {
    router.back();
  };

  const { register, handleSubmit, watch, reset } = useForm<InquiryForm>({
    mode: 'onTouched',
  });

  const handleRemoveFile = (targetName: string, targetSize: number): void => {
    const newFileLists = fileLists.filter((file) => {
      return file.name !== targetName;
    });
    setFileLists(newFileLists);
    setFileSize((prev) => prev - targetSize);
  };

  const clearForm = () => {
    reset({ title: '', content: '', image: '' });
    setFileLists([]);
    setFileSize(0);
  };

  const file = watch('image');

  useEffect(() => {
    if (fileLists?.length <= 5 && fileLists?.length + file?.length <= 5) {
      const newFileList: any = [];
      for (const i of file) {
        newFileList.push(i);
      }
      const sum = newFileList
        ?.map((file: File) => file.size)
        ?.reduce((a: number, b: number) => a + b, 0);
      setFileSize((prev) => prev + sum);
      setFileLists((prev) => prev.concat(newFileList));
    }
  }, [file]);

  const onSubmit = async (form: InquiryForm) => {
    const { content, image, title } = form;
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image.length) {
      for (let i = 0; i < image.length; i++) {
        formData.append('image', image[i]);
        console.log(image[i]);
      }
    } else {
      formData.append('image', new File([''], ''));
    }
    console.log(image);
    setPostData(() => formData);
  };
  useEffect(() => {
    if (postData) {
      postInquiry();
      clearForm();
      setSelectedIndex(1);
    }
  }, [postData]);

  if (isLoading) return <Loader />;

  return (
    <Layout>
      <Navigate
        handleLeftButton={handleLeftButton}
        message="1:1문의"
        isRightButton={false}
      />
      <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <Tab.List>
          <Tab className="h-[52px] w-1/2 border-[#191919] text-16 font-medium ui-selected:border-b-[2px] ui-selected:text-[#191919] ui-not-selected:border-b ui-not-selected:border-[#EDEDED] ui-not-selected:text-[#999999]">
            문의하기
          </Tab>
          <Tab className="h-[52px] w-1/2 border-[#191919] text-16 font-medium ui-selected:border-b-[2px] ui-selected:text-[#191919] ui-not-selected:border-b ui-not-selected:border-[#EDEDED] ui-not-selected:text-[#999999]">
            문의내역확인
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
              <section className="mb-5 flex flex-col">
                <div className="mb-3 mt-6 flex justify-between">
                  <label
                    htmlFor="title"
                    className="text-14 font-bold leading-8"
                  >
                    제목
                  </label>
                  <div className="text-14 leading-8 text-[#999999]">
                    <span
                      className={`${
                        watch('title') ? 'text-[#191919]' : 'text-[#999999]'
                      }`}
                    >
                      {watch('title') ? watch('title').length : '0'}
                    </span>
                    <span>/20</span>
                  </div>
                </div>
                <input
                  id="title"
                  type="text"
                  maxLength={20}
                  placeholder="문의 제목을 입력해주세요."
                  className="h-[52px] w-full appearance-none rounded-[4px] border-[#D8D8D8] text-[13px] placeholder-[#999999]"
                  {...register('title', {
                    required: true,
                  })}
                />
              </section>
              <section>
                <div className="mb-3 flex justify-between">
                  <label
                    htmlFor="content"
                    className="text-14 font-bold leading-8"
                  >
                    문의 사항
                  </label>
                  <div className="text-14 leading-8 text-[#999999]">
                    <span
                      className={`${
                        watch('content') ? 'text-[#191919]' : 'text-[#999999]'
                      }`}
                    >
                      {watch('content') ? watch('content').length : '0'}
                    </span>
                    <span>/1000</span>
                  </div>
                </div>
                <textarea
                  id="content"
                  maxLength={1000}
                  placeholder="정확한 상담을 위하여 자세한 문의사항을 작성 부탁드립니다."
                  className="h-[150px] w-full resize-none overflow-hidden rounded-[4px] border-[#D8D8D8] text-[13px] placeholder-[#999999] "
                  {...register('content', {
                    required: true,
                  })}
                />
              </section>
              <section className="mt-4">
                <div>
                  <div className="flex">
                    <label htmlFor="fileImage">
                      <div className="mr-0 flex h-[60px] w-[60px] cursor-pointer flex-col items-center justify-center rounded border-[1px] border-[#DBDBDB]">
                        <Image
                          src="/svg/icons/camera_black.svg"
                          alt="camera"
                          width={22}
                          height={18}
                        />
                        {fileLists.length > 0 && (
                          <div className="text-12">
                            <span className="text-brand">
                              {fileLists.length}
                            </span>
                            /5
                          </div>
                        )}
                      </div>
                      <div className="text-center text-10">
                        <span className="text-[#58A4FF]">
                          {formatBytes(fileSize)}
                        </span>
                        <span className="text-[#999999]">/15MB</span>
                      </div>
                    </label>
                    {fileLists.length > 0 && (
                      <div className="flex flex-wrap">
                        {fileLists.map((file, idx) => (
                          <FileItem
                            handler={handleRemoveFile}
                            key={'' + idx}
                            file={file}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="mt-3 text-12 text-[#999999]">
                    <ol className="list-disc pl-3">
                      <li>
                        동영상 등 크기 제한을 초과하는 대용량 파일을 전송하려면
                        구글 드라이브 링크를 첨부 바랍니다.
                      </li>
                      <li>사진은 최대 5장까지 등록가능합니다.</li>
                      <li>답변이 완료되면 삭제, 수정이 불가합니다.</li>
                    </ol>
                  </div>
                </div>
                <input
                  multiple
                  type="file"
                  id="fileImage"
                  className="hidden"
                  {...register('image')}
                />
              </section>
              <section className="mt-[75px] mb-[45px] flex w-full justify-between">
                <Button
                  kind="outlined"
                  text="취소"
                  className="h-[48px] w-[46%]"
                />
                <Button
                  type="submit"
                  text="문의접수"
                  className="h-[48px] w-[46%]"
                />
              </section>
            </form>
          </Tab.Panel>
          <Tab.Panel>
            {data?.length ? (
              <div>
                {data?.map((inquiry, idx) => (
                  <InquiryItem key={'' + idx} inquiry={inquiry} />
                ))}
                <div className="my-[14px] text-center text-14 text-[#999999]">
                  최근 1년간 문의내역만 조회 가능합니다.
                </div>
              </div>
            ) : (
              <div className="m-auto mt-[200px] flex flex-col items-center justify-center text-14 text-[#999999]">
                1:1문의 내역이 존재하지 않습니다.
              </div>
            )}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </Layout>
  );
}
