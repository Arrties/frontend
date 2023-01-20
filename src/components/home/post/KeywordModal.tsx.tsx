import Layout from '@components/common/Layout'
import Navigate from '@components/common/Navigate'

import KeywordSelect from './KeywordSelect'

interface KeywordModalProps {
  onCloseModal: () => void;
  keywordList: string[];
  setKeywordList: (keywordList: string[]) => void;
}

export default function KeywordModal({
  onCloseModal,
  keywordList,
  setKeywordList,
}: KeywordModalProps) {
  return (
    <Layout>
      <Navigate
        message="태그"
        handleLeftButton={onCloseModal}
        right_message="완료"
        handleRightButton={onCloseModal}
      />
      <KeywordSelect
        keywordList={keywordList}
        setKeywordList={setKeywordList}
      />
    </Layout>
  );
}
