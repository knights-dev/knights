/* @jsx jsx */
import { jsx } from '@emotion/core';
import { number, text, withKnobs } from '@storybook/addon-knobs';
import React from 'react';

import { ValueNode } from '../components/nodes';

export default {
    title: 'ValueNode',
    decorators: [withKnobs],
    component: ValueNode,
};

export const Input = (): JSX.Element => {
    return (
        <React.Fragment>
            <svg className="editor-screen">
                <ValueNode x={number('x', 50)} y={number('y', 50)} text={text('text', 'x')} />
            </svg>
        </React.Fragment>
    );
};
