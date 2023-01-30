interface ChatProps {
  sender: 'me' | 'you';
  sendTime: string;
  message: string;
  [key: string]: any;
}

export default function ChatMessage({
  sender,
  sendTime,
  message,
  ...rest
}: ChatProps) {
  return (
    <div {...rest}>
      {sender === 'me' ? (
        <div className=" mt-1 flex items-center justify-end">
          <p className="px-2 text-10 text-[#767676]">{sendTime}</p>
          <p className="max-w-[230px] rounded-l-xl rounded-br-2xl bg-[#FC6554] px-6 py-2 text-14 text-[#FFFFFF]">
            {message}
          </p>
        </div>
      ) : (
        <div className="0  mt-1 flex items-center justify-start">
          <p className="max-w-[230px] rounded-r-xl rounded-bl-2xl bg-[#EDEDED] px-6 py-2 text-14 text-[#767676]">
            {message}
          </p>
          <span className="px-2 text-10 text-[#767676]">{sendTime}</span>
        </div>
      )}
    </div>
  );
}
