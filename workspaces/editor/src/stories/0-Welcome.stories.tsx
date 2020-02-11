/* @jsx jsx */
import { jsx } from '@emotion/core';
import { linkTo } from '@storybook/addon-links';
import { Welcome } from '@storybook/react/demo';

export default {
    title: 'Welcome',
    component: Welcome,
};

export const ToStorybook = (): JSX.Element => <Welcome showApp={linkTo('Button')} />;

ToStorybook.story = {
    name: 'to Storybook',
};
