import Image from 'next/image'

export default function ArtItem({ art }) {
  return (
    <>
      <div className="w-[52px] h-[52px] bg-slate-500 mr-3">
        {/* <Image src={art.image} alt={art.title} /> */}
      </div>
      <div className="text-12 mr-2 font-bold">{art.title}</div>
      <span className="w-[42px] h-[17px] text-[10px] text-[#FFFFFF] text-center bg-[#4B9E77]">
        {art.state}
      </span>
    </>
  );
}
