import artworkApi from '@apis/artwork/artworkApi';
import { queryClient } from 'pages/_app';
import { useMutation } from 'react-query';

const Querykey = {
  '/auction': {
    getDataQuery: 'useGetDetail',
    convertFunc: (old) => {
      return { ...old, pick: false };
    },
  },
  '/home': {
    getDataQuery: 'useCustomizedArtWork',
    convertFunc: (old, artWorkId: number) => {
      return {
        ...old,
        artworks: old.artworks.map((it) => {
          if (it.id === artWorkId) {
            return { ...it, pick: false };
          } else {
            return it;
          }
        }),
      };
    },
  },
  '/home/view': {
    getDataQuery: 'useInfiniteArtWork',
    convertFunc: (old, artWorkId: number) => {
      old;
      return {
        ...old,
        pages: old.pages.map((page) => {
          return {
            ...page,
            artworks: page.artworks.map((artwork) => {
              if (artwork.id === artWorkId) {
                return { ...artwork, pick: false };
              } else {
                return artwork;
              }
            }),
          };
        }),
      };
    },
  },
  '/wish': {
    getDataQuery: 'useGetWish',
    convertFunc: (old, artWorkId: number) =>
      old.filter((it) => it.id !== artWorkId),
  },
  '/search': {
    getDataQuery: 'useGetSearch',
    convertFunc: (old, artWorkId: number) => {
      // old, artWorkId;
    },
  },
};

const useDeletePrefer = (artWorkId: number, path: string) => {
  return useMutation<any, Error>(
    'useDeletePrefer',
    () => artworkApi.deletePrefer(artWorkId),
    {
      onMutate: async () => {
        await queryClient.cancelQueries({ queryKey: ['useDeletePrefer'] });
        const previousValue = queryClient.getQueryData([
          Querykey[path].getDataQuery,
        ]);
        queryClient.setQueryData([Querykey[path].getDataQuery], (old: any) =>
          Querykey[path].convertFunc(old),
        );
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

export default useDeletePrefer;
