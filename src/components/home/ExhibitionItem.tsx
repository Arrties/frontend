import useDeletePick from '@hooks/mutations/useDeletePick';
import useDeletePrefer from '@hooks/mutations/useDeletePrefer';
import usePostPick from '@hooks/mutations/usePostPick';
import usePostPrefer from '@hooks/mutations/usePostPrefer';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function ExhibitionItem({
  image,
  education,
  title,
  id,
  pick,
  refetchCustomizedArtwork,
}: KeywordArtwork) {
  const router = useRouter();
  const { mutate: deletePrefer } = useDeletePrefer(+id);
  const { mutate: postPrefer } = usePostPrefer(+id);
  const handlePrefer = async (e) => {
    e.stopPropagation();
    if (pick) {
      await deletePrefer();
      await refetchCustomizedArtwork();
    } else {
      await postPrefer();
      await refetchCustomizedArtwork();
    }
  };
  return (
    <div
      className="relative h-[197px] w-[158px] rounded"
      onClick={() => {
        router.push(`/exhibition/${id}`);
      }}
    >
      <Image
        src={image}
        alt="notification"
        fill
        sizes="1000"
        style={{
          objectFit: 'cover',
        }}
        priority
        className="rounded"
        quality={100}
      />

      <div className="h-full w-full rounded bg-gradient-to-b from-[rgba(0,0,0,0)] via-[rgba(0,0,0,0)] to-[rgba(0,0,0,0.5)]">
        <div className="absolute bottom-1 left-2 flex flex-col text-[#FFFFFF]">
          <div className="text-12">{education}</div>
          <div className="text-14 font-bold">{title}</div>
        </div>
      </div>
      <Image
        src={`/svg/icons/icon_heart${pick ? '_filled' : ''}.svg`}
        alt="heart"
        width={20}
        height={20}
        className="absolute right-2 top-2.5"
        onClick={handlePrefer}
      />
    </div>
  );
}
