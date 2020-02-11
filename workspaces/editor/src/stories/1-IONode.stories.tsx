/* @jsx jsx */
import { jsx } from '@emotion/core';
import { number, text, withKnobs } from '@storybook/addon-knobs';
import React from 'react';

import { IONode } from '../components/nodes';

export default {
    title: 'IONode',
    decorators: [withKnobs],
    component: IONode,
};

export const Input = (): JSX.Element => {
    return (
        <React.Fragment>
            <svg className="editor-screen">
                <IONode x={number('x', 50)} y={number('y', 50)} text={text('text', 'x')} />
            </svg>
        </React.Fragment>
    );
};
