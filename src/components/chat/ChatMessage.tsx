import moment from 'moment';
import 'moment/locale/ko'; // 이줄 추가
interface ChatProps {
  sender: 'me' | 'you';
  sendDate: string;
  content: string;
  [key: string]: any;
}

export default function ChatMessage({
  sender,
  sendDate,
  content,
  ...rest
}: ChatProps) {
  return (
    <div {...rest}>
      {sender === 'me' ? (
        <div className="mt-1 flex items-center justify-end">
          <p className="px-2 text-10 text-[#767676]">
            {moment(sendDate, 'YYYY-MM-DD-hh-mm-ss').format('LT')}
          </p>
          <p className="max-w-[230px] rounded-l-xl rounded-br-2xl bg-[#FC6554] px-4 py-2 text-14 text-[#FFFFFF]">
            {content}
          </p>
        </div>
      ) : (
        <div className="mt-1 flex items-center justify-start">
          <p className="max-w-[230px] rounded-r-xl rounded-bl-2xl bg-[#EDEDED] px-6 py-2 text-14 text-[#767676]">
            {content}
          </p>
          <span className="px-2 text-10 text-[#767676]">{sendDate}</span>
        </div>
      )}
    </div>
  );
}
