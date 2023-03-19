import artworkApi from '@apis/artwork/artworkApi';
import { queryClient } from 'pages/_app';
import { useMutation } from 'react-query';

const Querykey = {
  '/auction': {
    getDataQuery: 'useGetDetail',
    convertFunc: (old) => {
      return { ...old, pick: true };
    },
  },
  '/home': {
    getDataQuery: 'useCustomizedArtWork',
    convertFunc: (old, artWorkId: number) => {
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
  '/home/view': {
    getDataQuery: 'useInfiniteArtWork',
    convertFunc: (old, artWorkId: number) => {
      return {
        ...old,
        pages: old.pages.map((page) => {
          return {
            ...page,
            artworks: page.artworks.map((artwork) => {
              if (artwork.id === artWorkId) {
                return { ...artwork, pick: true };
              } else {
                return artwork;
              }
            }),
          };
        }),
      };
    },
  },
  '/search': {
    getDataQuery: 'useGetSearch',
    convertFunc: (old, artWorkId: number) => {
      old, artWorkId;
    },
  },
};

const usePostPrefer = (artWorkId: number, path: string) => {
  return useMutation<any, Error>(
    'usePostPrefer',
    () => artworkApi.postPrefer(artWorkId),
    {
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
