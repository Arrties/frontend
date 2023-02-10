import tw from 'tailwind-styled-components';

interface ModalProps {
  message: string;
  isModal: boolean;
  onCloseModal: () => void;
  [key: string]: any;
}

const ModalTag = tw.div<defaultProps>``;

const ModalBackground = tw.div`
  absolute inset-0 bg-[#767676] opacity-80 backdrop-blur-3xl z-10 fixed left-0 right-0
`;
const ModalInner = tw.div<defaultProps>`
  z-20 w-[calc(100%-48px)] h-fit absolute inset-0 m-auto
`;
const ModalMessage = tw.div<defaultProps>`
h-fit bg-white text-[#191919] text-14 rounded-[4px] flex overflow-hidden   
`;

export default function AskPriceModal({
  message,
  isModal = false,
  onCloseModal,
  ...rest
}: ModalProps) {
  return isModal ? (
    <ModalTag {...rest}>
      <ModalBackground onClick={onCloseModal}></ModalBackground>
      <ModalInner>
        <ModalMessage>
          <div className="w-full flex-col">
            <div className="flex h-10 w-full items-center justify-center bg-[#F1F1F5] font-semibold">
              경매 호가표 안내
            </div>
            <div className="w-full bg-[#F8F8FA]">
              <div className="itmes-center flex h-[30px] w-full justify-center text-10 font-medium">
                <div className="flex  w-3/5 items-center justify-center">
                  현재가 구간 (원)
                </div>
                <div className="flex  w-2/5 items-center justify-center">
                  호가 단위 (원)
                </div>
              </div>
              <div className="itmes-center flex h-[30px] w-full justify-center border-t border-[#EDEDED] text-10  font-medium text-[#999999]">
                <div className="flex w-3/5 items-center justify-center border-r border-[#EDEDED]">
                  30만 미만
                </div>
                <div className="flex w-2/5 items-center justify-center">
                  20,000원
                </div>
              </div>
              <div className="itmes-center flex h-[30px] w-full justify-center border-t border-[#EDEDED] text-10  font-medium text-[#999999]">
                <div className="flex w-3/5 items-center justify-center border-r border-[#EDEDED]">
                  30만 이상 ~ 100만 미만
                </div>
                <div className="flex w-2/5 items-center justify-center">
                  50,000원
                </div>
              </div>
              <div className="itmes-center flex h-[30px] w-full justify-center border-t border-[#EDEDED] text-10  font-medium text-[#999999]">
                <div className="flex w-3/5 items-center justify-center border-r border-[#EDEDED]">
                  100만 이상 ~ 300만 미만
                </div>
                <div className="flex w-2/5 items-center justify-center">
                  100,000원
                </div>
              </div>
              <div className="itmes-center flex h-[30px] w-full justify-center border-t border-[#EDEDED] text-10  font-medium text-[#999999]">
                <div className="flex w-3/5 items-center justify-center border-r border-[#EDEDED]">
                  300만 이상 ~ 500만 미만
                </div>
                <div className="flex w-2/5 items-center justify-center">
                  200,000원
                </div>
              </div>
              <div className="itmes-center flex h-[30px] w-full justify-center border-t border-[#EDEDED] text-10  font-medium text-[#999999]">
                <div className="flex w-3/5 items-center justify-center border-r border-[#EDEDED]">
                  500만 이상 ~ 1000만 미만
                </div>
                <div className="flex w-2/5 items-center justify-center">
                  500,000원
                </div>
              </div>
            </div>
          </div>
        </ModalMessage>
      </ModalInner>
    </ModalTag>
  ) : (
    <div></div>
  );
}
