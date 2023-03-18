## 설치 및 설정

프로젝트 환경 : nextjs12, tailwindcss, yarn-berry

현재 프로젝트에서 storybook 적용하기

```bash
npx storybook init

```

중간에 eslint에 추가할거냐고 물어보면 yes 누르고 진행합니다.

```bash
√ Do you want to run the 'eslintPlugin' migration on your project? ... yes
✅ Adding dependencies: eslint-plugin-storybook

```

storybook에서도 tailwindcss가 반영되러면 postcss를 사용할 수 있게 다음 dependency를 추가해야합니다.

```bash
yarn add -D @storybook/addon-postcss

```

storybook 서버 build시 webpack을 사용하는데 버전 조건을 지정해야 합니다

```bash
// package.json

  "resolutions": {
    "@storybook/{app}/webpack": "^5"
  }

```

프로젝트에 스토리북을 초기화합니다. ( webpack 5를 사용해서 build)

```bash
npx sb init --builder webpack5

```

.storybook에 main.js와 preview.js 각각에서 설정을 추가로 해주어야 합니다.

```jsx
// main.js
const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  /** Expose public folder to storybook as static */
  staticDirs: ['../public'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    {
      /**
       * Fix Storybook issue with PostCSS@8
       * @see <https://github.com/storybookjs/storybook/issues/12668#issuecomment-773958085>
       */
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ],
  core: {
    builder: 'webpack5',
  },
  webpackFinal: (config) => {
    /**
     * Add support for alias-imports
     * @see <https://github.com/storybookjs/storybook/issues/11989#issuecomment-715524391>
     */
    config.resolve.alias = {
      ...config.resolve?.alias,
      '@': [path.resolve(__dirname, '../src/'), path.resolve(__dirname, '../')],
    };

    /**
     * Fixes font import with /
     * @see <https://github.com/storybookjs/storybook/issues/12844#issuecomment-867544160>
     */
    config.resolve.roots = [
      path.resolve(__dirname, '../public'),
      'node_modules',
    ];

    return config;
  },
};
```

```jsx
// preview.js

import '../src/styles/globals.css';
import * as NextImage from 'next/image';

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  previewTabs: {
    'storybook/docs/panel': { index: -1 },
  },
};
```

모든 설정이 끝난 후에 storybook을 실행합니다.

```bash
yarn storybook

```

## story 등록하기

일단은 스토리에 등록할 컴포넌트를 준비합니다. 미리 만들어둔 Button 컴포넌트를 사용합니다.

```
// Button.tsx
import tw from 'tailwind-styled-components';

export interface ButtonProps {
  kind?: 'filled' | 'outlined';
  text: string;
  disabled?: boolean;
  onClick?: () => void;
  [key: string]: any;
}

const FilledButton = tw.button<ButtonProps>`
${({ disabled }) => disabled && 'opacity-50 cursor-not-allowed'}
w-full transition h-[3.25rem] text-sm rounded-[0.25rem] hover:opacity-90 border border-transparent hover:brand-2 bg-brand px-0 text-white leading-3 font-normal shadow-xl shadow-gray
`;

const OutlinedButton = tw.button<ButtonProps>`
${({ disabled }) => disabled && 'opacity-50 cursor-not-allowed'}
w-full transition h-[3.25rem] text-sm rounded-[0.25rem] border border-brand hover:brand-2 bg-white px-0 text-brand leading-3 font-normal
`;

export default function Button({
  kind = 'filled',
  text,
  disabled = false,
  onClick,
  ...rest
}: ButtonProps) {
  return kind === 'filled' ? (
    <FilledButton disabled={disabled} onClick={onClick} {...rest}>
      {text}
    </FilledButton>
  ) : (
    <OutlinedButton disabled={disabled} onClick={onClick} {...rest}>
      {text}
    </OutlinedButton>
  );
}

```

[컴포넌트이름].stories.tsx와 같이 스토리 파일을 만듭니다.

```tsx
import Button from './Button';
import { Story, Meta } from '@storybook/react'; // type 지정을 위해 사용
import { ButtonProps } from './Button';
export default {
  title: 'Button', // 스토리 이름
  component: Button, // 위에서 import한 컴포넌트를 넣어줍니다.
  args: {
    // 컴포넌트 변수들 입니다.
    kind: {
      // 변수 이름
      control: {
        // 변수 정의
        type: 'select',
        options: ['filled', 'outlined'],
      },
    },
    text: {
      control: {
        type: 'text',
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
    },
  },
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;
// 버튼 스토리의 개별 Template들입니다.
export const Filled = Template.bind({});
Filled.args = {
  // Template마다 args들을 명시할 수 있습니다.
  kind: 'filled',
  text: 'Filled Button',
  disabled: false,
};

export const Outlined = Template.bind({});
Outlined.args = {
  kind: 'outlined',
  text: 'Outlined Button',
  disabled: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  kind: 'filled',
  text: 'Disabled Button',
  disabled: true,
};

export const DisabledOutlined = Template.bind({});
DisabledOutlined.args = {
  kind: 'outlined',
  text: 'Disabled Button',
  disabled: true,
};
```

storybook을 실행합니다.

```bash
yarn storybook

```

좌측의 Template 패널과 아래 Control 패널을 사용하여 UI를 변경할 수 있습니다.
![image](https://user-images.githubusercontent.com/92621861/210474043-3ff2166f-7291-4e0b-b8a8-62f3fadeb227.png)

[참고]

[](https://storybook.js.org/docs/react/get-started/install)[https://storybook.js.org/docs/react/get-started/install](https://storybook.js.org/docs/react/get-started/install)

[](https://github.com/joooonis/design-system)[https://github.com/joooonis/design-system](https://github.com/joooonis/design-system)

[](https://doonguri.tistory.com/38)[https://doonguri.tistory.com/38](https://doonguri.tistory.com/38)
