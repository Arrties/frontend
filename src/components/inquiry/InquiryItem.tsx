import Image from 'next/image';
import { Disclosure } from '@headlessui/react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@components/common/Button';
import FileItem from '@components/inquiry/FileItem';
import { formatBytes } from '@utils/formatBytes';
import useDeleteInquiry from '@hooks/mutations/useDeleteInquiry';
import usePatchInquiry from '@hooks/mutations/usePatchInquiry';

interface InquiryForm {
  title: string;
  content: string;
  image: string;
}

interface InquiryItemForm {
  key: string;
  inquiry: Inquiry;
}

export default function InquiryItem({ inquiry }: InquiryItemForm) {
  const [modifiedData, setModifiedData] = useState<FormData>();
  const [fileLists, setFileLists] = useState<File[]>([]);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [fileSize, setFileSize] = useState<number>(0);
  const { mutate: deleteInquiry } = useDeleteInquiry(inquiry.id);
  const { mutate: patchInquiry } = usePatchInquiry(inquiry.id, modifiedData);
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

  useEffect(() => {
    if (modifiedData) {
      patchInquiry();
    }
  }, [modifiedData]);

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
    setModifiedData(formData);
    setIsSelected(false);
  };
  return (
    <div className="border-b-[1px] pb-6">
      <Disclosure>
        <div className="mt-5 flex justify-between">
          <div className="flex justify-start">
            <span className="mr-2 w-[70px] rounded-[39px] border-[1px] border-[#DBDBDB] py-[1px] text-center text-12 font-semibold text-[#767676] ">
              {inquiry.status === 'WAITING' && '대기중'}
            </span>
            <span className="text-14 text-[#999999]">{inquiry.date}</span>
          </div>
          {inquiry.status === 'WAITING' && (
            <div className="text-12 text-[#999999]">
              <span
                className="cursor-pointer"
                onClick={() => {
                  if (isSelected) {
                    setIsSelected(false);
                  } else {
                    setIsSelected(true);
                  }
                }}
              >
                {isSelected ? '취소' : '수정'}
              </span>
              <span className="mx-2 text-[#DBDBDB]">|</span>
              <span onClick={() => deleteInquiry()} className="cursor-pointer">
                삭제
              </span>
            </div>
          )}
        </div>
        {isSelected ? (
          <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <section className="mb-5 flex flex-col">
              <div className="mb-3 mt-3 flex justify-between">
                <label htmlFor="title" className="text-14 font-bold leading-8">
                  제목
                </label>
                <div className="text-14 leading-8 text-[#999999]">
                  <span
                    className={`${
                      watch('title') ? 'text-[#191919]' : 'text-[#999999]'
                    }`}
                  >
                    {watch('title')
                      ? watch('title').length
                      : inquiry.title?.length}
                  </span>
                  <span>/20</span>
                </div>
              </div>
              <input
                id="title"
                type="text"
                maxLength={20}
                defaultValue={inquiry.title}
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
                    {watch('content')
                      ? watch('content').length
                      : inquiry.content?.length}
                  </span>
                  <span>/1000</span>
                </div>
              </div>
              <textarea
                id="content"
                maxLength={1000}
                defaultValue={inquiry.content}
                placeholder="정확한 상담을 위하여 자세한 문의사항을 작성 부탁드립니다."
                className="h-[150px] w-full resize-none overflow-hidden rounded-[4px] border-[#D8D8D8] text-[13px] placeholder-[#999999] placeholder:absolute placeholder:text-14 "
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
                        src="/svg/icons/icon_camera_black.svg"
                        alt="camera"
                        width={22}
                        height={18}
                      />
                      {fileLists.length > 0 && (
                        <div className="text-12">
                          <span className="text-brand">{fileLists.length}</span>
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
            <section className="mt-[75px] w-full">
              <Button type="submit" text="수정" className="h-[48px] w-full" />
            </section>
          </form>
        ) : (
          <div className="mt-2 flex justify-between text-[#767676] ">
            <span className="text-14 font-bold">{inquiry.title}</span>
            <Disclosure.Button>
              <Image
                src="/svg/icons/icon_arrow_down.svg"
                alt="arrow"
                width={12}
                height={12}
              />
            </Disclosure.Button>
          </div>
        )}
        <Disclosure.Panel className="pt-5 text-14 text-gray-500">
          <div className="flex w-full items-center bg-[#F8F8FA] py-4 px-2">
            <section className="flex">
              <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-brand">
                <Image
                  src="/svg/icons/icon_search_white.svg"
                  alt="search"
                  width={16}
                  height={16}
                />
              </div>
              <div className="w-[270px]">{inquiry.content}</div>
            </section>
            {inquiry.answer && (
              <section className="flex">
                <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-brand">
                  <Image
                    src="/svg/icons/icon_logo_brand.svg"
                    alt="logo"
                    width={16}
                    height={16}
                  />
                </div>
                <div className="w-[270px]">{inquiry.answer}</div>
              </section>
            )}
          </div>
        </Disclosure.Panel>
      </Disclosure>
    </div>
  );
}
