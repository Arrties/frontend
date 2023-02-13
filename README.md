# Atties - Frontend

## 폴더 구조 📁

### 전체 구조

    ├── .yarn
    ├── .storybook              #
    ├── public                  #
    ├── src                     #
        ├── @types              #
        ├── apis                #
        ├── components          #
            ├── common          #
            ├── auction         #
            ├── auth            #
            └── ...             #
        ├── features            #
        ├── hooks               #
        ├── pages               #
        ├── stories             #
        ├── styles              #
        ├── utils               #
    ├── README.md               #
    └── ...

### apis

Api 요청과 관련한 함수들 입니다.

    .
    ├── apis
    │   ├── _axios
    │       └── instance.ts      # api instance를 만들어서 사용합니다.
    │   ├── admin                # api class를 만들고 비동기 함수들을 작성합니다.
    │   ├── artwork
    │   ├── aution
    └── ...

### components

공통 컴포넌트와 페이지 단위로 필요한 컴포넌트로 분리하여 관리합니다.

    .
    ├── ...
    ├── components
    │ ├── common
    │   ├── Button
    │   ├── Layout
    │   ├── Input
    │   ├── Modal
    │   └── ...
    │ ├── auction
    │ ├── chat
    │ ├── exhibition
    │ └── ...
    └── ...

### hooks

useQuery, useMutation으로 mapping한 query, mutation hook들과 개별 hook들을 작성합니다.

      .
    ├── ...
    ├── hooks
    │ ├── mutations
    │ ├── queries
    │ ├── useCountDown.ts
    │ ├── useInterval.ts
    │ └── ...
    └── ...

## 컨밴션 🌈

[📄 네이밍 컨벤션](https://www.notion.so/guesung/f6bf625c22514d8a8a9793d551935a10?pvs=4)

[📄 타입스크립트 컨밴션](https://www.notion.so/guesung/typescript-convention-e335832c4c0e420f85a9f7de6b5d0db1?pvs=4)

[📄 Git 컨밴션](https://www.notion.so/guesung/PR-59399896b4504c4ea5703b8c3ac2b874)

## 기술스택 🛠

- **Language :** [Typescript](https://www.typescriptlang.org/)
- **Framework :** [Next.js](https://nextjs.org/)
- **Package Manager :** [yarn-berry](https://yarnpkg.com/)
- **State Management :** [React Query](https://react-query.tanstack.com/), [Redux Toolkit](https://redux-toolkit.js.org/)
- **Styling :** [TailwindCSS](https://tailwindcss.com/), [tailwind-styled-components](https://www.npmjs.com/package/tailwind-styled-components), [HeadlessUI](https://headlessui.com/), [Swiper](https://swiperjs.com/react)
- **Forms :** [React Hook Form](https://react-hook-form.com/)
- **Formatter :** [ESLint](https://eslint.org/), [Prettier](https://prettier.io/)
- **Library :** [axios](https://axios-http.com/), [sockJS](https://github.com/sockjs/sockjs-client), [momentJS](https://momentjs.com/)

## 우리의 성장기...

[🗝️ 카카오, 네이버 소셜 로그인](https://www.notion.so/guesung/social-login-4d9321791dec42a6a98590cf18a0dbb5?pvs=4)

[🧿 axios instance로 api 요청 전후 및 error 핸들링](https://www.notion.so/guesung/Axios-instance-53e9a3c00f354b8c92b44728f9987b3c?pvs=4)

[💧 react-query 제대로 알고 사용하기 ](https://www.notion.so/guesung/react-query-e32b280a1b184cd7b5ba699286a20604?pvs=4)

[🐽 Intersection Observer API와 react-query 사용하여 무한스크롤 구현](https://www.notion.so/guesung/Intersection-Observer-API-react-query-7e95dd67a0aa4830be0685e74e8093f0)

[🎨 tailwind-styled-component](https://www.notion.so/guesung/tailwind-styled-components-e8b95344e93d4ca88979b702deb7027e)

[💬 채팅, stompjs, socketjs](https://www.notion.so/guesung/Stomp-Soket-js-51dfc4ba27f94026bec470da0170ea01?pvs=4)

[🧡 스토리북 in nextjs and tailwind](https://www.notion.so/guesung/story-book-with-nextjs-and-tailwind-280f912916084649ad8d73e4e7b75abf?pvs=4)

[👣 @types 폴더에서 전역 type 정의](https://www.notion.so/guesung/types-type-7aeefdf592894c0d9a6f99993ba2a75e?pvs=4)
