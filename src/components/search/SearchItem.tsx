import useDeletePrefer from '@hooks/mutations/useDeletePrefer';
import usePostPrefer from '@hooks/mutations/usePostPrefer';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface ArtworkForm {
  artwork: SearchArtWork;
}

export default function SearchItem({ artwork }: ArtworkForm) {
  const router = useRouter();
  const { mutate: deletePrefer } = useDeletePrefer(artwork.id, '/search');
  const { mutate: postPrefer } = usePostPrefer(artwork.id, '/search');
  const handlePrefer = (artworkPick) => {
    if (artworkPick) {
      deletePrefer();
    } else {
      postPrefer();
    }
  };
  return (
    <div className="relative h-[197px] w-[158px] rounded">
      <Image
        src={artwork.image}
        alt="notification"
        fill
        sizes="1000"
        style={{
          objectFit: 'cover',
        }}
        priority
        className="rounded"
        quality={100}
        onClick={() => {
          router.push({
            pathname: '/exhibition/detail',
            query: { id: artwork.id },
          });
        }}
      />

      <div className="h-full w-full rounded bg-gradient-to-b from-[rgba(0,0,0,0)] via-[rgba(0,0,0,0)] to-[rgba(0,0,0,0.5)]">
        <div className="absolute bottom-3 left-2 flex flex-col text-[#FFFFFF]">
          <div className="text-14 font-bold">{artwork.title}</div>
          <div className="flex items-center text-12">
            {artwork.artistName}
            <div className="mx-1 h-[10px] w-[1px] bg-white"></div>
            {artwork.education}
          </div>
        </div>
      </div>
      <Image
        src={`/svg/icons/icon_heart${artwork.pick ? '_filled' : ''}.svg`}
        alt="heart"
        width={20}
        height={20}
        className="absolute right-2 top-2.5"
        onClick={() => handlePrefer(artwork.pick)}
      />
    </div>
  );
}
