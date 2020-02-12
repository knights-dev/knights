/* @jsx jsx */
import '../scss/editor.scss';

import { jsx } from '@emotion/core';
import { boolean, number, withKnobs } from '@storybook/addon-knobs';
import React from 'react';

import { ArrowLine } from '../components/nodes';

export default {
    title: 'ArrowLine',
    decorators: [withKnobs],
    component: ArrowLine,
};

export const Input = (): JSX.Element => {
    return (
        <React.Fragment>
            <svg className="editor-screen">
                <ArrowLine
                    source={[number('sx', 50), number('sy', 50)]}
                    dest={[number('dx', 250), number('dy', 250)]}
                    withHead={boolean('withHead', true)}
                />
            </svg>
        </React.Fragment>
    );
};
