import { Meta, Story } from '@storybook/react'

import Button from './Button'
import { ButtonProps } from './Button'

export default {
  title: 'Button',
  component: Button,
  args: {
    kind: {
      control: {
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
export const Filled = Template.bind({});
Filled.args = {
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
