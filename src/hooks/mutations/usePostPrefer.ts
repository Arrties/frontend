import artworkApi from '@apis/artwork/artworkApi';
import profileApi from '@apis/profile/profileApi';
import { queryClient } from 'pages/_app';
import { useMutation } from 'react-query';

const Querykey = {
  home: {
    getDataQuery: 'useCustomizedArtWork',
    convertFunc: (old, artWorkId) => {
      return {
        ...old,
        artworks: old.artworks.map((it) => {
          if (it.id === artWorkId) {
            return { ...it, pick: true };
          } else {
            return it;
          }
        }),
      };
    },
  },
  auction: {
    getDataQuery: 'useGetDetail',
    convertFunc: (old) => {
      return { ...old, pick: true };
    },
  },
};

const usePostPrefer = (artWorkId: number, path) => {
  return useMutation<any, Error>(
    'usePostPrefer',
    () => artworkApi.postPrefer(artWorkId),
    {
      retry: false,
      onMutate: async () => {
        await queryClient.cancelQueries({ queryKey: ['usePostPrefer'] });
        const previousValue = queryClient.getQueryData([
          Querykey[path].getDataQuery,
        ]);
        queryClient.setQueryData([Querykey[path].getDataQuery], (old: any) => {
          return Querykey[path].convertFunc(old);
        });
        return { previousValue };
      },
      onError: (context: any) => {
        queryClient.setQueryData(
          [Querykey[path].getDataQuery],
          context.previousValue,
        );
      },
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: [Querykey[path].getDataQuery],
        });
      },
    },
  );
};

export default usePostPrefer;
