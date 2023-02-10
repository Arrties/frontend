import artworkApi from '@apis/artwork/artworkApi';
import ErrorMessage from '@components/common/ErrorMessage';
import Input from '@components/common/Input';
import Layout from '@components/common/Layout';
import Modal from '@components/common/Modal';
import Navigate from '@components/common/Navigate';
import Select from '@components/common/Select';
import GenreModal from '@components/home/post/GenreModal';
import GuaranteeModal from '@components/home/post/GuaranteeModal';
import KeywordModal from '@components/home/post/KeywordModal.tsx';
import FileItem from '@components/inquiry/FileItem';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { getToken } from '@utils/localStorage/token';
import { dataURLtoFile } from '@utils/dataURLtoFile';
import KeywordBox from '@components/common/KeywordBox';
import usePostArtwork from '@hooks/mutations/usePostArtwork';
import Loader from '@components/common/Loader';

const ARTWORK_STATUS = [
  { value: '매우 좋음' },
  { value: '좋음' },
  { value: '보통' },
];

const IS_FRAME = [{ value: '있음' }, { value: '없음' }];

const CANVAS_SIZE = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '8',
  '10',
  '12',
  '15',
  '20',
  '25',
  '30',
  '40',
  '50',
  '60',
  '80',
  '100',
  '120',
  '150',
  '200',
  '300',
  '500',
];

