import Layout from '@components/common/Layout'
import Navigate from '@components/common/Navigate'

import GenreSelect from './GenreSelect'

interface GenreModalProps {
  onCloseModal: () => void;
  genre: string;
  setGenre: (genre: string) => void;
}

export default function GenreModal({
  onCloseModal,
  genre,
  setGenre,
}: GenreModalProps) {
  return (
    <Layout>
      <Navigate
        message="장르"
        handleLeftButton={onCloseModal}
        right_message="완료"
        handleRightButton={onCloseModal}
      />
      <GenreSelect genre={genre} setGenre={setGenre} />
    </Layout>
  );
}
