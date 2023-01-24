import Button from '@components/common/Button';
import Layout from '@components/common/Layout';
import Navigate from '@components/common/Navigate';
import FileItem from '@components/inquiry/FileItem';
import InquiryItem from '@components/inquiry/InquiryItem';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Tab } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

interface InquiryForm {
  title: string;
  content: string;
  image: string;
}

interface DumpInquiryListsForm {
  date: string;
  time: string;
  title: string;
  content: string;
  status: string;
  answer: string;
  id: number;
}

interface FileForm {
  file: any;
  size: number;
}

const DUMP_INQUIRY_LISTS: DumpInquiryListsForm[] = [
  {
    date: '2023.01.05',
    time: '18:40',
    title: '[녹아내리는 고드름] 작품 관련 질문입니다.',
    content: '얼마인가요?',
    status: '대기중',
    answer: '',
    id: 1,
  },
  {
    date: '2023.01.02',
    time: '18:40',
    title: '[녹아내리는 고드름] 작품 관련 질문입니다.',
    content:
      '안녕하세요. 다음 경매 시작일을 알고 싶습니다.안녕하세요다음 경매 시작일을 알고 싶습니다.안녕하세요. 다음 경매 시작일을 알고 싶습니다.안녕하세요. 다음 경매 시작일을 알고 싶습니다.',
    status: '답변완료',
    answer: '안녕하세요. 아띠즈입니다. 다음 경매는 1주 내로 진행될 예정입니다.',
    id: 2,
  },
];

const formatBytes = (bytes, decimals = 1) => {
  if (!bytes) return '0';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export default function Inquiry() {
  const [inquiries, setInquiries] =
    useState<DumpInquiryListsForm[]>(DUMP_INQUIRY_LISTS);
  const [fileLists, setFileLists] = useState<File[]>([]);
  const [fileSize, setFileSize] = useState<number>(0);

  const router = useRouter();
  const handleLeftButton = () => {
    router.back();
  };

  const { register, handleSubmit, watch } = useForm<InquiryForm>({
    mode: 'onTouched',
  });

  const handleRemoveFile = (targetName: string, targetSize: number): void => {
    const newFileLists = fileLists.filter((file) => {
      return file.name !== targetName;
    });
    setFileLists(newFileLists);
    setFileSize((prev) => prev - targetSize);
  };

  const handleRemoveInquiry = (targetId: number): void => {
    const newInquiries = inquiries.filter((inquiry) => {
      return inquiry.id !== targetId;
    });
    setInquiries(newInquiries);
  };

  const file = watch('image');

  useEffect(() => {
    if (fileLists?.length <= 5 && fileLists?.length + file?.length <= 5) {
      const newFileList: any = [];
      for (const i of file) {
        newFileList.push(i);
      }
      const sum = newFileList
        ?.map((file) => file.size)
        ?.reduce((a, b) => a + b, 0);
      setFileSize((prev) => prev + sum);
      setFileLists((prev) => prev.concat(newFileList));
    }
  }, [file]);

  const onSubmit = async (form: InquiryForm) => {
    // 문의 API
    // const { title, content } = form;
    // const formData = new FormData()
    // formData.append('title', title)
    // formData.append('content', content)
    // formData.append('image', fileImages)
  };

  return (
    <Layout>
      <Navigate
        handleLeftButton={handleLeftButton}
        message="1:1문의"
        isRightButton={false}
      />
      <Tab.Group>
        <Tab.List>
          <Tab className="w-1/2 h-[32px] font-bold text-16 ui-selected:border-b-[2px] border-[#191919] ui-selected:text-[#191919] ui-not-selected:border-[#EDEDED] ui-not-selected:border-b-[1px] ui-not-selected:text-[#999999] mb-[28px]">
            문의하기
          </Tab>
          <Tab className="w-1/2 h-[32px] font-bold text-16 ui-selected:border-b-[2px] border-[#191919] ui-selected:text-[#191919] ui-not-selected:border-[#EDEDED] ui-not-selected:border-b-[1px] ui-not-selected:text-[#999999] ">
            문의내역확인
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
              <section className="flex flex-col mb-5">
                <div className="flex justify-between mb-3">
                  <label
                    htmlFor="title"
                    className="text-14 leading-8 font-bold"
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
                  className="w-full h-[52px] placeholder-[#999999] text-[13px] rounded-[4px] border-[#D8D8D8] appearance-none"
                  {...register('title', {
                    required: true,
                  })}
                />
              </section>
              <section>
                <div className="flex justify-between mb-3">
                  <label
                    htmlFor="content"
                    className="text-14 leading-8 font-bold"
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
                  className="w-full h-[150px] placeholder:absolute placeholder:text-14 overflow-hidden resize-none placeholder-[#999999] text-[13px] rounded-[4px] border-[#D8D8D8] "
                  {...register('content', {
                    required: true,
                  })}
                ></textarea>
              </section>
              <section className="mt-4">
                <div>
                  <div className="flex">
                    <label htmlFor="fileImage">
                      <div className="w-[60px] h-[60px] border-[1px] border-[#DBDBDB] rounded flex flex-col justify-center items-center mr-0">
                        <Image
                          src="/svg/icons/icon_camera_black.svg"
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
              <section className="w-full flex justify-between mt-[120px]">
                <Button
                  kind="outlined"
                  text="취소"
                  className="w-[150px] h-[48px]"
                />
                <Button
                  type="submit"
                  text="문의접수"
                  className="w-[150px] h-[48px]"
                />
              </section>
            </form>
          </Tab.Panel>
          <Tab.Panel>
            {inquiries ? (
              <div>
                {inquiries.map((inquiry, idx) => (
                  <InquiryItem
                    key={'' + idx}
                    inquiry={inquiry}
                    handler={handleRemoveInquiry}
                  />
                ))}
                <div className="mt-[14px] text-[#999999] text-14 text-center">
                  최근 1년간 문의내역만 조회 가능합니다.
                </div>
              </div>
            ) : (
              <div className="mt-[200px] m-auto flex flex-col justify-center items-center text-14 text-[#999999]">
                1:1문의 내역이 존재하지 않습니다.
              </div>
            )}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </Layout>
  );
}