export default function Post() {
  const [isGuaranteeModal, setIsGuaranteeModal] = useState<boolean>(false);
  const [isKeywordModal, setIsKeywordModal] = useState<boolean>(false);
  const [isGenreModal, setIsGenreModal] = useState<boolean>(false);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [signature, setSignature] = useState<string>('');
  const [keywordList, setKeywordList] = useState<string[]>([]);
  const [genre, setGenre] = useState<string>('');
  const [fileList, setFileList] = useState<File[]>([]);
  const [responseData, setResponseData] = useState<{
    artworkId: number;
    turn: number;
  }>({ artworkId: 0, turn: 0 });
  const [isErrorModal, setIsErrorModal] = useState<boolean>(false);

  const router = useRouter();

  if (getToken().roles !== 'ROLE_ARTIST') {
    router.push('/home');
  }

  const handleRemoveFile = (targetName: string): void => {
    const newFileList = fileList.filter((file) => {
      return file.name !== targetName;
    });
    setFileList(newFileList);
    setValue('image', newFileList as any);
  };

  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Artwork>();

  const handleImage = (e) => {
    console.log(e.target.files);
    const files = e.target.files;
    if (fileList?.length <= 5 && fileList?.length + files?.length <= 5) {
      const newFileList: any = [];
      for (const i of files) {
        newFileList.push(i);
      }
      setFileList((prev) => prev.concat(newFileList));
    }
  };

  useEffect(() => {
    if (keywordList.length > 0) {
      setValue('keywords', keywordList);
    }
    if (genre) {
      setValue('genre', genre);
    }
    if (signature) {
      setValue('guaranteeImage', signature);
    }
  }, [keywordList, setValue, genre, signature]);

  const {
    mutate,
    data,
    isSuccess,
    isLoading: isLoadingPost,
    isError,
  } = usePostArtwork();

  const onSubmit = async (form: Artwork) => {
    const {
      title,
      productionYear,
      description,
      material,
      frame,
      width,
      length,
      height,
      size,
      price,
      status,
      statusDescription,
    } = form;
    const formData = new FormData();
    formData.append('title', title);
    formData.append('productionYear', productionYear + '');
    formData.append('description', description);
    formData.append('material', material);
    formData.append('frame', (frame + '' === '있음') + '');
    formData.append('width', width + '');
    formData.append('length', length + '');
    formData.append('height', height + '');
    formData.append('size', size);
    formData.append('price', price + '');
    formData.append('status', status);
    formData.append('statusDescription', statusDescription);
    formData.append('keywords', keywordList + '');

    if (fileList.length == 1) {
      formData.append('image', fileList[0]);
    } else {
      for (const i of fileList) {
        formData.append('image', i);
      }
    }

    if (genre) {
      formData.append('genre', genre);
    }

    if (signature) {
      const file = dataURLtoFile(signature, 'guaranteeImage');
      formData.append('guaranteeImage', file);
    }

    mutate(formData);
    if (isError) {
      setIsErrorModal(true);
    } else {
      setResponseData({ turn: data.turn, artworkId: data.artWork.id });
      setIsModal(true);
    }
  };

  if (isGuaranteeModal)
    return (
      <GuaranteeModal
        onCloseModal={() => setIsGuaranteeModal(false)}
        setSignature={setSignature}
      />
    );

  if (isKeywordModal)
    return (
      <KeywordModal
        keywordList={keywordList}
        setKeywordList={setKeywordList}
        onCloseModal={() => setIsKeywordModal(false)}
      />
    );

  if (isGenreModal)
    return (
      <GenreModal
        genre={genre}
        setGenre={setGenre}
        onCloseModal={() => setIsGenreModal(false)}
      />
    );

  if (isLoadingPost) {
    return <Loader />;
  }
  return (
    <Layout>
      <Modal
        message={`${responseData?.turn}회 경매에 등록 완료되었습니다.
마이페이지>판매활동>등록된 작품에서 작품내역을 확인해보세요.`}
        isModal={isModal}
        onCloseModal={() => {
          setIsModal(false);
          // router.replace(`/auction/${responseData.artworkId}`);
        }}
        onAccept={() => {
          setIsModal(false);
          // router.replace(`/auction/${responseData.artworkId}`);
        }}
      />
      <Modal
        message={`현재 예정된 중인 경매가 없습니다. 죄송합니다.`}
        isModal={isErrorModal}
        onCloseModal={() => {
          setIsErrorModal(false);
        }}
        onAccept={() => {
          setIsErrorModal(false);
        }}
      />
      <form className="w-full space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <Navigate right_message="완료" />
        <div className="flex">
          <label htmlFor="fileImage">
            <div className="mr-0 flex h-[60px] w-[60px] cursor-pointer flex-col items-center justify-center rounded border-[1px] border-[#DBDBDB]">
              <Image
                src="/svg/icons/icon_camera_black.svg"
                alt="camera"
                width={17}
                height={17}
              />
              <div className="text-12 text-[#999999]">
                {fileList.length > 0 ? `${fileList.length}/5` : '0/5'}
              </div>
            </div>
          </label>
          {fileList.length > 0 && (
            <div className="flex flex-wrap">
              {fileList.map((file, idx) => (
                <FileItem
                  handler={handleRemoveFile}
                  key={'' + idx}
                  file={file}
                />
              ))}
            </div>
          )}
          <input
            multiple
            type="file"
            id="fileImage"
            className="hidden"
            {...register('image')}
            onChange={handleImage}
          />
        </div>
        <div>
          <Input
            type="text"
            label="작품명"
            placeholder="작품명을 입력해주세요"
            register={register('title', { required: true })}
          />
          <button onClick={() => setIsKeywordModal(true)} className="relative">
            <div className="flex h-[38px] w-[92px] items-center rounded-[4px] border border-[#D8D8D8] pl-3 text-[13px] text-[#999999]">
              태그추가
            </div>
            <div className="absolute left-[63px] bottom-0 flex h-full items-center">
              <Image
                src="/svg/icons/icon_plus_gray.svg"
                alt="tag"
                width={20}
                height={20}
              />
            </div>
          </button>
          <div className="mt-3 flex flex-wrap">
            {keywordList?.map((name) => (
              <KeywordBox text={name} key={name} focused />
            ))}
          </div>
        </div>
        <Input
          type="number"
          label="제작연도"
          min={2010}
          placeholder="숫자만 입력해주세요. ex)2022"
          register={register('productionYear', { required: true })}
        />
        <div>
          <div className="flex justify-between">
            <label htmlFor="description" className="text-14 leading-8">
              작품설명
            </label>
            <div className="text-14 text-[#999999]">
              <span
                className={`${
                  watch('description') ? 'text-[#191919]' : 'text-[#999999]'
                }`}
              >
                {watch('description')?.length || 0}
                /1000
              </span>
            </div>
          </div>
          <textarea
            id="content"
            maxLength={1000}
            placeholder="작품에 대해 자세히 기입해주세요."
            className="h-[150px] w-full resize-none overflow-hidden rounded-[4px] border-[#D8D8D8] text-[13px] placeholder-[#999999] placeholder:text-14"
            {...register('description', { required: true })}
          />
        </div>
        <Input
          type="text"
          label="재료"
          placeholder="사용한 재료를 입력해주세요."
          register={register('material', { required: true })}
        />
        <div onClick={() => setIsGenreModal(true)}>
          <label className="text-14 leading-8">장르</label>
          <div
            className={`flex h-[52px] w-full cursor-pointer items-center rounded-[4px] border border-[#D8D8D8] pl-3 text-[13px] ${
              genre ? 'text-[#191919]' : 'text-[#999999]'
            }`}
          >
            {genre ? genre : '선택하기'}
          </div>
        </div>
        <Select
          name="frame"
          setValue={setValue}
          options={IS_FRAME}
          label="액자"
        />
        <div>
          <span className="text-14">크기/호수</span>
          <article className="flex gap-4">
            <Input
              type="number"
              min={0}
              placeholder="가로"
              className=""
              register={register('width', { required: true })}
              unit="cm"
            />
            <Input
              type="number"
              min={0}
              placeholder="세로"
              className=""
              register={register('length', { required: true })}
              unit="cm"
            />
            <Input
              type="number"
              min={0}
              placeholder="높이"
              className=""
              register={register('height', { required: true })}
              unit="cm"
            />
          </article>
          <article className="w-[calc((100%-2rem)/3)]">
            <Input
              type="number"
              placeholder="10"
              unit="호"
              register={register('size', {
                validate: (value) =>
                  CANVAS_SIZE.includes(value) || '호수를 확인해주세요.',
              })}
            />
            {errors.size && <ErrorMessage message={errors.size.message} />}
          </article>
        </div>
        <Input
          type="text"
          label="경매 시작가"
          placeholder="작품 최소 가격을 설정해주세요."
          register={register('price', { required: true })}
          unit="원"
        />
        <Select
          name="status"
          setValue={setValue}
          options={ARTWORK_STATUS}
          label="작품 상태"
        />
        <textarea
          id="content"
          maxLength={1000}
          placeholder="작품상태에 대해 자세히 기입해주세요."
          className="h-[150px] w-full resize-none overflow-hidden rounded-[4px] border-[#D8D8D8] text-[13px] placeholder-[#999999] placeholder:text-14  "
          {...register('statusDescription', { required: true })}
        />
        <div
          className="w-full cursor-pointer"
          onClick={() => setIsGuaranteeModal(true)}
        >
          <label htmlFor="statusDetail" className="text-14 leading-8">
            작품 보증서
          </label>
          {signature ? (
            <div
              className="flex h-[128px] w-full cursor-pointer items-center justify-center overflow-hidden rounded border border-[#DBDBDB] p-4"
              onClick={() => setIsGuaranteeModal(true)}
            >
              <Image src={signature} width={163} height={91} alt="guarantee" />
            </div>
          ) : (
            <div className="relative">
              <div className="flex h-[52px] w-full items-center rounded-[4px] border border-[#D8D8D8] pl-3 text-[13px] text-[#999999]">
                전자 서명이 필요합니다.
              </div>
              <div
                onClick={() => setIsGuaranteeModal(true)}
                className="absolute right-4 bottom-0 flex h-[52px] cursor-pointer items-center"
              >
                <Image
                  src="/svg/icons/icon_pencil_gray.svg"
                  alt="setting"
                  className="cursor-pointer"
                  width="23"
                  height="0"
                />
              </div>
            </div>
          )}
        </div>
        <div className="relative h-[336px]">
          <div className="absolute -left-6 -bottom-10 h-[376px] w-[375px]">
            <div className="mt-12 h-4 bg-[#F8F8FA]"></div>
            <div className="px-6 text-12">
              <p className="mt-8 font-medium">
                다음의 경우 작품등록이 제외될 수 있습니다.
              </p>
              <ul className="mt-3 ml-3 list-disc space-y-2 tracking-tight text-[#767676]">
                <li>
                  작품의 선정성, 유해성이 통신판매업 시행령(2019) 기준에 맞지
                  아니 하다고 판단되는 경우
                </li>
                <li>
                  제출된 자료의 내용이 미흡하거나, 허위로 기재된 사실이 밝혀질
                  경우
                </li>
                <li>
                  제출된 작품 이미지로 작품의 형태 유무의 대부분을 판단할 수
                  없는 경우
                </li>
                <li>
                  과반 이상의 심사위원이 작품이 완성되지 않았다고 판단하거나
                  프로그램의 취지에 맞지 아니하다고 판단될 경우
                </li>
                <li>유사 온라인 아트플랫폼에 이미 등록되었거나 확인될 경우</li>
              </ul>
            </div>
          </div>
        </div>
      </form>
    </Layout>
  );
}
